
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-fit-purple to-fit-purple-dark text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are achieving their fitness goals with FitFolio AI.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/signup')}
            className="text-lg animate-fade-in"
          >
            Start Your Free Trial
            <Users className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
