import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-nav/90" />

      {/* Content */}
      <div className="relative z-10 container text-center px-4 py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-4xl mx-auto">
          <span className="text-primary-foreground">Empowering Businesses with</span>{" "}
          <span className="text-accent">Innovative Technology</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Custom software development, mobile apps, and cloud-based solutions that accelerate growth.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="cta" size="lg" className="rounded-full px-8 text-base">
            Get a Quote
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            See Our Work
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary-foreground/60" />
      </div>
    </section>
  );
};

export default HeroSection;
