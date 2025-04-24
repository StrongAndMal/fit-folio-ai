import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { AlertCircle } from 'lucide-react';

const SubscriptionCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-16 text-center">
      <div className="max-w-md mx-auto">
        <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Subscription Cancelled</h1>
        <p className="text-gray-600 mb-8">
          Your subscription has been cancelled. You will continue to have access to premium features until the end of your current billing period.
        </p>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => navigate('/subscription')}>
            View Plans
          </Button>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCancel; 