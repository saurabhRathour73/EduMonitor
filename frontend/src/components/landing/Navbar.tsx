import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/store/auth";

const links = [
  { to: "/", label: "Home" },
  { to: "/#features", label: "Features" },
  { to: "/#About", label: "About" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 100], [8, 18]);
  const bg = useTransform(scrollY, [0, 100], [
    "hsla(30,30%,98%,0.6)",
    "hsla(30,30%,98%,0.88)",
  ]);

  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header
      style={{
        backdropFilter: `blur(${blur.get()}px)`,
        background: bg,
      }}
      className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-[min(1180px,calc(100%-2rem))] rounded-2xl sm:rounded-full border border-border shadow-soft"
    >
      {/* NAVBAR MAIN */}
      <div className="flex items-center justify-between px-3 sm:px-5 py-2.5">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow shrink-0">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>

          <span className="font-bold text-base sm:text-lg tracking-tight truncate">
            EduMonitor<span className="text-primary">.</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-colors ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground"
                }`
              }
            >
              {l.label}
              {l.label === "Dashboards" && (
                <ChevronDown className="inline w-3.5 h-3.5 ml-0.5" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <button
                onClick={() => navigate(`/dashboard/${user.role}`)}
                className="px-4 py-2 text-sm font-medium rounded-full hover:bg-muted transition"
              >
                {user.name.split(" ")[0]}
              </button>

              <button
                onClick={() => {
                  signOut();
                  navigate("/");
                }}
                className="px-5 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-medium rounded-full hover:bg-muted transition"
              >
                Login
              </Link>

              <Link
                to="/login"
                className="px-5 py-2.5 text-sm font-medium rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-full hover:bg-muted transition shrink-0"
          aria-label="Toggle Menu"
        >
          {open ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        className={`md:hidden overflow-hidden ${
          open ? "border-t border-border" : ""
        }`}
      >
        <div className="p-4 flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium hover:bg-muted rounded-xl transition"
            >
              {l.label}
            </Link>
          ))}

          {user ? (
            <>
              <button
                onClick={() => {
                  navigate(`/dashboard/${user.role}`);
                  setOpen(false);
                }}
                className="px-4 py-3 text-sm font-medium rounded-xl hover:bg-muted text-left transition"
              >
                Dashboard ({user.name.split(" ")[0]})
              </button>

              <button
                onClick={() => {
                  signOut();
                  navigate("/");
                  setOpen(false);
                }}
                className="px-4 py-3 text-sm font-medium rounded-full bg-foreground text-background transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium rounded-xl hover:bg-muted transition"
              >
                Login
              </Link>

              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm rounded-full bg-gradient-primary text-primary-foreground text-center font-medium shadow-glow"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </motion.header>
  );
}
