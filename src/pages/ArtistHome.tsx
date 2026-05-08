import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Settings,
  Share2,
  Grid3x3,
  Play,
  Calendar,
  MessageCircle,
  Bell,
  BadgeCheck,
  MapPin,
  IndianRupee,
  Plus,
  Pencil,
  BarChart3,
  Bookmark,
  Drum,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

const ArtistHome = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ArtistProfile | null>(null);
  const [tab, setTab] = useState("posts");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kb_artist_profile");
      if (raw) setProfile(JSON.parse(raw));
      else navigate("/artist-app", { replace: true });
    } catch {
      navigate("/artist-app", { replace: true });
    }
  }, [navigate]);

  if (!profile) return null;

  const posts = profile.media ?? [];
  const stats = [
    { label: "Posts", value: posts.length },
    { label: "Bookings", value: 0 },
    { label: "Followers", value: 0 },
  ];

  return (
    <div className="min-h-screen bg-background pt-[env(safe-area-inset-top)] pb-24">
      {/* Top bar — IG style */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate("/")}
            aria-label="Back"
            className="w-9 h-9 grid place-items-center rounded-full hover:bg-muted"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 font-display font-bold text-base">
            <Drum className="w-4 h-4 text-primary" strokeWidth={2.4} />
            <span className="truncate max-w-[180px]">@{profile.name.toLowerCase().replace(/\s+/g, "_")}</span>
            <BadgeCheck className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-center gap-1">
            <button aria-label="Notifications" className="w-9 h-9 grid place-items-center rounded-full hover:bg-muted">
              <Bell className="w-5 h-5" />
            </button>
            <button
              aria-label="Switch account"
              onClick={() => {
                localStorage.removeItem("kb_role");
                localStorage.removeItem("kb_authed");
                navigate("/login", { replace: true });
              }}
              className="w-9 h-9 grid place-items-center rounded-full hover:bg-muted"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Profile header */}
      <section className="px-5 pt-5">
        <div className="flex items-center gap-5">
          {/* Avatar with story ring */}
          <div className="relative shrink-0">
            <div className="p-[3px] rounded-full bg-gradient-festival">
              <div className="w-20 h-20 rounded-full bg-background p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden bg-muted grid place-items-center">
                  {profile.photo ? (
                    <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-background shadow-[0_0_10px_hsl(142_76%_45%/0.9)] animate-pulse" />
          </div>

          {/* Stats */}
          <div className="flex-1 grid grid-cols-3 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-lg font-bold">{s.value}</div>
                <div className="text-[11px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Name + bio */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-lg font-bold">{profile.name}</h1>
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
              {profile.category}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">Led by {profile.ledBy}</div>
          <p className="text-sm mt-2 leading-relaxed whitespace-pre-line">{profile.bio}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {profile.city}, {profile.state}
            </span>
            <span className="inline-flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5" /> from ₹{profile.pricing || "—"}
            </span>
            {profile.experience && <span>· {profile.experience} yrs experience</span>}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Button variant="secondary" size="sm" className="font-semibold" onClick={() => navigate("/artist-app")}>
            <Pencil className="w-3.5 h-3.5" /> Edit
          </Button>
          <Button variant="secondary" size="sm" className="font-semibold">
            <Share2 className="w-3.5 h-3.5" /> Share
          </Button>
          <Button variant="festival" size="sm" className="font-semibold">
            <Plus className="w-3.5 h-3.5" /> Post
          </Button>
        </div>

        {/* Quick add-on features */}
        <div className="mt-5 grid grid-cols-4 gap-2">
          {[
            { icon: Calendar, label: "Calendar" },
            { icon: MessageCircle, label: "Inquiries" },
            { icon: BarChart3, label: "Insights" },
            { icon: Bookmark, label: "Saved" },
          ].map((it) => (
            <button
              key={it.label}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-muted/60 hover:bg-muted transition-colors"
            >
              <it.icon className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-medium">{it.label}</span>
            </button>
          ))}
        </div>

        {/* Performance type chips */}
        {profile.performanceTypes?.length > 0 && (
          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2">
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
      </section>

      {/* Tabs */}
      <section className="mt-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full bg-transparent border-y border-border rounded-none h-12 p-0">
            <TabsTrigger
              value="posts"
              className="flex-1 h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              <Grid3x3 className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="reels"
              className="flex-1 h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              <Play className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="flex-1 h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              <Calendar className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-0">
            {posts.length === 0 ? (
              <EmptyState label="No posts yet. Share your first performance." />
            ) : (
              <div className="grid grid-cols-3 gap-[2px]">
                {posts.map((src, i) => (
                  <div key={i} className="aspect-square bg-muted overflow-hidden">
                    <img src={src} alt={`post-${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reels" className="mt-0">
            <EmptyState label="Upload short reels to attract more bookings." />
          </TabsContent>

          <TabsContent value="bookings" className="mt-0">
            <div className="px-5 py-8 text-center">
              <Calendar className="w-10 h-10 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">No bookings yet.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Availability: {profile.availability || "Add your availability"}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Floating Add post */}
      <Link
        to="/artist-app"
        aria-label="Add post"
        className="fixed bottom-6 right-5 w-14 h-14 rounded-full bg-gradient-festival text-primary-foreground grid place-items-center shadow-warm active:scale-95 transition-transform z-50"
      >
        <Plus className="w-6 h-6" strokeWidth={2.6} />
      </Link>
    </div>
  );
};

const EmptyState = ({ label }: { label: string }) => (
  <div className="px-5 py-10 text-center text-sm text-muted-foreground">{label}</div>
);

export default ArtistHome;
