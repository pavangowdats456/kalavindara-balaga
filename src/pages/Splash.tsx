import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drum } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      const seen = localStorage.getItem("kb_authed");
      navigate(seen ? "/" : "/login", { replace: true });
    }, 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-festival grid place-items-center text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_30%,white,transparent_40%),radial-gradient(circle_at_80%_70%,white,transparent_40%)]" />
      <div className="relative flex flex-col items-center gap-5 animate-float-up">
        <div className="w-24 h-24 rounded-full bg-background/15 backdrop-blur-md grid place-items-center shadow-glow animate-drum-pulse border border-background/30">
          <Drum className="w-12 h-12" strokeWidth={2.2} />
        </div>
        <div className="text-center">
          <div className="font-display text-4xl font-bold tracking-tight">Kalavidara</div>
          <div className="font-script text-xl mt-1 opacity-90">ಬಳಗ · Balaga</div>
          <div className="mt-3 text-xs uppercase tracking-[0.3em] opacity-80">Karnataka Folk Arts</div>
        </div>
      </div>
      <div className="absolute bottom-10 text-xs opacity-70 tracking-wider">Village rhythms · City celebrations</div>
    </div>
  );
};

export default Splash;
