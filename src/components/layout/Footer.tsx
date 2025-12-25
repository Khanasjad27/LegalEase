import { Link } from "react-router-dom";
import { Scale, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Legal<span className="text-teal-light">Ease</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Legal help shouldn't be confusing. We make it simple for India's youth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/get-help", label: "Get Legal Help" },
                { href: "/topics", label: "Legal Topics" },
                { href: "/templates", label: "Templates" },
                { href: "/how-it-works", label: "How It Works" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Issues */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Common Issues</h4>
            <ul className="space-y-2">
              {[
                "Rent Disputes",
                "Online Scams",
                "Job Fraud",
                "Consumer Rights",
              ].map((topic) => (
                <li key={topic}>
                  <Link
                    to="/topics"
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">About</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <span className="text-primary-foreground/70 text-sm">
                  Built by Team NeuroX
                </span>
              </li>
              <li>
                <span className="text-primary-foreground/70 text-sm">
                  Hackathon Project
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="bg-primary-foreground/5 rounded-xl p-4 mb-8">
            <p className="text-primary-foreground/60 text-xs leading-relaxed text-center">
              <strong className="text-primary-foreground/80">Disclaimer:</strong> LegalEase provides guidance and clarity, not legal advice. For specific legal matters, please consult a qualified legal professional.
              <br />
              <span className="block mt-2">
                <strong>हिंदी:</strong> LegalEase कानूनी सलाह नहीं, मार्गदर्शन और स्पष्टता प्रदान करता है।
              </span>
              <span className="block mt-1">
                <strong>मराठी:</strong> LegalEase कायदेशीर सल्ला देत नाही, मार्गदर्शन आणि स्पष्टता प्रदान करते.
              </span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© 2024 LegalEase. Designed for India's Youth.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-teal-light fill-teal-light" /> by Team NeuroX
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
