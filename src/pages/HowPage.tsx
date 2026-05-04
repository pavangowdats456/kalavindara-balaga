import { HowItWorks } from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HowPage = () => {
  return (
    <>
      <title>How Kalavidara-Balaga Works | Book Folk Artists Easily</title>
      <meta name="description" content="Learn how to book authentic Karnataka folk troupes in 4 simple steps." />

      <section className="bg-gradient-festival pt-8 pb-12 text-primary-foreground">
        <div className="container">
          <div className="text-[10px] uppercase tracking-[0.25em] opacity-80 font-semibold">Guide</div>
          <h1 className="font-display text-3xl md:text-5xl font-bold mt-1.5">How it works</h1>
          <p className="mt-2 text-sm md:text-base text-primary-foreground/85 max-w-xl">
            From discovery to celebration — a simple, direct path between artists and event organisers.
          </p>
        </div>
      </section>

      <HowItWorks />

      <section className="container pb-12">
        <div className="rounded-2xl border border-border/60 bg-gradient-card p-6 md:p-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold">Ready to book a troupe?</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto text-sm md:text-base">
            Browse artists by district and art form, and call them directly — no middlemen.
          </p>
          <Button variant="festival" size="lg" asChild className="mt-5 rounded-full h-12 px-6">
            <Link to="/explore">Explore artists <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default HowPage;
