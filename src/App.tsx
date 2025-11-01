import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";

import ProtectedRoute from "./components/ProtectedRoute";
import AddListing from "./pages/admin/AddListing";
import HostBookings from "./pages/admin/Bookings";
import HostDashboard from "./pages/admin/Dashboard";
import HostListings from "./pages/admin/Listings";
import HostRevenue from "./pages/admin/Revenue";
import Subscription from "./pages/admin/Subscription";
import Auth from "./pages/Auth";
import BecomeHost from "./pages/BecomeHost";
import BookingRequest from "./pages/BookingRequest";
import HostBookingDetails from "./pages/host/BookingDetails";
import HostCustomerDetails from "./pages/host/CustomerDetails";
import HostCustomers from "./pages/host/Customers";
import HostProfile from "./pages/host/Profile";
import HostReviews from "./pages/host/Reviews";
import HowItWorks from "./pages/HowItWorks";
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import PropertyDetail from "./pages/PropertyDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider> {/* ✅ Wrap here */}
      <SubscriptionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/booking/:id" element={<BookingRequest />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/become-host" element={<BecomeHost />} />
              <Route path="/how-it-works" element={<HowItWorks />} />

              {/* Protected routes for renters */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute requiredRole={1}>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Protected routes for hosts */}
              <Route
                path="/host/dashboard"
                element={
                  <ProtectedRoute requiredRole={2}>
                    <HostDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/listings"
                element={
                  <ProtectedRoute requiredRole={2}>
                    <HostListings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/listings/new"
                element={
                  <ProtectedRoute requiredRole={2}>
                    <AddListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/listings/edit/:id"
                element={
                  <ProtectedRoute requiredRole={2}>
                    <AddListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/bookings"
                element={
                  <ProtectedRoute requiredRole={2}>
                    <HostBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/bookings/:id"
                element={
                  <ProtectedRoute requiredRole={2}>
                    <HostBookingDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/customers"
                element={
                  <ProtectedRoute requiredRole={2}>
                    <HostCustomers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/customers/:id"
                element={
                  <ProtectedRoute requiredRole={2}>
                    <HostCustomerDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/revenue"
                element={
                  <ProtectedRoute requiredRole={2}>
                    <HostRevenue />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/subscription"
                element={
                  <ProtectedRoute requiredRole={2}>
                    <Subscription />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/reviews"
                element={
                  <ProtectedRoute requiredRole={2}>
                    <HostReviews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/profile"
                element={
                  <ProtectedRoute requiredRole={2}>
                    <HostProfile />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;