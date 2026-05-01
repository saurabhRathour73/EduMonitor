import { motion } from "framer-motion";
import {
  Cpu,
  BarChart3,
  Bell,
  CalendarRange,
  MessagesSquare,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI Insights",
    desc: "AI-powered insights and predictions to improve academic performance.",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    desc: "Advanced analytics and reports for better decision making.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    desc: "Real-time alerts and notifications about performance.",
  },
  {
    icon: CalendarRange,
    title: "Study Planner",
    desc: "AI-generated study plans tailored to each student's needs.",
  },
  {
    icon: MessagesSquare,
    title: "AI Assistant",
    desc: "Smart AI assistant to help students with homework and doubts.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="container py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 sm:mb-12 items-end">
        <div className="text-center md:text-left">
          <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
            Why EduMonitor.?
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Everything you need
            <br />
            <span className="font-serif italic text-primary">
              to succeed
            </span>
          </h2>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground max-w-full md:max-w-md text-center md:text-left mx-auto md:mx-0">
          Powerful tools and AI features to help students learn smarter,
          teachers teach better, and parents stay informed.
        </p>
      </div>

      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="float-card p-5 sm:p-6 group cursor-pointer h-full"
          >
            {/* ICON */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-accent grid place-items-center mb-4 sm:mb-5 group-hover:bg-gradient-primary transition">
              <f.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition" />
            </div>

            {/* TITLE */}
            <h3 className="font-semibold text-sm sm:text-base mb-2">
              {f.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA BUTTON */}
      <div className="mt-10 sm:mt-12 grid place-items-center">
        <a
          href="#dashboards"
          className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-card border border-border shadow-soft hover:shadow-card transition text-sm font-medium w-full sm:w-auto"
        >
          Explore All Features
          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition" />
        </a>
      </div>
    </section>
  );
}
