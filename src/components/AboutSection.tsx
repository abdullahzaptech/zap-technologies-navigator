import { SearchCheck, PenLine, Rocket } from "lucide-react";
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
    <section className="py-24 bg-[hsl(35,60%,96%)]">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left — Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-[340px] h-[420px] sm:w-[400px] sm:h-[500px] rounded-full bg-[hsl(35,50%,92%)] overflow-hidden flex items-end justify-center">
                <img
                  src={aboutPerson}
                  alt="Zap Technologies team member"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Right — Text + Cards */}
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">
              Welcome to Zap Technologies
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Building Websites & Apps That Help Your Business Grow
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Welcome to Zap Technologies, a technology partner helping startups
              and businesses build websites, mobile apps, and reliable digital
              solutions.
            </p>

            <div className="space-y-5">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
