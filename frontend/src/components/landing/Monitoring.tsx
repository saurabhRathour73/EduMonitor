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
    <section
      id="dashboards"
      className="container py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
            Smart Monitoring
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Empowering every
            <br />
            <span className="font-serif italic text-primary">
              part of education.
            </span>
          </h2>

          <ul className="mt-6 sm:mt-8 space-y-3 max-w-md mx-auto lg:mx-0">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 justify-start"
              >
                <span className="w-5 h-5 rounded-full bg-primary/15 grid place-items-center shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </span>
                <span className="text-sm sm:text-base text-left">{p}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/login"
            className="mt-8 group inline-flex items-center justify-center gap-2 pl-5 sm:pl-6 pr-2 py-2.5 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:scale-[1.02] transition w-full sm:w-auto"
          >
            Start Your Journey
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-foreground/20 grid place-items-center">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-primary/40 to-primary-glow/40 border-2 border-background"
                />
              ))}
            </div>

            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-warning text-warning"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                4.8/5 from 2,500+ reviews
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative order-1 lg:order-2"
        >
          <div aria-hidden className="absolute inset-0 bg-gradient-glow" />

          <img
            src={monitoringImg}
            alt="Student studying with AI assistance"
            loading="lazy"
            width={1024}
            height={1024}
            className="relative w-full max-w-[280px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-[500px] mx-auto"
          />

          {/* PERFORMANCE CARD */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-4 sm:top-8 md:top-12 left-0 sm:left-2 lg:left-0 float-card p-2 sm:p-3 md:p-4 w-32 sm:w-40 md:w-48"
          >
            <div className="text-[10px] sm:text-xs text-muted-foreground">
              Performance
            </div>

            <div className="flex items-center gap-2 mt-1">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-success/15 grid place-items-center text-success font-bold text-xs sm:text-sm">
                A+
              </div>
              <div className="text-xs sm:text-sm font-medium">Excellent</div>
            </div>

            <svg viewBox="0 0 100 30" className="mt-2 w-full h-5 sm:h-6">
              <polyline
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                points="0,22 20,16 40,18 60,8 80,10 100,4"
              />
            </svg>
          </motion.div>

          {/* AI SUGGESTION CARD */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-4 sm:top-8 md:top-12 right-0 sm:right-2 lg:right-0 float-card p-2 sm:p-3 w-32 sm:w-40 md:w-44"
          >
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-primary font-medium">
              <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              AI Suggestion
            </div>

            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-relaxed">
              Focus more on Mathematics practice daily.
            </p>
          </motion.div>

          {/* WEEKLY PROGRESS CARD */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-4 sm:bottom-8 md:bottom-12 right-1 sm:right-2 float-card p-2 sm:p-3 w-32 sm:w-40 md:w-44"
          >
            <div className="text-[10px] sm:text-xs font-medium mb-2">
              Weekly Progress
            </div>

            <div className="flex items-end gap-1 h-10 sm:h-12">
              {[40, 60, 35, 80, 55, 70, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-primary"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
