import { MapPin, Star, Users, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Artist } from "@/data/artists";

interface Props {
  artist: Artist;
  onView: (a: Artist) => void;
  index?: number;
}

export const ArtistCard = ({ artist, onView, index = 0 }: Props) => {
  return (
    <article
      className="group rounded-2xl overflow-hidden bg-card border border-border/60 shadow-soft active:scale-[0.99] sm:hover:shadow-warm sm:hover:-translate-y-1 transition-[box-shadow,transform] duration-300 animate-float-up"
      style={{ animationDelay: `${Math.min(index, 6) * 50}ms` }}
    >
      <button onClick={() => onView(artist)} className="block w-full text-left">
        <div className="relative aspect-[16/10] sm:aspect-[4/5] overflow-hidden">
          <img
            src={artist.image}
            alt={`${artist.groupName} performing ${artist.artForm}`}
            loading="lazy"
            className="w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent" />
          <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground border-0 shadow-soft text-[10px]">
            {artist.artForm}
          </Badge>
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/95 text-foreground text-xs font-semibold">
            <Star className="w-3 h-3 fill-accent text-accent" /> {artist.rating}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-background">
            <h3 className="font-display text-lg sm:text-xl font-bold leading-tight line-clamp-1">{artist.groupName}</h3>
            <div className="mt-1.5 flex items-center gap-3 text-[11px] text-background/85">
              <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{artist.district}</span>
              <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" />{artist.members}</span>
              <span>{artist.experienceYears}y</span>
            </div>
          </div>
        </div>
      </button>
      <div className="p-3 sm:p-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
          <div className="font-display text-lg font-bold text-primary leading-tight">₹{artist.startingPrice.toLocaleString("en-IN")}</div>
        </div>
        <Button variant="festival" size="sm" asChild className="rounded-full h-10 px-4">
          <a href={`tel:${artist.phone}`} onClick={(e) => e.stopPropagation()}>
            <Phone className="w-4 h-4" /> Call
          </a>
        </Button>
      </div>
    </article>
  );
};
