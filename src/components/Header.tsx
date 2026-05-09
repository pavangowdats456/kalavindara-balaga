import { Drum, Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", to: "/" },
  { label: "Explore", to: "/explore" },
  { label: "How it works", to: "/how" },
  { label: "About", to: "/about" },
];

interface ArtistProfile {
  photo: string | null;
  name: string;
  ledBy: string;
}

export const Header = () => {
  const { pathname } = useLocation();
  const [profile, setProfile] = useState<ArtistProfile | null>(null);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem("kb_artist_profile");
        setProfile(raw ? JSON.parse(raw) : null);
      } catch {
        setProfile(null);
      }
    };
    read();
    window.addEventListener("storage", read);
    window.addEventListener("focus", read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("focus", read);
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border/60 pt-[env(safe-area-inset-top)]">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-festival grid place-items-center shadow-warm">
            <Drum className="w-4 h-4 text-primary-foreground" strokeWidth={2.4} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold text-primary">Kalavidara</div>
            <div className="font-script text-[10px] text-secondary -mt-1">ಬಳಗ · Balaga</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`transition-colors hover:text-primary ${pathname === l.to ? "text-primary" : "text-foreground/80"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/explore"
            aria-label="Search artists"
            className="md:hidden w-10 h-10 grid place-items-center rounded-full bg-muted/70 text-foreground/80 active:scale-95 transition-transform"
          >
            <Search className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};
