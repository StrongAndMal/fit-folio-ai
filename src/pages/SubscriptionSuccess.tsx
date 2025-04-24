import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { CheckCircle } from 'lucide-react';

const SubscriptionSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-16 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Subscription Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for subscribing to FitFolio AI. You now have access to all premium features.
        </p>
        <Button onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionSuccess; 