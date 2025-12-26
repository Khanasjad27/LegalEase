import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import UserMenu from "@/components/UserMenu";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/get-help", label: t("nav.getLegalHelp") },
    { href: "/legal-bridge", label: t("nav.legalBridge") },
    { href: "/topics", label: t("nav.legalTopics") },
    { href: "/templates", label: t("nav.legalTemplates") },
    { href: "/how-it-works", label: t("nav.howItWorks") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-card group-hover:shadow-elevated transition-shadow">
              <Scale className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Legal<span className="text-accent">Ease</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={location.pathname === link.href ? "navActive" : "nav"}
                  size="sm"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* CTA Button, Language Selector & User Menu - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector />
            <UserMenu />
            <Link to="/get-help">
              <Button variant="accent" size="default">
                {t("nav.getHelpNow")}
              </Button>
            </Link>
          </div>

          {/* Mobile: Language Selector, User Menu & Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSelector />
            <UserMenu />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    <Button
                      variant={location.pathname === link.href ? "navActive" : "nav"}
                      className="w-full justify-start"
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <div className="pt-4">
                  <Link to="/get-help" onClick={() => setIsOpen(false)}>
                    <Button variant="accent" className="w-full">
                      {t("nav.getHelpNow")}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
