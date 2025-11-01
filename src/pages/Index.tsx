import heroImage from "@/assets/hero-workspace.jpg";
import Navigation from "@/components/Navigation";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import { ArrowRight, Globe, Home, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  // State for featured properties
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(EndPoint.PROPERTY);
        // Take first 3 properties as featured
        const properties = response.data.results.slice(0, 3).map((property: any) => ({
          id: property.id.toString(),
          title: property.property_name,
          location: `${property.city?.name || ''}, ${property.country?.name || ''}`,
          price: parseFloat(property.monthly_rent) || 0,
          image: property.interior_images?.[0]?.image || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
          orcaScore: Math.min(100, Math.floor(property.view_count / 10000)) || 80,
          rating: 4.5,
          reviews: property.view_count > 1000000 ? Math.floor(property.view_count / 10000) : property.view_count || 0,
          amenities: {
            wifi: true,
            capacity: property.max_guests || 2
          },
        }));
        setFeaturedProperties(properties);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setError("Failed to load properties. Using mock data instead.");
        // Fallback to mock data
        setFeaturedProperties([
          {
            id: "1",
            title: "Modern Studio in Barcelona City Center",
            location: "Barcelona, Spain",
            price: 1200,
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
            orcaScore: 92,
            rating: 4.9,
            reviews: 127,
            amenities: { wifi: true, capacity: 2 },
          },
          {
            id: "2",
            title: "Coastal Apartment with Ocean Views",
            location: "Lisbon, Portugal",
            price: 950,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            orcaScore: 88,
            rating: 4.8,
            reviews: 94,
            amenities: { wifi: true, capacity: 3 },
          },
          {
            id: "3",
            title: "Loft in Tech Hub District",
            location: "Berlin, Germany",
            price: 1100,
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
            orcaScore: 85,
            rating: 4.7,
            reviews: 76,
            amenities: { wifi: true, capacity: 2 },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-overlay" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-block">
                <span className="px-4 py-2 bg-ocean-light text-ocean-dark rounded-full text-sm font-semibold">
                  No Long-Term Leases Required
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Live Anywhere.
                <br />
                <span className="bg-gradient-to-r from-ocean to-accent bg-clip-text text-transparent">
                  Work Everywhere.
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl">
                Flexible monthly housing for remote workers and digital nomads. Curated stays with transparent pricing and verified hosts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/listings">
                  <Button size="lg" className="bg-gradient-hero shadow-soft hover:shadow-glow transition-all group w-full sm:w-auto">
                    Browse Stays
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/become-host">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    List Your Property
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Cities</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">2,000+</div>
                  <div className="text-sm text-muted-foreground">Properties</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">10k+</div>
                  <div className="text-sm text-muted-foreground">Happy Guests</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
              <div className="relative rounded-2xl overflow-hidden shadow-large">
                <img
                  src={heroImage}
                  alt="Modern workspace"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl font-bold mb-4">Why Choose Nomadly?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're revolutionizing how remote workers find their perfect home away from home
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified & Curated",
                description: "Every property is verified and scored with our proprietary Orca Score system for quality assurance",
              },
              {
                icon: Globe,
                title: "Global Flexibility",
                description: "Monthly rentals in 500+ cities worldwide. No long-term commitments, just flexible living",
              },
              {
                icon: TrendingUp,
                title: "Transparent Pricing",
                description: "No hidden fees or surprises. See exactly what you pay with detailed pricing breakdowns",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-card rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mb-6 group-hover:shadow-glow transition-all">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Featured Stays</h2>
              <p className="text-muted-foreground">Hand-picked properties with exceptional Orca Scores</p>
            </div>
            <Link to="/listings">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Properties grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-overlay">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your flexible living journey in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Home,
                step: "1",
                title: "Find Your Stay",
                description: "Browse curated properties with detailed info, Orca Scores, and authentic reviews",
              },
              {
                icon: Zap,
                step: "2",
                title: "Book Instantly",
                description: "Secure your monthly stay with transparent pricing and instant confirmation",
              },
              {
                icon: Users,
                step: "3",
                title: "Move In & Enjoy",
                description: "Check in hassle-free and enjoy your flexible, fully-furnished home",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -z-10" />
                )}
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-medium mx-auto">
                      <step.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold shadow-soft">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-hero p-12 md:p-16 shadow-large">
            <div className="relative z-10 text-center text-white max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Stay Flexible?
              </h2>
              <p className="text-xl opacity-90">
                Join thousands of remote workers and digital nomads finding their perfect monthly stays
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/listings">
                  <Button size="lg" variant="secondary" className="group w-full sm:w-auto">
                    Browse Stays
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/become-host">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto">
                    Become a Host
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>© 2025 Nomadly. Live Anywhere. Work Everywhere. Stay Flexible.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;