
import { Button } from "@/components/ui/button";
import { Dumbbell, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="relative py-20 sm:py-32 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-fit-purple/20 animate-pulse" />
              <Dumbbell className="relative h-16 w-16 mb-6 text-fit-purple animate-fade-in" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6 tracking-tight sm:text-5xl md:text-6xl animate-fade-in">
            Your AI-Powered{" "}
            <span className="bg-gradient-to-r from-fit-purple to-fit-purple-light bg-clip-text text-transparent">
              Fitness Journey
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in">
            Track workouts, monitor progress, and get AI-powered insights to achieve your fitness goals faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-fit-purple hover:bg-fit-purple-dark text-lg group"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/login')}
              className="text-lg"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
