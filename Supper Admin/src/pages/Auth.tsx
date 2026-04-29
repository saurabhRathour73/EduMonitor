import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";
import { setUser } from "@/lib/storage";
import { ArrowLeft } from "lucide-react";

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const Auth = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Loading State
  const [loading, setLoading] = useState(false);

  // =========================
  // SUPER ADMIN LOGIN API
  // Backend API:
  // POST http://localhost:3000/auth/superAdmin/login
  // =========================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // API CALL FOR LOGIN
      const response = await fetch(
        "http://localhost:3000/auth/superAdmin/login",
        {
          method: "POST",
          credentials: "include", // 🔥 THIS IS MANDATORY
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
        }
      );

      const data = await response.json();

      // If login failed
      if (!response.ok) {
        toast.error(data.message || "Invalid credentials");
        return;
      }

      // Save logged-in user in local storage
      setUser({
        name: data.superAdmin?.name || "Super Admin",
        email: data.superAdmin?.email || loginEmail,
      });

      // Optional:
      // localStorage.setItem("token", data.token);

      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SUPER ADMIN REGISTER API
  // Backend API:
  // POST http://localhost:3000/auth/superAdmin/register
  // =========================
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!regName || !regEmail || !regPassword) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // API CALL FOR REGISTER
      const response = await fetch(
        "http://localhost:3000/auth/superAdmin/register",
        {
          method: "POST",
          credentials: "include", // 🔥 ADD THIS
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: regName,
            email: regEmail,
            password: regPassword,
          }),
        }
      );

      const data = await response.json();

      // If registration failed
      if (!response.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      // Save user locally after successful registration
      setUser({
        name: data.superAdmin?.name || regName,
        email: data.superAdmin?.email || regEmail,
      });

      // Optional:
      // localStorage.setItem("token", data.token);

      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Register Error:", error);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN (DEMO)
  // =========================
  const handleGoogle = () => {
    setUser({
      name: "Super Admin",
      email: "admin@edumonitor.app",
    });

    toast.success("Signed in with Google");
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-soft px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute left-6 top-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="w-full max-w-md animate-scale-in">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo size="lg" />
        </div>

        {/* Auth Card */}
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted p-1">
              <TabsTrigger value="login" className="rounded-full">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded-full">
                Register
              </TabsTrigger>
            </TabsList>

            {/* LOGIN TAB */}
            <TabsContent value="login" className="mt-6 animate-fade-in">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-primary shadow-glow"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            {/* REGISTER TAB */}
            <TabsContent value="register" className="mt-6 animate-fade-in">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Name</Label>
                  <Input
                    id="reg-name"
                    placeholder="John Doe"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-primary shadow-glow"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Google Auth */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogle}
            className="w-full rounded-full border-2 gap-2"
          >
            <GoogleIcon /> Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;