import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Sparkles, Home, BarChart3, Calendar, MessagesSquare, BookOpen, Bell, LogOut, Search, Settings, Brain } from "lucide-react";
import { useAuth, type Role } from "@/store/auth";
import { toast } from "sonner";
import { useEffect } from "react";

const navByRole: Record<Role, { to: string; label: string; icon: any }[]> = {
  student: [
    { to: "", label: "Overview", icon: Home },
    { to: "performance", label: "Performance", icon: BarChart3 },
    { to: "assignments", label: "Assignments", icon: BookOpen },
    { to: "quiz", label: "Quiz", icon: Calendar },
    { to: "ai", label: "AI Assistant", icon: MessagesSquare },
    { to: "study", label: "AI Study Pack", icon: Brain },
  ],
  parent: [
    { to: "", label: "Overview", icon: Home },
    { to: "performance", label: "Performance", icon: BarChart3 },
    { to: "alerts", label: "Alerts", icon: Bell },
  ],
  teacher: [
    { to: "", label: "Overview", icon: Home },
    { to: "students", label: "Students", icon: BookOpen },
    { to: "assignments", label: "Assignments", icon: Calendar },
  ],
  admin: [
    { to: "", label: "Overview", icon: Home },
    { to: "users", label: "Users", icon: BookOpen },
    { to: "analytics", label: "Analytics", icon: BarChart3 },
  ],
};

export default function DashboardLayout({ role }: { role: Role }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const items = navByRole[role];

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  const logout = () => {
    signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen warm-bg flex">
      <aside className="w-64 shrink-0 border-r border-border bg-card/50 backdrop-blur-xl p-5 hidden md:flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">EduMonitor.<span className="text-primary">.</span></span>
        </Link>

        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 px-3">Menu</div>
        <nav className="flex flex-col gap-1">
          {items.map((i) => (
            <NavLink
              key={i.label}
              to={`/dashboard/${role}/${i.to}`}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition ${isActive ? "bg-gradient-primary text-primary-foreground shadow-glow" : "hover:bg-muted text-foreground/80"}`
              }
            >
              <i.icon className="w-4 h-4" />
              {i.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <div className="float-card p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-bold text-sm">
              {user.name[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-[10px] text-muted-foreground capitalize">{role}</div>
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-2xl text-sm hover:bg-muted text-foreground/70">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-background/70 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-xl font-bold capitalize">{role} Dashboard</h1>
              <p className="text-xs text-muted-foreground">Welcome back, {user.name.split(" ")[0]} ✨</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input placeholder="Search..." className="bg-transparent outline-none text-sm w-40" />
              </div>
              <button onClick={() => toast.info("3 new notifications")} className="relative w-10 h-10 rounded-full bg-card border border-border grid place-items-center hover:bg-muted">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </button>
              <button className="w-10 h-10 rounded-full bg-card border border-border grid place-items-center hover:bg-muted">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
