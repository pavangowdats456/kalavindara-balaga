import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drum,
  ArrowLeft,
  Camera,
  Upload,
  CheckCircle2,
  User,
  MapPin,
  Phone,
  Tag,
  FileText,
  Users,
  Award,
  IndianRupee,
  CalendarDays,
  ImagePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = [
  "Singer",
  "Band",
  "Folk Troupe",
  "Dance Troupe",
  "Instrumental",
  "Drama / Theatre",
  "Devotional",
  "Other",
];

const PERF_TYPES = ["Wedding", "Festival", "Corporate Event", "Temple / Religious", "Private Party"];

type Step = 1 | 2 | 3;

interface FormState {
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
  teamSize: "Solo" | "Group" | "";
  groupCount: string;
  experience: string;
  pricing: string;
  availability: string;
}

const initial: FormState = {
  photo: null,
  name: "",
  ledBy: "",
  category: "",
  city: "",
  state: "",
  phone: "",
  bio: "",
  media: [],
  performanceTypes: [],
  teamSize: "",
  groupCount: "",
  experience: "",
  pricing: "",
  availability: "",
};

const ArtistApp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(initial);
  const photoInput = useRef<HTMLInputElement>(null);
  const mediaInput = useRef<HTMLInputElement>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const togglePerfType = (t: string) => {
    update(
      "performanceTypes",
      form.performanceTypes.includes(t)
        ? form.performanceTypes.filter((x) => x !== t)
        : [...form.performanceTypes, t],
    );
  };

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Photo too large", description: "Max 5 MB." });
      return;
    }
    const url = URL.createObjectURL(file);
    update("photo", url);
  };

  const onMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const urls = files.slice(0, 8 - form.media.length).map((f) => URL.createObjectURL(f));
    update("media", [...form.media, ...urls]);
  };

  const validateStep1 = () => {
    if (!form.name.trim()) return "Please enter your artist / troupe name";
    if (!form.ledBy.trim()) return "Please enter the name of the person leading the troupe";
    if (!form.category) return "Select a category";
    if (!form.city.trim() || !form.state.trim()) return "Enter city and state";
    if (!/^\d{10}$/.test(form.phone)) return "Enter a valid 10-digit phone";
    if (form.bio.trim().length < 10) return "Bio should be a couple of lines";
    return null;
  };

  const next = () => {
    const err = validateStep1();
    if (err) {
      toast({ title: "Almost there", description: err });
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = () => {
    if (form.performanceTypes.length === 0)
      return toast({ title: "Pick performance types", description: "At least one." });
    if (!form.teamSize) return toast({ title: "Select team size" });
    if (!form.experience) return toast({ title: "Add years of experience" });
    if (!form.pricing) return toast({ title: "Add starting price" });

    // Persist locally for now
    localStorage.setItem("kb_artist_profile", JSON.stringify(form));
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pt-[env(safe-area-inset-top)]">
      {/* Header */}
      <div className="bg-gradient-festival text-primary-foreground px-6 pt-6 pb-10 rounded-b-[2.5rem] shadow-warm">
        <div className="flex items-center justify-between">
          <button
            onClick={() => (step === 1 ? navigate(-1) : setStep((step - 1) as Step))}
            className="w-10 h-10 rounded-full bg-background/20 grid place-items-center backdrop-blur-md border border-background/30"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Drum className="w-4 h-4" strokeWidth={2.4} />
            <span className="font-display font-bold">Artist Studio</span>
          </div>
          <div className="w-10" />
        </div>

        {step !== 3 && (
          <>
            <h1 className="font-display text-2xl font-bold mt-5">
              {step === 1 ? "Tell us about yourself" : "Showcase your work"}
            </h1>
            <p className="text-sm text-primary-foreground/85 mt-1">
              {step === 1
                ? "Step 1 of 2 · Basic details"
                : "Step 2 of 2 · Portfolio & booking"}
            </p>

            {/* Progress */}
            <div className="mt-4 flex gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-background/85" />
              <div
                className={`h-1.5 flex-1 rounded-full ${step === 2 ? "bg-background/85" : "bg-background/25"}`}
              />
            </div>
          </>
        )}
      </div>

      <div className="flex-1 px-5 -mt-4 pb-10">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="rounded-2xl bg-card border border-border p-5 shadow-soft space-y-5">
            {/* Photo */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => photoInput.current?.click()}
                className="relative w-24 h-24 rounded-full bg-muted grid place-items-center overflow-hidden border-2 border-dashed border-border"
              >
                {form.photo ? (
                  <img src={form.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-7 h-7 text-muted-foreground" />
                )}
                <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-warm">
                  <ImagePlus className="w-3.5 h-3.5" />
                </span>
              </button>
              <input
                ref={photoInput}
                type="file"
                accept="image/*"
                onChange={onPhoto}
                className="hidden"
              />
              <span className="text-xs text-muted-foreground mt-2">Tap to add profile photo</span>
            </div>

            <Field icon={<User className="w-4 h-4" />} label="Artist / Troupe name">
              <Input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Karnataka Janapada Troupe"
                maxLength={80}
              />
            </Field>

            <Field icon={<Tag className="w-4 h-4" />} label="Category">
              <Select value={form.category} onValueChange={(v) => update("category", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your art form" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field icon={<MapPin className="w-4 h-4" />} label="Location">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="City"
                  maxLength={50}
                />
                <Input
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  placeholder="State"
                  maxLength={50}
                />
              </div>
            </Field>

            <Field icon={<Phone className="w-4 h-4" />} label="Contact number">
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm">
                  +91
                </span>
                <Input
                  type="tel"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile"
                  className="rounded-l-none"
                />
              </div>
            </Field>

            <Field icon={<FileText className="w-4 h-4" />} label="Short bio">
              <Textarea
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                placeholder="2–3 lines about your art, style, and what makes your performance special."
                maxLength={300}
                rows={3}
              />
              <div className="text-[11px] text-muted-foreground text-right mt-1">
                {form.bio.length}/300
              </div>
            </Field>

            <Button variant="festival" size="lg" className="w-full" onClick={next}>
              Next ➡️
            </Button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="rounded-2xl bg-card border border-border p-5 shadow-soft space-y-5">
            {/* Media */}
            <div>
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Upload className="w-4 h-4 text-primary" /> Photos / Videos
              </Label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {form.media.map((src, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg overflow-hidden bg-muted relative group"
                  >
                    <img src={src} alt={`upload-${i}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() =>
                        update(
                          "media",
                          form.media.filter((_, idx) => idx !== i),
                        )
                      }
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-background/90 text-foreground text-[10px] font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {form.media.length < 8 && (
                  <button
                    onClick={() => mediaInput.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted/50 grid place-items-center text-muted-foreground"
                  >
                    <ImagePlus className="w-5 h-5" />
                  </button>
                )}
              </div>
              <input
                ref={mediaInput}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={onMedia}
                className="hidden"
              />
              <p className="text-[11px] text-muted-foreground mt-1.5">
                Up to 8 files · photos or short videos
              </p>
            </div>

            {/* Performance types */}
            <div>
              <Label className="text-sm font-semibold">Performance types</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {PERF_TYPES.map((t) => {
                  const checked = form.performanceTypes.includes(t);
                  return (
                    <label
                      key={t}
                      className={`flex items-center gap-2 rounded-lg border p-3 text-sm cursor-pointer transition-colors ${
                        checked
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background"
                      }`}
                    >
                      <Checkbox checked={checked} onCheckedChange={() => togglePerfType(t)} />
                      <span>{t}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Team size */}
            <Field icon={<Users className="w-4 h-4" />} label="Team size">
              <div className="grid grid-cols-2 gap-2">
                {(["Solo", "Group"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => update("teamSize", t)}
                    className={`rounded-lg border p-3 text-sm font-medium transition-colors ${
                      form.teamSize === t
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {form.teamSize === "Group" && (
                <Input
                  type="number"
                  min={2}
                  value={form.groupCount}
                  onChange={(e) => update("groupCount", e.target.value)}
                  placeholder="Number of members"
                  className="mt-2"
                />
              )}
            </Field>

            <Field icon={<Award className="w-4 h-4" />} label="Experience (years)">
              <Input
                type="number"
                min={0}
                max={70}
                value={form.experience}
                onChange={(e) => update("experience", e.target.value)}
                placeholder="e.g. 8"
              />
            </Field>

            <Field icon={<IndianRupee className="w-4 h-4" />} label="Pricing (starting ₹)">
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm">
                  ₹
                </span>
                <Input
                  type="number"
                  min={0}
                  value={form.pricing}
                  onChange={(e) => update("pricing", e.target.value)}
                  placeholder="e.g. 15000"
                  className="rounded-l-none"
                />
              </div>
            </Field>

            <Field icon={<CalendarDays className="w-4 h-4" />} label="Availability">
              <Textarea
                value={form.availability}
                onChange={(e) => update("availability", e.target.value)}
                placeholder="e.g. Weekends, Dec–Mar season, available on short notice"
                rows={2}
                maxLength={200}
              />
            </Field>

            <Button variant="festival" size="lg" className="w-full" onClick={submit}>
              ✅ Submit / Create profile
            </Button>
          </div>
        )}

        {/* STEP 3 - Success */}
        {step === 3 && (
          <div className="rounded-2xl bg-card border border-border p-8 shadow-soft text-center mt-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary grid place-items-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="font-display text-2xl font-bold mt-4">Profile created 🎉</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Your artist profile has been saved. Organisers will be able to discover and book you.
            </p>
            <div className="mt-6 space-y-2">
              <Button
                variant="festival"
                size="lg"
                className="w-full"
                onClick={() => {
                  setForm(initial);
                  setStep(1);
                }}
              >
                Edit profile
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Go to home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Field = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-semibold flex items-center gap-2">
      <span className="text-primary">{icon}</span>
      {label}
    </Label>
    {children}
  </div>
);

export default ArtistApp;
