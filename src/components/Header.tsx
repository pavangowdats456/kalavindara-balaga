import { Drum, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="container flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-gradient-festival grid place-items-center shadow-warm group-hover:animate-drum-pulse">
            <Drum className="w-5 h-5 text-primary-foreground" strokeWidth={2.4} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold text-primary">Kalavidara</div>
            <div className="font-script text-xs text-secondary -mt-1">ಬಳಗ · Balaga</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#explore" className="hover:text-primary transition-colors">Explore</a>
          <a href="#artforms" className="hover:text-primary transition-colors">Art Forms</a>
          <a href="#how" className="hover:text-primary transition-colors">How it works</a>
          <a href="#impact" className="hover:text-primary transition-colors">Impact</a>
        </nav>
        <Button variant="festival" size="sm" asChild>
          <a href="tel:+919845012345"><Phone className="w-4 h-4" /> Book Artist</a>
        </Button>
      </div>
    </header>
  );
};
