
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Basic workout tracking",
      "Progress photos",
      "Basic AI form analysis",
      "Community support"
    ]
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Best for fitness enthusiasts",
    features: [
      "Advanced workout tracking",
      "Detailed progress analytics",
      "Advanced AI form analysis",
      "Premium support",
      "Custom workout plans"
    ],
    highlighted: true
  },
  {
    name: "Elite",
    price: "$19.99",
    description: "For professional athletes",
    features: [
      "Everything in Pro",
      "1-on-1 coaching",
      "Nutrition planning",
      "Priority support",
      "Custom analytics dashboard"
    ]
  }
];

const PricingSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-fit-purple to-fit-purple-light bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Choose the perfect plan for your fitness journey
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in
                ${plan.highlighted ? 
                  'border-2 border-fit-purple bg-white dark:bg-gray-800 ring-2 ring-fit-purple/20' : 
                  'border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Free" && <span className="text-gray-500">/month</span>}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
              <Button 
                className={`w-full mb-6 ${plan.highlighted ? 'bg-fit-purple hover:bg-fit-purple-dark' : ''}`}
                variant={plan.highlighted ? "default" : "outline"}
              >
                Get Started
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-fit-purple flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
