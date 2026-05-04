import { Impact } from "@/components/Impact";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Phone } from "lucide-react";

const About = () => {
  return (
    <>
      <title>About Kalavidara-Balaga | Empowering Folk Artists</title>
      <meta name="description" content="Kalavidara-Balaga preserves Karnataka's folk heritage and provides year-round livelihood to traditional artists." />

      <section className="bg-gradient-festival pt-8 pb-12 text-primary-foreground">
        <div className="container">
          <div className="text-[10px] uppercase tracking-[0.25em] opacity-80 font-semibold inline-flex items-center gap-1.5">
            <Heart className="w-3 h-3 fill-current" /> Our story
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold mt-1.5">A movement, not just an app.</h1>
          <p className="mt-3 text-sm md:text-base text-primary-foreground/90 max-w-xl">
            Kalavidara-Balaga (ಕಲಾವಿದರ ಬಳಗ) connects rural folk troupes of Karnataka with event organisers across India — turning seasonal performances into a sustainable profession.
          </p>
        </div>
      </section>

      <Impact />

      <section className="container pb-12">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-card border border-border/60 p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold">For artists</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Free profile. No commission. Direct calls from event planners. Get discovered beyond your village.
            </p>
            <Button variant="outline" asChild className="mt-4 rounded-full">
              <a href="tel:+919845012345"><Phone className="w-4 h-4" /> Register your troupe</a>
            </Button>
          </div>
          <div className="rounded-2xl bg-card border border-border/60 p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold">For organisers</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Authentic, vetted troupes for weddings, festivals, corporate events. Transparent pricing, direct contact.
            </p>
            <Button variant="festival" asChild className="mt-4 rounded-full">
              <Link to="/explore">Browse troupes</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
