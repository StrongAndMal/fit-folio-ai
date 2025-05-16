import { Button } from "@/components/ui/button";
import { motion, MotionConfig } from "framer-motion";
import { Link } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const LandingPage = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen font-sans bg-white">
        {/* Header */}
        <header className="w-full bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-tight">FitFolio AI</Link>
            <nav className="hidden md:flex gap-8 text-base font-medium">
              <a href="#features" className="text-gray-700 hover:text-blue-700 transition">Features</a>
              <a href="#how" className="text-gray-700 hover:text-blue-700 transition">How It Works</a>
              <a href="#results" className="text-gray-700 hover:text-blue-700 transition">Results</a>
              <a href="#download" className="text-gray-700 hover:text-blue-700 transition">Download</a>
            </nav>
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="ghost" className="text-blue-700 font-semibold">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold">Sign Up</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-blue-600 to-blue-500 py-20" id="hero">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-white">
              <motion.h1 {...fadeInUp} className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                Your Smart Fitness Companion
              </motion.h1>
              <motion.p {...fadeInUp} className="text-lg md:text-xl mb-8 max-w-xl">
                FitFolio AI enhances your fitness journey by analyzing your progress through daily photos. Get personalized recommendations, track your transformation, and achieve your goals faster.
              </motion.p>
              <motion.div {...fadeInUp} className="flex gap-4">
                <Button className="bg-white text-blue-700 font-bold px-6 py-3 hover:bg-blue-50">Download Now</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 font-bold px-6 py-3">Learn More</Button>
              </motion.div>
            </div>
            <div className="flex-1 flex justify-center">
              <motion.img 
                {...fadeInUp}
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=500&q=80"
                alt="Fitness Hero"
                className="rounded-2xl shadow-2xl w-full max-w-md object-cover border-4 border-white"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-900">Supercharge Your Fitness Journey</h2>
            <p className="text-center text-lg text-gray-500 mb-12">FitFolio AI combines cutting-edge technology with proven fitness methods to deliver a premium experience that gets results.</p>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition"
                >
                  <div className="text-blue-600 text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-900">How FitFolio AI Works</h2>
            <p className="text-center text-lg text-gray-500 mb-12">Our simple 3-step process helps you achieve consistent progress with the power of AI technology.</p>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-xl shadow text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-3xl">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-500">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Results/Testimonials Section */}
        <section id="results" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-900">Real Results, Real People</h2>
            <p className="text-center text-lg text-gray-500 mb-12">See how FitFolio AI is helping people achieve their fitness goals faster and more effectively.</p>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {testimonials.map((t) => (
                <motion.div
                  key={t.name}
                  variants={fadeInUp}
                  className="bg-gray-50 p-8 rounded-xl shadow flex flex-col items-center text-center"
                >
                  <div className="flex mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-blue-200" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">{t.name}</div>
                      <div className="text-gray-500 text-sm">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Download Section */}
        <section id="download" className="py-20 bg-gradient-to-r from-blue-600 to-blue-500">
          <div className="container mx-auto px-6 text-center">
            <motion.h2 {...fadeInUp} className="text-4xl font-extrabold mb-6 text-white">Start Your Fitness Transformation Today</motion.h2>
            <motion.p {...fadeInUp} className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
              Download FitFolio AI and experience the future of personalized fitness training.
            </motion.p>
            <motion.div {...fadeInUp} className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a href="#" className="inline-flex items-center bg-white text-blue-700 font-bold px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition">
                {/* App Store Icon Placeholder */}
                <span className="mr-2"></span> App Store
              </a>
              <a href="#" className="inline-flex items-center bg-white text-blue-700 font-bold px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition">
                {/* Google Play Icon Placeholder */}
                <span className="mr-2">▶</span> Google Play
              </a>
            </motion.div>
            <div className="text-blue-100 mt-4 text-sm">Free 14-day trial · No credit card required · Cancel anytime</div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-200 py-12">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="text-2xl font-extrabold text-white mb-4">FitFolio AI</div>
              <p className="text-gray-400 mb-4">Your smart fitness companion for tracking progress and achieving goals.</p>
              <div className="flex gap-4">
                {/* Social Icons Placeholder */}
                <a href="#" className="hover:text-blue-400">🐦</a>
                <a href="#" className="hover:text-blue-400">📸</a>
                <a href="#" className="hover:text-blue-400">▶</a>
                <a href="#" className="hover:text-blue-400">📘</a>
              </div>
            </div>
            <div>
              <div className="font-bold mb-2">Product</div>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-blue-400">Features</a></li>
                <li><a href="#" className="hover:text-blue-400">Pricing</a></li>
                <li><a href="#download" className="hover:text-blue-400">Download</a></li>
                <li><a href="#" className="hover:text-blue-400">Updates</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-2">Resources</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400">Community</a></li>
                <li><a href="#" className="hover:text-blue-400">Fitness Tips</a></li>
                <li><a href="#" className="hover:text-blue-400">Support</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-2">Company</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-12 text-sm">© 2025 FitFolio AI. All rights reserved.</div>
        </footer>
      </div>
    </MotionConfig>
  );
};

const features = [
  {
    icon: "📸",
    title: "Daily Progress Photos",
    description: "Track your transformation with AI-analyzed progress photos that show real results over time.",
  },
  {
    icon: "📊",
    title: "Smart Progress Tracking",
    description: "Visualize improvements with detailed metrics and AI-powered insights on your fitness journey.",
  },
  {
    icon: "🏅",
    title: "Effective Workouts",
    description: "Access premium workout routines optimized for your goals and fitness level.",
  },
  {
    icon: "🧠",
    title: "AI Form Analysis",
    description: "Get real-time feedback on your exercise form and avoid injuries with advanced AI analysis.",
  },
  {
    icon: "⏱️",
    title: "Time-Efficient",
    description: "Optimize your workouts with personalized plans that fit your schedule.",
  },
  {
    icon: "⚡",
    title: "Personalized Recommendations",
    description: "Receive custom advice based on your unique progress and goals.",
  },
];

const steps = [
  {
    icon: "📸",
    title: "Take Daily Photos",
    description: "Capture your progress with consistent photos in our secure, private platform.",
  },
  {
    icon: "📈",
    title: "AI Analysis",
    description: "Our advanced AI analyzes your form, progress, and provides detailed insights.",
  },
  {
    icon: "💡",
    title: "Get Personalized Advice",
    description: "Receive custom recommendations based on your unique progress and goals.",
  },
];

const testimonials = [
  {
    name: "Sarah J.",
    role: "Fitness Enthusiast",
    quote: "FitFolio AI has completely transformed my workout routine. The form correction alone has helped me avoid injury and get better results.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael T.",
    role: "Busy Professional",
    quote: "As someone with limited time, the personalized workouts and progress tracking have been game-changers. I'm seeing results in half the time.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Aisha K.",
    role: "Marathon Runner",
    quote: "The AI analysis helped me identify imbalances in my running form that were causing recurring injuries. Now I'm running better than ever.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default LandingPage; 