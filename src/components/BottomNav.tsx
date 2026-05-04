import { Home, Compass, Sparkles, Info } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Compass, label: "Explore", to: "/explore" },
  { icon: Sparkles, label: "How", to: "/how" },
  { icon: Info, label: "About", to: "/about" },
];

export const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/60 pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-4">
        {items.map((it) => (
          <li key={it.label}>
            <NavLink
              to={it.to}
              end={it.to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 py-2.5 transition active:scale-95 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`relative ${isActive ? "drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]" : ""}`}>
                    <it.icon className="w-5 h-5" strokeWidth={isActive ? 2.6 : 2} />
                  </div>
                  <span className={`text-[10px] ${isActive ? "font-bold" : "font-medium"}`}>{it.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
