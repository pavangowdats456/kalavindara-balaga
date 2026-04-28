import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, Users, Calendar, Wrench } from "lucide-react";
import type { Artist } from "@/data/artists";

interface Props {
  artist: Artist | null;
  onClose: () => void;
}

export const ArtistDetailDialog = ({ artist, onClose }: Props) => {
  return (
    <Dialog open={!!artist} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0 gap-0">
        {artist && (
          <>
            <div className="relative h-64 md:h-80">
              <img src={artist.image} alt={artist.groupName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                <Badge className="bg-secondary text-secondary-foreground border-0 mb-3">{artist.artForm}</Badge>
                <DialogHeader>
                  <DialogTitle className="font-display text-3xl md:text-4xl font-bold text-background">
                    {artist.groupName}
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-background/90">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" />{artist.district}, Karnataka</span>
                  <span className="inline-flex items-center gap-1.5"><Users className="w-4 h-4" />{artist.members} members</span>
                  <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" />{artist.experienceYears} years</span>
                  <span className="inline-flex items-center gap-1.5"><Star className="w-4 h-4 fill-accent text-accent" />{artist.rating} · {artist.bookings} bookings</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Led by</div>
                <div className="font-display text-xl font-semibold text-primary">{artist.leader}</div>
              </div>

              <p className="text-muted-foreground leading-relaxed">{artist.bio}</p>

              <div>
                <h3 className="font-display text-xl font-bold mb-3">Portfolio</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {artist.gallery.map((src, i) => (
                    <div
                      key={i}
                      className={`rounded-xl overflow-hidden ${i === 0 ? "row-span-2 col-span-2 aspect-square" : "aspect-square"}`}
                    >
                      <img src={src} alt={`${artist.groupName} gallery ${i + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border/70 bg-muted/40 p-5">
                <h3 className="font-display text-lg font-bold mb-3 inline-flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-primary" /> Equipment & arrangements
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-foreground/80">
                  {artist.equipment.map((e) => (
                    <li key={e} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" /> {e}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-gradient-festival text-primary-foreground">
                <div>
                  <div className="text-xs uppercase tracking-wider opacity-80">Starting from</div>
                  <div className="font-display text-3xl font-bold">₹{artist.startingPrice.toLocaleString("en-IN")}</div>
                  <div className="text-xs opacity-80 mt-1">Per performance · negotiable by event</div>
                </div>
                <Button variant="outlineGold" size="lg" asChild className="bg-background/10 backdrop-blur">
                  <a href={`tel:${artist.phone}`}>
                    <Phone className="w-5 h-5" /> Call {artist.leader}
                  </a>
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
