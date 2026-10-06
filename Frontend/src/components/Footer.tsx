import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import universityLogo from "@/assets/univeee-logo.png";
import techverseLogo from "@/assets/techverse-logo.jpg";
import { IoLogoWhatsapp, IoRocket } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-4">
                {/* University Logo - Clickable */}
                <a
                  href="https://ctuniversity.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={universityLogo}
                    alt="University"
                    className="h-12 w-12 rounded-full transition-transform duration-300 hover:scale-110 cursor-pointer"
                  />
                </a>

                {/* Rocket Icon */}
                <IoRocket className="text-[1.7rem] text-blue-500 drop-shadow-[0_0_8px_#00C6FF] transition-transform duration-300 hover:scale-125 cursor-pointer" />

                {/* TechVerse Logo */}
                <img
                  src={techverseLogo}
                  alt="Techverse"
                  className="h-12 w-12 rounded-full transition-transform duration-300 hover:scale-110 cursor-pointer"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground">TechVerse</h3>
            <p className="text-sm text-muted-foreground">
              Official tech club of CT University, fostering innovation, coding,
              and collaboration among students through workshops, hackathons,
              and projects.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "Events", "About", "Sponsors", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-primary"
                />
                <span>CT University, Punjab, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={18} className="flex-shrink-0 text-primary" />
                <span>
                  <a href="mailto:techverse@ctuniversity.in">
                    techverse@ctuniversity.in
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={18} className="flex-shrink-0 text-primary" />
                <span>+91 9766748860</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Follow Us</h4>

            <div className="flex gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/tech.versectu/"
                className="p-2 rounded-lg transition-all text-white transform hover:scale-110
               bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]
               hover:opacity-80"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/techverse-club-ct-university/"
                className="p-2 rounded-lg transition-all text-white transform hover:scale-110
               bg-[#0A66C2] hover:brightness-110 hover:opacity-80"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/TechVesrse-CT-University"
                className="p-2 rounded-lg transition-all text-white transform hover:scale-110
               bg-[#24292F] hover:brightness-110 hover:opacity-80"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>

              {/* WhatsApp */}
              <a
                href="https://chat.whatsapp.com/IiClyLPXlooJZWlJ66CnlN?mode=wwt"
                className="p-2 rounded-lg transition-all text-white transform hover:scale-110
               bg-[#25D366] hover:brightness-110 hover:opacity-80"
                aria-label="WhatsApp"
              >
                <IoLogoWhatsapp size={20} />
              </a>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Join our community and stay updated with the latest news and
              events.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-3 pt-2 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mt-2 -pt-6 -mb-">
            © {new Date().getFullYear()} Tech Verse club. All rights reserved.
            by School of Engineering and Technology, CT University.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
