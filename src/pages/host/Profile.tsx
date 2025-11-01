import HostNavigation from "@/components/HostNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Building2, Calendar, Camera, CreditCard, Edit3, Home, User } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const HostProfile = () => {
    const { user } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileImage, setProfileImage] = useState<string | null>(user?.profile_picture || null);


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

    // Get user's display name
    const getUserDisplayName = () => {
        if (user?.first_name && user?.last_name) {
            return `${user.first_name} ${user.last_name}`;
        } else if (user?.first_name) {
            return user.first_name;
        } else if (user?.username) {
            return user.username;
        }
        return "Host";
    };

    // Mock data for profile
    const properties = [
        { id: 1, name: "Modern Studio in Barcelona", status: "Active" },
        { id: 2, name: "Coastal Apartment Lisbon", status: "Active" },
        { id: 3, name: "Loft in Tech Hub Berlin", status: "Draft" },
    ];

    const paymentMethods = [
        { id: 1, type: "Visa", number: "**** **** **** 1234", expiry: "12/25" },
        { id: 2, type: "Mastercard", number: "**** **** **** 5678", expiry: "06/26" },
    ];

    return (
        <div className="flex min-h-screen bg-background">
            <HostNavigation />

            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Host Profile</h1>
                            <p className="text-muted-foreground">
                                Manage your host account settings and view your property information
                            </p>
                        </div>
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
                                                alt={getUserDisplayName()}
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
                                        {getUserDisplayName()}
                                    </CardTitle>
                                    <CardDescription className="flex items-center justify-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        Host
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm p-3 bg-secondary rounded-lg">
                                        <Home className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-muted-foreground">{user?.email || "host@example.com"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm p-3 bg-secondary rounded-lg">
                                        <Building2 className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Properties</p>
                                            <p className="text-muted-foreground">{properties.length} Properties</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm p-3 bg-secondary rounded-lg">
                                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Payment Methods</p>
                                            <p className="text-muted-foreground">{paymentMethods.length} Payment Methods</p>
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
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <Link to="/host/profile/edit">
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Edit Profile
                                        </Link>
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
                            {/* Properties */}
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Building2 className="w-5 h-5" />
                                        Your Properties
                                    </CardTitle>
                                    <CardDescription>Manage your listed properties</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {properties.map((property) => (
                                        <div key={property.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                                            <div>
                                                <h3 className="font-semibold">{property.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Status: {property.status}
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Manage
                                            </Button>
                                        </div>
                                    ))}
                                    <Button variant="ghost" className="w-full" asChild>
                                        <Link to="/host/listings">
                                            View All Properties
                                        </Link>
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

                            {/* Account Statistics */}
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Account Statistics
                                    </CardTitle>
                                    <CardDescription>Your hosting performance metrics</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center p-4 bg-secondary rounded-lg">
                                            <p className="text-2xl font-bold">24</p>
                                            <p className="text-sm text-muted-foreground">Total Bookings</p>
                                        </div>
                                        <div className="text-center p-4 bg-secondary rounded-lg">
                                            <p className="text-2xl font-bold">$12,450</p>
                                            <p className="text-sm text-muted-foreground">Total Earnings</p>
                                        </div>
                                        <div className="text-center p-4 bg-secondary rounded-lg">
                                            <p className="text-2xl font-bold">4.8</p>
                                            <p className="text-sm text-muted-foreground">Avg. Rating</p>
                                        </div>
                                        <div className="text-center p-4 bg-secondary rounded-lg">
                                            <p className="text-2xl font-bold">18</p>
                                            <p className="text-sm text-muted-foreground">Active Listings</p>
                                        </div>
                                    </div>
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

export default HostProfile;