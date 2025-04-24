import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { SUBSCRIPTION_TIERS, getSubscriptionStatus, createCheckoutSession, cancelSubscription } from '../services/stripe';
import { useAuth } from '../context/AuthContext';

interface Subscription {
  tierId: string;
  status: string;
  currentPeriodEnd: Date;
}

const Subscription: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (user) {
        const subscription = await getSubscriptionStatus();
        setCurrentSubscription(subscription);
      }
    };
    fetchSubscription();
  }, [user]);

  const handleSubscribe = async (tierId: string) => {
    try {
      setLoading(true);
      await createCheckoutSession(tierId);
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      await cancelSubscription();
      setCurrentSubscription(null);
    } catch (error) {
      console.error('Error canceling subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUBSCRIPTION_TIERS.map((tier) => (
          <Card
            key={tier.id}
            className={`relative ${
              currentSubscription?.tierId === tier.id ? 'border-primary' : ''
            }`}
          >
            {currentSubscription?.tierId === tier.id && (
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg">
                Current Plan
              </div>
            )}
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>
                ${tier.price}/{tier.interval}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {currentSubscription?.tierId === tier.id ? (
                <Button
                  variant="destructive"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Cancel Subscription
                </Button>
              ) : (
                <Button
                  onClick={() => handleSubscribe(tier.id)}
                  disabled={loading || Boolean(currentSubscription)}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Subscribe Now
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Subscription; 