import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ART_FORMS, DISTRICTS } from "@/data/artists";

interface Props {
  query: string;
  setQuery: (s: string) => void;
  artForm: string;
  setArtForm: (s: string) => void;
  district: string;
  setDistrict: (s: string) => void;
}

export const SearchFilters = ({ query, setQuery, artForm, setArtForm, district, setDistrict }: Props) => {
  const [open, setOpen] = useState(false);
  const activeCount = (artForm !== "all" ? 1 : 0) + (district !== "all" ? 1 : 0);

  return (
    <div className="bg-gradient-card rounded-2xl p-3 md:p-5 shadow-warm border border-border/60 -mt-10 relative z-10">
      <div className="flex gap-2 md:grid md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search troupe or leader…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 bg-background border-border rounded-xl"
          />
        </div>

        {/* Mobile: filter sheet trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="md:hidden h-12 px-4 rounded-xl bg-background relative shrink-0"
              aria-label="Open filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {activeCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center">
                  {activeCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl pb-[env(safe-area-inset-bottom)] max-h-[85vh]">
            <SheetHeader className="text-left">
              <SheetTitle className="font-display text-2xl">Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-5">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Art form</label>
                <Select value={artForm} onValueChange={setArtForm}>
                  <SelectTrigger className="h-12 bg-background mt-2 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All art forms</SelectItem>
                    {ART_FORMS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">District</label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger className="h-12 bg-background mt-2 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All districts</SelectItem>
                    {DISTRICTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                  onClick={() => { setArtForm("all"); setDistrict("all"); }}
                >
                  <X className="w-4 h-4" /> Clear
                </Button>
                <Button variant="festival" className="flex-1 h-12 rounded-xl" onClick={() => setOpen(false)}>
                  Show results
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop selects */}
        <Select value={artForm} onValueChange={setArtForm}>
          <SelectTrigger className="hidden md:flex h-12 bg-background"><SelectValue placeholder="All art forms" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All art forms</SelectItem>
            {ART_FORMS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={district} onValueChange={setDistrict}>
          <SelectTrigger className="hidden md:flex h-12 bg-background"><SelectValue placeholder="All districts" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All districts</SelectItem>
            {DISTRICTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Active filter chips (mobile) */}
      {activeCount > 0 && (
        <div className="flex gap-2 mt-3 md:hidden flex-wrap">
          {artForm !== "all" && (
            <button onClick={() => setArtForm("all")} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {artForm} <X className="w-3 h-3" />
            </button>
          )}
          {district !== "all" && (
            <button onClick={() => setDistrict("all")} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {district} <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
