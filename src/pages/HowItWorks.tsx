import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  Home,
  Search,
  Shield,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              How
              <span className="bg-gradient-to-r from-ocean to-accent bg-clip-text text-transparent">
                {" "}
                Nomadly{" "}
              </span>
              Works
            </h1>
            <p className="text-xl text-muted-foreground">
              Finding your perfect monthly stay is easier than ever. Here's how
              we make flexible living simple.
            </p>
          </div>

          {/* Steps */}
          <div className="relative mb-24">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border hidden md:block"></div>
            {[
              {
                icon: Search,
                step: "1",
                title: "Search & Filter",
                description:
                  "Browse thousands of verified properties across 500+ cities. Use our advanced filters to find exactly what you need - from WiFi speed to workspace availability.",
                color: "text-blue-600",
              },
              {
                icon: Star,
                step: "2",
                title: "Check Orca Scores",
                description:
                  "Every property has an Orca Score - our proprietary rating system that evaluates quality, amenities, location, and host reliability so you can book with confidence.",
                color: "text-purple-600",
              },
              {
                icon: Calendar,
                step: "3",
                title: "Book Monthly",
                description:
                  "No long-term leases required. Book month-to-month with transparent pricing. Extend your stay or move to a new city - it's completely flexible.",
                color: "text-green-600",
              },
              {
                icon: Home,
                step: "4",
                title: "Move In & Enjoy",
                description:
                  "Check in hassle-free to your fully-furnished home. Focus on your work and life while we handle the rest. Cancel anytime with our flexible terms.",
                color: "text-orange-600",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center mb-16 md:mb-0 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
              >
                <div className="md:w-1/2 p-8">
                  <Card className="bg-gradient-card shadow-soft p-8">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center shrink-0 ${step.color}`}
                      >
                        <step.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-4xl font-bold text-muted-foreground/20">
                            {step.step}
                          </span>
                          <h3 className="text-2xl font-semibold">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground text-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="aspect-video bg-gradient-overlay rounded-xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="bg-muted py-20 rounded-3xl mb-24">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                What Makes Us Different
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "Verified Properties",
                    description:
                      "Every listing is verified and scored with our Orca Score system",
                  },
                  {
                    icon: Calendar,
                    title: "Flexible Terms",
                    description:
                      "Month-to-month stays with no long-term commitments",
                  },
                  {
                    icon: Star,
                    title: "Transparent Pricing",
                    description:
                      "No hidden fees. See exactly what you pay upfront",
                  },
                ].map((feature, index) => (
                  <Card
                    key={index}
                    className="bg-background shadow-soft hover:shadow-medium transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-hero rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Next Stay?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Start browsing thousands of verified properties perfect for remote
              workers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/listings">
                <Button size="lg" variant="secondary" className="group">
                  Browse Stays
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/become-host">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Become a Host
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="text-2xl font-bold">
                Nomadly
              </Link>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;