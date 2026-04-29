import { motion } from "framer-motion";
import { Check, ArrowRight, Bot, Star } from "lucide-react";
import { Link } from "react-router-dom";
import monitoringImg from "@/assets/monitoring-student.png";

const points = [
  "Real-time student monitoring",
  "AI-powered performance prediction",
  "Personalized learning recommendations",
  "Parent-teacher communication",
];

export default function Monitoring() {
  return (
    <section id="dashboards" className="container py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Smart Monitoring</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
            Empowering every
            <br />
            <span className="font-serif italic text-primary">part of education.</span>
          </h2>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/15 grid place-items-center"><Check className="w-3 h-3 text-primary" /></span>
                <span className="text-sm">{p}</span>
              </li>
            ))}
          </ul>

          <Link to="/login" className="mt-8 group inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:scale-[1.02] transition">
            Start Your Journey
            <span className="w-9 h-9 rounded-full bg-primary-foreground/20 grid place-items-center"><ArrowRight className="w-4 h-4" /></span>
          </Link>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/40 to-primary-glow/40 border-2 border-background" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">4.8/5 from 2,500+ reviews</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
          <div aria-hidden className="absolute inset-0 bg-gradient-glow" />
          <img src={monitoringImg} alt="Student studying with AI assistance" loading="lazy" width={1024} height={1024} className="relative w-full max-w-[500px] mx-auto" />

          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-12 left-0 float-card p-4 w-48">
            <div className="text-xs text-muted-foreground">Performance</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-9 h-9 rounded-full bg-success/15 grid place-items-center text-success font-bold text-sm">A+</div>
              <div className="text-sm font-medium">Excellent</div>
            </div>
            <svg viewBox="0 0 100 30" className="mt-2 w-full h-6"><polyline fill="none" stroke="hsl(var(--primary))" strokeWidth="2" points="0,22 20,16 40,18 60,8 80,10 100,4" /></svg>
          </motion.div>

          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-12 right-0 float-card p-3 w-44">
            <div className="flex items-center gap-2 text-xs text-primary font-medium"><Bot className="w-3.5 h-3.5" /> AI Suggestion</div>
            <p className="text-xs text-muted-foreground mt-1">Focus more on Mathematics practice daily.</p>
          </motion.div>

          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-12 right-2 float-card p-3 w-44">
            <div className="text-xs font-medium mb-2">Weekly Progress</div>
            <div className="flex items-end gap-1 h-12">
              {[40, 60, 35, 80, 55, 70, 90].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-primary" style={{ height: `${h}%` }} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
