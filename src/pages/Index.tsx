
import { Button } from '@/components/ui/button';
import { Dumbbell, Camera, ChevronRight, LineChart, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <Dumbbell className="h-16 w-16 mb-6 text-fit-purple mx-auto" />
          <h1 className="text-4xl font-bold mb-6 tracking-tight sm:text-5xl md:text-6xl">
            Your AI-Powered <span className="text-fit-purple">Fitness Journey</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Track workouts, monitor progress, and get AI-powered insights to achieve your fitness goals faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-fit-purple hover:bg-fit-purple-dark text-lg"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
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
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-fit-purple/10 w-12 h-12 flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-fit-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Scientific Workout Plans</h3>
              <p className="text-gray-600">
                Access scientifically designed exercise plans proven to be effective for your specific fitness goals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-fit-green/10 w-12 h-12 flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-fit-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visual Progress Tracking</h3>
              <p className="text-gray-600">
                Upload daily photos to create a personal journal of your fitness journey and see your transformation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-fit-purple/10 w-12 h-12 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-fit-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Form Analysis</h3>
              <p className="text-gray-600">
                Get AI-powered insights on your form and body composition to help optimize your workout effectiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-2">What Our Users Say</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their fitness journey with FitFolio AI.
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Alex Chen</h4>
                  <p className="text-sm text-gray-500">Lost 15kg in 6 months</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The visual progress tracking has been a game-changer for me. Seeing my transformation week by week keeps me motivated!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Fitness enthusiast</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The AI form analysis helped me correct my squat form. I'm now lifting heavier with no back pain!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Mike Rodriguez</h4>
                  <p className="text-sm text-gray-500">Personal trainer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I recommend FitFolio AI to all my clients. It helps them stay accountable between our sessions and provides valuable data for me to optimize their training."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-2">Simple, Transparent Pricing</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose the plan that works best for your fitness journey
          </p>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Free Plan */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Free</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Perfect for beginners</p>
              </div>
              
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-fit-green mr-2 flex-shrink-0" />
                  <span>Basic workout library</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-fit-green mr-2 flex-shrink-0" />
                  <span>Limited progress tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-fit-green mr-2 flex-shrink-0" />
                  <span>Community access</span>
                </li>
              </ul>
              
              <Button variant="outline" onClick={() => navigate('/signup')}>
                Get Started
              </Button>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-fit-purple text-white p-6 rounded-lg border-2 border-fit-purple shadow-lg flex flex-col relative transform md:scale-105">
              <div className="absolute -top-4 right-0 left-0 flex justify-center">
                <span className="bg-fit-green text-xs text-white font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Premium</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="opacity-80 ml-1">/month</span>
                </div>
                <p className="text-sm opacity-80 mt-2">For dedicated fitness enthusiasts</p>
              </div>
              
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                  <span>Full workout library</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                  <span>Unlimited progress tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                  <span>Basic AI form analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                  <span>Custom workout plans</span>
                </li>
              </ul>
              
              <Button variant="secondary" onClick={() => navigate('/signup')}>
                Get Premium
              </Button>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Pro</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">$19.99</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">For serious athletes</p>
              </div>
              
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-fit-green mr-2 flex-shrink-0" />
                  <span>Everything in Premium</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-fit-green mr-2 flex-shrink-0" />
                  <span>Advanced AI form analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-fit-green mr-2 flex-shrink-0" />
                  <span>1-on-1 coach consultation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-fit-green mr-2 flex-shrink-0" />
                  <span>Nutrition planning</span>
                </li>
              </ul>
              
              <Button variant="outline" onClick={() => navigate('/signup')}>
                Get Pro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-fit-purple text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are achieving their fitness goals with FitFolio AI.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/signup')}
            className="text-lg"
          >
            Start Your Free Trial
            <Users className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <Dumbbell className="h-6 w-6 text-fit-purple mr-2" />
                <span className="text-white font-bold text-xl">FitFolio AI</span>
              </div>
              <p className="max-w-xs">
                Your AI-powered fitness companion for tracking workouts and monitoring progress.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-white font-bold mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">Testimonials</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                  <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800 text-sm text-center">
            <p>© 2024 FitFolio AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
