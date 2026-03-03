import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio3 from "@/assets/portfolio-3.png";
import portfolio4 from "@/assets/portfolio-4.png";
import portfolio5 from "@/assets/portfolio-5.png";

const projects = [
  {
    image: portfolio1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "A full-featured online marketplace with inventory management, payment gateway integration, and real-time analytics dashboard.",
  },
  {
    image: portfolio2,
    title: "FinTech Mobile App",
    category: "Mobile App Development",
    description:
      "A secure mobile banking app with biometric authentication, real-time transactions, and smart budgeting tools.",
  },
  {
    image: portfolio3,
    title: "Healthcare SaaS Dashboard",
    category: "UI/UX Design",
    description:
      "A comprehensive patient management platform with appointment scheduling, data visualization, and compliance tracking.",
  },
  {
    image: portfolio4,
    title: "AI Analytics Platform",
    category: "AI Based SaaS",
    description:
      "Machine learning–powered analytics dashboard providing predictive insights and automated reporting for enterprises.",
  },
  {
    image: portfolio5,
    title: "Food Delivery App",
    category: "Mobile App Development",
    description:
      "A full-stack food delivery solution with real-time order tracking, restaurant management, and payment processing.",
  },
];

const PortfolioSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">
            Our Work
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Featured Projects
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-accent" />
        </div>

        {/* Projects Grid — 2 + 3 layout */}
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Top row — 2 large */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 2).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          {/* Bottom row — 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(2).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
          <Button size="lg" className="rounded-full px-8 text-base">
            See More Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 text-base"
          >
            Contact Us for Your Next Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
}: {
  project: (typeof projects)[number];
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
            {project.category}
          </span>
          <h3 className="text-lg font-bold text-primary-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-primary-foreground/80 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
      {/* Title bar visible by default */}
      <div className="p-4 transition-opacity duration-300 group-hover:opacity-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {project.category}
        </span>
        <h3 className="text-base font-bold text-card-foreground mt-1">
          {project.title}
        </h3>
      </div>
    </div>
  );
};

export default PortfolioSection;
