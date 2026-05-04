import { UserPlus, Search, Phone, PartyPopper } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Artists register", text: "Folk troupes create a free profile with photos, videos and equipment details." },
  { icon: Search, title: "Planners search", text: "Filter by district and art form to discover authentic, vetted performers." },
  { icon: Phone, title: "Call directly", text: "One-tap call connects you straight to the troupe leader — no middlemen." },
  { icon: PartyPopper, title: "Celebrate", text: "Enjoy unforgettable performances and support traditional artists year-round." },
];

export const HowItWorks = () => {
  return (
    <section id="how" className="bg-muted/40 border-y border-border/60">
      <div className="container py-12 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">How it works</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">From village stage to your celebration</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative bg-gradient-card rounded-2xl p-6 border border-border/60 shadow-soft hover:shadow-warm transition-shadow"
            >
              <div className="absolute -top-4 -left-2 font-display text-7xl font-black text-secondary/20 select-none">{i + 1}</div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-festival grid place-items-center shadow-warm">
                  <s.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold mt-4">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
