import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token, user } = useAuth();

  // Simple role checking based on the known API response structure
  const isHost = user?.role === 2;
  const isRenter = user?.role === 1;
  const isUserDataLoading = token && user === null; // User data is still being fetched

  // Get user's full name or fallback
  const getUserDisplayName = () => {
    if (user?.full_name) return user.full_name;
    if (user?.first_name && user?.last_name) return `${user.first_name} ${user.last_name}`;
    if (user?.first_name) return user.first_name;
    if (user?.username) return user.username;
    return "User";
  };

  

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-ocean to-accent bg-clip-text text-transparent">
              Nomadly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/listings" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Browse Stays
            </Link>
            <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link to="/become-host" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Become a Host
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {token ? (
              isUserDataLoading ? (
                // Show loading state while user data is being fetched
                <Button variant="ghost" size="sm" disabled>
                  Loading...
                </Button>
              ) : isHost ? (
                <div className="flex items-center gap-2">
                  <Link to="/host/dashboard">
                    <Button variant="ghost" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/host/dashboard" className="flex items-center gap-2 hover:bg-secondary rounded-lg px-2 py-1 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center">
                      {user?.profile_picture ? (
                        <img
                          src={user.profile_picture}
                          alt={getUserDisplayName()}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                  </Link>
                </div>
              ) : isRenter ? (
                <div className="flex items-center gap-2">
                  <Link to="/profile">
                    <Button variant="ghost" size="sm">
                      Profile
                    </Button>
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2 hover:bg-secondary rounded-lg px-2 py-1 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center">
                      {user?.profile_picture ? (
                        <img
                          src={user.profile_picture}
                          alt={getUserDisplayName()}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                  </Link>
                </div>
              ) : (
                // Fallback: if we can't determine the role, show a generic button
                <div className="flex items-center gap-2">
                  <Link to="/profile">
                    <Button variant="ghost" size="sm">
                      Account
                    </Button>
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2 hover:bg-secondary rounded-lg px-2 py-1 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center">
                      {user?.profile_picture ? (
                        <img
                          src={user.profile_picture}
                          alt={getUserDisplayName()}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                  </Link>
                </div>
              )
            ) : (
              <>
                <Link to="/auth">
                  <Button size="sm" className="bg-gradient-hero shadow-soft hover:shadow-glow transition-all">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4">
              <Link
                to="/listings"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Stays
              </Link>
              <Link
                to="/how-it-works"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/become-host"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Become a Host
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                {token ? (
                  isUserDataLoading ? (
                    // Show loading state while user data is being fetched
                    <Button variant="ghost" size="sm" className="w-full" disabled>
                      Loading...
                    </Button>
                  ) : isHost ? (
                    <div className="flex flex-col gap-2">
                      <Link to="/host/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full justify-between">
                          Dashboard
                          <div className="w-6 h-6 rounded-full bg-gradient-hero flex items-center justify-center">
                            {user?.profile_picture ? (
                              <img
                                src={user.profile_picture}
                                alt={getUserDisplayName()}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-3 h-3 text-primary-foreground" />
                            )}
                          </div>
                        </Button>
                      </Link>
                    </div>
                  ) : isRenter ? (
                    <div className="flex flex-col gap-2">
                      <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full justify-between">
                          Profile
                          <div className="w-6 h-6 rounded-full bg-gradient-hero flex items-center justify-center">
                            {user?.profile_picture ? (
                              <img
                                src={user.profile_picture}
                                alt={getUserDisplayName()}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-3 h-3 text-primary-foreground" />
                            )}
                          </div>
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    // Fallback: if we can't determine the role, show a generic button
                    <div className="flex flex-col gap-2">
                      <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full justify-between">
                          Account
                          <div className="w-6 h-6 rounded-full bg-gradient-hero flex items-center justify-center">
                            {user?.profile_picture ? (
                              <img
                                src={user.profile_picture}
                                alt={getUserDisplayName()}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-3 h-3 text-primary-foreground" />
                            )}
                          </div>
                        </Button>
                      </Link>
                    </div>
                  )
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" className="w-full bg-gradient-hero shadow-soft">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;