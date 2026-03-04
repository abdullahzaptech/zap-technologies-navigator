import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";

const team = [
  { name: "Alex Chen", role: "Founder & CEO", initials: "AC" },
  { name: "Sarah Mitchell", role: "Lead Developer", initials: "SM" },
  { name: "David Park", role: "Creative Director", initials: "DP" },
  { name: "Maria Lopez", role: "Project Manager", initials: "ML" },
];

const AboutTeam = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-widest uppercase text-primary mb-2"
          >
            The People Behind Zap
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
          >
            Meet Our Team
          </motion.h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-accent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group text-center rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20"
            >
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                {member.initials}
              </div>
              <h3 className="font-bold text-foreground text-lg mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
              <div className="flex justify-center gap-3">
                <a href="#" className="text-muted-foreground/50 hover:text-primary transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground/50 hover:text-primary transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
