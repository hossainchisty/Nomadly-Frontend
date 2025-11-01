import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Building2, Home, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [userType, setUserType] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login, register, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  // ------------------- VALIDATION -------------------
  const validateEmailOrMobile = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^(?:\+?\d{1,3})?[0-9]{10,13}$/;
    return emailRegex.test(value) || mobileRegex.test(value);
  };

  const handleLogin = async () => {
    if (!validateEmailOrMobile(form.email)) {
      alert("Please enter a valid email address or mobile number.");
      return;
    }
    if (!form.password) {
      alert("Password is required.");
      return;
    }

    try {
      await login(form.email, form.password);
      navigate(userType === "host" ? "/host/dashboard" : "/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleRegister = async () => {
    if (!form.name.trim()) {
      alert("Full name is required.");
      return;
    }
    if (!validateEmailOrMobile(form.email)) {
      alert("Please enter a valid email address or mobile number.");
      return;
    }
    if (!form.password) {
      alert("Password is required.");
      return;
    }

    try {
      await register({
        full_name: form.name,
        username: form.email,
        password: form.password,
        role: userType === "host" ? 2 : 1,
      });
      navigate(userType === "host" ? "/host/dashboard" : "/");
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {!userType ? (
            // ------------------- USER TYPE SELECTION -------------------
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Nomadly</h1>
                <p className="text-xl text-muted-foreground">
                  Let's get started. Are you looking to rent or list a property?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card
                  className="group cursor-pointer border-2 hover:border-primary hover:shadow-large transition-all duration-300 hover:-translate-y-2 bg-gradient-card"
                  onClick={() => setUserType("renter")}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all">
                      <User className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl">I'm a Renter</CardTitle>
                    <CardDescription className="text-base">
                      Find flexible monthly housing
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="group cursor-pointer border-2 hover:border-primary hover:shadow-large transition-all duration-300 hover:-translate-y-2 bg-gradient-card"
                  onClick={() => setUserType("host")}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all">
                      <Building2 className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl">I'm a Host</CardTitle>
                    <CardDescription className="text-base">
                      List your property for monthly rentals
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ) : (
            // ------------------- AUTH FORM -------------------
            <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom duration-500">
              <Button variant="ghost" onClick={() => setUserType(null)} className="mb-6">
                ← Back
              </Button>

              <Card className="bg-gradient-card shadow-large">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <Home className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">
                    {userType === "renter" ? "Find Your Stay" : "List Your Property"}
                  </CardTitle>
                  <CardDescription>
                    {userType === "renter"
                      ? "Create an account to start booking"
                      : "Create an account to start hosting"}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Tabs defaultValue="signup" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                      <TabsTrigger value="login">Login</TabsTrigger>
                    </TabsList>

                    {/* Sign Up */}
                    <TabsContent value="signup" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email or Mobile Number</Label>
                        <Input
                          id="email"
                          type="text"
                          placeholder="Enter your email or mobile number"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                      </div>
                      <Button
                        className="w-full bg-gradient-hero shadow-soft hover:shadow-glow transition-all"
                        onClick={handleRegister}
                      >
                        Create Account
                      </Button>
                    </TabsContent>

                    {/* Login */}
                    <TabsContent value="login" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email or Mobile Number</Label>
                        <Input
                          id="login-email"
                          type="text"
                          placeholder="Enter your email or mobile number"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Enter your password"
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                      </div>
                      <Button
                        className="w-full bg-gradient-hero shadow-soft hover:shadow-glow transition-all"
                        onClick={handleLogin}
                      >
                        Sign In
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Auth;
