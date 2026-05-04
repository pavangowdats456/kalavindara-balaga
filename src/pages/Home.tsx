import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { ArtFormsStrip } from "@/components/ArtFormsStrip";
import { ArtistCard } from "@/components/ArtistCard";
import { Button } from "@/components/ui/button";
import { ARTISTS } from "@/data/artists";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const featured = ARTISTS.slice(0, 4);

  return (
    <>
      <title>Kalavidara-Balaga | Karnataka Folk Artists Booking</title>
      <meta
        name="description"
        content="Book traditional Karnataka folk troupes — Dollu Kunitha, Yakshagana, Veeragase — directly from rural artists."
      />
      <link rel="canonical" href="/" />

      <Hero />

      <section className="container py-10 md:py-16">
        <div className="flex items-end justify-between gap-3 mb-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-secondary font-semibold">Featured</div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mt-1.5">Top troupes this season</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/explore")} className="text-primary">
            See all <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((a, i) => (
            <ArtistCard key={a.id} artist={a} onView={() => navigate(`/artist/${a.id}`)} index={i} />
          ))}
        </div>
      </section>

      <ArtFormsStrip
        onPick={(name) => navigate(`/explore?art=${encodeURIComponent(name)}`)}
      />
    </>
  );
};

export default Home;
