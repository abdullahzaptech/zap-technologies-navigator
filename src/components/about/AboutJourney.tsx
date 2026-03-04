import { motion } from "framer-motion";

const milestones = [
  { year: "2015", title: "Founded", description: "Zap Technologies was founded with a vision to create cutting-edge software solutions for businesses of all sizes." },
  { year: "2017", title: "Mobile Expansion", description: "Expanded into mobile app development, delivering iOS and Android solutions to a growing client base." },
  { year: "2019", title: "50+ Projects Delivered", description: "Reached a major milestone of 50+ successfully delivered projects across multiple industries." },
  { year: "2021", title: "Cloud & AI Division", description: "Launched our cloud solutions and AI consulting division, embracing the future of technology." },
  { year: "2023", title: "Global Reach", description: "Expanded operations internationally, serving clients across 3 continents with a team of 30+ experts." },
  { year: "2025", title: "Industry Recognition", description: "Awarded 'Best Tech Solutions Provider' and partnered with leading cloud platforms." },
];

const AboutJourney = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(230,70%,30%)]" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-[8%] h-24 w-24 rounded-full border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-[6%] h-20 w-20 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm rotate-12"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />

      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-widest uppercase text-accent mb-2"
          >
            How We Got Here
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground"
          >
            Our Journey
          </motion.h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-accent" />
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-primary-foreground/15 sm:-translate-x-px" />

          <div className="space-y-12">
            {milestones.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:text-left"} pl-12 sm:pl-0`}>
                    <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-primary-foreground/10 hover:border-primary-foreground/20">
                      <span className="inline-block text-sm font-bold text-accent mb-1">{milestone.year}</span>
                      <h3 className="font-bold text-primary-foreground mb-2">{milestone.title}</h3>
                      <p className="text-sm text-primary-foreground/60 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 flex h-4 w-4 items-center justify-center">
                    <div className="h-4 w-4 rounded-full border-[3px] border-accent bg-primary" />
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutJourney;
