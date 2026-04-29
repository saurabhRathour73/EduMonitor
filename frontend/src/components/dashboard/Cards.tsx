import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export function StatCard({ icon: Icon, label, value, sub, delay = 0 }: { icon: LucideIcon; label: string; value: string; sub?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="float-card p-5">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-2xl bg-accent grid place-items-center"><Icon className="w-4 h-4 text-primary" /></div>
        {sub && <span className="text-[10px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">{sub}</span>}
      </div>
      <div className="mt-4 text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="float-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
