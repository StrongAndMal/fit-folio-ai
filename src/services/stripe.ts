import { loadStripe } from '@stripe/stripe-js';
import { auth } from '../firebase/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  interval: 'month' | 'year';
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    features: [
      'Basic pose analysis',
      'Progress tracking',
      'Basic form feedback',
      'Monthly progress reports'
    ],
    interval: 'month'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    features: [
      'Advanced pose analysis',
      'Detailed form feedback',
      'Custom workout plans',
      'Weekly progress reports',
      'Priority support'
    ],
    interval: 'month'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199.99,
    features: [
      'All Pro features',
      'Personalized coaching',
      'Nutrition planning',
      '1-on-1 support',
      'Annual savings'
    ],
    interval: 'year'
  }
];

export const createCheckoutSession = async (tierId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe failed to initialize');

  const response = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await user.getIdToken()}`
    },
    body: JSON.stringify({
      tierId,
      userId: user.uid,
      successUrl: `${window.location.origin}/subscription/success`,
      cancelUrl: `${window.location.origin}/subscription/cancel`
    })
  });

  const session = await response.json();
  return stripe.redirectToCheckout({ sessionId: session.id });
};

export const getSubscriptionStatus = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const userDoc = await getDoc(doc(db, 'users', user.uid));
  return userDoc.data()?.subscription || null;
};

export const cancelSubscription = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cancel-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await user.getIdToken()}`
    },
    body: JSON.stringify({ userId: user.uid })
  });

  if (!response.ok) throw new Error('Failed to cancel subscription');

  // Update local subscription status
  await updateDoc(doc(db, 'users', user.uid), {
    subscription: null
  });
}; 