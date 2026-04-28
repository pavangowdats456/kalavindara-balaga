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
      className="group rounded-2xl overflow-hidden bg-card border border-border/60 shadow-soft hover:shadow-warm transition-[box-shadow,transform] duration-500 hover:-translate-y-1 animate-float-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button onClick={() => onView(artist)} className="block w-full text-left">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={artist.image}
            alt={`${artist.groupName} performing ${artist.artForm}`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent" />
          <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground border-0 shadow-soft">
            {artist.artForm}
          </Badge>
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/95 text-foreground text-xs font-semibold">
            <Star className="w-3 h-3 fill-accent text-accent" /> {artist.rating}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-background">
            <h3 className="font-display text-xl font-bold leading-tight line-clamp-2">{artist.groupName}</h3>
            <div className="mt-2 flex items-center gap-3 text-xs text-background/85">
              <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{artist.district}</span>
              <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" />{artist.members}</span>
              <span>{artist.experienceYears}y exp.</span>
            </div>
          </div>
        </div>
      </button>
      <div className="p-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-muted-foreground">Starting from</div>
          <div className="font-display text-lg font-bold text-primary">₹{artist.startingPrice.toLocaleString("en-IN")}</div>
        </div>
        <Button variant="festival" size="sm" asChild>
          <a href={`tel:${artist.phone}`} onClick={(e) => e.stopPropagation()}>
            <Phone className="w-4 h-4" /> Call
          </a>
        </Button>
      </div>
    </article>
  );
};
