import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Spacer for fixed header */}
      <div className="pt-20">
        <section className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Welcome to <span className="text-primary">Zap</span>{" "}
              <span className="text-accent">Technologies</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Building innovative digital solutions for the modern world.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
