import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ClientsTestimonialsSection from "@/components/ClientsTestimonialsSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ClientsTestimonialsSection />
      <AboutSection />
      <PortfolioSection />
    </div>
  );
};

export default Index;
