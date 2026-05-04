import hero from "@/assets/hero-dollu.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Karnataka Dollu Kunitha drummers performing in vibrant traditional attire"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/55 to-foreground/95" />
      </div>

      <div className="relative container pt-10 pb-20 md:pt-24 md:pb-36">
        <div className="max-w-2xl text-background animate-float-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/95 text-secondary-foreground text-[10px] font-semibold uppercase tracking-wider shadow-warm">
            <Sparkles className="w-3 h-3" /> Karnataka Folk Arts
          </div>
          <h1 className="mt-4 font-display text-[2.4rem] leading-[1.05] md:text-7xl font-bold">
            Village rhythms,
            <span className="block text-gradient-festival" style={{ filter: "drop-shadow(0 2px 12px hsl(0 0% 0% / 0.3))" }}>
              city celebrations.
            </span>
          </h1>
          <p className="mt-4 text-sm md:text-xl text-background/90 max-w-xl">
            Book Karnataka's folk troupes — Dollu Kunitha, Yakshagana, Veeragase and more — directly from the artists themselves.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Button variant="festival" size="lg" asChild className="h-12 px-5 rounded-full">
              <a href="#explore">Find an artist <ArrowRight className="w-4 h-4" /></a>
            </Button>
            <Button variant="outlineGold" size="lg" asChild className="h-12 px-5 rounded-full">
              <a href="#how">For artists</a>
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-3 max-w-md gap-4">
            {[
              { n: "320+", l: "Troupes" },
              { n: "30", l: "Districts" },
              { n: "1.6K", l: "Bookings" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl md:text-4xl font-bold text-secondary">{s.n}</div>
                <div className="text-[10px] uppercase tracking-wider text-background/75 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
