import { Button } from "@/components/ui/button";
import { Globe, Smartphone, Palette, Wrench, PenTool, Megaphone, Search, BrainCircuit, Bot, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
    icon: Palette,
    title: "UI/UX Design",
    description: "Intuitive and beautiful interfaces that delight users.",
  },
  {
    icon: Wrench,
    title: "Website Maintenance & Services",
    description: "Reliable upkeep and support to keep your site running smoothly.",
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    description: "Stunning visuals and branding that make a lasting impression.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven campaigns that grow your reach and revenue.",
  },
  {
    icon: Search,
    title: "Search Engine Optimisation",
    description: "Boost your rankings and drive organic traffic to your site.",
  },
  {
    icon: Bot,
    title: "AI Based App",
    description: "Intelligent applications powered by cutting-edge AI technology.",
  },
  {
    icon: BrainCircuit,
    title: "AI Based SaaS Products",
    description: "Scalable AI-driven software solutions for modern businesses.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        {/* Page Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold tracking-widest uppercase text-primary mb-2"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed mb-6"
          >
            At Zap Technologies, we specialize in delivering cutting-edge software development, cloud-based solutions, and IT consulting services to help businesses accelerate growth and innovation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Button variant="cta" size="lg" className="rounded-full px-8 text-base group">
              Get a Quote
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
          <div className="mt-8 mx-auto w-16 h-1 rounded-full bg-accent" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
