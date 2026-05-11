import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function sha256(input: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { phone, code, role } = await req.json();
    if (!phone || !code) {
      return new Response(JSON.stringify({ error: "Phone and code required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const e164 = phone.startsWith("+") ? phone : `+91${phone}`;
    const userRole = role === "artist" ? "artist" : "customer";

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const { data: rows, error: selErr } = await admin
      .from("phone_otp")
      .select("*")
      .eq("phone", e164)
      .eq("consumed", false)
      .order("created_at", { ascending: false })
      .limit(1);
    if (selErr) throw selErr;
    const otp = rows?.[0];
    if (!otp) return new Response(JSON.stringify({ error: "No active code. Request a new one." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    if (new Date(otp.expires_at) < new Date()) {
      await admin.from("phone_otp").update({ consumed: true }).eq("id", otp.id);
      return new Response(JSON.stringify({ error: "Code expired" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (otp.attempts >= 5) {
      await admin.from("phone_otp").update({ consumed: true }).eq("id", otp.id);
      return new Response(JSON.stringify({ error: "Too many attempts" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const code_hash = await sha256(String(code));
    if (code_hash !== otp.code_hash) {
      await admin.from("phone_otp").update({ attempts: otp.attempts + 1 }).eq("id", otp.id);
      return new Response(JSON.stringify({ error: "Invalid code" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    await admin.from("phone_otp").update({ consumed: true }).eq("id", otp.id);

    // Synthetic email so we can use Supabase Auth
    const email = `${e164.replace(/[^\d]/g, "")}@phone.kalavidara.app`;
    const password = `pwd_${await sha256(e164 + (Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""))}`.slice(0, 40);

    // Try sign in; if not exists, create the user
    let { data: signIn, error: signInErr } = await admin.auth.signInWithPassword({ email, password });
    if (signInErr) {
      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        phone: e164,
        user_metadata: { phone: e164, role: userRole, full_name: e164 },
      });
      if (createErr) throw createErr;
      const retry = await admin.auth.signInWithPassword({ email, password });
      if (retry.error) throw retry.error;
      signIn = retry.data;
    }

    return new Response(JSON.stringify({ success: true, session: signIn.session }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
