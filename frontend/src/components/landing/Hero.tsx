import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check, TrendingUp, Bell, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-students.png";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* gradient blobs */}
      <div aria-hidden className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div aria-hidden className="absolute top-40 right-0 w-[400px] h-[400px] bg-primary-glow/15 rounded-full blur-[120px]" />

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            AI-Powered Education Platform
          </div>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-[1.05] text-balance">
            <span className="font-serif italic text-primary">Smarter learning,</span>
            <br />
            brighter futures.
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
            AI-powered insights, smart monitoring, and personalized guidance for students, parents, and teachers.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/login" className="group inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:scale-[1.02] transition">
              Get Started
              <span className="w-9 h-9 rounded-full bg-primary-foreground/20 grid place-items-center group-hover:translate-x-0.5 transition">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <a href="#features" className="px-6 py-3 rounded-full border border-border bg-card/60 backdrop-blur font-medium hover:bg-card transition">
              Explore Features
            </a>
          </div>

          <div className="mt-10">
            <p className="text-xs text-muted-foreground mb-3">Trusted by 500+ schools</p>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-beige border border-border grid place-items-center text-[10px] font-bold text-muted-foreground">
                  S{i}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative">
          <div aria-hidden className="absolute inset-0 bg-gradient-glow" />
          <img src={heroImg} alt="AI mentor and student learning together" width={1024} height={1024} className="relative w-full max-w-[600px] mx-auto" />

          {/* floating cards */}
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-6 left-0 float-card p-4 w-48">
            <div className="flex items-center gap-2 text-xs text-primary font-medium"><TrendingUp className="w-3.5 h-3.5" /> AI Prediction</div>
            <div className="text-xs text-muted-foreground mt-1">High Performance</div>
            <div className="text-2xl font-bold mt-1">92%</div>
            <svg viewBox="0 0 100 30" className="mt-1 w-full h-6"><polyline fill="none" stroke="hsl(var(--primary))" strokeWidth="2" points="0,25 20,18 40,22 60,10 80,12 100,4" /></svg>
          </motion.div>

          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-2 right-0 float-card p-4 w-44">
            <div className="text-xs text-muted-foreground">Attendance</div>
            <div className="mt-2 grid place-items-center">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="89 100" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-sm font-bold text-primary">95%</div>
              </div>
            </div>
          </motion.div>

          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-44 right-2 float-card p-3 w-44">
            <div className="flex items-center gap-2 text-xs text-primary font-medium"><Bell className="w-3.5 h-3.5" /> Next Class</div>
            <div className="text-sm font-semibold mt-1">Mathematics</div>
            <div className="text-xs text-muted-foreground">10:00 AM</div>
          </motion.div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5.5, repeat: Infinity }} className="absolute bottom-8 right-8 float-card p-4 w-48">
            <div className="flex items-center gap-2 text-xs text-primary font-medium"><BookOpen className="w-3.5 h-3.5" /> Study Plan</div>
            <ul className="mt-2 space-y-1 text-xs">
              {["Math", "Science", "English"].map((s) => (
                <li key={s} className="flex items-center gap-2"><Check className="w-3 h-3 text-success" /> {s}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
