import { X, ExternalLink, ArrowRight, Code, Wrench, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ProjectData } from "@/data/portfolioData";

interface ProjectModalProps {
  project: ProjectData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectModal = ({ project, open, onOpenChange }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Header Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent bg-foreground/40 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
              {project.category}
            </span>
            <DialogTitle className="text-2xl font-bold text-primary-foreground">
              {project.title}
            </DialogTitle>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Description */}
          <div>
            <h3 className="font-bold text-foreground mb-2">Project Overview</h3>
            <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Technologies Used
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Languages & Frameworks</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.languages.map((lang) => (
                    <span key={lang} className="text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Tools & Platforms</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.tools.map((tool) => (
                    <span key={tool} className="text-xs font-medium bg-accent/20 text-accent-foreground px-3 py-1.5 rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h4 className="font-bold text-foreground text-sm">Challenge</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-5 w-5 text-accent-foreground" />
                <h4 className="font-bold text-foreground text-sm">Solution</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Results */}
          <div>
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Results & Impact
            </h3>
            <div className="space-y-2">
              {project.results.map((result) => (
                <div key={result} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {project.projectLink && (
              <Button size="lg" className="group">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit the Project
              </Button>
            )}
            <Button variant="cta" size="lg" className="group">
              Start Your Project
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
