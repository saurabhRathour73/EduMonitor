import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { GraduationCap, Building2, TrendingUp, Bell } from "lucide-react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString() + suffix);
  useEffect(() => {
    if (inView) animate(mv, value, { duration: 2, ease: "easeOut" });
  }, [inView, value, mv]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { icon: GraduationCap, value: 120000, suffix: "+", label: "Students Monitored" },
  { icon: Building2, value: 500, suffix: "+", label: "Schools Connected" },
  { icon: TrendingUp, value: 95, suffix: "%", label: "Performance Boost" },
  { icon: Bell, value: 98, suffix: "%", label: "Parent Satisfaction" },
];

export default function Stats() {
  return (
    <section className="container -mt-4 relative z-10">
      <div className="float-card p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-accent grid place-items-center shrink-0">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold tracking-tight">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
