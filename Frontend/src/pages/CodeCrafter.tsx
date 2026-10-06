import { useState, useRef, useEffect, useMemo } from "react";
import { BookOpen, CalendarHeart, Info, UserPlus, MapPin, Calendar, Trophy, Cpu, Zap, Target, ShieldAlert, Hexagon, Linkedin, Instagram, MessageCircle, Mail, Phone, Download } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import CountdownTimer from "../components/CountdownTimer";
import CodeCrafterWhyJoin from '../components/CodeCrafterWhyJoin';
import CodeCrafterMentors from '../components/CodeCrafterMentors';
import CodeCrafterPartners from '../components/CodeCrafterPartners';

// Mechanical Gear SVG for Transformers-style connectors
const MechanicalGear = ({ size = 40, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 10 L55 25 L65 15 L62 30 L75 25 L68 38 L82 38 L72 48 L85 52 L72 55 L82 62 L68 62 L75 75 L62 70 L65 85 L55 75 L50 90 L45 75 L35 85 L38 70 L25 75 L32 62 L18 62 L28 55 L15 52 L28 48 L18 38 L32 38 L25 25 L38 30 L35 15 L45 25 Z" />
    <circle cx="50" cy="50" r="15" fill="#03060d" />
    <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
  </svg>
);

// Mechanical connector between cards
const MechanicalConnector = ({ flip = false }: { flip?: boolean }) => (
  <div className={`hidden sm:flex items-center justify-center relative ${flip ? 'scale-x-[-1]' : ''}`} style={{ width: '60px', minWidth: '40px' }}>
    {/* Rotating Gears */}
    <div className="absolute">
      <MechanicalGear size={44} className="text-[#00F0FF]/40 animate-[gearSpin_4s_linear_infinite] drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]" />
    </div>
    <div className="absolute translate-x-[14px] translate-y-[-14px]">
      <MechanicalGear size={28} className="text-[#1A5BFF]/50 animate-[gearSpinReverse_3s_linear_infinite] drop-shadow-[0_0_6px_rgba(26,91,255,0.3)]" />
    </div>
    {/* Sparks */}
    {[...Array(3)].map((_, i) => (
      <div key={i} className="absolute w-[2px] h-[2px] bg-[#FFD54F] rounded-full animate-[sparkle_1.5s_ease-in-out_infinite]"
        style={{
          top: `${30 + i * 15}%`,
          left: `${20 + i * 25}%`,
          animationDelay: `${i * 0.4}s`
        }}
      />
    ))}
    {/* Connecting Rod */}
    <div className="absolute w-full h-[2px] bg-gradient-to-r from-[#00F0FF]/60 via-[#1A5BFF]/40 to-[#00F0FF]/60 animate-[rodPulse_2s_ease-in-out_infinite]" />
  </div>
);

const HexBadge = ({ title, value, icon, delay }: { title: string, value: string, icon: any, delay: number }) => {
  return (
    <div
      className="relative flex items-center flex-col sm:flex-row gap-1 sm:gap-4 bg-[#0a0f1a]/80 backdrop-blur-xl border border-white/10 group overflow-hidden transition-all duration-500 hover:scale-105 hover:border-[#00F0FF]/50 p-1.5 sm:p-4 md:p-6"
      style={{
        clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
        animation: `float-up 0.5s ease-out ${delay}s both`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      {/* Mechanical Plate Corners - Top Right */}
      <div className="absolute top-0 right-0 w-10 h-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-[#00F0FF]/30 group-hover:border-[#00F0FF] transition-all duration-500 group-hover:w-[120%] group-hover:h-[120%]" />
        <div className="absolute top-[3px] right-[3px] w-[6px] h-[6px] bg-[#00F0FF]/50 group-hover:bg-[#00F0FF] group-hover:shadow-[0_0_8px_#00F0FF] transition-all duration-300 animate-[mechPulse_3s_ease-in-out_infinite]"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
      </div>

      {/* Mechanical Plate Corners - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-10 h-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-full border-b-2 border-l-2 border-[#00F0FF]/30 group-hover:border-[#00F0FF] transition-all duration-500 group-hover:w-[120%] group-hover:h-[120%]" />
        <div className="absolute bottom-[3px] left-[3px] w-[6px] h-[6px] bg-[#00F0FF]/50 group-hover:bg-[#00F0FF] group-hover:shadow-[0_0_8px_#00F0FF] transition-all duration-300 animate-[mechPulse_3s_ease-in-out_infinite_0.5s]"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
      </div>

      {/* Mechanical Sliding Plates - Top Edge */}
      <div className="absolute top-0 left-[15px] right-0 h-[2px] overflow-hidden">
        <div className="absolute top-0 left-0 w-8 h-full bg-[#00F0FF]/20 animate-[slideRight_3s_ease-in-out_infinite] group-hover:bg-[#00F0FF]/80 group-hover:shadow-[0_0_6px_#00F0FF]" />
        <div className="absolute top-0 right-0 w-6 h-full bg-[#1A5BFF]/20 animate-[slideLeft_4s_ease-in-out_infinite] group-hover:bg-[#1A5BFF]/80" />
      </div>

      {/* Mechanical Sliding Plates - Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-[15px] h-[2px] overflow-hidden">
        <div className="absolute bottom-0 right-0 w-10 h-full bg-[#00F0FF]/20 animate-[slideLeft_3.5s_ease-in-out_infinite] group-hover:bg-[#00F0FF]/80 group-hover:shadow-[0_0_6px_#00F0FF]" />
      </div>

      {/* Inner Mechanical Frame Lines */}
      <div className="absolute inset-[6px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-0 left-0 w-3 h-[1px] bg-[#00F0FF]/40" />
        <div className="absolute top-0 left-0 w-[1px] h-3 bg-[#00F0FF]/40" />
        <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-[#00F0FF]/40" />
        <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-[#00F0FF]/40" />
      </div>

      {/* Icon with Hex clip */}
      <div className="relative z-10 p-1.5 sm:p-3 bg-black/40 border border-[#00F0FF]/20 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] group-hover:scale-110 transition-all duration-300"
        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
        <div className="scale-75 sm:scale-100">{icon}</div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center sm:items-start text-center sm:text-left w-full min-w-0">
        <p className="text-[7px] sm:text-[10px] md:text-xs text-[#00F0FF] uppercase tracking-widest sm:tracking-[0.3em] font-bold opacity-70 mb-0.5 sm:mb-1 w-full truncate">{title}</p>
        <p className="font-bold text-white text-[9px] sm:text-lg md:text-2xl font-['Black_Ops_One'] tracking-tight sm:tracking-wide group-hover:text-[#00F0FF] transition-colors duration-300 drop-shadow-md w-full truncate">{value}</p>
      </div>

      {/* Transformer Mechanical Scanline - like panels being assembled */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent animate-[mechScan_2.5s_linear_infinite]" />
        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#00F0FF]/40 to-transparent animate-[mechScanV_3s_linear_infinite]" />
      </div>

      {/* Spark Effects on Hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="absolute w-[3px] h-[3px] bg-[#FFD54F] rounded-full animate-[mechSpark_2s_ease-in-out_infinite]"
            style={{
              top: `${10 + i * 25}%`,
              left: `${5 + i * 30}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const CodeCrafter = () => {
  const [activeTab, setActiveTab] = useState("about");
  const formSectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [booting, setBooting] = useState(true);
  const [rebuilding, setRebuilding] = useState(false);
  const [displayEvent, setDisplayEvent] = useState<"cc" | "rm">("cc");

  // --- Spaceship Interaction States ---
  const [isCaught, setIsCaught] = useState(false);
  const [caughtPos, setCaughtPos] = useState({ x: 0, y: 0 });
  const [customFlight, setCustomFlight] = useState(false);
  const [shattered, setShattered] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  const shipRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0, time: 0 });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const gatewayOpenDate = new Date("2026-03-20T00:00:00");
  const eventCloseDate = new Date("2026-04-18T18:00:00");
  const [isGatewayOpen, setIsGatewayOpen] = useState(new Date() >= gatewayOpenDate);

  useEffect(() => {
    let spaceshipInterval: ReturnType<typeof setInterval>;
    let flightTimeout: ReturnType<typeof setTimeout>;

    // Transformer Boot Sequence
    const timer = setTimeout(() => {
      setBooting(false);

      const triggerSpaceshipFlyby = () => {
        // Only trigger native flyby if not actively playing with it
        setRebuilding(true);
        setCustomFlight(false);
        setShattered(false);
        setIsCaught(false);
        flightTimeout = setTimeout(() => setRebuilding(false), 6000); // 6s flight
      };
      triggerSpaceshipFlyby();
      spaceshipInterval = setInterval(() => {
        // Reset all states and begin standard interval
        triggerSpaceshipFlyby();
      }, 8000); // 6s flight + 2s rest
    }, 1000);

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    const gatewayCheck = setInterval(() => {
      setIsGatewayOpen(new Date() >= gatewayOpenDate);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(flightTimeout);
      if (spaceshipInterval) clearInterval(spaceshipInterval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(gatewayCheck);
    };
  }, [gatewayOpenDate]);

  // Handle Dragging Logic Globally
  useEffect(() => {
    if (!isCaught) return;

    const handleMove = (e: PointerEvent) => {
      setCaughtPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
      const dt = Date.now() - lastPos.current.time;
      if (dt > 16) { // ~60fps tracking
        velocity.current = { x: (e.clientX - lastPos.current.x) / dt, y: (e.clientY - lastPos.current.y) / dt };
        lastPos.current = { x: e.clientX, y: e.clientY, time: Date.now() };
      }
    };

    const handleUp = () => {
      setIsCaught(false);
      if (velocity.current.y < -0.8) {
        // Thrown UP! Flings out into space!
        setCustomFlight(true);
      } else {
        // Thrown side/down or dropped -> BREAK IT!
        setShattered(true);
        setTimeout(() => {
          setShattered(false);
          setRebuilding(false); // remove from DOM, interval will catch it later
        }, 1000);
      }
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [isCaught]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!shipRef.current || shattered || customFlight) return;
    e.stopPropagation();

    const rect = shipRef.current.getBoundingClientRect();
    setCaughtPos({ x: rect.left, y: rect.top });

    // We want the ship centered precisely where it was grabbed
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    lastPos.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    velocity.current = { x: 0, y: 0 };

    setIsCaught(true);
  };


  const scrollToRegistration = () => {
    setActiveTab("register");
    if (formSectionRef.current) {
      const top = formSectionRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: top - 80, behavior: "smooth" });
    }
  };

  const tabs = [
    { id: 'about', label: 'CORE.INFO', icon: Info },
    { id: 'rules', label: 'RULES.SYS', icon: BookOpen },
    { id: 'schedules', label: 'TIMELINE', icon: CalendarHeart },
    { id: 'partners', label: 'PARTNERS', icon: Hexagon },
    { id: 'register', label: 'REGISTER', icon: UserPlus }
  ];

  return (
    <div className="min-h-screen pt-16 bg-[#03060d] text-white overflow-hidden font-sans selection:bg-[#00F0FF] selection:text-black">

      {/* Booting Overlay - Cinematic Transformers Boot */}
      {booting && (
        <div className="fixed inset-0 z-[100] bg-[#03060d] flex flex-col items-center justify-center pointer-events-none overflow-hidden">
          {/* Mobile ONLY: Poster Background for the Booting Screen with Intense Glitch */}
          <div className="md:hidden absolute inset-0 z-0 opacity-40 animate-[intenseGlitch_0.5s_infinite]">
            <img src="/codecrafter-poster-final.png" className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03060d] via-transparent to-[#03060d]"></div>
          </div>

          {/* scanLine Overlay */}
          <div className="absolute inset-0 z-5 pointer-events-none opacity-20 overflow-hidden">
            <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#00F0FF]/40 to-transparent animate-[scanLine_2s_linear_infinite]"></div>
          </div>

          <div className="relative z-10 w-64 h-64 flex items-center justify-center">
            {/* Outer spinning glow ring */}
            <div className="absolute w-48 h-48 rounded-full border-2 border-[#00F0FF]/20 animate-[spin_2s_linear_infinite]"
              style={{ boxShadow: '0 0 30px rgba(0,240,255,0.1)' }}></div>
            <div className="absolute w-36 h-36 rounded-full border border-[#1A5BFF]/30 animate-[spin_2s_linear_infinite_reverse]"></div>

            {/* Official Autobot Logo Silhouette SVG */}
            <svg viewBox="0 0 100 100" className="w-24 h-24 absolute animate-[autobotPulse_1.5s_ease-in-out_infinite] drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]" xmlns="http://www.w3.org/2000/svg">
              <g fill="#00F0FF">
                {/* Center Forehead Crystal Cutout Region */}
                <path d="M35 25 L65 25 L50 40 Z" fill="#03060d" stroke="#00F0FF" strokeWidth="6" strokeLinejoin="round" />

                {/* Main Helmet / Crest Solid Body */}
                <path d="M 50 5 L 85 10 L 95 30 L 75 38 L 95 45 L 85 75 L 65 75 L 60 95 L 40 95 L 35 75 L 15 75 L 5 45 L 25 38 L 5 30 L 15 10 Z" />

                {/* Embedded Cutouts to Create the Face */}
                {/* Forehead Triangle Cutout */}
                <polygon points="50,12 30,22 70,22" fill="#03060d" />

                {/* Side Helmet Vents (Left & Right) */}
                <polygon points="12,28 35,38 30,42 10,34" fill="#03060d" />
                <polygon points="15,38 33,46 28,50 12,44" fill="#03060d" />
                <polygon points="88,28 65,38 70,42 90,34" fill="#03060d" />
                <polygon points="85,38 67,46 72,50 88,44" fill="#03060d" />

                {/* Eyes */}
                <polygon points="45,45 35,42 25,55 35,52" fill="#03060d" />
                <polygon points="55,45 65,42 75,55 65,52" fill="#03060d" />

                {/* Nose / Bridge / Mouth Plate Area Cutout */}
                <polygon points="46,38 54,38 54,58 65,55 68,78 60,82 60,98 40,98 40,82 32,78 35,55 46,58" fill="#03060d" />

                {/* Lower Jaw Additions */}
                <polygon points="45,65 55,65 55,75 45,75" fill="#00F0FF" />
                <polygon points="38,82 48,82 48,93 38,93" fill="#00F0FF" />
                <polygon points="52,82 62,82 62,93 52,93" fill="#00F0FF" />
              </g>
            </svg>
          </div>
          <div className="text-[#00F0FF] font-['Orbitron'] tracking-[0.2em] sm:tracking-[0.5em] text-xs sm:text-sm animate-[pulse_2s_infinite,rgbSplit_2s_infinite] mt-8 text-center px-4 w-full">
            INITIALIZING CODE CRAFTER...
          </div>
          <div className="w-64 sm:w-80 max-w-[90vw] h-[2px] bg-white/10 mt-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" style={{ animation: 'loadingBar 1s ease-in-out forwards' }}></div>
          </div>
        </div>
      )}

      {/* Transformer -> Spaceship Reveal Effect (Double Pass and Interactive) 
       {rebuilding && (
        <div className={`fixed inset-0 z-[60] overflow-hidden ${isCaught ? 'pointer-events-auto cursor-grabbing' : 'pointer-events-none'}`}>

          <div
            ref={shipRef}
            onPointerDown={handlePointerDown}
            className={`w-40 h-64 ${(!isCaught && !customFlight && !shattered) ? 'absolute bottom-2 left-2 md:bottom-10 md:left-10 animate-[flyUpMobile_6s_linear_forwards] md:animate-[flyAcross_6s_linear_forwards] pointer-events-auto cursor-grab' : ''}`}
            style={(isCaught || customFlight || shattered) ? {
              position: 'fixed',
              left: caughtPos.x,
              top: caughtPos.y,
              transform: customFlight ? `translate(${velocity.current.x * 500}px, -150vh)` : 'none',
              transition: customFlight ? 'transform 1s cubic-bezier(0.1, 0.8, 0.2, 1)' : 'none',
              zIndex: 100
            } : {}}
          >

            <div className={`relative w-full h-full transform scale-[0.35] sm:scale-[0.6] md:scale-100 origin-bottom-left ${shattered ? 'animate-[spin_1s_linear_forwards]' : ''}`}>
             Thrust Fire / Trail 
              {!shattered && <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-12 h-40 bg-gradient-to-t from-transparent via-[#00F0FF] to-white blur-md opacity-0 origin-top animate-[igniteTrailMobile_6s_linear_forwards] md:animate-[igniteTrail_6s_linear_forwards]"></div>}

              Head -> Cockpit 
              <div className={`absolute left-1/2 top-0 -translate-x-1/2 w-10 h-14 bg-gray-300 z-30 shadow-[0_5px_15px_black] ${shattered ? 'animate-[shatterUp_1s_forwards]' : ''}`}
                style={!shattered ? { clipPath: 'polygon(30% 0, 70% 0, 100% 100%, 0 100%)', animation: isCaught ? 'none' : 'tfHead 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s' } : { clipPath: 'polygon(30% 0, 70% 0, 100% 100%, 0 100%)' }}></div>

             Core Body -> Fuselage 
              <div className={`absolute left-1/2 top-12 -translate-x-1/2 w-16 h-28 bg-gradient-to-b from-gray-400 to-gray-600 z-20 shadow-[0_0_20px_black] ${shattered ? 'animate-[shatterDown_1s_forwards]' : ''}`}
                style={!shattered ? { clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)', animation: isCaught ? 'none' : 'tfBody 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s' } : { clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}>
                {!shattered && <div className="absolute inset-0 bg-[#00F0FF] mix-blend-overlay opacity-0 animate-[flashOpacity_0.5s_forwards_1s]"></div>}
              </div>

              Left Arm -> Left Jet Wing
              <div className={`absolute left-[-5px] top-12 w-12 h-28 bg-gray-500 origin-top-right z-10 border border-t-0 border-r-0 border-gray-400 ${shattered ? 'animate-[shatterLeft_1s_forwards]' : ''}`}
                style={!shattered ? { clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 20% 100%)', animation: isCaught ? 'none' : 'tfLeftArm 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s' } : { clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 20% 100%)' }}></div>

             Right Arm -> Right Jet Wing 
              <div className={`absolute right-[-5px] top-12 w-12 h-28 bg-gray-500 origin-top-left z-10 border border-t-0 border-l-0 border-gray-400 ${shattered ? 'animate-[shatterRight_1s_forwards]' : ''}`}
                style={!shattered ? { clipPath: 'polygon(0 20%, 100% 0, 80% 100%, 0 100%)', animation: isCaught ? 'none' : 'tfRightArm 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s' } : { clipPath: 'polygon(0 20%, 100% 0, 80% 100%, 0 100%)' }}></div>

            Left Leg -> Left Thruster
              <div className={`absolute left-6 top-36 w-12 h-28 bg-gray-700 origin-top z-0 ${shattered ? 'animate-[shatterLeft_1s_forwards]' : ''}`}
                style={!shattered ? { clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)', animation: isCaught ? 'none' : 'tfLeftLeg 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s' } : { clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)' }}></div>

               Right Leg -> Right Thruster 
              <div className={`absolute right-6 top-36 w-12 h-28 bg-gray-700 origin-top z-0 ${shattered ? 'animate-[shatterRight_1s_forwards]' : ''}`}
                style={!shattered ? { clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)', animation: isCaught ? 'none' : 'tfRightLeg 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s' } : { clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)' }}></div>
            </div>

          </div>
        </div>
      )} */}

      {/* Epic Megatron vs Optimus Background */}
      <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000" style={{ opacity: booting ? 0 : 1 }}>
        <div className="absolute inset-0 z-0">
          {/* Desktop Background (Pure High-Res Static) */}
          <img
            src="/optimus-megatron.jpg"
            alt="Transformers Epic Background"
            className="hidden md:block w-full h-full object-cover object-center"
            onError={(e) => {
              console.log("Image load failed");
            }}
          />

          {/* Mobile Background (9:21 tall aspect ratio for modern phones) */}
          <img
            src="/codecrafter-mobile-bg.png"
            alt="Transformers Epic Background"
            className="block md:hidden absolute top-0 left-0 w-full h-auto object-contain md:object-cover object-top"
            onError={(e) => {
              console.log("Image load failed");
            }}
          />

          {/* Soft shadow purely at the very bottom so content seamlessly flows down */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#010308] to-transparent"></div>
        </div>
        {/* Hex Mesh Background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,#03060d_100%)]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='103.9' viewBox='0 0 60 103.9' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 103.9L0 86.6V51.9L30 34.6l30 17.3v34.7L30 103.9zM30 101.6L58 85.5V53l-28-16.2L2 53v32.5L30 101.6z' fill='%2300F0FF' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 104px',
            transform: `translateY(${scrollY * 0.1}px)`
          }}>
        </div>
        {/* Underglow from Cursor */}
        <div className="absolute w-[600px] h-[600px] bg-[#00F0FF]/10 rounded-full blur-[120px] mix-blend-screen transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)` }}></div>
        {/* Central Deep Glow */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-[#1A5BFF]/15 blur-[150px] rounded-[100%]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-10 pb-20 min-h-[90vh] flex flex-col justify-center items-center px-4">
        <div className={`transition-all duration-1000 transform ${booting ? 'translate-y-20 opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'} w-full max-w-7xl mx-auto flex flex-col items-center`}>

          {/* Top Label (Hidden on mobile as it's baked into the poster) */}
          <div className="hidden md:inline-flex items-center justify-center px-8 py-3 mb-8 relative group bg-black/40 backdrop-blur-md border border-[#00F0FF]/30 shadow-[0_0_20px_rgba(0,240,255,0.1)]"
            style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}>
            <span className="text-[#00F0FF] font-['Orbitron'] uppercase tracking-[0.4em] font-bold text-[10px] sm:text-xs relative z-10">
              <Typewriter words={['SYSTEMS ENGAGED', 'AWAITING OPERATORS', 'PROTOCOL: ENABLED']} loop={0} cursor cursorStyle='_' typeSpeed={50} deleteSpeed={30} delaySpeed={3000} />
            </span>
          </div>

          {/* Master Title - Transformers Vibe (Hidden on mobile as it's baked into the poster) */}
          <div className="hidden md:block relative mb-8 text-center"
            style={{
              transform: `perspective(1000px) rotateX(${(scrollY * -0.05)}deg)`,
              transformStyle: 'preserve-3d'
            }}>
            {/* Outline Glow behind text */}
            <h1 className="absolute inset-0 text-5xl sm:text-7xl md:text-[8rem] whitespace-normal font-black leading-none tracking-tighter uppercase blur-md opacity-60 font-['Black_Ops_One'] text-[#00F0FF]">
              CODE CRAFTER
            </h1>

            <h1 className="relative text-5xl sm:text-7xl md:text-[8rem] whitespace-normal font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 uppercase drop-shadow-2xl font-['Black_Ops_One'] z-10">
              CODE CRAFTER
            </h1>

            <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-9xl md:text-[12rem] font-black text-[#00F0FF]/10 font-['Black_Ops_One'] z-0 whitespace-nowrap pointer-events-none select-none tracking-widest mix-blend-screen animate-pulse">
              3.0
            </h2>

            <div className="mt-2 inline-block relative z-20 bg-gradient-to-r from-[#00F0FF] to-[#1A5BFF] px-6 py-2 transform skew-x-[-15deg] shadow-[0_0_30px_rgba(0,240,255,0.5)]">
              <span className="block transform skew-x-[15deg] text-black font-['Orbitron'] font-black text-xl md:text-3xl tracking-[0.2em]">VERSION 3.0</span>
            </div>
          </div>

          {/* Spacer for Mobile so content below is pushed down appropriately */}
          <div className="md:hidden h-[50vh] w-full pointer-events-none"></div>

          {/* System Metrics with Mechanical Connectors */}
          <div className="flex flex-row items-stretch justify-center w-full max-w-5xl mx-auto mt-4 sm:mt-16 px-1 lg:px-2 gap-1 sm:gap-0">
            <div className="flex-1 min-w-0">
              <HexBadge title="Total Bounty" value="₹ 2,50,000" icon={<Trophy size={24} />} delay={0.1} />
            </div>
            <MechanicalConnector />
            <div className="flex-1 min-w-0">
              <HexBadge title="Operation Date" value="21-22 APR '26" icon={<Calendar size={24} />} delay={0.2} />
            </div>
            <MechanicalConnector flip={true} />
            <div className="flex-1 min-w-0">
              <HexBadge title="Base Terminal" value="CT University" icon={<MapPin size={24} />} delay={0.3} />
            </div>
            <MechanicalConnector flip={true} />
            <div className="flex-1 min-w-0">
              <HexBadge title="Status" value="Ended on 22 apr 26" icon={<MapPin size={24} />} delay={0.3} />
            </div>
          </div>

          {/* Timer Hub */}
          <div className="mt-16 w-full max-w-2xl relative group pb-10">
            {/* Mechanical Border Base */}
            <div className="absolute inset-0 bg-[#00F0FF]/5 transform skew-x-[-12deg] border border-[#00F0FF]/20 group-hover:bg-[#00F0FF]/10 group-hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] transition-all duration-500"></div>

            <div className="relative z-10 p-8 sm:p-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-6 text-[#00F0FF] font-['Orbitron'] font-bold tracking-[0.2em]">
                <ShieldAlert size={20} className="animate-pulse" />
                <span>{isGatewayOpen ? "GATEWAY CLOSES IN" : "GATEWAYS OPENS IN"}</span>
              </div>

              <div className="transform scale-110 sm:scale-125 mb-8 drop-shadow-lg">
                <CountdownTimer targetDate={isGatewayOpen ? eventCloseDate : gatewayOpenDate} />
              </div>

              <button
                onClick={scrollToRegistration}
                className="relative px-12 py-4 bg-gradient-to-r from-[#00F0FF] to-[#1A5BFF] text-black font-['Orbitron'] font-black uppercase tracking-[0.3em] overflow-hidden group/btn hover:scale-105 transition-transform duration-300"
                style={{ clipPath: 'polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)' }}
              >
                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover/btn:opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-all duration-700 ease-in-out"></span>
                <span className="relative z-10 flex items-center gap-3">
                  INITIATE ENTRY <Target size={20} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Megatron Prize Pool Section */}
      <section className="relative z-20 py-16 md:py-24 px-4 bg-gradient-to-b from-transparent via-[#050B16] to-[#010308] overflow-hidden border-t border-[#1A5BFF]/20 mt-10"
        style={{ clipPath: 'polygon(0 0, 100% 2vw, 100% 100%, 0 100%)' }}>

        {/* Cyber Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#1A5BFF 1px, transparent 1px), linear-gradient(90deg, #1A5BFF 1px, transparent 1px)', backgroundSize: '60px 60px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'top' }}></div>

        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between relative z-20">

          {/* Text & Prize Information */}
          <div className="flex-[1.5] w-full pr-4 md:pr-10 z-30 text-left animate-[reveal_0.8s_ease-out_forwards]">
            <h2 className="text-sm sm:text-2xl md:text-6xl font-['Black_Ops_One'] uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-500 tracking-wider mb-1 md:mb-2 drop-shadow-lg">
              TOTAL PRIZE POOL
            </h2>
            <div className="text-2xl sm:text-4xl md:text-[6rem] leading-none font-black font-['Orbitron'] text-[#00F0FF] mb-4 md:mb-8 drop-shadow-[0_0_30px_rgba(0,240,255,0.6)] animate-[pulse_3s_ease-in-out_infinite]">
              ₹2,50,000
            </div>

            <div className="relative inline-block mt-1 md:mt-4 p-2 sm:p-8 bg-[#0a0f1a]/80 border border-[#1A5BFF]/40 border-l-4 border-l-[#1A5BFF] backdrop-blur-xl shadow-[0_0_30px_rgba(26,91,255,0.15)] group"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>
              <div className="absolute top-0 right-0 w-4 md:w-8 h-4 md:h-8 border-t-2 border-r-2 border-[#1A5BFF] opacity-50 group-hover:opacity-100 transition-opacity"></div>

              <p className="text-[10px] sm:text-xl md:text-2xl font-mono text-gray-300 italic leading-tight md:leading-relaxed">
                "THIS PRIZE IS MINE. PROVE YOUR WORTH."
              </p>
              <p className="mt-1 md:mt-4 text-[#1A5BFF] font-black tracking-[0.1em] md:tracking-[0.3em] uppercase text-[8px] sm:text-base font-['Orbitron'] flex items-center justify-start gap-1 md:gap-2">
                <span className="w-4 md:w-8 h-[1px] md:h-[2px] bg-[#1A5BFF]"></span> LORD MEGATRON
              </p>
            </div>
          </div>

          {/* Megatron Image guarding the pool */}
          <div className="flex-1 relative w-full flex justify-center z-20">
            <div className="relative w-full max-w-[240px] sm:max-w-md md:max-w-lg lg:max-w-2xl transform hover:scale-105 transition-transform duration-700 ease-out group">

              {/* Replaced Energy Pillar with a much softer, more naturally blended glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#00F0FF]/10 blur-[40px] md:blur-[120px] rounded-full mix-blend-screen animate-pulse pointer-events-none"></div>

              {/* The actual image the user provided */}
              <img
                src="/megatron-prize.png"
                alt="Megatron Protecting the Prize Pool"
                className="relative z-10 w-full h-auto object-contain mix-blend-screen filter contrast-125 brightness-110 transition-all duration-500"
                style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)', maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)' }}
              />

              {/* HUD Scanning Line overlaying Megatron */}
              <div className="absolute top-0 left-0 w-full h-[1px] md:h-[2px] bg-[#00F0FF]/50 shadow-[0_0_15px_#00F0FF] z-20 animate-[mechScan_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Overlay Cyber HUD elements around him */}
              <div className="absolute top-[20%] left-[10%] w-8 md:w-16 h-8 md:h-16 border border-[#00F0FF]/20 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none">
                <div className="absolute top-0 left-1/2 w-0.5 md:w-1 h-1 md:h-3 bg-[#00F0FF]/50"></div>
                <div className="absolute bottom-0 left-1/2 w-0.5 md:w-1 h-1 md:h-3 bg-[#00F0FF]/50"></div>
                <div className="absolute left-0 top-1/2 w-1 md:w-3 h-0.5 md:h-1 bg-[#00F0FF]/50"></div>
                <div className="absolute right-0 top-1/2 w-1 md:w-3 h-0.5 md:h-1 bg-[#00F0FF]/50"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Soft shadow to blend into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#010308] to-transparent z-10"></div>
      </section>

      {/* Twin Events Section - Card Deck Style */}
      <section className="relative z-20 py-20 px-4 bg-[#010308] overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center">

          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-5xl font-['Black_Ops_One'] uppercase text-white tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Twin <span className="text-[#00F0FF]">Powerhouse</span> Events
            </h2>
            <div className="mt-4 w-24 h-1 bg-[#1A5BFF] mx-auto"></div>
          </div>

          <div className="relative w-full max-w-4xl h-[420px] sm:h-[450px] flex items-center justify-center [perspective:1200px] mb-20">
            {/* Card 1: Code Crafter 3.0 (The Hackathon) */}
            <div
              onClick={() => {
                setHoveredEvent(prev => prev === 1 ? null : 1);
                setDisplayEvent("cc");
              }}
              className={`absolute w-[280px] sm:w-[350px] h-full bg-[#00F0FF]/40 p-[2px] shadow-[0_0_50px_rgba(0,240,255,0.15)] transform transition-all duration-700 ease-out 
                          cursor-pointer group
                          ${hoveredEvent === 1 ? 'z-50 rotate-0 translate-x-0 scale-105' : 'z-10 -rotate-12 -translate-x-16 sm:-translate-x-32 scale-90 sm:scale-100'}
                          ${hoveredEvent === 2 ? 'blur-[2px] opacity-40 scale-95' : 'opacity-100'}`}
              style={{
                clipPath: 'polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
              }}>
              <div 
                className="relative w-full h-full bg-[#0a0f1a] p-6 rounded-xl flex flex-col justify-between overflow-hidden"
                style={{
                  clipPath: 'polygon(0 17px, 17px 0, 100% 0, 100% calc(100% - 17px), calc(100% - 17px) 100%, 0 100%)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-[#00F0FF]/20 flex items-center justify-center rounded-lg border border-[#00F0FF]/40">
                      <Cpu className="text-[#00F0FF]" size={28} />
                    </div>
                    <span className="text-[10px] font-mono text-[#00F0FF] opacity-60 tracking-widest">EVENT_ID: CC3.0</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-['Black_Ops_One'] text-white mb-2 leading-tight">CODE CRAFTER <span className="text-[#00F0FF]">3.0</span></h1>
                  <div className="flex items-center gap-2 text-[#00F0FF] mb-6">
                    <Calendar size={16} />
                    <span className="font-mono text-xs font-bold tracking-widest uppercase">21-22 APRIL 2026</span>
                  </div>

                  <p className="text-gray-400 text-[10px] sm:text-sm font-mono leading-relaxed mb-4">
                    The ultimate 24-hour hackathon where structural visionaries and elite coders forge real-world frameworks.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#00F0FF]/20">
                  <div className="flex items-center gap-2 text-[#00F0FF]">
                    <Trophy size={14} />
                    <span className="text-[10px] font-['Orbitron'] font-bold tracking-widest">PRIZE POOL: ₹2L</span>
                  </div>
                  <div className="mt-2 text-[8px] sm:text-[10px] font-['Orbitron'] font-black text-[#00F0FF] animate-pulse tracking-[0.2em] flex items-center gap-1">
                    <span className="shrink-0 text-xs">{">>>"}</span> NEUTRALIZE MEGATRON
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Card 2: Robo Mech 2.0 (Robo Race) */}
            <div
              onClick={() => {
                setHoveredEvent(prev => prev === 2 ? null : 2);
                setDisplayEvent("rm");
              }}
              className={`absolute w-[280px] sm:w-[350px] h-full bg-[#1A5BFF]/40 p-[2px] shadow-[0_0_50px_rgba(26,91,255,0.15)] transform transition-all duration-700 ease-out 
                          cursor-pointer group
                          ${hoveredEvent === 2 ? 'z-50 rotate-0 translate-x-0 scale-105' : 'z-10 rotate-12 translate-x-16 sm:translate-x-32 scale-90 sm:scale-100'}
                          ${hoveredEvent === 1 ? 'blur-[2px] opacity-40 scale-95' : 'opacity-100'}`}
              style={{
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
              }}>
              <div 
                className="relative w-full h-full bg-[#0a0f1a] p-6 rounded-xl flex flex-col justify-between overflow-hidden"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 17px) 0, 100% 17px, 100% 100%, 17px 100%, 0 calc(100% - 17px))',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A5BFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-[#1A5BFF]/20 flex items-center justify-center rounded-lg border border-[#1A5BFF]/40">
                      <Zap className="text-[#1A5BFF]" size={28} />
                    </div>
                    <span className="text-[10px] font-mono text-[#1A5BFF] opacity-60 tracking-widest">EVENT_ID: RM2.0</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-['Black_Ops_One'] text-white mb-2 leading-tight">ROBO MECH <span className="text-[#1A5BFF]">2.0</span></h1>
                  <div className="flex items-center gap-2 text-[#1A5BFF] mb-6">
                    <Calendar size={16} />
                    <span className="font-mono text-xs font-bold tracking-widest uppercase">21st APRIL 2026</span>
                  </div>

                  <div className="space-y-1 mb-4">
                    {['ROBO TUG-OF-WAR', 'OBSTACLE RACE', 'LAP RACE'].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-gray-300">
                        <span className="w-1.5 h-1.5 bg-[#1A5BFF] rounded-full"></span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1A5BFF]/20">
                  <div className="flex items-center gap-2 text-[#1A5BFF]">
                    <Trophy size={14} />
                    <span className="text-[10px] font-['Orbitron'] font-bold tracking-widest">PRIZE POOL: ₹50K</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1A5BFF]">
                    <Target size={14} />
                    <span className="text-[10px] font-['Orbitron'] font-bold tracking-widest">GOAL: SUPREME DOMINANCE</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control Panel Section */}
      <section ref={formSectionRef} className="relative z-20 py-24 px-4 bg-[#010308] border-t border-[#00F0FF]/30">

        {/* Decorative Top Edge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[3px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_20px_#00F0FF]"></div>
        <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-8 h-8 rotate-45 border-b border-r border-[#00F0FF] bg-[#010308]"></div>

        <div className="max-w-6xl mx-auto">
          {/* Event Selector Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#03050a] border border-[#00F0FF]/30 p-1 flex shadow-[0_0_15px_rgba(0,240,255,0.1)]" style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}>
              <button 
                onClick={() => {
                  setDisplayEvent("cc");
                  setHoveredEvent(1);
                  // document.querySelector('.relative.w-full.max-w-4xl.h-\\[420px\\]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); // gently scroll up
                }}
                className={`px-8 py-2 font-['Orbitron'] text-[10px] sm:text-xs font-bold uppercase transition-all tracking-[0.2em] ${displayEvent === "cc" ? "bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]" : "text-gray-500 hover:text-white border border-transparent"} `}
                style={{ clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)' }}>
                Code Crafter
              </button>
              <button 
                onClick={() => {
                  setDisplayEvent("rm");
                  setHoveredEvent(2);
                  // document.querySelector('.relative.w-full.max-w-4xl.h-\\[420px\\]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`px-8 py-2 font-['Orbitron'] text-[10px] sm:text-xs font-bold uppercase transition-all tracking-[0.2em] ${displayEvent === "rm" ? "bg-[#1A5BFF]/20 text-[#1A5BFF] border border-[#1A5BFF]" : "text-gray-500 hover:text-white border border-transparent"}`}
                style={{ clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)' }}>
                Robo Mech
              </button>
            </div>
          </div>
          
          {/* Mechanical Tab Switches */}
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 mb-12">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 px-4 sm:px-10 md:flex-1 min-w-[120px] sm:min-w-[140px] font-['Orbitron'] font-bold text-[10px] sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] uppercase transition-all duration-300 ${isActive ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                  style={{
                    clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    background: isActive ? 'linear-gradient(90deg, #00F0FF, #1A5BFF)' : 'rgba(10, 15, 26, 0.8)',
                    boxShadow: isActive ? '0 0 20px rgba(0, 240, 255, 0.4)' : 'none',
                    border: isActive ? 'none' : '1px solid rgba(0, 240, 255, 0.2)'
                  }}
                >
                  <Icon size={16} className={isActive ? 'animate-pulse' : ''} />
                  {tab.label}
                  {/* Glowing line at bottom if not active */}
                  {!isActive && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00F0FF] opacity-0 hover:opacity-50 transition-opacity"></div>}
                </button>
              );
            })}
          </div>

          {/* Main Display Screen */}
          <div className="relative bg-[#060A14] border border-[#00F0FF]/30 p-1 min-h-[500px] shadow-[0_0_50px_rgba(0,150,255,0.05)]"
            style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}>

            {/* Screen Inner Bezel */}
            <div className="absolute inset-2 border border-white/5 bg-[#03050A] p-6 sm:p-10 pointer-events-none"
              style={{ clipPath: 'polygon(25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 25px)' }}>
              {/* Internal Grid Lines */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </div>

            {/* Display Content */}
            <div className="relative z-10 p-6 sm:p-12 text-white/80 animate-[reveal_0.4s_ease-out]">

              {activeTab === 'about' && (
                <div className="max-w-4xl mx-auto space-y-10">
                  <h2 className={`text-4xl sm:text-5xl font-['Black_Ops_One'] uppercase text-transparent bg-clip-text bg-gradient-to-r ${displayEvent === 'cc' ? 'from-white to-gray-500' : 'from-[#1A5BFF] to-gray-500'} mb-8 border-l-4 ${displayEvent === 'cc' ? 'border-[#00F0FF]' : 'border-[#1A5BFF]'} pl-6 py-2`}>
                    Primary Directive
                  </h2>
                  {displayEvent === "cc" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg font-mono">
                      <div className="bg-[#0b101a]/80 p-8 border border-[#1A5BFF]/30 relative group hover:border-[#00F0FF] hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all">
                        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-[#00F0FF] mb-4"><Zap size={40} /></div>
                        <p>An advanced 24-hour cycle to unify elite mechanics in programming, interface design, and systems architecture. Our primary objective is to accelerate innovation and forge real-world frameworks.</p>
                      </div>
                      <div className="bg-[#0b101a]/80 p-8 border border-[#1A5BFF]/30 relative group hover:border-[#00F0FF] hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all">
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-[#00F0FF] mb-4"><Cpu size={40} /></div>
                        <p>Whether you are an integrated systems dev, creative architect, or structural visionary, Code Crafter presents an optimal environment to execute data, establish connections, and deploy superior technical solutions.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg font-mono">
                      <div className="bg-[#0b101a]/80 p-8 border border-[#1A5BFF]/30 relative group hover:border-[#1A5BFF] hover:shadow-[0_0_30px_rgba(26,91,255,0.1)] transition-all">
                        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#1A5BFF] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-[#1A5BFF] mb-4"><Target size={40} /></div>
                        <p>A battleground for mechanical and robotics engineering minds. Build and command supreme machines in a physical arena. Dominate through engineering, speed, and strategic strength.</p>
                      </div>
                      <div className="bg-[#0b101a]/80 p-8 border border-[#1A5BFF]/30 relative group hover:border-[#1A5BFF] hover:shadow-[0_0_30px_rgba(26,91,255,0.1)] transition-all">
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#1A5BFF] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-[#1A5BFF] mb-4"><Zap size={40} /></div>
                        <p>Robo Mech challenges operators to navigate obstacle courses, engage in tug-of-war, and test endurance. Only the strongest and most resilient creations will survive.</p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-nowrap justify-center gap-2 sm:gap-6 mt-12 overflow-x-auto pb-4 sm:pb-0">
                    {[{ n: '24H', l: 'CYCLE' }, { n: '1000+', l: 'OPERATORS' }, { n: displayEvent === 'cc' ? '₹2L' : '₹50K', l: 'PRIZE POOL' }].map((s, i) => (
                      <div key={i} className="flex flex-col items-center justify-center bg-[#060a12] border-y border-[#00F0FF]/20 px-4 sm:px-10 py-4 sm:py-6 min-w-[100px] sm:min-w-[200px] flex-1">
                        <span className="text-xl sm:text-4xl font-['Black_Ops_One'] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{s.n}</span>
                        <span className="text-[#00F0FF] font-black tracking-widest text-[8px] sm:text-xs uppercase mt-1 sm:mt-2">{s.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-4xl sm:text-5xl font-['Black_Ops_One'] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-12 border-l-4 border-[#00F0FF] pl-6 py-2">
                    Execution Protocols
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-[#0A0F1A] border-t-2 border-[#1A5BFF] p-8 shadow-xl relative overflow-hidden group hover:border-[#00F0FF] transition-colors">
                      <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-30 transition-opacity"><Cpu size={200} /></div>
                      <h3 className="text-[#00F0FF] font-['Orbitron'] font-black text-xl mb-6 tracking-widest uppercase">System Rules</h3>
                      <ul className="space-y-4 font-mono text-sm text-gray-300 relative z-10">
                        {['Teams must consist of 2-4 operators.', 'Members must be actively enrolled.', 'Engines built from scratch in 24 hrs.', 'Submissions include source code + docs.'].map((val, i) => (
                          <li key={i} className="flex gap-4 items-start"><span className="text-[#00F0FF] mt-1 shrink-0"><Hexagon size={12} fill="#00F0FF" /></span> {val}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#0A0F1A] border-t-2 border-[#1A5BFF] p-8 shadow-xl relative overflow-hidden group hover:border-[#00F0FF] transition-colors">
                      <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-30 transition-opacity"><Target size={200} /></div>
                      <h3 className="text-[#00F0FF] font-['Orbitron'] font-black text-xl mb-6 tracking-widest uppercase">Evaluation Matrix</h3>
                      <ul className="space-y-4 font-mono text-sm text-gray-300 relative z-10">
                        {['[30%] Innovation Algorithms', '[25%] Technical Complexity', '[20%] Pragmatic Impact', '[15%] Overall UX/UI Design', '[10%] Presentation Logic'].map((val, i) => (
                          <li key={i} className="flex gap-4 items-start"><span className="text-[#FFD54F] mt-1 shrink-0"><Hexagon size={12} fill="#FFD54F" /></span> {val}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-center mt-12">
                    <a
                      href={displayEvent === "cc" ? "/rulebook.pdf" : "/roborulebook.pdf"}
                      download={displayEvent === "cc" ? "CodeCrafter_3.0_Rulebook.pdf" : "RoboMec_2.0_Rulebook.pdf"}
                      className={`relative px-8 py-4 bg-[#0a0f1a] border ${displayEvent === 'cc' ? 'border-[#00F0FF]/50 text-[#00F0FF] hover:border-[#00F0FF] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]' : 'border-[#1A5BFF]/50 text-[#1A5BFF] hover:border-[#1A5BFF] hover:shadow-[0_0_30px_rgba(26,91,255,0.4)]'} font-['Orbitron'] font-bold uppercase tracking-[0.2em] group overflow-hidden transition-all flex items-center gap-3`}
                      style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/0 via-[#00F0FF]/20 to-[#00F0FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                      <Download size={20} className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />
                      <span className="relative z-10">DOWNLOAD RULEBOOK</span>
                    </a>
                  </div>
                  <div className="flex justify-center mt-6">
                    <a
                      href="/problem_statements.pdf"
                      download="CodeCrafter_3.0_Problem_Statements.pdf" 
                      className={`relative px-8 py-4 bg-[#0a0f1a] border ${displayEvent === 'cc' ? 'border-[#00F0FF]/50 text-[#00F0FF] hover:border-[#00F0FF] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]' : 'border-[#1A5BFF]/50 text-[#1A5BFF] hover:border-[#1A5BFF] hover:shadow-[0_0_30px_rgba(26,91,255,0.4)]'} font-['Orbitron'] font-bold uppercase tracking-[0.2em] group overflow-hidden transition-all flex items-center gap-3`}
                      style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/0 via-[#00F0FF]/20 to-[#00F0FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                      <Download size={20} className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />
                      <span className="relative z-10">DOWNLOAD Problem Statements</span>
                    </a>
                </div>
                </div>
              )}

              {activeTab === 'schedules' && (() => {
                const categories = {
                  ceremony: { color: '#FFD54F', label: 'CEREMONY' },
                  coding: { color: '#00F0FF', label: 'CODING' },
                  food: { color: '#22C55E', label: 'FOOD' },
                  fun: { color: '#A855F7', label: 'FUN' },
                  evaluation: { color: '#FF6B35', label: 'EVALUATION' },
                };

                const allEvents = [
                  // Day 1
                  { t: '6:30 AM', lbl: 'Registration', desc: 'Check-in & ID verification', cat: 'ceremony' as const, span: '6:30 – 10:00 AM', day: 1 },
                  { t: '10:00 AM', lbl: 'Inauguration', desc: 'Guest welcoming, lamp lighting & chief guest address', cat: 'ceremony' as const, span: '10:00 – 11:50 AM', day: 1 },
                  { t: '12:00 PM', lbl: 'Hackathon Starts', desc: '24-hour build cycle begins. Systems go live.', cat: 'coding' as const, highlight: true, day: 1 },
                  { t: '2:00 PM', lbl: 'Lunch Break', desc: 'Refuel & recharge', cat: 'food' as const, span: '2:00 – 3:00 PM', day: 1 },
                  { t: '4:00 PM', lbl: 'Snacks', desc: 'Quick energy boost', cat: 'food' as const, day: 1 },
                  { t: '5:00 PM', lbl: 'Mentor Round', desc: 'Industry mentors review your progress', cat: 'coding' as const, span: '5:00 – 7:00 PM', day: 1 },
                  { t: '7:00 PM', lbl: 'DJ Party', desc: 'Beats while your code compiles', cat: 'fun' as const, span: '7:00 – 8:00 PM', day: 1 },
                  { t: '8:00 PM', lbl: 'Dinner', desc: 'Full dinner service', cat: 'food' as const, span: '8:00 – 9:00 PM', day: 1 },
                  { t: '10:00 PM', lbl: 'Gaming Night', desc: 'Valorant & BGMI tournament', cat: 'fun' as const, span: '10:00 – 11:00 PM', day: 1 },
                  { t: '11:00 PM', lbl: 'Fun Activities', desc: 'Late-night surprises & bonding', cat: 'fun' as const, span: '11:00 PM – 12:00 AM', day: 1 },
                  // Day 2
                  { t: '1:00 AM', lbl: 'Evaluation Round', desc: 'Mid-cycle progress check', cat: 'evaluation' as const, day: 2 },
                  { t: '4:30 AM', lbl: 'Tea Break', desc: 'Chai to power through', cat: 'food' as const, day: 2 },
                  { t: '8:00 AM', lbl: 'Breakfast', desc: 'Morning fuel-up', cat: 'food' as const, span: '8:00 – 9:00 AM', day: 2 },
                  { t: '10:00 AM', lbl: 'Final Evaluation', desc: 'Present your project to the jury', cat: 'evaluation' as const, day: 2 },
                  { t: '12:00 PM', lbl: 'Hackathon Ends', desc: 'All systems stop. Code freeze.', cat: 'coding' as const, highlight: true, day: 2 },
                  { t: '1:00 PM', lbl: 'Result Declaration', desc: 'Winners announced live', cat: 'evaluation' as const, span: '1:00 – 2:00 PM', day: 2 },
                  { t: '2:00 PM', lbl: 'Prize Distribution', desc: 'Felicitation ceremony & awards', cat: 'ceremony' as const, span: '2:00 – 3:00 PM', highlight: true, day: 2 },
                ];

                return (
                  <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-5xl font-['Black_Ops_One'] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-4 border-l-4 border-[#00F0FF] pl-6 py-2">
                      Mission Timeline
                    </h2>
                    <p className="text-gray-500 font-mono text-xs sm:text-sm mb-8 pl-6 border-l border-[#00F0FF]/20">
                      Full operational flowchart — 24 hours of building, bonding, and battling for victory.
                    </p>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-3 sm:gap-5 mb-10 p-3 sm:p-4 bg-[#060a12] border border-white/10" style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
                      {Object.values(categories).map((cat) => (
                        <div key={cat.label} className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: cat.color }}></div>
                          <span className="text-[9px] sm:text-[10px] font-['Orbitron'] tracking-wider text-gray-400">{cat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* === ZIGZAG FLOWCHART === */}
                    <div className="relative w-full">
                      {allEvents.map((event, i) => {
                        const catInfo = categories[event.cat];
                        const isLeft = i % 2 === 0;
                        const isLast = i === allEvents.length - 1;
                        const prevDay = i > 0 ? allEvents[i - 1].day : event.day;
                        const showDaySeparator = event.day !== prevDay;

                        return (
                          <div key={i}>
                            {/* Day Separator */}
                            {showDaySeparator && (
                              <div className="flex items-center justify-center my-6 sm:my-8 relative">
                                <div className="absolute inset-0 flex items-center">
                                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#1A5BFF]/50 to-transparent"></div>
                                </div>
                                <div className="relative px-6 py-2 bg-[#060a12] border border-[#1A5BFF]/60 font-['Black_Ops_One'] text-[#1A5BFF] text-sm sm:text-base tracking-[0.3em] shadow-[0_0_20px_rgba(26,91,255,0.2)]" style={{ clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0 50%)' }}>
                                  APRIL 22
                                </div>
                              </div>
                            )}

                            {/* Day 1 Start marker (only for first event) */}
                            {i === 0 && (
                              <div className="flex items-center justify-center mb-6 sm:mb-8 relative">
                                <div className="absolute inset-0 flex items-center">
                                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent"></div>
                                </div>
                                <div className="relative px-6 py-2 bg-[#060a12] border border-[#00F0FF]/60 font-['Black_Ops_One'] text-[#00F0FF] text-sm sm:text-base tracking-[0.3em] shadow-[0_0_20px_rgba(0,240,255,0.2)]" style={{ clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0 50%)' }}>
                                  APRIL 21
                                </div>
                              </div>
                            )}

                            {/* Zigzag Row */}
                            <div className={`flex items-stretch w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                              
                              {/* Event Card - takes ~45% width */}
                              <div className="w-[46%] sm:w-[44%] group">
                                <div 
                                  className={`relative bg-[#0a0f1a] border transition-all duration-500 hover:scale-[1.03] overflow-hidden ${event.highlight ? 'shadow-[0_0_30px_rgba(0,240,255,0.15)]' : 'hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]'}`}
                                  style={{ 
                                    borderColor: event.highlight ? catInfo.color : `${catInfo.color}40`,
                                    clipPath: isLeft 
                                      ? 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                                      : 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                                  }}
                                >
                                  {/* Top color accent */}
                                  <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${catInfo.color}, ${catInfo.color}40)` }}></div>
                                  
                                  <div className="p-3 sm:p-4">
                                    {/* Time + Category */}
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                      <div 
                                        className="px-2 py-0.5 text-[8px] sm:text-[10px] font-['Orbitron'] font-bold tracking-wider shrink-0"
                                        style={{ background: `${catInfo.color}15`, color: catInfo.color, border: `1px solid ${catInfo.color}30` }}
                                      >
                                        {event.span || event.t}
                                      </div>
                                      {event.highlight && (
                                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: catInfo.color, boxShadow: `0 0 8px ${catInfo.color}` }}></div>
                                      )}
                                    </div>
                                    
                                    {/* Title */}
                                    <h4 className="text-white text-xs sm:text-sm font-black uppercase tracking-wider font-mono group-hover:text-[#00F0FF] transition-colors leading-tight mb-1">
                                      {event.lbl}
                                    </h4>
                                    
                                    {/* Description */}
                                    <p className="text-gray-500 font-mono text-[9px] sm:text-[11px] leading-relaxed group-hover:text-gray-400 transition-colors">
                                      {event.desc}
                                    </p>
                                  </div>

                                  {/* Hover scan effect */}
                                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[mechScan_2s_linear_infinite]"></div>
                                  </div>
                                </div>
                              </div>

                              {/* Center Connector Column with sequence number */}
                              <div className="w-[8%] sm:w-[12%] flex flex-col items-center relative">
                                {/* Horizontal pipe from card to center */}
                                <div className="flex items-center w-full h-1/2 relative">
                                  <div className="w-full h-[2px] opacity-50" style={{ background: `linear-gradient(${isLeft ? 'to right' : 'to left'}, ${catInfo.color}60, ${catInfo.color})` }}></div>
                                </div>
                                
                                {/* Center node/dot */}
                                <div 
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-[8px] sm:text-[10px] font-['Orbitron'] font-black text-black z-20 transition-all duration-300 hover:scale-125"
                                  style={{ background: catInfo.color, clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)', boxShadow: `0 0 15px ${catInfo.color}60` }}
                                >
                                  {String(i + 1).padStart(2, '0')}
                                </div>
                              </div>

                              {/* Empty space / opposite side */}
                              <div className="w-[46%] sm:w-[44%]"></div>
                            </div>

                            {/* Vertical connector to next node */}
                            {!isLast && !showDaySeparator && !(i + 1 < allEvents.length && allEvents[i + 1].day !== event.day) && (
                              <div className="flex items-center justify-center">
                                <div className="w-[2px] h-6 sm:h-8 opacity-30" style={{ background: `linear-gradient(to bottom, ${catInfo.color}, ${categories[allEvents[i + 1]?.cat || event.cat].color})` }}></div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Final Victory Badge */}
                      <div className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-[#FFD54F]/10 via-[#FFD54F]/5 to-[#FFD54F]/10 border border-[#FFD54F]/50 text-center relative overflow-hidden group" style={{ clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD54F]/0 via-[#FFD54F]/10 to-[#FFD54F]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                        <div className="text-[#FFD54F] font-['Black_Ops_One'] text-lg sm:text-xl tracking-[0.2em] relative z-10">
                          🏆 MISSION COMPLETE
                        </div>
                        <div className="text-gray-400 font-mono text-[10px] sm:text-xs mt-2 relative z-10">
                          3:10 PM — Vote of Thanks & Farewell
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {activeTab === 'register' && (
                <div className="max-w-4xl mx-auto animate-[fadeIn_0.5s_ease-in-out]">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-5xl font-['Black_Ops_One'] uppercase text-white tracking-widest drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                      NETWORK <span className="text-[#00F0FF]">REGISTRATION</span>
                    </h2>
                    <div className="mt-4 w-32 h-1 bg-[#00F0FF] mx-auto shadow-[0_0_15px_#00F0FF]"></div>
                  </div>
                  <div className="p-4 sm:p-10 bg-[#02040A] border border-[#00F0FF]/30 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] relative">
                    {/* Circuit lines */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#1A5BFF]/50"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#1A5BFF]/50"></div>

                    <div className="relative z-10">
                      {isGatewayOpen ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                          <h3 className="text-2xl sm:text-4xl font-['Orbitron'] text-[#FF007F] animate-pulse uppercase tracking-widest">
                            Registration <span className="text-white">Closed</span>
                          </h3>
                          <p className="text-gray-400 font-mono text-sm sm:text-base max-w-xl mx-auto">
                            The network gateway for {displayEvent === "cc" ? "Code Crafter 3.0" : "Robo Mech 2.0"} has officially been sealed. <br/>
                            Thank you to all who registered. Prepare for the ultimate {displayEvent === "cc" ? "build" : "battle"}!
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
                          <h3 className="text-2xl sm:text-4xl font-['Orbitron'] text-[#00F0FF] animate-pulse uppercase tracking-widest">
                            Coming <span className="text-white">Soon</span> In
                          </h3>
                          <div className="transform scale-110 sm:scale-125 drop-shadow-lg p-6 bg-black/40 rounded-xl border border-[#00F0FF]/20 mt-8">
                            <CountdownTimer targetDate={gatewayOpenDate} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'partners' && (
                <div className="max-w-6xl mx-auto animate-[fadeIn_0.5s_ease-in-out]">
                  <CodeCrafterPartners />
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {displayEvent === "cc" && <CodeCrafterWhyJoin />}
      {displayEvent === "cc" && <CodeCrafterMentors />}

      {/* Contact & Community Section */}
      <section className="relative z-20 py-16 px-4 bg-[#010308] border-t border-[#00F0FF]/30 overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center mb-12 animate-[fadeIn_0.5s_ease-in-out]">
            <h2 className="text-3xl sm:text-5xl font-['Black_Ops_One'] uppercase text-white tracking-[0.2em] drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              COMM<span className="text-[#00F0FF]">-</span>LINK
            </h2>
            <div className="mt-4 w-24 h-1 bg-[#00F0FF] mx-auto shadow-[0_0_10px_#00F0FF]"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 justify-center w-full">
            
            {/* Social Links Panel */}
            <div className="flex-1 bg-[#0a0f1a] border border-[#00F0FF]/30 p-8 relative group"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00F0FF] opacity-50"></div>
              <h3 className="text-[#00F0FF] font-['Orbitron'] font-bold text-xl mb-6 tracking-widest uppercase flex items-center gap-3">
                <Hexagon size={20} className="animate-[spin_4s_linear_infinite]" /> Network Hub
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://www.linkedin.com/company/techverse-club-ct-university/" className="flex items-center gap-4 text-gray-400 hover:text-[#00F0FF] transition-all p-3 bg-black/40 border border-[#00F0FF]/10 hover:border-[#00F0FF]/50 rounded-none group/link">
                  <Linkedin size={24} className="group-hover/link:scale-110 transition-transform" />
                  <span className="font-mono text-sm uppercase tracking-wider">LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/tech.versectu?igsh=czd1Z3Rrd24zdDFr" className="flex items-center gap-4 text-gray-400 hover:text-[#FF007F] transition-all p-3 bg-black/40 border border-[#FF007F]/10 hover:border-[#FF007F]/50 rounded-none group/link">
                  <Instagram size={24} className="group-hover/link:scale-110 transition-transform" />
                  <span className="font-mono text-sm uppercase tracking-wider">Instagram</span>
                </a>
                <a href="https://chat.whatsapp.com/Dj76TB35v07JFirQjgzMR6?mode=gi_t" className="flex items-center gap-4 text-gray-400 hover:text-[#25D366] transition-all p-3 bg-black/40 border border-[#25D366]/10 hover:border-[#25D366]/50 rounded-none group/link">
                  <MessageCircle size={24} className="group-hover/link:scale-110 transition-transform" />
                  <span className="font-mono text-sm uppercase tracking-wider">WhatsApp Comm</span>
                </a>
                <a href="mailto:techverse@ctuniversity.in?subject=Enquiry:%20Code%20Crafter%203.0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white transition-all p-3 bg-black/40 border border-white/10 hover:border-white/50 rounded-none group/link">
                  <Mail size={24} className="group-hover/link:scale-110 transition-transform shrink-0" />
                  <span className="font-mono text-[10px] sm:text-xs tracking-wider break-all">techverse@ctuniversity.in</span>
                </a>
              </div>
            </div>

            {/* Direct Lines Panel */}
            <div className="flex-1 bg-[#0a0f1a] border border-[#1A5BFF]/30 p-8 relative group"
                 style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#1A5BFF] opacity-50"></div>
              <h3 className="text-[#1A5BFF] font-['Orbitron'] font-bold text-xl mb-6 tracking-widest uppercase flex items-center gap-3">
                <Target size={20} className="animate-pulse" /> Direct Operators
              </h3>
              
              <div className="space-y-4">
                {[
                  { name: "Faculty Co-ordinator", phone: "+91 95305 80394" },
                  { name: "Student Co-ordinator", phone: "+91 9596217411" },
                  { name: "Student Coordinator", phone: "+91 79939 83771" }
                ].map((op, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-black/40 border border-[#1A5BFF]/10 hover:border-[#1A5BFF]/50 transition-colors group/op">
                    <div>
                      <div className="text-white font-['Orbitron'] tracking-wider text-sm">{op.name}</div>
                    </div>
                    <div className="flex items-center gap-2 text-[#1A5BFF] font-mono text-xs sm:text-sm whitespace-nowrap shrink-0 mt-1 sm:mt-0">
                      <Phone size={14} className="group-hover/op:animate-bounce shrink-0" />
                      <a href={`tel:${op.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{op.phone}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Orbitron:wght@400;700;900&display=swap');
        
        @keyframes hologramFloat {
          0%, 100% { transform: translateY(0) scale(1) rotateX(0deg); opacity: 0.8; }
          50% { transform: translateY(-10px) scale(1.05) rotateX(1deg); opacity: 1; }
        }
        @keyframes panImage {
          0% { object-position: 10% center; }
          100% { object-position: 90% center; }
        }
        @keyframes float-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loadingBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes reveal {
          from { opacity: 0; transform: scale(0.98) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tfHead {
          100% { transform: translateY(10px) scale(0.6, 1.5); background-color: #00F0FF; box-shadow: 0 0 20px #00F0FF; }
        }
        @keyframes tfBody {
          100% { transform: scale(0.8, 1.2); box-shadow: 0 0 30px #00F0FF; }
        }
        @keyframes tfLeftArm {
          100% { transform: rotate(-65deg) translate(-20px, -20px) scale(1.6, 0.9); background-color: #0c1220; border-color: #00F0FF; box-shadow: inset 0 0 15px rgba(0,240,255,0.5); }
        }
        @keyframes tfRightArm {
          100% { transform: rotate(65deg) translate(20px, -20px) scale(1.6, 0.9); background-color: #0c1220; border-color: #00F0FF; box-shadow: inset 0 0 15px rgba(0,240,255,0.5); }
        }
        @keyframes tfLeftLeg {
          100% { transform: translateY(-30px) translateX(12px) scale(0.6, 0.5); background-color: #000; box-shadow: 0 0 10px #00F0FF; border: 1px solid #00F0FF; border-top: none; }
        }
        @keyframes tfRightLeg {
          100% { transform: translateY(-30px) translateX(-12px) scale(0.6, 0.5); background-color: #000; box-shadow: 0 0 10px #00F0FF; border: 1px solid #00F0FF; border-top: none; }
        }
        @keyframes flyUpMobile {
          0%, 35% { transform: translate(0, 0) rotate(15deg); opacity: 1; }
          40% { transform: translate(5px, 15px) rotate(15deg); opacity: 1; }
          100% { transform: translate(60vw, -120vh) rotate(15deg); opacity: 1; }
        }
        @keyframes igniteTrailMobile {
          0%, 34% { opacity: 0; transform: scaleY(0.2); }
          35%, 100% { opacity: 1; transform: scaleY(8); }
        }
        @keyframes flyAcross {
          0%, 30% { transform: translate(0, 0) scale(0.6) rotate(0deg); opacity: 1; }
          35% { transform: translate(0, 0) scale(0.6) rotate(-90deg); opacity: 1; }
          45% { transform: translate(-30vw, 0) scale(0.6) rotate(-90deg); opacity: 1; }
          46%, 50% { transform: translate(110vw, -70vh) scale(0.4) rotate(-90deg); opacity: 0; }
          51% { transform: translate(110vw, -70vh) scale(0.4) rotate(-90deg); opacity: 1; }
          100% { transform: translate(-50vw, -70vh) scale(0.4) rotate(-90deg); opacity: 1; }
        }
        @keyframes igniteTrail {
          0%, 34% { opacity: 0; transform: scaleY(0.2); }
          35%, 45% { opacity: 1; transform: scaleY(1.5); }
          46%, 50% { opacity: 0; transform: scaleY(0.2); }
          51% { opacity: 1; transform: scaleY(2); }
          80%, 100% { opacity: 1; transform: scaleY(8); }
        }
        @keyframes blastFade {
          100% { opacity: 0; visibility: hidden; }
        }
        @keyframes flashOpacity {
          100% { opacity: 0.8; }
        }
        @keyframes flashBg {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes autobotPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 20px rgba(0,240,255,0.4)); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 40px rgba(0,240,255,0.8)); }
        }
        /* Transformer Mechanical Animations */
        @keyframes gearSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gearSpinReverse {
          from { transform:    rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes mechPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes slideLeft {
          0% { transform: translateX(200%); }
          50% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes mechScan {
          0% { top: -5%; opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { top: 105%; opacity: 0; }
        }
        @keyframes mechScanV {
          0% { left: -5%; opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { left: 105%; opacity: 0; }
        }
        @keyframes mechSpark {
          0%, 100% { opacity: 0; transform: scale(0); }
          30% { opacity: 1; transform: scale(1.5); }
          50% { opacity: 0.8; transform: scale(1); }
          70% { opacity: 1; transform: scale(2); }
          90% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(2); box-shadow: 0 0 6px #FFD54F; }
        }
        @keyframes rodPulse {
          0%, 100% { opacity: 0.3; height: 2px; }
          50% { opacity: 0.8; height: 3px; box-shadow: 0 0 8px rgba(0,240,255,0.5); }
        }
        
        /* Interactive Shatter Logic */
        @keyframes shatterLeft { 
          0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(-200px, 400px) rotate(-180deg); opacity: 0; } 
        }
        @keyframes shatterRight { 
          0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(200px, 400px) rotate(180deg); opacity: 0; } 
        }
        @keyframes shatterUp { 
          0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(0, -200px) rotate(90deg); opacity: 0; } 
        }
        @keyframes shatterDown { 
          0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(0, 500px) rotate(45deg); opacity: 0; } 
        }
      `}</style>
    </div>
  );
};

export default CodeCrafter;
