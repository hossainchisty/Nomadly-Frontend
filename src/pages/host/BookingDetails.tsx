import HostNavigation from "@/components/HostNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Building2, Calendar, CreditCard, Mail, MapPin, Phone, Star, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const HostBookingDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();


    // Mock data for a specific booking
    const booking = {
        id: id || 1,
        property: "Modern Studio in Barcelona",
        guest: {
            name: "Sarah Chen",
            email: "sarah.chen@example.com",
            phone: "+1 (555) 123-4567"
        },
        checkIn: "2025-10-25",
        checkOut: "2025-10-30",
        nights: 5,
        guests: 2,
        totalPrice: 850,
        status: "Completed",
        paymentMethod: "Visa ending in 1234",
        bookingDate: "2025-10-01",
        specialRequests: "Early check-in requested. Please provide extra towels.",
        address: "Carrer de la Marina, 23, 08017 Barcelona, Spain"
    };

    // Mock data for booking timeline
    const timeline = [
        { id: 1, status: "Booking Confirmed", date: "2025-10-01", description: "Booking confirmed and payment received" },
        { id: 2, status: "Guest Arrival", date: "2025-10-25", description: "Guest checked in at 3:00 PM" },
        { id: 3, status: "Guest Departure", date: "2025-10-30", description: "Guest checked out at 11:00 AM" },
        { id: 4, status: "Review Submitted", date: "2025-11-02", description: "Guest left a 5-star review" }
    ];

    return (
        <div className="flex min-h-screen bg-background">
            <HostNavigation />

            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Booking Details</h1>
                            <p className="text-muted-foreground">
                                View detailed information about booking #{booking.id}
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Booking Info */}
                        <div className="lg:col-span-1">
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Building2 className="w-5 h-5" />
                                        {booking.property}
                                    </CardTitle>
                                    <CardDescription>
                                        Booking #{booking.id}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Check-in</p>
                                            <p>{booking.checkIn}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Check-out</p>
                                            <p>{booking.checkOut}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <User className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Guests</p>
                                            <p>{booking.guests} guests</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Total Price</p>
                                            <p className="text-lg font-semibold">${booking.totalPrice}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Payment Method</p>
                                            <p>{booking.paymentMethod}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Booking Date</p>
                                            <p>{booking.bookingDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${booking.status === "Completed"
                                                ? "bg-green-100 text-green-800"
                                                : booking.status === "Confirmed"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}>
                                            {booking.status}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Guest Info */}
                            <Card className="mt-6 bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Guest Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <User className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">{booking.guest.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className="w-5 h-5 text-muted-foreground" />
                                        <span>{booking.guest.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="w-5 h-5 text-muted-foreground" />
                                        <span>{booking.guest.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <MapPin className="w-5 h-5 text-muted-foreground" />
                                        <span className="text-sm">{booking.address}</span>
                                    </div>
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link to={`/host/customers/1`}>
                                            View Guest Profile
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card className="mt-6 bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start">
                                        Send Message
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        View Property
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        Download Invoice
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Booking Timeline */}
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Booking Timeline
                                    </CardTitle>
                                    <CardDescription>Key events in this booking</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {timeline.map((event) => (
                                            <div key={event.id} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                                    {event.id < timeline.length && (
                                                        <div className="w-0.5 h-full bg-border mt-2"></div>
                                                    )}
                                                </div>
                                                <div className="pb-6">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold">{event.status}</h3>
                                                        <span className="text-sm text-muted-foreground">{event.date}</span>
                                                    </div>
                                                    <p className="text-muted-foreground mt-1">{event.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Special Requests */}
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Special Requests
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-secondary p-4 rounded-lg">
                                        <p>{booking.specialRequests}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Reviews */}
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        Guest Review
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                        <span className="ml-2 font-semibold">5.0</span>
                                    </div>
                                    <div className="bg-secondary p-4 rounded-lg">
                                        <p className="mb-3">"Absolutely loved this place! The location is perfect and the apartment was exactly as described. Will definitely stay here again."</p>
                                        <p className="text-sm text-muted-foreground">- Sarah Chen, October 30, 2025</p>
                                    </div>
                                    <div className="mt-4 bg-secondary p-4 rounded-lg">
                                        <p className="font-semibold mb-2">Your Response:</p>
                                        <p>"Thank you for your kind words, Sarah! We're glad you enjoyed your stay."</p>
                                    </div>
                                    <Button variant="outline" className="mt-4">
                                        Edit Response
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HostBookingDetails;