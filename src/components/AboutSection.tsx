import { SearchCheck, PenLine, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import aboutPerson from "@/assets/about-person.png";

const features = [
  {
    icon: SearchCheck,
    title: "Product & Market Understanding",
    description:
      "We analyze your business goals and users to build digital solutions that actually fit your market.",
  },
  {
    icon: PenLine,
    title: "Design & Development",
    description:
      "We design and develop modern websites and mobile apps that are fast, secure, and easy to scale.",
  },
  {
    icon: Rocket,
    title: "Launch & Growth",
    description:
      "We help you launch confidently and grow with ongoing support, marketing, and optimization.",
  },
];

const AboutSection = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Blue gradient background matching CTA */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(230,70%,30%)]" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-[8%] h-20 w-20 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-20 left-[5%] h-28 w-28 rounded-full border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm"
        />
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-[340px] h-[420px] sm:w-[400px] sm:h-[500px] rounded-full bg-primary-foreground/10 overflow-hidden flex items-end justify-center border border-primary-foreground/10">
                <img
                  src={aboutPerson}
                  alt="Zap Technologies team member"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

          {/* Right — Text + Cards */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold tracking-widest uppercase text-accent mb-2"
            >
              Welcome to Zap Technologies
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-4"
            >
              Building Websites & Apps That Help Your Business{" "}
              <span className="text-accent">Grow</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-primary-foreground/70 leading-relaxed mb-8"
            >
              Welcome to Zap Technologies, a technology partner helping startups
              and businesses build websites, mobile apps, and reliable digital
              solutions.
            </motion.p>

            <div className="space-y-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex gap-4 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-primary-foreground/10 hover:border-primary-foreground/20"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-primary-foreground/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
