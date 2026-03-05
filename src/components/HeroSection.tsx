import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Pen, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import aboutPerson from "@/assets/about-person.png";

const defaults = {
  headline: "Building Websites & Apps That Help Your Business",
  headline_accent: "Grow",
  subheadline: "Welcome to Zap Technologies, a technology partner helping startups and businesses build websites, mobile apps, and reliable digital solutions.",
  cta_text: "Get Started",
  cta_link: "/contact",
};

const features = [
  {
    icon: Search,
    title: "Product & Market Understanding",
    description: "We analyze your business goals and users to build digital solutions that actually fit your market.",
  },
  {
    icon: Pen,
    title: "Design & Development",
    description: "We design and develop modern websites and mobile apps that are fast, secure, and easy to scale.",
  },
  {
    icon: Rocket,
    title: "Launch & Growth",
    description: "We help you launch confidently and grow with ongoing support, marketing, and optimization.",
  },
];

const HeroSection = () => {
  const { data: content } = useQuery({
    queryKey: ["public-site-content", "hero"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("section_key", "hero")
        .maybeSingle();
      if (error) throw error;
      return data?.content as Record<string, string> | null;
    },
    staleTime: 5 * 60 * 1000,
  });

  const headline = content?.headline || defaults.headline;
  const headlineAccent = content?.headline_accent || defaults.headline_accent;
  const subheadline = content?.subheadline || defaults.subheadline;
  const ctaText = content?.cta_text || defaults.cta_text;
  const ctaLink = content?.cta_link || defaults.cta_link;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-24 pb-16">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="container px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Image with glow */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-center order-2 lg:order-1"
          >
            {/* Glow circle behind person */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full bg-accent/20 blur-[2px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full bg-accent/10" />
            
            {/* Floating decorative elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 right-8 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm"
            />
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-12 -left-4 w-12 h-12 rounded-full bg-accent/15 border border-accent/25"
            />
            
            <img
              src={aboutPerson}
              alt="Zap Technologies team member"
              className="relative z-10 w-[280px] sm:w-[360px] md:w-[420px] object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-4"
            >
              Welcome to Zap Technologies
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold leading-[1.15] tracking-tight text-foreground"
            >
              {headline}{" "}
              <span className="text-primary relative inline-block">
                {headlineAccent}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/30 rounded-full origin-left"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              {subheadline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                variant="default"
                size="lg"
                className="rounded-full px-8 py-6 text-base group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                asChild
              >
                <a href={ctaLink}>
                  {ctaText}
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-base border-border hover:bg-muted transition-all duration-300"
                asChild
              >
                <a href="/portfolio">View Our Work</a>
              </Button>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 space-y-4"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 cursor-default"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
