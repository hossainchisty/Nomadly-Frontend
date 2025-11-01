import HostNavigation from "@/components/HostNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, User, MapPin, DollarSign, MessageSquare } from "lucide-react";

const HostBookings = () => {
  const bookings = {
    upcoming: [
      {
        id: "1",
        guest: "Sarah Chen",
        property: "Modern Studio in Barcelona",
        checkIn: "2025-11-01",
        checkOut: "2025-12-01",
        revenue: 1200,
        status: "Confirmed",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      },
      {
        id: "2",
        guest: "John Smith",
        property: "Coastal Apartment Lisbon",
        checkIn: "2025-11-05",
        checkOut: "2025-12-05",
        revenue: 950,
        status: "Confirmed",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      },
    ],
    pending: [
      {
        id: "3",
        guest: "Alex Johnson",
        property: "Loft in Tech Hub Berlin",
        checkIn: "2025-11-10",
        checkOut: "2025-12-10",
        revenue: 1100,
        status: "Pending",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      },
    ],
    completed: [
      {
        id: "4",
        guest: "Emma Wilson",
        property: "Modern Studio in Barcelona",
        checkIn: "2025-09-15",
        checkOut: "2025-10-15",
        revenue: 1200,
        status: "Completed",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      },
    ],
  };

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <img
            src={booking.image}
            alt={booking.guest}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{booking.guest}</h3>
                  <Badge
                    variant={
                      booking.status === "Confirmed"
                        ? "default"
                        : booking.status === "Pending"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : ""
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {booking.property}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <div>
                  <p className="text-xs">Check-in</p>
                  <p className="font-semibold text-foreground">{booking.checkIn}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <div>
                  <p className="text-xs">Check-out</p>
                  <p className="font-semibold text-foreground">{booking.checkOut}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-lg font-bold text-primary">${booking.revenue}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <HostNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Bookings</h1>
            <p className="text-muted-foreground text-lg">Manage your property reservations</p>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
              <TabsTrigger value="upcoming">
                Upcoming ({bookings.upcoming.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({bookings.pending.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({bookings.completed.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {bookings.upcoming.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {bookings.pending.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {bookings.completed.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default HostBookings;
