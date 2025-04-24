
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "FitFolio AI has completely transformed my workout routine. The AI-powered insights are incredible!",
    author: "Sarah Johnson",
    role: "Fitness Enthusiast",
    avatar: "/placeholder.svg"
  },
  {
    quote: "The progress tracking features help me stay motivated and consistent with my fitness goals.",
    author: "Mike Chen",
    role: "Personal Trainer",
    avatar: "/placeholder.svg"
  },
  {
    quote: "Best fitness app I've ever used. The AI form analysis is like having a personal trainer!",
    author: "Emma Davis",
    role: "Yoga Instructor",
    avatar: "/placeholder.svg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-fit-purple to-fit-purple-light bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.author}
              className="relative p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in border border-gray-100 dark:border-gray-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-fit-purple opacity-20" />
              <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
