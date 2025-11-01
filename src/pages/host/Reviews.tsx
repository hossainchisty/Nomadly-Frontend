import HostNavigation from "@/components/HostNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Building2, Calendar, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const HostReviews = () => {
    const { user } = useAuth();


    // Mock data for reviews
    const reviews = [
        {
            id: 1,
            propertyName: "Modern Studio in Barcelona",
            guestName: "Sarah Chen",
            rating: 5,
            date: "2025-10-28",
            comment: "Absolutely loved this place! The location is perfect and the apartment was exactly as described. Will definitely stay here again.",
            response: "Thank you for your kind words, Sarah! We're glad you enjoyed your stay."
        },
        {
            id: 2,
            propertyName: "Coastal Apartment Lisbon",
            guestName: "John Smith",
            rating: 4,
            date: "2025-10-25",
            comment: "Great apartment with amazing views. The host was very responsive and helpful throughout our stay.",
            response: "We appreciate your feedback, John! Happy to hear you had a great experience."
        },
        {
            id: 3,
            propertyName: "Loft in Tech Hub Berlin",
            guestName: "Alex Johnson",
            rating: 5,
            date: "2025-10-20",
            comment: "Perfect location for exploring the city. The loft was clean, comfortable, and had all the amenities we needed.",
            response: null
        },
        {
            id: 4,
            propertyName: "Modern Studio in Barcelona",
            guestName: "Maria Garcia",
            rating: 4,
            date: "2025-10-15",
            comment: "Nice place with good facilities. The neighborhood is vibrant and there are plenty of restaurants nearby.",
            response: null
        }
    ];

    // Calculate average rating
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    // Count reviews by rating
    const ratingCounts = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    return (
        <div className="flex min-h-screen bg-background">
            <HostNavigation />

            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Guest Reviews</h1>
                            <p className="text-muted-foreground">
                                See what guests are saying about your properties
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Review Stats */}
                        <div className="lg:col-span-1">
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        Review Summary
                                    </CardTitle>
                                    <CardDescription>Your overall guest satisfaction</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-6">
                                        <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                                        <div className="flex justify-center mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-6 h-6 ${i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground">{reviews.length} total reviews</p>
                                    </div>

                                    <div className="space-y-3 mt-6">
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <div key={rating} className="flex items-center">
                                                <div className="w-10 text-sm">{rating} stars</div>
                                                <div className="flex-1 mx-2">
                                                    <div className="w-full bg-secondary rounded-full h-2">
                                                        <div
                                                            className="bg-yellow-400 h-2 rounded-full"
                                                            style={{ width: `${((ratingCounts[rating] || 0) / reviews.length) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="w-8 text-sm text-right">{ratingCounts[rating] || 0}</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card className="mt-6 bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5" />
                                        Quick Actions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start">
                                        Respond to Reviews
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        View All Properties
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <Link to="/host/dashboard">
                                            <Building2 className="w-4 h-4 mr-2" />
                                            Back to Dashboard
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Recent Reviews
                                    </CardTitle>
                                    <CardDescription>What guests are saying about your properties</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-semibold">{review.propertyName}</h3>
                                                    <p className="text-sm text-muted-foreground">Reviewed by {review.guestName} on {review.date}</p>
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
                                            {review.response ? (
                                                <div className="bg-secondary p-4 rounded-lg">
                                                    <p className="text-sm">
                                                        <span className="font-semibold">Your response:</span> {review.response}
                                                    </p>
                                                </div>
                                            ) : (
                                                <Button variant="outline" size="sm">
                                                    Respond to Review
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HostReviews;