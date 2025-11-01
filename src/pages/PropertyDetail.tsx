import Navigation from "@/components/Navigation";
import NomadlyScoreBadge from "@/components/NomadlyScoreBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import {
  ArrowLeft,
  CheckCircle2,
  Coffee,
  Home,
  MapPin,
  Star,
  Tv,
  Users,
  Wifi,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await axios.get(`${EndPoint.PROPERTY}${id}/`);
        setProperty(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch property:", err);
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show error state
  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
              <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
              <Link to="/listings">
                <Button>Back to Listings</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Transform property data to match the UI structure
  const propertyData = {
    id: property.id,
    title: property.property_name,
    location: `${property.city?.name || ''}, ${property.country?.name || ''}`,
    price: parseFloat(property.monthly_rent),
    service_fee: parseFloat(property.monthly_rent) * 0.01, // 1% service fee
    images: property.interior_images?.map((img: any) => img.image) || [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200",
    ],
    orcaScore: Math.min(100, Math.floor(property.view_count / 10000)), // Mock score based on views
    rating: 4.5, // Would come from reviews API
    reviewCount: property.view_count > 1000000 ? Math.floor(property.view_count / 10000) : property.view_count, // Mock review count
    capacity: property.max_guests || 2,
    bedrooms: property.bedrooms?.replace("_bedroom", "") || "1",
    bathrooms: property.bathrooms?.replace("_bathroom", "") || "1",
    description: property.description,
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Home, label: "Dedicated Workspace" },
      { icon: Coffee, label: "Coffee Machine" },
      { icon: Wind, label: "Air Conditioning" },
      { icon: Tv, label: "Smart TV" },
      { icon: Users, label: `Up to ${property.max_guests || 2} Guests` },
    ],
    host: {
      name: property.listed_by?.full_name,
      avatar: property.listed_by?.profile_picture,
      responseRate: 95, // Would come from user stats
      responseTime: "Within 2 hours", // Would come from user stats
      verified: property.listed_by?.is_verified,
    },
    reviews: [
      {
        author: "John Smith",
        rating: 5,
        date: "2 weeks ago",
        comment: "Absolutely perfect for remote work! The WiFi is lightning fast and the workspace setup is excellent.",
      },
      {
        author: "Sarah Chen",
        rating: 5,
        date: "1 month ago",
        comment: "Great location and the apartment matches the photos perfectly. Maria was very responsive and helpful.",
      },
      {
        author: "Alex Johnson",
        rating: 4,
        date: "2 months ago",
        comment: "Lovely space with everything you need. The neighborhood is vibrant and safe.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/listings">
            <Button variant="ghost" className="mb-6 group">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Listings
            </Button>
          </Link>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-2 gap-4 mb-8 rounded-2xl overflow-hidden">
            <div className="relative h-96 md:h-[500px]">
              <img
                src={propertyData.images[0]}
                alt="Property"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {propertyData.images.slice(1, 4).map((image, index) => (
                <div key={index} className="relative h-48 md:h-[246px]">
                  <img src={image} alt={`View ${index + 2}`} className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
              <Button
                variant="secondary"
                className="absolute bottom-4 right-4 shadow-medium"
              >
                View All Photos
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Main Content */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{propertyData.title}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{propertyData.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-foreground">{propertyData.rating}</span>
                        <span>({propertyData.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <NomadlyScoreBadge score={propertyData.orcaScore} size="lg" />
                </div>

                <div className="flex gap-6 text-sm">
                  <span>{propertyData.bedrooms} Bedroom</span>
                  <span>{propertyData.bathrooms} Bathroom</span>
                  <span>Up to {propertyData.capacity} Guests</span>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">About This Stay</h2>
                <p className="text-muted-foreground leading-relaxed">{propertyData.description}</p>
              </div>

              <Separator />

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Amenities</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {propertyData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-ocean-light rounded-lg flex items-center justify-center">
                        <amenity.icon className="w-5 h-5 text-ocean" />
                      </div>
                      <span>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Host Info */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Meet Your Host</h2>
                <Card className="bg-gradient-card shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={propertyData.host.avatar}
                        alt={propertyData.host.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{propertyData.host.name}</h3>
                          {propertyData.host.verified && (
                            <Badge variant="secondary" className="gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Response Rate</div>
                            <div className="font-semibold">{propertyData.host.responseRate}%</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Response Time</div>
                            <div className="font-semibold">{propertyData.host.responseTime}</div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">Contact Host</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Guest Reviews</h2>
                <div className="space-y-6">
                  {propertyData.reviews.map((review, index) => (
                    <Card key={index} className="bg-gradient-card shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{review.author}</h4>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="bg-gradient-card shadow-large">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-primary">${propertyData.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Minimum stay: 1 month</p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly rent</span>
                      <span className="font-semibold">${propertyData.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service fee</span>
                      <span className="font-semibold">${propertyData.service_fee}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-xl text-primary">${(propertyData.price + propertyData.service_fee).toFixed(0)}</span>
                  </div>

                  <Link to={`/booking/${propertyData.id}`}>
                    <Button size="lg" className="w-full bg-gradient-hero shadow-soft hover:shadow-glow transition-all">
                      Request to Book
                    </Button>
                  </Link>

                  <p className="text-xs text-center text-muted-foreground">
                    You won't be charged yet
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetail;