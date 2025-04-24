
import { Dumbbell, Camera, LineChart } from "lucide-react";

const features = [
  {
    icon: <Dumbbell className="h-6 w-6 text-fit-purple" />,
    title: "Scientific Workout Plans",
    description: "Access scientifically designed exercise plans proven to be effective for your specific fitness goals.",
    bgColor: "bg-fit-purple/10",
    iconColor: "text-fit-purple"
  },
  {
    icon: <Camera className="h-6 w-6 text-fit-green" />,
    title: "Visual Progress Tracking",
    description: "Upload daily photos to create a personal journal of your fitness journey and see your transformation.",
    bgColor: "bg-fit-green/10",
    iconColor: "text-fit-green"
  },
  {
    icon: <LineChart className="h-6 w-6 text-fit-purple" />,
    title: "AI Form Analysis",
    description: "Get AI-powered insights on your form and body composition to help optimize your workout effectiveness.",
    bgColor: "bg-fit-purple/10",
    iconColor: "text-fit-purple"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-fit-purple to-fit-purple-light bg-clip-text text-transparent">
          Powerful Features
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in border border-gray-100 dark:border-gray-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`rounded-full ${feature.bgColor} w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
