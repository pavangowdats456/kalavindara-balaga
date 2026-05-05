import { useNavigate } from "react-router-dom";
import { Drum, ArrowLeft, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

const ArtistApp = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background pt-[env(safe-area-inset-top)]">
      <div className="bg-gradient-festival text-primary-foreground px-6 pt-6 pb-12 rounded-b-[2.5rem] shadow-warm relative overflow-hidden">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-background/20 grid place-items-center backdrop-blur-md border border-background/30"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="mt-6 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-background/20 grid place-items-center backdrop-blur-md border border-background/30">
            <Drum className="w-5 h-5" strokeWidth={2.4} />
          </div>
          <div>
            <div className="font-display text-2xl font-bold leading-none">Kalavidara</div>
            <div className="font-script text-xs opacity-90 mt-0.5">Artist Studio</div>
          </div>
        </div>
        <h1 className="font-display text-3xl font-bold mt-6 leading-tight">
          Welcome, Artist 🎭
        </h1>
        <p className="text-sm text-primary-foreground/85 mt-1.5">
          This is your dedicated space to manage your troupe and bookings.
        </p>
      </div>

      <div className="flex-1 px-6 -mt-6 space-y-3">
        <div className="rounded-2xl bg-card border border-border p-6 shadow-soft text-center">
          <div className="w-14 h-14 rounded-2xl bg-secondary/15 text-secondary grid place-items-center mx-auto mb-3">
            <Palette className="w-6 h-6" />
          </div>
          <div className="font-display text-lg font-bold">Artist app — coming up</div>
          <p className="text-sm text-muted-foreground mt-1">
            Tell me what features you want here (profile, portfolio, bookings, calendar, earnings…) and I'll build them next.
          </p>
        </div>

        <Button variant="outline" size="lg" className="w-full" onClick={() => navigate("/login")}>
          Switch account type
        </Button>
      </div>

      <div className="text-center text-[11px] text-muted-foreground pb-6 pt-4 px-6">
        Empowering Karnataka's folk artists 🎭
      </div>
    </div>
  );
};

export default ArtistApp;
