import dollu from "@/assets/hero-dollu.jpg";
import pooja from "@/assets/art-pooja.jpg";
import yaksha from "@/assets/art-yakshagana.jpg";
import veera from "@/assets/art-veeragase.jpg";
import kamsale from "@/assets/art-kamsale.jpg";
import nagari from "@/assets/art-nagari.jpg";
import suggi from "@/assets/art-suggi.jpg";

const items = [
  { name: "Dollu Kunitha", img: dollu, note: "Thunder of the drums" },
  { name: "Yakshagana", img: yaksha, note: "All-night theatre" },
  { name: "Pooja Kunitha", img: pooja, note: "Sacred procession" },
  { name: "Veeragase", img: veera, note: "Warrior trance" },
  { name: "Kamsale", img: kamsale, note: "Brass cymbal devotion" },
  { name: "Nagari", img: nagari, note: "Festive baraat" },
  { name: "Suggi", img: suggi, note: "Harvest joy" },
];

interface Props { onPick: (name: string) => void; }

export const ArtFormsStrip = ({ onPick }: Props) => {
  return (
    <section id="artforms" className="container py-20 md:py-28">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">Heritage</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">Karnataka’s living folk traditions</h2>
        </div>
        <p className="text-muted-foreground max-w-md">
          Every art form here is an unbroken thread from village squares and temple courtyards. Tap one to discover its troupes.
        </p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
        {items.map((it, i) => (
          <button
            key={it.name}
            onClick={() => onPick(it.name)}
            className="snap-start shrink-0 w-56 md:w-64 group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-soft hover:shadow-warm transition-all duration-500 hover:-translate-y-1 animate-float-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <img src={it.img} alt={it.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-background text-left">
              <div className="font-display text-xl font-bold">{it.name}</div>
              <div className="text-xs text-background/80 mt-0.5">{it.note}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
