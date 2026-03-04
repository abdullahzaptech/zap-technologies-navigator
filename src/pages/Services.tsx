import Header from "@/components/Header";
import ServicesSection from "@/components/ServicesSection";
import ServiceDetails from "@/components/ServiceDetails";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ServicesSection />
      <ServiceDetails />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Services;
