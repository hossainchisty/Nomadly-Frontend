import HostNavigation from "@/components/HostNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Home, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

const HostCustomers = () => {
    const { user } = useAuth();



    // Mock data for customers
    const customers = [
        {
            id: 1,
            name: "Sarah Chen",
            email: "sarah.chen@example.com",
            phone: "+1 (555) 123-4567",
            totalBookings: 3,
            totalSpent: 2450,
            lastBooking: "2025-10-28",
            status: "Active"
        },
        {
            id: 2,
            name: "John Smith",
            email: "john.smith@example.com",
            phone: "+1 (555) 987-6543",
            totalBookings: 2,
            totalSpent: 1800,
            lastBooking: "2025-10-25",
            status: "Active"
        },
        {
            id: 3,
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            phone: "+1 (555) 456-7890",
            totalBookings: 1,
            totalSpent: 1200,
            lastBooking: "2025-10-20",
            status: "New"
        },
        {
            id: 4,
            name: "Maria Garcia",
            email: "maria.garcia@example.com",
            phone: "+1 (555) 234-5678",
            totalBookings: 4,
            totalSpent: 3200,
            lastBooking: "2025-10-15",
            status: "VIP"
        },
        {
            id: 5,
            name: "David Wilson",
            email: "david.wilson@example.com",
            phone: "+1 (555) 876-5432",
            totalBookings: 2,
            totalSpent: 1950,
            lastBooking: "2025-10-10",
            status: "Active"
        }
    ];

    return (
        <div className="flex min-h-screen bg-background">
            <HostNavigation />

            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Customer List</h1>
                            <p className="text-muted-foreground">
                                View and manage your guests
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <Card className="bg-gradient-card shadow-soft">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Your Guests
                                </CardTitle>
                                <CardDescription>
                                    {customers.length} total customers
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {customers.map((customer) => (
                                        <div key={customer.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                                            <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                                                    <User className="w-6 h-6 text-primary-foreground" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{customer.name}</h3>
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Phone className="w-4 h-4" />
                                                            {customer.phone}
                                                        </span>
                                                        <span className="hidden sm:block">•</span>
                                                        <span>{customer.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Total Bookings</span>
                                                    <span className="font-semibold">{customer.totalBookings}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Total Spent</span>
                                                    <span className="font-semibold">${customer.totalSpent}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Last Booking</span>
                                                    <span>{customer.lastBooking}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Status</span>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${customer.status === "VIP"
                                                            ? "bg-purple-100 text-purple-800"
                                                            : customer.status === "Active"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-blue-100 text-blue-800"
                                                        }`}>
                                                        {customer.status}
                                                    </span>
                                                </div>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link to={`/host/customers/${customer.id}`}>
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customer Statistics */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="text-lg">Total Customers</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{customers.length}</div>
                                    <p className="text-sm text-muted-foreground">Active guests</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="text-lg">Total Revenue</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">${customers.reduce((sum, customer) => sum + customer.totalSpent, 0).toLocaleString()}</div>
                                    <p className="text-sm text-muted-foreground">From all bookings</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-card shadow-soft">
                                <CardHeader>
                                    <CardTitle className="text-lg">Avg. Bookings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        {(customers.reduce((sum, customer) => sum + customer.totalBookings, 0) / customers.length).toFixed(1)}
                                    </div>
                                    <p className="text-sm text-muted-foreground">Per customer</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <Card className="bg-gradient-card shadow-soft">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-3">
                                    <Button variant="outline">
                                        Export Customer List
                                    </Button>
                                    <Button variant="outline">
                                        Send Group Message
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link to="/host/bookings">
                                            <Home className="w-4 h-4 mr-2" />
                                            View All Bookings
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HostCustomers;