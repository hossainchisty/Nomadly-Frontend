import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: number; // 1 for renter, 2 for host
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { token, user } = useAuth();
    const location = useLocation();

    // If not authenticated, redirect to auth page
    if (!token) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // If specific role is required, check user role
    if (requiredRole && user?.role !== requiredRole) {
        // If user is a renter trying to access host pages, redirect to profile
        if (requiredRole === 2 && user?.role === 1) {
            return <Navigate to="/profile" replace />;
        }
        // If user is a host trying to access renter pages, redirect to dashboard
        if (requiredRole === 1 && user?.role === 2) {
            return <Navigate to="/host/dashboard" replace />;
        }
        // For any other mismatch, redirect to home
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;