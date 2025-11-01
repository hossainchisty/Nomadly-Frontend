import HostNavigation from "@/components/HostNavigation";
import NomadlyScoreBadge from "@/components/NomadlyScoreBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Building2, Calendar, Crown, DollarSign, Eye, Plus, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HostDashboard = () => {
  const { currentPlan } = useSubscription();
  const { user } = useAuth();
  const [userName, setUserName] = useState("Maria");

  useEffect(() => {
    if (user) {
      if (user.first_name && user.last_name) {
        setUserName(`${user.first_name} ${user.last_name}`);
      } else if (user.first_name) {
        setUserName(user.first_name);
      } else if (user.username) {
        setUserName(user.username);
      }
    }
  }, [user]);

  // Mock data
  const stats = {
    totalListings: 3,
    activeBookings: 8,
    monthlyRevenue: 9600,
    averageOrcaScore: 88,
    totalViews: 1247,
    totalReviews: 156,
  };

  const recentListings = [
    {
      id: "1",
      title: "Modern Studio in Barcelona",
      status: "Active",
      orcaScore: 92,
      bookings: 3,
      revenue: 3600,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    },
    {
      id: "2",
      title: "Coastal Apartment Lisbon",
      status: "Active",
      orcaScore: 88,
      bookings: 3,
      revenue: 2850,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    },
    {
      id: "3",
      title: "Loft in Tech Hub Berlin",
      status: "Active",
      orcaScore: 85,
      bookings: 2,
      revenue: 2200,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    },
  ];

  const recentBookings = [
    { guest: "Sarah Chen", property: "Modern Studio in Barcelona", checkIn: "2025-11-01", status: "Confirmed" },
    { guest: "John Smith", property: "Coastal Apartment Lisbon", checkIn: "2025-11-05", status: "Confirmed" },
    { guest: "Alex Johnson", property: "Loft in Tech Hub Berlin", checkIn: "2025-11-10", status: "Pending" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <HostNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome Back, {userName}!</h1>
              <p className="text-muted-foreground text-lg">
                Here's what's happening with your properties
                <Badge variant="outline" className="ml-3 bg-gradient-hero text-primary-foreground border-ocean">
                  <Crown className="w-3 h-3 mr-1" />
                  {currentPlan.name} Plan
                </Badge>
              </p>
            </div>
            <Link to="/host/listings/new">
              <Button size="lg" className="bg-gradient-hero shadow-soft hover:shadow-glow transition-all group">
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                Add New Listing
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Listings</CardTitle>
                <Building2 className="w-5 h-5 text-ocean" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.totalListings}</div>
                <p className="text-xs text-muted-foreground mt-1">All active and published</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Bookings</CardTitle>
                <Calendar className="w-5 h-5 text-ocean" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.activeBookings}</div>
                <p className="text-xs text-muted-foreground mt-1">Upcoming and current stays</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
                <DollarSign className="w-5 h-5 text-ocean" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">${stats.monthlyRevenue.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Nomadly Score</CardTitle>
                <Star className="w-5 h-5 text-ocean" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.averageOrcaScore}</div>
                <p className="text-xs text-muted-foreground mt-1">Excellent performance</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                <Eye className="w-5 h-5 text-ocean" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Reviews</CardTitle>
                <Star className="w-5 h-5 text-ocean fill-yellow-400 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.totalReviews}</div>
                <p className="text-xs text-muted-foreground mt-1">4.8 average rating</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Listings */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Your Listings</h2>
                <Link to="/host/listings">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <Card key={listing.id} className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{listing.title}</h3>
                              <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mt-1">
                                {listing.status}
                              </span>
                            </div>
                            <NomadlyScoreBadge score={listing.orcaScore} size="sm" showLabel={false} />
                          </div>
                          <div className="flex gap-6 text-sm text-muted-foreground">
                            <span>{listing.bookings} bookings</span>
                            <span className="font-semibold text-primary">${listing.revenue}/mo</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Bookings */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Recent Bookings</h2>
                <Link to="/host/bookings">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>

              <Card className="bg-gradient-card shadow-soft">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentBookings.map((booking, index) => (
                      <div key={index} className="pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{booking.guest}</h4>
                            <p className="text-sm text-muted-foreground">{booking.property}</p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${booking.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                              }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Check-in: {booking.checkIn}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostDashboard;
