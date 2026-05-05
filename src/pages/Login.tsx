import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drum, Phone, ArrowRight, Palette, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

type Role = "artist" | "client";
type Step = "role" | "phone" | "otp";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | null>(null);
  const [step, setStep] = useState<Step>("role");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const pickRole = (r: Role) => {
    setRole(r);
    setStep("phone");
  };

  const sendOtp = () => {
    if (!/^\d{10}$/.test(phone)) {
      toast({ title: "Enter a valid 10-digit number", variant: "destructive" });
      return;
    }
    toast({ title: "OTP sent", description: `Code sent to +91 ${phone}. Use 1234 to continue.` });
    setStep("otp");
  };

  const verify = () => {
    if (otp.length !== 4) {
      toast({ title: "Enter the 4-digit OTP", variant: "destructive" });
      return;
    }
    localStorage.setItem("kb_authed", "1");
    localStorage.setItem("kb_role", role ?? "client");
    localStorage.setItem("kb_phone", phone);
    toast({ title: "Welcome to Kalavidara-Balaga!" });
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pt-[env(safe-area-inset-top)]">
      {/* Top brand band */}
      <div className="bg-gradient-festival text-primary-foreground px-6 pt-10 pb-12 rounded-b-[2.5rem] shadow-warm relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_80%_20%,white,transparent_45%)]" />
        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-background/20 grid place-items-center backdrop-blur-md border border-background/30">
            <Drum className="w-5 h-5" strokeWidth={2.4} />
          </div>
          <div>
            <div className="font-display text-2xl font-bold leading-none">Kalavidara</div>
            <div className="font-script text-xs opacity-90 mt-0.5">ಬಳಗ · Balaga</div>
          </div>
        </div>
        <h1 className="font-display text-3xl font-bold mt-6 leading-tight">
          {step === "role" && "Welcome"}
          {step === "phone" && "Enter your phone"}
          {step === "otp" && "Verify OTP"}
        </h1>
        <p className="text-sm text-primary-foreground/85 mt-1.5">
          {step === "role" && "Choose how you want to use the app."}
          {step === "phone" && "We'll send a one-time code via SMS."}
          {step === "otp" && `Code sent to +91 ${phone}`}
        </p>
      </div>

      <div className="flex-1 px-6 -mt-6">
        {step === "role" && (
          <div className="space-y-3 animate-float-up">
            <button
              onClick={() => pickRole("client")}
              className="w-full text-left rounded-2xl bg-card border border-border p-5 shadow-soft active:scale-[0.99] transition flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-display text-lg font-bold">Find an Artist</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Book folk troupes for events & weddings
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <button
              onClick={() => pickRole("artist")}
              className="w-full text-left rounded-2xl bg-card border border-border p-5 shadow-soft active:scale-[0.99] transition flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary grid place-items-center shrink-0">
                <Palette className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-display text-lg font-bold">Join as Artist</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Showcase your troupe & receive bookings
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <p className="text-[11px] text-center text-muted-foreground pt-4 px-4">
              By continuing you agree to our Terms & Privacy Policy.
            </p>
          </div>
        )}

        {step === "phone" && (
          <div className="space-y-4 animate-float-up">
            <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Mobile number
              </label>
              <div className="mt-2 flex items-center gap-2 border-b-2 border-border focus-within:border-primary pb-1.5">
                <span className="text-foreground font-medium">+91</span>
                <Phone className="w-4 h-4 text-muted-foreground" />
                <Input
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="98XXXXXXXX"
                  className="border-0 bg-transparent text-lg p-0 h-9 focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-1.5 mt-3 text-[11px] text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Your number stays private. Used only for booking contact.</span>
              </div>
            </div>

            <Button variant="festival" size="lg" className="w-full" onClick={sendOtp}>
              Send OTP <ArrowRight className="w-4 h-4" />
            </Button>
            <button
              onClick={() => setStep("role")}
              className="w-full text-center text-sm text-muted-foreground py-2"
            >
              Change account type
            </button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4 animate-float-up">
            <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Enter 4-digit OTP
              </label>
              <Input
                inputMode="numeric"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="1234"
                className="mt-2 text-center text-2xl tracking-[0.6em] font-bold h-14"
              />
              <button className="text-xs text-primary font-semibold mt-3">Resend code</button>
            </div>
            <Button variant="festival" size="lg" className="w-full" onClick={verify}>
              Verify & Continue <ArrowRight className="w-4 h-4" />
            </Button>
            <button
              onClick={() => setStep("phone")}
              className="w-full text-center text-sm text-muted-foreground py-2"
            >
              Edit phone number
            </button>
          </div>
        )}
      </div>

      <div className="text-center text-[11px] text-muted-foreground pb-6 pt-4 px-6">
        Empowering Karnataka's folk artists 🎭
      </div>
    </div>
  );
};

export default Login;
