import { Link, useNavigate, useParams } from "react-router-dom";
import { ARTISTS } from "@/data/artists";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Phone, Star, Users, Wrench } from "lucide-react";

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const artist = ARTISTS.find((a) => a.id === id);

  if (!artist) {
    return (
      <section className="container py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Troupe not found</h1>
        <p className="text-muted-foreground mt-2">This artist may no longer be listed.</p>
        <Button asChild className="mt-6"><Link to="/explore">Back to Explore</Link></Button>
      </section>
    );
  }

  return (
    <>
      <title>{artist.groupName} | Kalavidara-Balaga</title>
      <meta name="description" content={artist.bio.slice(0, 155)} />

      <article className="pb-28 md:pb-10">
        <div className="relative h-72 md:h-96">
          <img src={artist.image} alt={artist.groupName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/40 to-foreground/20" />

          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="absolute top-4 left-4 w-10 h-10 grid place-items-center rounded-full bg-background/90 text-foreground shadow-soft active:scale-95 transition pt-[env(safe-area-inset-top)]"
            style={{ top: "calc(1rem + env(safe-area-inset-top))" }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 container pb-6 text-background">
            <Badge className="bg-secondary text-secondary-foreground border-0 mb-3">{artist.artForm}</Badge>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">{artist.groupName}</h1>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs md:text-sm text-background/90">
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{artist.district}, Karnataka</span>
              <span className="inline-flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{artist.members} members</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{artist.experienceYears} years</span>
              <span className="inline-flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-accent text-accent" />{artist.rating} · {artist.bookings} bookings</span>
            </div>
          </div>
        </div>

        <div className="container py-6 md:py-10 space-y-6 max-w-4xl">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Led by</div>
            <div className="font-display text-xl font-semibold text-primary">{artist.leader}</div>
          </div>

          <p className="text-muted-foreground leading-relaxed">{artist.bio}</p>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Portfolio</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {artist.gallery.map((src, i) => (
                <div key={i} className={`rounded-xl overflow-hidden ${i === 0 ? "row-span-2 col-span-2 aspect-square" : "aspect-square"}`}>
                  <img src={src} alt={`${artist.groupName} gallery ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-muted/40 p-5">
            <h2 className="font-display text-lg font-bold mb-3 inline-flex items-center gap-2">
              <Wrench className="w-4 h-4 text-primary" /> Equipment & arrangements
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-foreground/80">
              {artist.equipment.map((e) => (
                <li key={e} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" /> {e}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:flex items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-festival text-primary-foreground">
            <div>
              <div className="text-xs uppercase tracking-wider opacity-80">Starting from</div>
              <div className="font-display text-3xl font-bold">₹{artist.startingPrice.toLocaleString("en-IN")}</div>
              <div className="text-xs opacity-80 mt-1">Per performance · negotiable by event</div>
            </div>
            <Button variant="outlineGold" size="lg" asChild className="bg-background/10 backdrop-blur">
              <a href={`tel:${artist.phone}`}><Phone className="w-5 h-5" /> Call {artist.leader}</a>
            </Button>
          </div>
        </div>

        {/* Mobile sticky CTA */}
        <div className="md:hidden fixed bottom-16 inset-x-0 z-30 bg-background/95 backdrop-blur-md border-t border-border/60 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
              <div className="font-display text-xl font-bold text-primary leading-tight">₹{artist.startingPrice.toLocaleString("en-IN")}</div>
            </div>
            <Button variant="festival" size="lg" asChild className="rounded-full h-12 px-6 flex-1 max-w-[60%] justify-center">
              <a href={`tel:${artist.phone}`}><Phone className="w-4 h-4" /> Call {artist.leader.split(" ")[0]}</a>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
};

export default ArtistDetail;
