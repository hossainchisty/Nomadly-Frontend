import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Building2, Calendar, Camera, CreditCard, Edit3, Home, User } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, logout } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileImage, setProfileImage] = useState<string | null>(user?.profile_picture || null);

    const handleLogout = () => {
        logout();
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you would upload the file to your server here
            // For now, we'll just display it locally
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setProfileImage(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Mock data for profile
    const upcomingStays = [
        { id: 1, property: "Modern Studio in Barcelona", checkIn: "2025-11-01", checkOut: "2025-11-15" },
        { id: 2, property: "Coastal Apartment Lisbon", checkIn: "2025-12-05", checkOut: "2025-12-20" },
    ];

    const paymentMethods = [
        { id: 1, type: "Visa", number: "**** **** **** 1234", expiry: "12/25" },
        { id: 2, type: "Mastercard", number: "**** **** **** 5678", expiry: "06/26" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Your Profile</h1>
                            <p className="text-muted-foreground">
                                Manage your account settings and view your booking history
                            </p>
                        </div>
                        <Button variant="outline" onClick={handleLogout}>
                            Sign Out
                        </Button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Profile Info */}
                        <div className="lg:col-span-1">
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader className="text-center relative">
                                    <div className="relative w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft border-4 border-background">
                                        {profileImage ? (
                                            <img
                                                src={profileImage}
                                                alt={user?.first_name && user?.last_name
                                                    ? `${user.first_name} ${user.last_name}`
                                                    : user?.username || "User"}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-12 h-12 text-primary-foreground" />
                                        )}
                                        <button
                                            className="absolute bottom-2 right-2 bg-primary rounded-full p-1.5 shadow-md hover:bg-primary/90 transition-colors"
                                            onClick={handleImageClick}
                                        >
                                            <Camera className="w-3 h-3 text-primary-foreground" />
                                        </button>
                                    </div>
                                    <CardTitle className="text-2xl">
                                        {user?.first_name && user?.last_name
                                            ? `${user.first_name} ${user.last_name}`
                                            : user?.username || "User"}
                                    </CardTitle>
                                    <CardDescription>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                            Renter
                                        </span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm p-3 bg-secondary rounded-lg">
                                        <Home className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-muted-foreground">{user?.email || "user@example.com"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm p-3 bg-secondary rounded-lg">
                                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Payment Methods</p>
                                            <p className="text-muted-foreground">2 Payment Methods</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm p-3 bg-secondary rounded-lg">
                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Upcoming Stays</p>
                                            <p className="text-muted-foreground">3 Upcoming Stays</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card className="mt-6 bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Edit3 className="w-5 h-5" />
                                        Quick Actions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start">
                                        Edit Profile
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        Change Password
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        Notification Settings
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Upcoming Stays */}
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Upcoming Stays
                                    </CardTitle>
                                    <CardDescription>Your upcoming bookings</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {upcomingStays.map((stay) => (
                                        <div key={stay.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                                            <div>
                                                <h3 className="font-semibold">{stay.property}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {stay.checkIn} - {stay.checkOut}
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </div>
                                    ))}
                                    <Button variant="ghost" className="w-full">
                                        View All Bookings
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Payment Methods */}
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="w-5 h-5" />
                                        Payment Methods
                                    </CardTitle>
                                    <CardDescription>Your saved payment methods</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {paymentMethods.map((method) => (
                                        <div key={method.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                                            <div>
                                                <h3 className="font-semibold">{method.type}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {method.number} • Expires {method.expiry}
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Manage
                                            </Button>
                                        </div>
                                    ))}
                                    <Button variant="ghost" className="w-full">
                                        Add Payment Method
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Become a Host */}
                            <Card className="bg-gradient-card shadow-soft border-ocean">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Building2 className="w-5 h-5" />
                                        Become a Host
                                    </CardTitle>
                                    <CardDescription>Start earning by listing your property</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        Join thousands of hosts earning monthly income by listing their properties on Nomadly.
                                    </p>
                                    <Link to="/become-host">
                                        <Button className="w-full bg-gradient-hero shadow-soft hover:shadow-glow transition-all">
                                            List Your Property
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Hidden file input for profile image upload */}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </main>
        </div>
    );
};

export default Profile;