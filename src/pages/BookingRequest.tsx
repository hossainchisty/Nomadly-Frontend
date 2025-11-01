import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { MapPin, Star, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BookingRequest = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    // Mock property data
    const property = {
        id: id || "1",
        title: "Modern Studio in Barcelona City Center",
        location: "Barcelona, Spain",
        price: 1200,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
        rating: 4.9,
        reviewCount: 127,
        capacity: 2,
        host: {
            name: "Maria Rodriguez",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        },
    };

    const handleBookingRequest = () => {
        // In a real app, this would send a booking request to the backend
        console.log("Booking request submitted", { checkIn, checkOut, guests });
        // Redirect to a confirmation page or dashboard
        navigate("/profile");
    };

    // If user is not authenticated, redirect to auth page
    if (!token) {
        navigate("/auth");
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-8">
                        <Link to={`/property/${id}`}>
                            <Button variant="ghost">← Back to Property</Button>
                        </Link>
                        <h1 className="text-3xl font-bold">Request to Book</h1>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Booking Form */}
                        <div className="lg:col-span-2">
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h2 className="text-xl font-semibold">{property.title}</h2>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="w-4 h-4" />
                                                <span>{property.location}</span>
                                            </div>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Host Info */}
                                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={property.host.avatar}
                                                alt={property.host.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-medium">Hosted by {property.host.name}</p>
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    <span>{property.rating} ({property.reviewCount} reviews)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">Contact Host</Button>
                                    </div>

                                    {/* Booking Dates */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Your Trip</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Check-in</label>
                                                <input
                                                    type="date"
                                                    value={checkIn}
                                                    onChange={(e) => setCheckIn(e.target.value)}
                                                    className="w-full p-3 border border-input rounded-lg bg-background"
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Check-out</label>
                                                <input
                                                    type="date"
                                                    value={checkOut}
                                                    onChange={(e) => setCheckOut(e.target.value)}
                                                    className="w-full p-3 border border-input rounded-lg bg-background"
                                                    min={checkIn || new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Guests</label>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => setGuests(Math.max(1, guests - 1))}
                                            >
                                                -
                                            </Button>
                                            <span className="w-12 text-center">{guests} guest{guests > 1 ? 's' : ''}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => setGuests(Math.min(property.capacity, guests + 1))}
                                                disabled={guests >= property.capacity}
                                            >
                                                +
                                            </Button>
                                            <span className="text-sm text-muted-foreground">
                                                (Max {property.capacity} guests)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Message to Host */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Message to Host (Optional)</label>
                                        <textarea
                                            placeholder="Let the host know about your travel plans, special requests, etc."
                                            className="w-full p-3 border border-input rounded-lg bg-background min-h-[120px]"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Cancellation Policy */}
                            <Card className="mt-6 bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle>Cancellation Policy</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Free cancellation for 48 hours after booking. After that, cancellation fees may apply.
                                        See full policy for details.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Booking Summary */}
                        <div>
                            <div className="lg:sticky lg:top-24">
                                <Card className="bg-gradient-card shadow-soft">
                                    <CardHeader>
                                        <CardTitle>Booking Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between">
                                            <span>${property.price} x 1 month</span>
                                            <span>${property.price}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Service fee</span>
                                            <span>$0</span>
                                        </div>
                                        <div className="border-t border-border pt-2">
                                            <div className="flex justify-between font-semibold">
                                                <span>Total</span>
                                                <span>${property.price}</span>
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full bg-gradient-hero shadow-soft hover:shadow-glow transition-all"
                                            onClick={handleBookingRequest}
                                            disabled={!checkIn || !checkOut}
                                        >
                                            Confirm Booking Request
                                        </Button>

                                        <p className="text-xs text-center text-muted-foreground">
                                            You won't be charged until the host confirms your booking
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Guest Info */}
                                <Card className="mt-6 bg-gradient-card shadow-soft">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="w-5 h-5" />
                                            Guest Information
                                        </CardTitle>
                                        <CardDescription>
                                            This information will be shared with the host
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-primary-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{user?.first_name} {user?.last_name}</p>
                                                <p className="text-sm text-muted-foreground">Guest</p>
                                            </div>
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium">Email</p>
                                            <p className="text-muted-foreground">{user?.email}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookingRequest;