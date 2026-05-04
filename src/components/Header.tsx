import { Drum, Search } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border/60 pt-[env(safe-area-inset-top)]">
      <div className="container flex items-center justify-between h-14">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-festival grid place-items-center shadow-warm">
            <Drum className="w-4 h-4 text-primary-foreground" strokeWidth={2.4} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold text-primary">Kalavidara</div>
            <div className="font-script text-[10px] text-secondary -mt-1">ಬಳಗ · Balaga</div>
          </div>
        </a>
        <a
          href="#explore"
          aria-label="Search artists"
          className="w-10 h-10 grid place-items-center rounded-full bg-muted/70 text-foreground/80 active:scale-95 transition-transform"
        >
          <Search className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
};
