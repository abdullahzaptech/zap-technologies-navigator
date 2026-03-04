import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import zapLogo from "@/assets/zap-logo.png";

const fallbackNavItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Hire a Developer", href: "/hire" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: dbLinks = [] } = useQuery({
    queryKey: ['public-header-links'],
    queryFn: async () => {
      const { data, error } = await supabase.from('managed_links').select('*').eq('category', 'header').order('sort_order');
      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const navItems = dbLinks.length > 0
    ? dbLinks.map(l => ({ label: l.name, href: l.url, target: l.target || '_self' }))
    : fallbackNavItems.map(l => ({ ...l, target: '_self' }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-nav/95 backdrop-blur-md shadow-lg" : "bg-nav"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center gap-2 group">
          <img src={zapLogo} alt="Zap Technologies" className="h-14 md:h-16 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.target}
              className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                currentPath === item.href
                  ? "text-nav-active"
                  : "text-nav-foreground/80 hover:text-nav-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="cta" size="sm" className="hidden sm:inline-flex rounded-full px-5" asChild>
            <a href="/contact">Get a Quote</a>
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

      {mobileOpen && (
        <nav className="lg:hidden bg-nav border-t border-nav-foreground/10 pb-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.target}
              className={`block px-6 py-3 text-sm font-semibold transition-colors ${
                currentPath === item.href
                  ? "text-nav-active"
                  : "text-nav-foreground/80 hover:text-nav-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="px-6 pt-2">
            <Button variant="cta" size="sm" className="w-full rounded-full" asChild>
              <a href="/contact">Get a Quote</a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
