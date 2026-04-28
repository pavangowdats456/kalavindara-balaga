import { Drum } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-festival grid place-items-center">
            <Drum className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-primary">Kalavidara-Balaga</div>
            <div className="font-script text-xs text-secondary -mt-0.5">ಕಲಾವಿದರ ಬಳಗ</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Empowering Karnataka’s folk artists · Made with <span className="text-primary">♥</span> for cultural heritage
        </p>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Kalavidara-Balaga</div>
      </div>
    </footer>
  );
};
