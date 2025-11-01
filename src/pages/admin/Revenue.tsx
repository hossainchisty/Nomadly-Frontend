import HostNavigation from "@/components/HostNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react";

const HostRevenue = () => {
  const stats = {
    totalRevenue: 28600,
    thisMonth: 9600,
    avgPerBooking: 1075,
    pendingPayouts: 3200,
  };

  const revenueByMonth = [
    { month: "May 2025", revenue: 7200, bookings: 7 },
    { month: "Jun 2025", revenue: 8400, bookings: 8 },
    { month: "Jul 2025", revenue: 9200, bookings: 9 },
    { month: "Aug 2025", revenue: 8800, bookings: 8 },
    { month: "Sep 2025", revenue: 9400, bookings: 9 },
    { month: "Oct 2025", revenue: 9600, bookings: 9 },
  ];

  const revenueByProperty = [
    { name: "Modern Studio in Barcelona", revenue: 10800, bookings: 9 },
    { name: "Coastal Apartment Lisbon", revenue: 8550, bookings: 9 },
    { name: "Loft in Tech Hub Berlin", revenue: 9250, bookings: 8 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <HostNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Revenue</h1>
            <p className="text-muted-foreground text-lg">Track your earnings and payouts</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
                <DollarSign className="w-5 h-5 text-ocean" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  ${stats.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">All time earnings</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  This Month
                </CardTitle>
                <Calendar className="w-5 h-5 text-ocean" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  ${stats.thisMonth.toLocaleString()}
                </div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg per Booking
                </CardTitle>
                <TrendingUp className="w-5 h-5 text-ocean" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">${stats.avgPerBooking}</div>
                <p className="text-xs text-muted-foreground mt-1">Average monthly rate</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Payouts
                </CardTitle>
                <CreditCard className="w-5 h-5 text-ocean" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  ${stats.pendingPayouts.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Processing within 3 days</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Revenue by Month */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Revenue by Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByMonth.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <div>
                        <h4 className="font-semibold">{item.month}</h4>
                        <p className="text-sm text-muted-foreground">{item.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          ${item.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue by Property */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Revenue by Property</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByProperty.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          ${item.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostRevenue;
