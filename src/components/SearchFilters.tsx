import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  return (
    <div className="bg-gradient-card rounded-2xl p-4 md:p-5 shadow-warm border border-border/60 -mt-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search troupe or leader name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 bg-background border-border"
          />
        </div>
        <Select value={artForm} onValueChange={setArtForm}>
          <SelectTrigger className="h-12 bg-background"><SelectValue placeholder="All art forms" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All art forms</SelectItem>
            {ART_FORMS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={district} onValueChange={setDistrict}>
          <SelectTrigger className="h-12 bg-background"><SelectValue placeholder="All districts" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All districts</SelectItem>
            {DISTRICTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
