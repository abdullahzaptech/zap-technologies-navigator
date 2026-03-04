import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-primary">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container px-4 relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto mb-10 text-lg">
          Let's bring your vision to life. Get in touch with our team for a free, no-obligation consultation.
        </p>
        <Button variant="cta" size="lg" className="text-base px-10 py-6">
          Get a Free Consultation
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
