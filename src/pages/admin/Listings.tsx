import HostNavigation from "@/components/HostNavigation";
import NomadlyScoreBadge from "@/components/NomadlyScoreBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubscription } from "@/contexts/SubscriptionContext";
import {
  AlertCircle,
  Copy,
  Crown,
  Edit,
  Eye,
  MoreVertical,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HostListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentPlan, canAddListing } = useSubscription();

  const listings = [
    {
      id: "1",
      title: "Modern Studio in Barcelona City Center",
      location: "Barcelona, Spain",
      status: "Active",
      orcaScore: 92,
      price: 1200,
      bookings: 3,
      views: 432,
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    },
    {
      id: "2",
      title: "Coastal Apartment with Ocean Views",
      location: "Lisbon, Portugal",
      status: "Active",
      orcaScore: 88,
      price: 950,
      bookings: 3,
      views: 389,
      rating: 4.8,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    },
    {
      id: "3",
      title: "Loft in Tech Hub District",
      location: "Berlin, Germany",
      status: "Active",
      orcaScore: 85,
      price: 1100,
      bookings: 2,
      views: 298,
      rating: 4.7,
      reviews: 76,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <HostNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Listings</h1>
              <p className="text-muted-foreground text-lg">
                Manage all your properties
                <Badge variant="outline" className="ml-3">
                  {listings.length} / {currentPlan.limits.maxListings === Infinity ? '∞' : currentPlan.limits.maxListings} listings
                </Badge>
              </p>
            </div>
            {canAddListing(listings.length) ? (
              <Link to="/host/listings/new">
                <Button size="lg" className="bg-gradient-hero shadow-soft hover:shadow-glow transition-all group">
                  <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                  Add New Listing
                </Button>
              </Link>
            ) : (
              <Link to="/host/subscription">
                <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade to Add More
                </Button>
              </Link>
            )}
          </div>

          {/* Upgrade Banner */}
          {!canAddListing(listings.length) && (
            <Card className="mb-8 border-accent/50 bg-gradient-to-r from-accent/5 to-accent/10">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">You've reached your listing limit</h3>
                    <p className="text-muted-foreground mb-4">
                      Upgrade to {currentPlan.tier === 'free' ? 'Pro' : 'Business'} plan to add more properties and unlock premium features like priority placement and detailed analytics.
                    </p>
                    <Link to="/host/subscription">
                      <Button className="hover:bg-accent hover:text-accent-foreground">
                        <Crown className="w-4 h-4 mr-2" />
                        View Plans
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <Card className="mb-8 bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search listings..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="recent">
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="score">Nomadly Score</SelectItem>
                    <SelectItem value="bookings">Most Bookings</SelectItem>
                    <SelectItem value="revenue">Highest Revenue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Listings Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{listings.length}</span> listings found
            </p>
          </div>

          {/* Listings Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card
                key={listing.id}
                className="group overflow-hidden border border-border hover:shadow-large transition-all duration-300 bg-gradient-card"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <NomadlyScoreBadge score={listing.orcaScore} size="sm" showLabel={false} />
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      {listing.status}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2">{listing.title}</h3>
                      <p className="text-sm text-muted-foreground">{listing.location}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/property/${listing.id}`} className="flex items-center cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" />
                            View Listing
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/host/listings/edit/${listing.id}`} className="flex items-center cursor-pointer">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Bookings</p>
                      <p className="font-semibold">{listing.bookings}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Views</p>
                      <p className="font-semibold">{listing.views}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-2xl font-bold text-primary">${listing.price}</span>
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                    <Link to={`/host/listings/edit/${listing.id}`}>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostListings;
