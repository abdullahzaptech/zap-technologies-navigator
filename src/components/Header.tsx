import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", active: true },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Hire a Developer", href: "/hire" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-nav/95 backdrop-blur-md shadow-lg" : "bg-nav"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent">
            <Zap className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-nav-foreground">
            Zap <span className="text-accent">Technologies</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                item.active
                  ? "text-nav-active"
                  : "text-nav-foreground/80 hover:text-nav-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button variant="cta" size="sm" className="hidden sm:inline-flex rounded-full px-5">
            Get a Quote
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-nav-foreground p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-nav border-t border-nav-foreground/10 pb-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`block px-6 py-3 text-sm font-semibold transition-colors ${
                item.active
                  ? "text-nav-active"
                  : "text-nav-foreground/80 hover:text-nav-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="px-6 pt-2">
            <Button variant="cta" size="sm" className="w-full rounded-full">
              Get a Quote
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
