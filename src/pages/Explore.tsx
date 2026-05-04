import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchFilters } from "@/components/SearchFilters";
import { ArtistCard } from "@/components/ArtistCard";
import { ARTISTS } from "@/data/artists";

const Explore = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [artForm, setArtForm] = useState(params.get("art") ?? "all");
  const [district, setDistrict] = useState(params.get("dist") ?? "all");

  useEffect(() => {
    const next = new URLSearchParams();
    if (artForm !== "all") next.set("art", artForm);
    if (district !== "all") next.set("dist", district);
    setParams(next, { replace: true });
  }, [artForm, district, setParams]);

  const filtered = useMemo(() => {
    return ARTISTS.filter((a) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || a.groupName.toLowerCase().includes(q) || a.leader.toLowerCase().includes(q);
      const matchA = artForm === "all" || a.artForm === artForm;
      const matchD = district === "all" || a.district === district;
      return matchQ && matchA && matchD;
    });
  }, [query, artForm, district]);

  return (
    <>
      <title>Explore Folk Artists | Kalavidara-Balaga</title>
      <meta name="description" content="Search Karnataka's folk troupes by district and art form." />

      <section className="bg-gradient-festival pt-8 pb-16 text-primary-foreground">
        <div className="container">
          <div className="text-[10px] uppercase tracking-[0.25em] opacity-80 font-semibold">Explore</div>
          <h1 className="font-display text-3xl md:text-5xl font-bold mt-1.5">Find your perfect troupe</h1>
          <p className="mt-2 text-sm md:text-base text-primary-foreground/85 max-w-xl">
            Filter by art form and district. One tap connects you straight to the leader.
          </p>
        </div>
      </section>

      <section className="container">
        <SearchFilters
          query={query}
          setQuery={setQuery}
          artForm={artForm}
          setArtForm={setArtForm}
          district={district}
          setDistrict={setDistrict}
        />

        <div className="mt-6 mb-4 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "troupe" : "troupes"} found
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground border border-dashed border-border rounded-2xl">
            No troupes match your filters. Try a different district or art form.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-10">
            {filtered.map((a, i) => (
              <ArtistCard key={a.id} artist={a} onView={() => navigate(`/artist/${a.id}`)} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Explore;
