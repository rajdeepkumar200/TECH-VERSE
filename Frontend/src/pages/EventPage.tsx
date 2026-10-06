import { Button } from "@/components/ui/button";
import { useState } from "react";
import {Mail,MapPin, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Code, Trophy, Users, Sparkles } from "lucide-react";
import TechverseLogo from "@/assets/techverse-logo.jpg";
import EventCard from "@/components/ui/EventCard";
import UniversityLogo from "@/assets/univeee-logo.png";
import SoetLogo from "@/assets/soet-logo.png";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import { EnquiryFormDialog } from "@/components/EnquiryFormDialog";
import { Code2, Cpu, Database, Globe, Binary } from "lucide-react";
import { FloatingSocials } from "@/components/FloatingSocials";
import { FeatureCard } from "@/components/FeatureCard";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);
    const navigate = useNavigate();

  const stats = [
    { label: "Participants", value: "500+", icon: Users },
    { label: "Projects", value: "100+", icon: Code },
    { label: "Prize Pool", value: "₹50K+", icon: Trophy },
    { label: "Mentors", value: "20+", icon: Zap },
  ];

 const events = [
  {
    title: "CODE CRAFTER VERSION 3.0",
    description: "A competitive coding challenge for developers.",
    date: "21 April 2025",
    location: "CT University, Punjab",
    status: "ended" as const,
    icon: Code,
    registrationPath: "/events/codecrafter",

  },
  {
    title: "Engineers Day",
    description: "Participate in 12 exciting competitions across tech, gaming, design, and core engineering. Free entry for all students!",
    date: "Sept 15, 2026",
    location: "CT University, Punjab",
    status: "ended" as const,
    icon: Trophy,
    registrationPath: "/events/EngineersDay",
  },
//   ended/ongoing/upcoming
  
];
  return (
    <div className="min-h-screen relative">
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
  {/* Animated Tech Background */}
  <div className="absolute inset-0 overflow-hidden">
    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

    {/* Glowing Circuit Lines */}
    <div className="absolute top-20 left-10 w-36 h-36 md:w-72 md:h-72 border-2 border-cyan-400/30 rounded-lg animate-[spin_20s_linear_infinite] shadow-[0_0_50px_rgba(34,211,238,0.3)]">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
    </div>
    <div className="absolute top-1/3 md:top-40 right-20 w-32 h-32 md:w-64 md:h-64 border-2 border-blue-400/30 rounded-full animate-[spin_15s_linear_infinite_reverse] shadow-[0_0_50px_rgba(59,130,246,0.3)]">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
    </div>
    <div className="absolute bottom-20 left-1/4 w-40 h-40 md:w-80 md:h-80 border-2 border-purple-400/30 rounded-lg animate-[spin_25s_linear_infinite] shadow-[0_0_50px_rgba(168,85,247,0.3)]">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
      <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent"></div>
    </div>

    
    <div className="absolute top-32 right-10 md:right-1/4 animate-[bounce_3s_ease-in-out_infinite]">
      <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl border border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
        <Code2 className="w-8 h-8 text-cyan-400" />
      </div>
    </div>
    <div className="absolute bottom-40 right-10 md:right-1/3 animate-[bounce_4s_ease-in-out_infinite_1s]">
      <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-purple-400/30 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
        <Cpu className="w-8 h-8 text-purple-400" />
      </div>
    </div>
    <div className="absolute top-1/2 left-10 md:left-20 animate-[bounce_3.5s_ease-in-out_infinite_0.5s]">
      <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl border border-blue-400/30 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
        <Database className="w-8 h-8 text-blue-400" />
      </div>
    </div>
    <div className="absolute top-1/4 right-1/2 animate-[bounce_3.8s_ease-in-out_infinite_0.3s]">
      <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm rounded-lg border border-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
        <Globe className="w-6 h-6 text-emerald-400" />
      </div>
    </div>
    <div className="absolute bottom-1/4 left-1/3 animate-[bounce_4.2s_ease-in-out_infinite_0.8s]">
      <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full border border-yellow-400/30 shadow-[0_0_30px_rgba(234,179,8,0.4)]">
        <Zap className="w-6 h-6 text-yellow-400" />
      </div>
    </div>

    {/* Glowing Particles */}
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      ></div>
    ))}

    {/* Binary Rain Effect */}
    <div className="absolute top-0 left-1/4 text-cyan-400/20 font-mono text-xs animate-[slideDown_10s_linear_infinite]">
      <Binary className="w-4 h-4" />
    </div>
    <div className="absolute top-0 right-1/3 text-blue-400/20 font-mono text-xs animate-[slideDown_12s_linear_infinite]">
      <Binary className="w-4 h-4" />
    </div>

    {/* Large Glow Effects */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]"></div>
  </div>

{/* ✅ CENTERED CONTENT */}
<div className="relative z-10 flex flex-col items-center justify-center text-center px-6 space-y-10 pt-32 pb-20">
  {/* Edition Badge */}
  

  {/* Title */}
  <h1 className="text-6xl md:text-8xl font-bold font-space bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(147,51,234,0.6)] leading-[1.15] mt-8">
    New event in process stay tuned
  </h1>

  
 

  {/* Buttons */}
  <div className="flex flex-wrap gap-6 justify-center mt-19">
    <Button
      onClick={() => setIsDialogOpen(true)}
      size="lg"
      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-10 py-6 text-lg shadow-lg shadow-secondary/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all duration-300 rounded-xl"
    >
      Join now
    </Button>
    <Button
      size="lg"
      variant="outline"
      className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-10 py-6 text-lg backdrop-blur-sm hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-300 rounded-xl"
    >
      <Link to="/about">About us</Link>
    </Button>
    
    
    
  </div>

</div>
  {/* Moving Announcement Line */}
  <div className="absolute bottom-5 w-full overflow-hidden cursor-default" onClick={() => navigate("/codecrafter")}>
    <div className="flex items-center gap-4 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-full shadow-2xl">
      <div className="flex-shrink-0 z-10 pl-2">
        <span className="text-blue-400 font-bold text-sm md:text-base tracking-wide animate-pulse inline-block">
          🔔 TechVerse Updates:
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden flex mask-fade-edges">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {/* Two identical groups for a seamless continuous 360 scroll */}
          {[0, 1].map((blockIdx) => (
            <div key={blockIdx} className="flex gap-48 pr-48" aria-hidden={blockIdx === 1}>
              {/* Mapping to prevent writing the same span multiple times in source */}
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-blue-300 font-semibold text-sm md:text-base whitespace-nowrap">
                  Techverse hiring in progress
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .animate-marquee {
        animation: marquee 25s linear infinite;
        will-change: transform;
      }

      .mask-fade-edges {
        -webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
        mask-image: linear-gradient(to right, transparent, black 2%, black 98% , transparent);
      }
    `}</style>

</section>


      {/* { MY TECHVERSE } */}
      

      {/* ✅ FEATURES SECTION */}
      <section className="container mx-auto px-4 py-20 ">
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-12 mt-6 tracking-tight leading-tight drop-shadow-lg bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
  {events.map((event, index) => (
    <EventCard key={index} event={event} />
  ))}
</div>
      </section>

      {/* ✅ CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-500 to-cyan-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Build the Future?
            </h2>
            <p className="text-xl text-white/90">
              Don't miss this opportunity to showcase your skills, learn from
              the best, and win amazing prizes!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 hover:scale-105 transition-transform"
                onClick={() => setIsDialogOpen(true)}
              >
                Apply for membership
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 hover:scale-105 transition-transform"
                onClick={() => setIsEnquiryFormOpen(true)}
              >
                Send an enquiry
              </Button>
            </div>
          </div>
        </div>
      </section>
       {/* Enquiry Dialog */}
      <EnquiryDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <EnquiryFormDialog open={isEnquiryFormOpen} onOpenChange={setIsEnquiryFormOpen} />
      <FloatingSocials />
    </div>
  );
};

export default EventPage;

