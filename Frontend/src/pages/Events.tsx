import { useState, useRef } from "react";
import { 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Check, 
  RotateCcw, 
  HelpCircle, 
  Laugh, 
  Gamepad2, 
  Swords, 
  Bot, 
  Terminal, 
  Palette, 
  Building2, 
  Wrench, 
  Layers, 
  Bike, 
  Recycle, 
  ExternalLink, 
  Mail,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Rows 
} from "lucide-react";
import { FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { registerEngineersDayParticipant } from "@/services/api";

export interface EventItem {
  id: string;
  name: string;
  icon: any;
  tagline: string;
  description: string;
  accent: string;
  border: string;
}

export const eventsList: EventItem[] = [
  {
    id: "quiz",
    name: "Quiz",
    icon: HelpCircle,
    tagline: "High-voltage Engineering & Logic Trivia",
    description: "Rapid buzzer rounds, technical mind-benders, engineering history, and logical deduction challenge.",
    accent: "from-blue-500 to-cyan-500",
    border: "border-blue-500/30",
  },
  {
    id: "3-wheel",
    name: "3-Wheel Challenge",
    icon: Bike,
    tagline: "Dynamic Handling & Trike Racing Arena",
    description: "Navigate high-stakes maneuver tracks, obstacle agility, and vehicle stability in a thrill-filled competition.",
    accent: "from-amber-500 to-orange-500",
    border: "border-amber-500/30",
  },
  {
    id: "meme-making",
    name: "Meme Making",
    icon: Laugh,
    tagline: "Tech Humor & Engineering Satire",
    description: "Craft hilarious, relatable memes on student life, coding bugs, deadlines, and engineering reality.",
    accent: "from-pink-500 to-rose-500",
    border: "border-pink-500/30",
  },
  {
    id: "minecraft-codm",
    name: "Minecraft / CODM",
    icon: Gamepad2,
    tagline: "Sandbox Architecture & Tactical Shootout",
    description: "Show off creative speed-building in Minecraft, or squad up for high-intensity gunplay in Call of Duty Mobile.",
    accent: "from-emerald-500 to-teal-500",
    border: "border-emerald-500/30",
  },
  {
    id: "bgmi",
    name: "BGMI Tournament",
    icon: Swords,
    tagline: "Battlegrounds Mobile India Esports",
    description: "Drop into the battleground, survive the shrinking zones, outmaneuver rivals, and claim the Chicken Dinner.",
    accent: "from-red-500 to-orange-600",
    border: "border-red-500/30",
  },
  {
    id: "ai-imposter",
    name: "AI Imposter",
    icon: Bot,
    tagline: "Spot The Synthetic Intruder Challenge",
    description: "Can you distinguish between human craftsmanship and AI generation? Test your discernment against tricky bots.",
    accent: "from-violet-500 to-purple-600",
    border: "border-violet-500/30",
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    icon: Terminal,
    tagline: "LLM Orchestration & Generative Masterclass",
    description: "Engineer precise prompts to jailbreak challenges, solve complex algorithmic riddles, and generate exact outputs.",
    accent: "from-cyan-400 to-blue-600",
    border: "border-cyan-500/30",
  },
  {
    id: "poster-making",
    name: "Poster Making",
    icon: Palette,
    tagline: "Visual Storytelling & Engineering Visions",
    description: "Design inspiring digital or hand-drawn posters expressing the future of green tech, space, and smart cities.",
    accent: "from-yellow-400 to-amber-500",
    border: "border-yellow-500/30",
  },
  {
    id: "autocad-civil",
    name: "AutoCAD (Civil)",
    icon: Building2,
    tagline: "Architectural Drafting & Structural Plans",
    description: "Draft 2D floor plans, elevations, and structural drawings with precision dimensioning under time constraints.",
    accent: "from-sky-400 to-indigo-500",
    border: "border-sky-500/30",
  },
  {
    id: "autocad-mechanical",
    name: "AutoCAD (Mechanical)",
    icon: Wrench,
    tagline: "Machine Components & 2D/3D Modeling",
    description: "Draft mechanical assemblies, machine parts, sectional projections, and detailed orthographic tolerances.",
    accent: "from-orange-500 to-amber-600",
    border: "border-orange-500/30",
  },
  {
    id: "bridge-making",
    name: "Bridge Making",
    icon: Layers,
    tagline: "Truss Strength & Structural Load Challenge",
    description: "Construct an efficient load-bearing bridge using standard sticks and adhesives, tested to maximum physical failure weight.",
    accent: "from-teal-400 to-emerald-600",
    border: "border-teal-500/30",
  },
  {
    id: "best-out-of-waste",
    name: "Best Out of Waste",
    icon: Recycle,
    tagline: "Upcycling & Sustainable Mechanical Engineering",
    description: "Transform industrial scrap, discarded components, and waste materials into creative working mechanisms or structural prototypes.",
    accent: "from-lime-400 to-emerald-600",
    border: "border-lime-500/30",
  },
];

const socialMediaLinks = [
  {
    name: "Instagram",
    handle: "@tech.versectu",
    url: "https://www.instagram.com/tech.versectu/",
    icon: FaInstagram,
    btnColor: "bg-gradient-to-r from-pink-500 to-rose-600 text-white",
  },
  {
    name: "WhatsApp Community",
    handle: "Official Chat Group",
    url: "https://chat.whatsapp.com/IiClyLPXlooJZWlJ66CnlN?mode=wwt",
    icon: FaWhatsapp,
    btnColor: "bg-gradient-to-r from-emerald-500 to-green-600 text-white",
  },
  {
    name: "LinkedIn",
    handle: "TechVerse Club CTU",
    url: "https://www.linkedin.com/company/techverse-club-ct-university/",
    icon: FaLinkedin,
    btnColor: "bg-gradient-to-r from-blue-600 to-sky-600 text-white",
  },
  {
    name: "Email Support",
    handle: "techverse@ctuniversity.in",
    url: "mailto:techverse@ctuniversity.in",
    icon: Mail,
    btnColor: "bg-gradient-to-r from-slate-700 to-slate-800 text-white border border-white/10",
  },
];

const EngineersDay = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Form states: Name, Course, Reg no., contact no., competition dropdown
  const [selectedEventId, setSelectedEventId] = useState<string>("quiz");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [regNo, setRegNo] = useState("");
  const [contactNo, setContactNo] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const currentSelectedEvent = eventsList.find((e) => e.id === selectedEventId) || eventsList[0];

  const handlePickEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    const event = eventsList.find((e) => e.id === eventId);
    toast.info(`Selected: ${event?.name}`);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !course.trim() || !regNo.trim() || !contactNo.trim()) {
      toast.error("Please fill in all fields (Name, Course, Reg no., Contact no.).");
      return;
    }

    const cleanedContact = contactNo.trim().replace(/[\s-]/g, "");
    if (cleanedContact.length !== 10 || !/^\d{10}$/.test(cleanedContact)) {
      toast.error("Contact number must be exactly 10 digits (no more, no less)!");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      course: course.trim(),
      regNo: regNo.trim(),
      contactNo: cleanedContact,
      competition: currentSelectedEvent.name,
      eventSlug: currentSelectedEvent.id,
    };

    try {
      const response = await registerEngineersDayParticipant(payload);
      setIsSuccess(true);
      setSubmittedData({
        ...payload,
        id: response?.data?._id || `ED26-${Math.floor(1000 + Math.random() * 9000)}`,
        collection: response?.collection || currentSelectedEvent.id,
        registeredAt: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      toast.success(`Registered for ${currentSelectedEvent.name} successfully! Saved in collection '${response?.collection}'.`);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to submit registration. Please check your network or try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForAnother = () => {
    setIsSuccess(false);
    // Keep user's details for fast registration into another event
    toast.info("Select another competition to register!");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#040711] text-white pt-20 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Matrix Ambient Grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(147,51,234,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono tracking-wide mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>TechVerse Flagship • National Engineers' Day 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping ml-1" />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] mb-5">
          <span className="block text-white font-space">
            ENGINEERS' DAY
          </span>
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(59,130,246,0.5)] font-space">
            12 COMPETITIONS
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300/90 font-sans leading-relaxed mb-8">
          Participate in 12 exciting competitions across tech, gaming, design, and core engineering. Free entry for all students!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto mb-10 text-xs sm:text-sm font-mono text-slate-300">
          <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Sept 15, 2026</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>CT University, Punjab</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span>Certificates & Awards</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>12 Contests</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 text-base"
          >
            Register for Competition <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* 12 COMPETITIONS COMPACT EXPLORER */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold font-space text-white">
                12 Official Competitions
              </h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Click any event below to select it in the registration form.
            </p>
          </div>

          {/* View Toggle: Compact Grid vs Detailed List */}
          <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs self-start sm:self-auto shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-cyan-500 text-black font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Compact Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "list"
                  ? "bg-cyan-500 text-black font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Rows className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: COMPACT GRID (Default - 4 cols, low height, super clean) */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {eventsList.map((item, idx) => {
              const IconComponent = item.icon;
              const isSelected = selectedEventId === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handlePickEvent(item.id)}
                  className={`group relative text-left p-3.5 rounded-2xl border transition-all duration-200 overflow-hidden flex items-start gap-3 hover:-translate-y-0.5 ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)] text-white ring-1 ring-cyan-400"
                      : "bg-[#090d1c]/90 border-white/10 text-slate-300 hover:border-cyan-500/40 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-xl border flex-shrink-0 transition-colors ${
                      isSelected
                        ? "bg-cyan-500 text-black border-cyan-400 font-bold"
                        : "bg-white/5 border-white/10 text-cyan-400 group-hover:bg-cyan-500/20"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-xs font-bold truncate text-white group-hover:text-cyan-300">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400/70 font-bold flex-shrink-0">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 leading-snug line-clamp-1">
                      {item.tagline}
                    </div>
                  </div>

                  {isSelected && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          /* VIEW 2: DETAILED LIST (Sleek rows with full description) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {eventsList.map((item, idx) => {
              const IconComponent = item.icon;
              const isSelected = selectedEventId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handlePickEvent(item.id)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] text-white ring-1 ring-cyan-400"
                      : "bg-[#090d1c]/90 border-white/10 text-slate-300 hover:border-cyan-500/30 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="text-xs font-mono text-cyan-400 font-bold flex-shrink-0">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={`p-2.5 rounded-xl border flex-shrink-0 ${
                        isSelected
                          ? "bg-cyan-500 text-black border-cyan-400"
                          : "bg-white/5 border-white/10 text-cyan-400"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white truncate">{item.name}</div>
                      <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.description}</div>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium flex-shrink-0 transition-all ${
                      isSelected
                        ? "bg-cyan-500 text-black font-semibold shadow-sm"
                        : "bg-white/5 text-slate-300 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    {isSelected ? "✓ Selected" : "Select"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* REGISTRATION FORM SECTION */}
      <section ref={formRef} id="register-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        {!isSuccess ? (
          /* FORM VIEW */
          <div>
            <div className="text-center max-w-xl mx-auto mb-8">
              <Badge className="bg-purple-500/10 text-purple-300 border-purple-500/30 px-3 py-1 mb-3 text-xs font-mono uppercase tracking-widest">
                Registration Form
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-space text-white">
                Register for Event
              </h2>
              <p className="text-slate-400 mt-2 text-sm">
                Fill in your details below to register for the selected competition.
              </p>
            </div>

            {/* Clean Form Card */}
            <div className="relative rounded-3xl bg-[#090d1c]/90 border border-cyan-500/30 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-[90px] pointer-events-none" />

              <form onSubmit={handleFormSubmit} className="relative z-10 space-y-5">
                {/* 1. Competition Dropdown (ONLY Event Names) */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2 font-semibold">
                    Competition *
                  </label>
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0c1326] border border-cyan-500/40 text-white text-sm font-medium focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    {eventsList.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Name */}
                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>

                {/* 3. Course */}
                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">Course *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. B.Tech CSE, BCA, B.Tech Mech, B.Tech Civil..."
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>

                {/* 4. Reg no. & Contact no. */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">Reg no. *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CTU/2023/1084"
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">Contact no. (10 digits) *</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="e.g. 9876543210"
                      value={contactNo}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "");
                        if (digits.length <= 10) {
                          setContactNo(digits);
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-all font-mono tracking-wider"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-3">
                  <Button
                    type="submit"
                    disabled={true}
                    className="w-full py-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving into MongoDB...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Confirm Registration for {currentSelectedEvent.name} <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* THANK YOU VIEW */
          <div className="animate-fade-in text-center max-w-2xl mx-auto">
            <div className="rounded-3xl bg-[#090d1c]/95 border border-cyan-400/40 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_0_60px_rgba(6,182,212,0.3)]">
              {/* Glowing Success Badge Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-bounce-slow">
                <CheckCircle2 className="w-10 h-10 text-cyan-400" />
              </div>

              {/* Thank You Message */}
              <h2 className="text-3xl sm:text-4xl font-black font-space text-white mb-3">
                Thank You for Registering! 🎉
              </h2>
              <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-lg mx-auto">
                Your entry for <strong className="text-cyan-400 font-bold">{submittedData?.competition}</strong> has been successfully submitted!
              </p>

              {/* SOCIAL MEDIA SECTION */}
              <div className="mb-8">
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 font-semibold">
                  Connect With TechVerse for Schedules, Rules & Announcements:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {socialMediaLinks.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-3.5 rounded-xl border border-white/10 transition-all duration-300 hover:scale-[1.02] ${item.btnColor}`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <div className="text-left overflow-hidden">
                          <div className="font-bold text-xs leading-tight">{item.name}</div>
                          <div className="text-[11px] opacity-90 truncate">{item.handle}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 ml-auto opacity-75" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* SUBMIT ANOTHER ENTRY BUTTON */}
              <div className="pt-2 border-t border-white/10">
                <Button
                  onClick={handleResetForAnother}
                  size="lg"
                  className="w-full py-6 rounded-xl bg-white hover:bg-slate-200 text-black font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Submit Another Entry / Register for Another Event
                </Button>
                <p className="text-slate-500 text-xs mt-2">
                  Want to participate in more than one competition? Click above to register for another event!
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default EngineersDay;
