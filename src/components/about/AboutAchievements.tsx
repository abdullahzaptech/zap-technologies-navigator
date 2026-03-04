import { motion } from "framer-motion";
import { Award, Star, BadgeCheck, Quote } from "lucide-react";

const achievements = [
  { icon: Award, title: "Best Tech Start-Up 2020", description: "Recognized for innovation and excellence in technology solutions." },
  { icon: BadgeCheck, title: "Google Developer Partner", description: "Certified as a Professional Developer Partner by Google." },
  { icon: Star, title: "100+ Projects Delivered", description: "Successfully completed projects across web, mobile, and AI." },
  { icon: Award, title: "Best Tech Solutions 2024", description: "Awarded 'Best Tech Solutions Provider' by TechReview." },
];

const testimonials = [
  { quote: "Zap Technologies transformed our digital presence entirely. Their team delivered a stunning platform that boosted conversions by 40%.", name: "Sarah Mitchell", role: "CEO, TechCorp" },
  { quote: "Working with Zap was seamless. Their AI-powered solution automated our workflows and saved us hundreds of hours.", name: "James Anderson", role: "CTO, InnovateCo" },
];

const AboutAchievements = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Blue gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(230,70%,30%)]" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-[10%] h-20 w-20 rounded-full border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-[8%] h-24 w-24 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm rotate-12"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />

      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-widest uppercase text-accent mb-2"
          >
            What We've Achieved
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground"
          >
            Our Success Stories
          </motion.h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-accent" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-primary-foreground/10"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-primary-foreground text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-primary-foreground/60 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm"
            >
              <Quote className="h-8 w-8 text-accent/40 mb-4" />
              <p className="text-sm text-primary-foreground/80 italic leading-relaxed mb-4">"{t.quote}"</p>
              <div>
                <p className="font-semibold text-primary-foreground text-sm">{t.name}</p>
                <p className="text-xs text-primary-foreground/50">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutAchievements;
