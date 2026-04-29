import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { getUser, User } from "@/lib/storage";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      navigate("/auth");
      return;
    }
    setLocalUser(u);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:pl-64">
        <Topbar user={user} onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 md:p-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
