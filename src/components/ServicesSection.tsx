import { Button } from "@/components/ui/button";
import { Globe, Smartphone, Lightbulb, Cloud } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Responsive websites designed to convert visitors into loyal customers.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Seamless apps for iOS and Android that users love.",
  },
  {
    icon: Lightbulb,
    title: "IT Consulting",
    description: "Strategic IT solutions that drive business success and efficiency.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Efficient and secure cloud-based infrastructure for scale.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Our Expertise
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-accent" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Button size="lg" className="rounded-full px-8 text-base">
            Explore Our Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
