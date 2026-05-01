import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check, TrendingUp, Bell, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-students.png";

export default function Hero() {
  return (
    <section className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-14 sm:pb-16 md:pb-20 overflow-hidden">
      {/* gradient blobs */}
      <div
        aria-hidden
        className="absolute -top-20 -left-20 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute top-20 sm:top-32 md:top-40 right-0 w-[220px] sm:w-[300px] md:w-[400px] h-[220px] sm:h-[300px] md:h-[400px] bg-primary-glow/15 rounded-full blur-[80px] md:blur-[120px]"
      />

      <div className="container relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur text-[10px] sm:text-xs font-medium">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
            AI-Powered Education Platform
          </div>

          <h1 className="mt-5 sm:mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-balance">
            <span className="font-serif italic text-primary">Smarter learning,</span>
            <br />
            brighter futures.
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-full sm:max-w-lg lg:max-w-md leading-relaxed mx-auto lg:mx-0">
            AI-powered insights, smart monitoring, and personalized guidance for students, parents, and teachers.
          </p>

          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3">
            <Link
              to="/login"
              className="group inline-flex items-center justify-center gap-2 pl-5 sm:pl-6 pr-2 py-2.5 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:scale-[1.02] transition w-full sm:w-auto"
            >
              Get Started
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-foreground/20 grid place-items-center group-hover:translate-x-0.5 transition">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <a
              href="#features"
              className="px-5 sm:px-6 py-3 rounded-full border border-border bg-card/60 backdrop-blur font-medium hover:bg-card transition w-full sm:w-auto text-center"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-8 sm:mt-10">
            <p className="text-xs text-muted-foreground mb-3">Trusted by 500+ schools</p>
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 flex-wrap">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-muted to-beige border border-border grid place-items-center text-[9px] sm:text-[10px] font-bold text-muted-foreground"
                >
                  S{i}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative order-1 lg:order-2"
        >
          <div aria-hidden className="absolute inset-0 bg-gradient-glow" />

          <img
            src={heroImg}
            alt="AI mentor and student learning together"
            width={1024}
            height={1024}
            className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto"
          />

          {/* floating cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-2 sm:top-6 left-0 sm:left-2 lg:left-0 float-card p-2 sm:p-4 w-32 sm:w-40 md:w-48"
          >
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-primary font-medium">
              <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              AI Prediction
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">High Performance</div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold mt-1">92%</div>
            <svg viewBox="0 0 100 30" className="mt-1 w-full h-5 sm:h-6">
              <polyline
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                points="0,25 20,18 40,22 60,10 80,12 100,4"
              />
            </svg>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-0 sm:top-2 right-0 sm:right-2 lg:right-0 float-card p-2 sm:p-4 w-28 sm:w-36 md:w-44"
          >
            <div className="text-[10px] sm:text-xs text-muted-foreground">Attendance</div>
            <div className="mt-2 grid place-items-center">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeDasharray="89 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-xs sm:text-sm font-bold text-primary">
                  95%
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute top-28 sm:top-36 md:top-44 right-1 sm:right-2 float-card p-2 sm:p-3 w-28 sm:w-36 md:w-44"
          >
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-primary font-medium">
              <Bell className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Next Class
            </div>
            <div className="text-xs sm:text-sm font-semibold mt-1">Mathematics</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">10:00 AM</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity }}
            className="absolute bottom-2 sm:bottom-6 md:bottom-8 right-2 sm:right-6 md:right-8 float-card p-2 sm:p-4 w-32 sm:w-40 md:w-48"
          >
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-primary font-medium">
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Study Plan
            </div>
            <ul className="mt-2 space-y-1 text-[10px] sm:text-xs">
              {["Math", "Science", "English"].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-success" /> {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
