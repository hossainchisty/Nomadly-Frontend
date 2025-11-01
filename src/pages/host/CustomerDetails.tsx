import HostNavigation from "@/components/HostNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, CreditCard, Mail, Phone, Star, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const HostCustomerDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();


    // Mock data for a specific customer
    const customer = {
        id: id || 1,
        name: "Sarah Chen",
        email: "sarah.chen@example.com",
        phone: "+1 (555) 123-4567",
        totalBookings: 3,
        totalSpent: 2450,
        lastBooking: "2025-10-28",
        status: "Active",
        joinDate: "2025-08-15",
        preferredPayment: "Visa ending in 1234",
        notes: "Prefers early check-in when possible. Has requested extra towels in the past."
    };

    // Mock data for customer's bookings
    const bookings = [
        {
            id: 1,
            property: "Modern Studio in Barcelona",
            checkIn: "2025-10-25",
            checkOut: "2025-10-30",
            status: "Completed",
            total: 850,
            rating: 5
        },
        {
            id: 2,
            property: "Coastal Apartment Lisbon",
            checkIn: "2025-09-10",
            checkOut: "2025-09-15",
            status: "Completed",
            total: 750,
            rating: 4
        },
        {
            id: 3,
            property: "Loft in Tech Hub Berlin",
            checkIn: "2025-08-20",
            checkOut: "2025-08-25",
            status: "Completed",
            total: 850,
            rating: 5
        }
    ];

    // Mock data for customer's reviews
    const reviews = [
        {
            id: 1,
            property: "Modern Studio in Barcelona",
            rating: 5,
            date: "2025-10-28",
            comment: "Absolutely loved this place! The location is perfect and the apartment was exactly as described. Will definitely stay here again.",
            response: "Thank you for your kind words, Sarah! We're glad you enjoyed your stay."
        },
        {
            id: 2,
            property: "Coastal Apartment Lisbon",
            rating: 4,
            date: "2025-09-12",
            comment: "Great apartment with amazing views. The host was very responsive and helpful throughout our stay.",
            response: "We appreciate your feedback, John! Happy to hear you had a great experience."
        }
    ];

    return (
        <div className="flex min-h-screen bg-background">
            <HostNavigation />

            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Customer Details</h1>
                            <p className="text-muted-foreground">
                                View detailed information about {customer.name}
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Customer Info */}
                        <div className="lg:col-span-1">
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
                                            <User className="w-8 h-8 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl">{customer.name}</CardTitle>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${customer.status === "VIP"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : customer.status === "Active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-blue-100 text-blue-800"
                                                    }`}>
                                                    {customer.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className="w-5 h-5 text-muted-foreground" />
                                        <span>{customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="w-5 h-5 text-muted-foreground" />
                                        <span>{customer.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p>Joined: {customer.joinDate}</p>
                                            <p>Last booking: {customer.lastBooking}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                                        <span>{customer.preferredPayment}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Customer Statistics */}
                            <Card className="mt-6 bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle>Statistics</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Total Bookings</span>
                                        <span className="font-semibold">{customer.totalBookings}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Total Spent</span>
                                        <span className="font-semibold">${customer.totalSpent}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Avg. Booking Value</span>
                                        <span className="font-semibold">${Math.round(customer.totalSpent / customer.totalBookings)}</span>
                                    </div>
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
                                        Add Note
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        View All Bookings
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Booking History */}
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Booking History
                                    </CardTitle>
                                    <CardDescription>Recent bookings by this customer</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {bookings.map((booking) => (
                                        <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                                            <div>
                                                <h3 className="font-semibold">{booking.property}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {booking.checkIn} - {booking.checkOut}
                                                </p>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3 sm:mt-0">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${booking.status === "Completed"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                                <div className="font-semibold">${booking.total}</div>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link to={`/host/bookings/${booking.id}`}>
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Reviews */}
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        Reviews
                                    </CardTitle>
                                    <CardDescription>Reviews provided by this customer</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-semibold">{review.property}</h3>
                                                    <p className="text-sm text-muted-foreground">Reviewed on {review.date}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground mb-4">{review.comment}</p>
                                            {review.response && (
                                                <div className="bg-secondary p-4 rounded-lg">
                                                    <p className="text-sm">
                                                        <span className="font-semibold">Your response:</span> {review.response}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Notes */}
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Notes
                                    </CardTitle>
                                    <CardDescription>Special requests and notes</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-secondary p-4 rounded-lg">
                                        <p>{customer.notes}</p>
                                    </div>
                                    <Button variant="outline" className="mt-4">
                                        Edit Notes
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

export default HostCustomerDetails;