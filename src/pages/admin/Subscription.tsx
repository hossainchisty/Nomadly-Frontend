import HostNavigation from "@/components/HostNavigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";

const Subscription = () => {
  const { currentPlan, availablePlans, upgradeToPlan } = useSubscription();

  const handleUpgrade = (tier: 'free' | 'pro' | 'business') => {
    upgradeToPlan(tier);
    toast.success(`Successfully ${tier === 'free' ? 'downgraded' : 'upgraded'} to ${tier.charAt(0).toUpperCase() + tier.slice(1)} plan!`);
  };

  const getPlanIcon = (tier: string) => {
    switch (tier) {
      case 'pro':
        return <Zap className="w-5 h-5" />;
      case 'business':
        return <Crown className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <HostNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Subscription Plans</h1>
            <p className="text-muted-foreground text-lg">
              Choose the plan that best fits your hosting needs
            </p>
          </div>

          {/* Current Plan Banner */}
          <Card className="mb-8 bg-gradient-hero border-ocean shadow-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-foreground/80 mb-1">Current Plan</p>
                  <h2 className="text-2xl font-bold text-primary-foreground flex items-center gap-2">
                    {getPlanIcon(currentPlan.tier)}
                    {currentPlan.name}
                    {currentPlan.tier !== 'free' && (
                      <Badge variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                        ${currentPlan.price}/month
                      </Badge>
                    )}
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-sm text-primary-foreground/80 mb-1">Next billing date</p>
                  <p className="text-primary-foreground font-semibold">
                    {currentPlan.tier === 'free' ? 'N/A' : 'December 11, 2025'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {availablePlans.map((plan) => {
              const isCurrentPlan = plan.tier === currentPlan.tier;
              const isUpgrade = availablePlans.indexOf(plan) > availablePlans.indexOf(currentPlan);

              return (
                <Card
                  key={plan.tier}
                  className={`relative transition-all ${
                    isCurrentPlan
                      ? 'ring-2 ring-ocean shadow-glow'
                      : plan.tier === 'business'
                      ? 'border-accent shadow-soft'
                      : 'shadow-soft hover:shadow-medium'
                  }`}
                >
                  {isCurrentPlan && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-ocean text-ocean-foreground">Current Plan</Badge>
                    </div>
                  )}
                  {plan.tier === 'business' && !isCurrentPlan && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-accent">Most Popular</Badge>
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {getPlanIcon(plan.tier)}
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    </div>
                    <CardDescription>
                      <span className="text-3xl font-bold text-primary">
                        ${plan.price}
                      </span>
                      {plan.price > 0 && <span className="text-muted-foreground">/month</span>}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={isCurrentPlan ? 'outline' : isUpgrade ? 'default' : 'secondary'}
                      disabled={isCurrentPlan}
                      onClick={() => handleUpgrade(plan.tier)}
                    >
                      {isCurrentPlan
                        ? 'Current Plan'
                        : isUpgrade
                        ? 'Upgrade Now'
                        : 'Downgrade'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Feature Comparison */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
              <CardDescription>See what's included in each plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Feature</th>
                      {availablePlans.map((plan) => (
                        <th key={plan.tier} className="text-center py-3 px-4 font-semibold">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Active Listings</td>
                      <td className="text-center py-3 px-4">2</td>
                      <td className="text-center py-3 px-4">10</td>
                      <td className="text-center py-3 px-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Analytics</td>
                      <td className="text-center py-3 px-4">Basic</td>
                      <td className="text-center py-3 px-4">Detailed</td>
                      <td className="text-center py-3 px-4">Advanced</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Priority Placement</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Verified Badge</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Featured on Homepage</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Dynamic Pricing</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">API Access</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
