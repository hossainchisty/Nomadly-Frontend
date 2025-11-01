import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Building2, Calendar, Crown, DollarSign, Home, LayoutDashboard, LogOut, Star, User, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HostNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/host/dashboard" },
    { icon: Building2, label: "My Listings", path: "/host/listings" },
    { icon: Calendar, label: "Bookings", path: "/host/bookings" },
    { icon: Users, label: "Customers", path: "/host/customers" },
    { icon: Star, label: "Reviews", path: "/host/reviews" },
    { icon: DollarSign, label: "Revenue", path: "/host/revenue" },
    { icon: Crown, label: "Subscription", path: "/host/subscription" },
    { icon: User, label: "Profile", path: "/host/profile" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300">
            <Home className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-ocean to-accent bg-clip-text text-transparent block">
              Nomadly
            </span>
            <span className="text-xs text-muted-foreground">Host Portal</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 transition-all",
                    isActive && "bg-ocean-light text-ocean font-semibold"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Link to="/">
          <Button variant="outline" className="w-full justify-start gap-3">
            <Home className="w-5 h-5" />
            Back to Main Site
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default HostNavigation;