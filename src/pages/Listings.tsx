import { useState } from "react";
import Navigation from "@/components/Navigation";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

const Listings = () => {
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock properties data
  const properties = [
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
    {
      id: "4",
      title: "Beachfront Condo with Workspace",
      location: "Bali, Indonesia",
      price: 800,
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800",
      orcaScore: 90,
      rating: 4.9,
      reviews: 156,
      amenities: { wifi: true, capacity: 2 },
    },
    {
      id: "5",
      title: "Downtown Apartment near Co-working Spaces",
      location: "Mexico City, Mexico",
      price: 700,
      image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
      orcaScore: 84,
      rating: 4.6,
      reviews: 68,
      amenities: { wifi: true, capacity: 3 },
    },
    {
      id: "6",
      title: "Quiet Retreat in Nature",
      location: "Chiang Mai, Thailand",
      price: 650,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
      orcaScore: 87,
      rating: 4.8,
      reviews: 92,
      amenities: { wifi: true, capacity: 2 },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Find Your Perfect Stay</h1>
            <p className="text-muted-foreground text-lg">
              Discover monthly rentals in cities worldwide
            </p>
          </div>

          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Filters Sidebar */}
            <aside className="space-y-6">
              <Card className="p-6 bg-gradient-card shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                  </h2>
                  <Button variant="ghost" size="sm">
                    Clear
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search cities..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-4 block">
                      Price Range
                      <span className="text-muted-foreground ml-2">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={3000}
                      step={50}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$0</span>
                      <span>$3,000+</span>
                    </div>
                  </div>

                  {/* Minimum Orca Score */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Minimum Orca Score</label>
                    <Select defaultValue="75">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90+ (Exceptional)</SelectItem>
                        <SelectItem value="75">75+ (Excellent)</SelectItem>
                        <SelectItem value="60">60+ (Good)</SelectItem>
                        <SelectItem value="0">Any Score</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Capacity */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Capacity</label>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3">3+ People</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <Select defaultValue="score">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="score">Orca Score</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </aside>

            {/* Property Grid */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{properties.length}</span> properties found
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Listings;
