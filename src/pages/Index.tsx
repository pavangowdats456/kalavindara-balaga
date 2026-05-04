import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SearchFilters } from "@/components/SearchFilters";
import { ArtistCard } from "@/components/ArtistCard";
import { ArtistDetailDialog } from "@/components/ArtistDetailDialog";
import { ArtFormsStrip } from "@/components/ArtFormsStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { Impact } from "@/components/Impact";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ARTISTS, type Artist } from "@/data/artists";

const Index = () => {
  const [query, setQuery] = useState("");
  const [artForm, setArtForm] = useState("all");
  const [district, setDistrict] = useState("all");
  const [selected, setSelected] = useState<Artist | null>(null);

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
      <title>Kalavidara-Balaga | Karnataka Folk Artists Booking</title>
      <meta
        name="description"
        content="Book traditional Karnataka folk artists — Dollu Kunitha, Yakshagana, Veeragase, Pooja Kunitha — directly from rural troupes for weddings, festivals and events."
      />
      <link rel="canonical" href="/" />

      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
        <Header />
        <main className="flex-1">
          <Hero />

          <section id="explore" className="container">
            <SearchFilters
              query={query}
              setQuery={setQuery}
              artForm={artForm}
              setArtForm={setArtForm}
              district={district}
              setDistrict={setDistrict}
            />

            <div className="flex items-end justify-between flex-wrap gap-4 mt-8 md:mt-14 mb-5 md:mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-secondary font-semibold">Featured</div>
                <h2 className="font-display text-2xl md:text-5xl font-bold mt-1.5">
                  {filtered.length} {filtered.length === 1 ? "troupe" : "troupes"} ready to perform
                </h2>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground border border-dashed border-border rounded-2xl">
                No troupes match your filters yet. Try a different district or art form.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-8">
                {filtered.map((a, i) => (
                  <ArtistCard key={a.id} artist={a} onView={setSelected} index={i} />
                ))}
              </div>
            )}
          </section>

          <ArtFormsStrip
            onPick={(name) => {
              setArtForm(name);
              document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
          <HowItWorks />
          <Impact />
        </main>
        <Footer />
        <BottomNav />
      </div>

      <ArtistDetailDialog artist={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Index;
