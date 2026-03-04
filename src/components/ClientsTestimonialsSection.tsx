import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const clientLogos = [
  "TechCorp",
  "InnovateCo",
  "CloudNine",
  "DataDrive",
  "PixelPerfect",
  "SwiftLogic",
  "BrightPath",
  "CoreStack",
];

const testimonials = [
  {
    quote:
      "Zap Technologies transformed our digital presence entirely. Their team delivered a stunning web platform that boosted our conversions by 40% within three months.",
    name: "Sarah Mitchell",
    role: "CEO, TechCorp",
    initials: "SM",
    rating: 5,
  },
  {
    quote:
      "Working with Zap was seamless from start to finish. Their AI-powered solution automated our workflows and saved us hundreds of hours every quarter.",
    name: "James Anderson",
    role: "CTO, InnovateCo",
    initials: "JA",
    rating: 5,
  },
  {
    quote:
      "The mobile app they built for us exceeded all expectations. Our user engagement skyrocketed and app store ratings went from 3.2 to 4.8 stars.",
    name: "Priya Sharma",
    role: "Product Manager, CloudNine",
    initials: "PS",
    rating: 5,
  },
];

const ClientsTestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 bg-muted/40">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Real stories from real clients — see the impact our work has had on businesses like yours.
          </p>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-accent" />
        </div>

        {/* Client Logos */}
        <div className="max-w-5xl mx-auto mb-20">
          <p className="text-center text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-8">
            Trusted by Leading Brands
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {clientLogos.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center h-20 rounded-xl border border-border bg-card px-6 transition-all duration-300 hover:shadow-md hover:border-primary/20"
              >
                <span className="text-lg font-bold tracking-wide text-muted-foreground/60 select-none">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl border border-border bg-card p-8 sm:p-12 text-center shadow-sm">
            <Quote className="mx-auto mb-6 h-10 w-10 text-primary/20" />

            {/* Star Rating */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>

            <p className="text-lg sm:text-xl leading-relaxed text-foreground/90 italic mb-8">
              "{testimonials[current].quote}"
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                {testimonials[current].initials}
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[current].role}
                </p>
              </div>
            </div>

            {/* Nav Arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-border hover:bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <Button variant="outline" size="lg">
              Read More Testimonials
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsTestimonialsSection;
