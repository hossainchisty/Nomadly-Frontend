import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Check, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const BecomeHost = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Earn Money Hosting
              <br />
              <span className="bg-gradient-to-r from-ocean to-accent bg-clip-text text-transparent">
                Remote Workers
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of hosts earning passive income by providing flexible monthly stays for digital nomads and remote workers
            </p>
            <Link to="/host/dashboard">
              <Button size="lg" className="bg-gradient-hero shadow-soft hover:shadow-glow transition-all group">
                Start Hosting
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "Steady Income",
                description: "Monthly bookings mean predictable, reliable income streams",
              },
              {
                title: "Quality Guests",
                description: "Verified remote workers and digital nomads who respect your space",
              },
              {
                title: "Full Control",
                description: "Set your own prices, availability, and house rules",
              },
            ].map((benefit, index) => (
              <Card key={index} className="bg-gradient-card shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Subscription Plans */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Start free and upgrade as your hosting business grows
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: "Free",
                  price: 0,
                  features: ["Up to 2 listings", "Basic analytics", "Email support"],
                },
                {
                  name: "Pro",
                  price: 49,
                  popular: true,
                  features: ["Up to 10 listings", "Priority placement", "Detailed analytics", "Verified badge"],
                },
                {
                  name: "Business",
                  price: 99,
                  features: ["Unlimited listings", "Featured placement", "Dynamic pricing", "API access", "24/7 support"],
                },
              ].map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-ocean shadow-glow' : 'shadow-soft'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-ocean text-ocean-foreground text-sm font-semibold rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {plan.name}
                      {plan.name === 'Business' && <Crown className="w-5 h-5 text-accent" />}
                    </CardTitle>
                    <div className="text-3xl font-bold text-primary">
                      ${plan.price}
                      {plan.price > 0 && <span className="text-sm text-muted-foreground">/month</span>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/host/dashboard">
                      <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-hero rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join Nomadly today and start hosting remote workers in your property
            </p>
            <Link to="/host/dashboard">
              <Button size="lg" variant="secondary">
                Create Your Listing
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BecomeHost;
