import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SubscriptionTier = 'free' | 'pro' | 'business';

export interface SubscriptionLimits {
  maxListings: number;
  analytics: 'basic' | 'detailed' | 'advanced';
  priorityPlacement: boolean;
  featuredOnHomepage: boolean;
  verifiedBadge: boolean;
  dynamicPricing: boolean;
  apiAccess: boolean;
}

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  price: number;
  limits: SubscriptionLimits;
  features: string[];
}

interface SubscriptionContextType {
  currentPlan: SubscriptionPlan;
  availablePlans: SubscriptionPlan[];
  upgradeToPlan: (tier: SubscriptionTier) => void;
  canAddListing: (currentCount: number) => boolean;
  hasFeature: (feature: keyof SubscriptionLimits) => boolean;
}

const plans: SubscriptionPlan[] = [
  {
    tier: 'free',
    name: 'Free',
    price: 0,
    limits: {
      maxListings: 2,
      analytics: 'basic',
      priorityPlacement: false,
      featuredOnHomepage: false,
      verifiedBadge: false,
      dynamicPricing: false,
      apiAccess: false,
    },
    features: [
      'List up to 2 properties',
      'Basic analytics',
      'Standard search placement',
      'Email support',
    ],
  },
  {
    tier: 'pro',
    name: 'Pro',
    price: 49,
    limits: {
      maxListings: 10,
      analytics: 'detailed',
      priorityPlacement: true,
      featuredOnHomepage: false,
      verifiedBadge: true,
      dynamicPricing: false,
      apiAccess: false,
    },
    features: [
      'Up to 10 active listings',
      'Priority placement in search',
      'Detailed analytics & Orca Score insights',
      'Verified host badge',
      'Priority email support',
      'Booking insights',
    ],
  },
  {
    tier: 'business',
    name: 'Business',
    price: 99,
    limits: {
      maxListings: Infinity,
      analytics: 'advanced',
      priorityPlacement: true,
      featuredOnHomepage: true,
      verifiedBadge: true,
      dynamicPricing: true,
      apiAccess: true,
    },
    features: [
      'Unlimited listings',
      'Featured on homepage',
      'Dynamic pricing suggestions',
      'Advanced analytics & insights',
      'API access for bulk management',
      'Verified host badge',
      'Dedicated account manager',
      '24/7 priority support',
    ],
  },
];

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>(plans[0]); // Start with free

  const upgradeToPlan = (tier: SubscriptionTier) => {
    const plan = plans.find(p => p.tier === tier);
    if (plan) {
      setCurrentPlan(plan);
    }
  };

  const canAddListing = (currentCount: number): boolean => {
    return currentCount < currentPlan.limits.maxListings;
  };

  const hasFeature = (feature: keyof SubscriptionLimits): boolean => {
    return !!currentPlan.limits[feature];
  };

  return (
    <SubscriptionContext.Provider
      value={{
        currentPlan,
        availablePlans: plans,
        upgradeToPlan,
        canAddListing,
        hasFeature,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
