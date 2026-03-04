import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const defaults = {
  headline: "Empowering Businesses with",
  headline_accent: "Innovative Technology",
  subheadline: "Custom software development, mobile apps, and cloud-based solutions that accelerate growth.",
  cta_text: "Get a Quote",
  cta_link: "/contact",
};

const HeroSection = () => {
  const { data: content } = useQuery({
    queryKey: ['public-site-content', 'hero'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_content').select('content').eq('section_key', 'hero').maybeSingle();
      if (error) throw error;
      return data?.content as Record<string, string> | null;
    },
    staleTime: 5 * 60 * 1000,
  });

  const headline = content?.headline || defaults.headline;
  const subheadline = content?.subheadline || defaults.subheadline;
  const ctaText = content?.cta_text || defaults.cta_text;
  const ctaLink = content?.cta_link || defaults.cta_link;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-nav">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(217_90%_25%)_0%,_hsl(220_40%_10%)_60%,_hsl(220_30%_6%)_100%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_30%,_hsl(217_90%_60%)_0%,_transparent_50%),radial-gradient(circle_at_80%_70%,_hsl(217_90%_50%)_0%,_transparent_40%)]" />

      <div className="relative z-10 container text-center px-4 py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-4xl mx-auto">
          <span className="text-primary-foreground">{headline}</span>{" "}
          <span className="text-accent">{content?.headline_accent || defaults.headline_accent}</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="cta" size="lg" className="rounded-full px-8 text-base" asChild>
            <a href={ctaLink}>{ctaText}</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 text-base bg-primary-foreground text-nav font-semibold border-none hover:bg-primary-foreground/90 hover:text-nav"
            asChild
          >
            <a href="/portfolio">See Our Work</a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary-foreground/60" />
      </div>
    </section>
  );
};

export default HeroSection;
