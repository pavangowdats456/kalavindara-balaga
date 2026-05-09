import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  LogOut,
  Pencil,
  Eye,
  MessageCircle,
  Calendar,
  IndianRupee,
  TrendingUp,
  Star,
  MapPin,
  Award,
  Users,
  Phone,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  BadgeCheck,
  Drum,
  User,
  Share2,
  ImagePlus,
  X,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ArtistProfile {
  photo: string | null;
  name: string;
  ledBy: string;
  category: string;
  city: string;
  state: string;
  phone: string;
  bio: string;
  media: string[];
  performanceTypes: string[];
  teamSize: string;
  groupCount: string;
  experience: string;
  pricing: string;
  availability: string;
}

// Mock dashboard data — would come from backend later
const insights = [
  { label: "Profile views", value: 248, delta: "+18%", icon: Eye, tone: "text-primary" },
  { label: "Inquiries", value: 12, delta: "+4 this week", icon: MessageCircle, tone: "text-secondary" },
  { label: "Bookings", value: 3, delta: "2 confirmed", icon: Calendar, tone: "text-emerald-600" },
  { label: "Earnings", value: "₹45k", delta: "this month", icon: IndianRupee, tone: "text-amber-600" },
];

const inquiries = [
  {
    id: 1,
    name: "Ananya Rao",
    event: "Wedding Sangeet",
    date: "12 Dec 2025",
    location: "Mysuru",
    status: "new",
  },
  {
    id: 2,
    name: "Dasara Committee",
    event: "Festival Performance",
    date: "20 Oct 2025",
    location: "Bengaluru",
    status: "replied",
  },
  {
    id: 3,
    name: "Suresh Patil",
    event: "Temple Event",
    date: "5 Nov 2025",
    location: "Hubli",
    status: "new",
  },
];

const weekly = [22, 35, 28, 48, 41, 60, 52];

const ArtistHome = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ArtistProfile | null>(null);
  const [eventPhotos, setEventPhotos] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kb_artist_profile");
      if (raw) setProfile(JSON.parse(raw));
      else navigate("/artist-app", { replace: true });
    } catch {
      navigate("/artist-app", { replace: true });
    }
    try {
      const ph = localStorage.getItem("kb_artist_event_photos");
      if (ph) setEventPhotos(JSON.parse(ph));
    } catch {
      // ignore
    }
  }, [navigate]);

  if (!profile) return null;

  const max = Math.max(...weekly);
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const persistPhotos = (next: string[]) => {
    setEventPhotos(next);
    try {
      localStorage.setItem("kb_artist_event_photos", JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  };

  const handleAddPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    Promise.all(
      files.map(
        (f) =>
          new Promise<string>((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(String(r.result));
            r.onerror = reject;
            r.readAsDataURL(f);
          })
      )
    ).then((urls) => persistPhotos([...urls, ...eventPhotos]));
    e.target.value = "";
  };

  const removePhoto = (idx: number) =>
    persistPhotos(eventPhotos.filter((_, i) => i !== idx));

  const logout = () => {
    localStorage.removeItem("kb_role");
    localStorage.removeItem("kb_authed");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-muted/30 pt-[env(safe-area-inset-top)] pb-10">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-festival grid place-items-center">
              <Drum className="w-4 h-4 text-primary-foreground" strokeWidth={2.4} />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-sm">Artist Studio</div>
              <div className="text-[10px] text-muted-foreground -mt-0.5">Dashboard</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              aria-label="Notifications"
              className="relative w-9 h-9 grid place-items-center rounded-full hover:bg-muted"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
            </button>
            <button
              aria-label="Logout"
              onClick={logout}
              className="w-9 h-9 grid place-items-center rounded-full hover:bg-muted"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* Insights grid */}
        <div>
          <SectionTitle icon={TrendingUp} title="Insights" hint="Last 30 days" />
          <div className="grid grid-cols-2 gap-3 mt-2">
            {insights.map((s) => (
              <Card key={s.label} className="shadow-soft">
                <CardContent className="p-4">
                  <div className={`w-9 h-9 rounded-lg bg-muted grid place-items-center ${s.tone}`}>
                    <s.icon className="w-4 h-4" />
                  </div>
                  <div className="font-display text-2xl font-bold mt-3">{s.value}</div>
                  <div className="text-[11px] text-muted-foreground">{s.label}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1 inline-flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    {s.delta}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Profile views chart */}
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-display">Profile views this week</CardTitle>
              <span className="text-[11px] text-muted-foreground">7 days</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-28 gap-2">
              {weekly.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-primary to-secondary"
                    style={{ height: `${(v / max) * 100}%`, minHeight: 4 }}
                  />
                  <span className="text-[10px] text-muted-foreground">{days[i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inquiries */}
        <div>
          <SectionTitle icon={MessageCircle} title="Recent inquiries" hint={`${inquiries.length} new`} />
          <div className="mt-2 space-y-2">
            {inquiries.map((q) => (
              <Card key={q.id} className="shadow-soft">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary grid place-items-center font-semibold shrink-0">
                    {q.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-sm truncate">{q.name}</div>
                      {q.status === "new" ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                          NEW
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-semibold inline-flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> REPLIED
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{q.event}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 inline-flex items-center gap-2">
                      <span className="inline-flex items-center gap-0.5">
                        <Clock className="w-3 h-3" /> {q.date}
                      </span>
                      <span className="inline-flex items-center gap-0.5">
                        <MapPin className="w-3 h-3" /> {q.location}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="shrink-0">
                    <Phone className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Profession info */}
        <div>
          <SectionTitle icon={Award} title="Profession" />
          <Card className="shadow-soft mt-2">
            <CardContent className="p-4 space-y-3">
              <InfoRow icon={Award} label="Category" value={profile.category} />
              <InfoRow
                icon={Users}
                label="Team"
                value={
                  profile.teamSize === "Group"
                    ? `Group · ${profile.groupCount || "—"} members`
                    : profile.teamSize || "—"
                }
              />
              <InfoRow
                icon={Star}
                label="Experience"
                value={profile.experience ? `${profile.experience} years` : "—"}
              />
              <InfoRow
                icon={IndianRupee}
                label="Starting price"
                value={profile.pricing ? `₹${profile.pricing}` : "—"}
              />
              <InfoRow
                icon={MapPin}
                label="Location"
                value={`${profile.city}, ${profile.state}`}
              />
              <InfoRow
                icon={Calendar}
                label="Availability"
                value={profile.availability || "Not specified"}
              />
              {profile.performanceTypes?.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Performs at
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.performanceTypes.map((p) => (
                      <span
                        key={p}
                        className="text-xs px-2.5 py-1 rounded-full bg-secondary/15 text-secondary-foreground border border-secondary/20"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({
  icon: Icon,
  title,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  hint?: string;
}) => (
  <div className="flex items-center justify-between px-1">
    <div className="inline-flex items-center gap-2">
      <Icon className="w-4 h-4 text-primary" />
      <h2 className="font-display font-bold text-sm">{title}</h2>
    </div>
    {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
  </div>
);

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-muted grid place-items-center shrink-0">
      <Icon className="w-4 h-4 text-muted-foreground" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  </div>
);

export default ArtistHome;
