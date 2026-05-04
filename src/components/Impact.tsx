import { HeartHandshake, Sprout, Globe2 } from "lucide-react";

const goals = [
  { icon: Sprout, title: "Cultural preservation", text: "Keeping centuries-old folk traditions alive by giving them a digital stage and steady audience." },
  { icon: HeartHandshake, title: "Year-round livelihood", text: "Moving artists beyond seasonal labour into stable income from weddings, corporate and cultural events." },
  { icon: Globe2, title: "Rural-urban bridge", text: "Connecting Karnataka’s villages to event planners across India and the world." },
];

export const Impact = () => {
  return (
    <section id="impact" className="container py-12 md:py-28">
      <div className="rounded-3xl overflow-hidden bg-gradient-festival p-6 md:p-14 text-primary-foreground shadow-warm relative">
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1.5px), radial-gradient(circle at 70% 60%, white 1px, transparent 1.5px)",
          backgroundSize: "40px 40px, 60px 60px"
        }} />
        <div className="relative max-w-2xl">
          <div className="text-xs uppercase tracking-[0.25em] font-semibold opacity-80">Our impact</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">Heritage. Livelihood. Legacy.</h2>
          <p className="mt-3 text-primary-foreground/85 text-base md:text-lg">
            Kalavidara-Balaga is more than a marketplace — it’s a movement to make folk artistry a sustainable profession.
          </p>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 md:mt-10">
          {goals.map((g) => (
            <div key={g.title} className="rounded-2xl bg-background/10 backdrop-blur-sm border border-background/15 p-6">
              <div className="w-11 h-11 rounded-xl bg-background/15 grid place-items-center">
                <g.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold mt-4">{g.title}</h3>
              <p className="text-sm opacity-85 mt-2 leading-relaxed">{g.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
