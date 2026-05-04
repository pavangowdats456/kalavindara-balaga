import { Home, Search, Calendar, User } from "lucide-react";

const items = [
  { icon: Home, label: "Home", href: "#top" },
  { icon: Search, label: "Explore", href: "#explore" },
  { icon: Calendar, label: "How", href: "#how" },
  { icon: User, label: "Impact", href: "#impact" },
];

export const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/60 pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-4">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-muted-foreground active:text-primary active:scale-95 transition"
            >
              <it.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{it.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
