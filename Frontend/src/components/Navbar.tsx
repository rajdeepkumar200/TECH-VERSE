import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import techverseLogo from "@/assets/techverse-logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cyberGlow, setCyberGlow] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "About us", path: "/about" },
    // { name: "Sponsors", path: "/sponsors" },
    { name: "Contact", path: "/contact" },
    { name: "CodeCrafter", path: "/events/codecrafter" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Listen for the custom event to highlight CodeCrafter
  useEffect(() => {
    const handleHighlight = () => {
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 3000); // Pop up available for 3 seconds
    };
    window.addEventListener('highlightCodeCrafter', handleHighlight);
    return () => window.removeEventListener('highlightCodeCrafter', handleHighlight);
  }, []);

  // Add the 2-second cyber glow effect periodically
  useEffect(() => {
    const triggerGlow = () => {
      setCyberGlow(true);
      setTimeout(() => setCyberGlow(false), 2000); // Effect lasts 2 seconds
    };
    
    const initialTimeout = setTimeout(triggerGlow, 2000);
    const interval = setInterval(triggerGlow, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isOpen || window.innerWidth >= 1024) return;

    function handleClickOutside(event: any) {
      if (menuRef.current && !(menuRef.current as any).contains(event.target) && toggleBtnRef.current && !(toggleBtnRef.current as any).contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const getNavItemClass = (item: any) => {
    const isCodeCrafter = item.name === "CodeCrafter";
    if (isActive(item.path)) {
      return "bg-gradient-to-br from-[#252D6F] to-[#4676E6] text-primary-foreground";
    }
    
    // During highlight mode, pulse extremely brightly!
    if (isCodeCrafter && isHighlighted) {
      return "font-['Orbitron'] text-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.8)] border border-[#00F0FF] bg-black/60 scale-110 tracking-[0.2em] font-bold animate-pulse z-10";
    }
    
    // Normal periodic cyber glow
    if (isCodeCrafter && cyberGlow) {
      return "font-['Orbitron'] text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.4)] border border-[#00F0FF]/60 bg-black/40 scale-105 tracking-wider transition-all duration-300";
    }
    
    return "text-foreground hover:bg-muted transition-all duration-300";
  };

  return (
    <>
      {/* Mobile Floating Highlight for CodeCrafter */}
      {isHighlighted && (
        <div className="lg:hidden fixed top-24 left-0 right-0 flex justify-center z-[60] animate-in fade-in slide-in-from-top-4 duration-500">
          <Link
            to="/codecrafter"
            onClick={() => setIsHighlighted(false)}
            className="font-['Orbitron'] text-[#00F0FF] shadow-[0_0_40px_rgba(0,240,255,1)] border-2 border-[#00F0FF] bg-black/90 px-8 py-4 rounded-xl scale-110 tracking-[0.2em] font-bold animate-[pulse_2s_infinite,hueRotate_4s_linear_infinite] text-center"
            style={{ textShadow: '0 0 10px rgba(0,240,255,0.8)' }}
          >
            CodeCrafter 3.0
          </Link>
        </div>
      )}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-2 relative">
            <Link to="/" className="flex items-center gap-2 group relative">
              <img
                src={techverseLogo}
                alt="Techverse Club"
                className="h-12 w-12 rounded-full object-cover transition-transform group-hover:scale-110"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  TechVerse
                </h1>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium ease-in-out ${getNavItemClass(item)}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={toggleBtnRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              isHighlighted && !isOpen 
                ? "text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.6)] border border-[#00F0FF] bg-black/40 animate-pulse scale-110"
                : "text-foreground hover:bg-muted"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={menuRef}
            className="lg:hidden py-4 space-y-2 animate-fade-in"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium ease-in-out ${getNavItemClass(item)}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
