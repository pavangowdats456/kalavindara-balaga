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
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-foreground/20" />
      </div>

      <div className="relative container py-24 md:py-36 lg:py-44">
        <div className="max-w-2xl text-background animate-float-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/95 text-secondary-foreground text-xs font-semibold uppercase tracking-wider shadow-warm">
            <Sparkles className="w-3.5 h-3.5" /> Karnataka Folk Arts Marketplace
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05]">
            Where village rhythms
            <span className="block text-gradient-festival" style={{ filter: "drop-shadow(0 2px 12px hsl(0 0% 0% / 0.3))" }}>
              meet city celebrations.
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-background/90 max-w-xl">
            Book traditional folk artists — Dollu Kunitha, Yakshagana, Veeragase and more — directly from
            the rural districts of Karnataka. Year-round livelihood for artists. Unforgettable events for you.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="festival" size="lg" asChild>
              <a href="#explore">Find an artist <ArrowRight className="w-4 h-4" /></a>
            </Button>
            <Button variant="outlineGold" size="lg" asChild>
              <a href="#how">For artists — register free</a>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 max-w-md gap-6">
            {[
              { n: "320+", l: "Folk troupes" },
              { n: "30", l: "Districts" },
              { n: "1.6K", l: "Bookings" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl md:text-4xl font-bold text-secondary">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-background/75 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
