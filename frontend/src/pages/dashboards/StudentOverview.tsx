import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid } from "recharts";
import { GraduationCap, TrendingUp, BookOpen, Award, Sparkles, Calendar } from "lucide-react";
import { StatCard, Section } from "@/components/dashboard/Cards";
import { performanceData, subjectData, attendance, weeklyProgress } from "@/mock-data";

export default function StudentOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Award} label="Average Grade" value="A+" sub="↑ 5%" />
        <StatCard icon={TrendingUp} label="Performance" value="91%" sub="↑ 12%" delay={0.05} />
        <StatCard icon={BookOpen} label="Assignments" value="12/15" delay={0.1} />
        <StatCard icon={GraduationCap} label="Attendance" value="95%" sub="On track" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Section title="Performance Trend" action={<span className="text-xs text-muted-foreground">Last 7 months</span>}>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#g1)" />
                <Area type="monotone" dataKey="predicted" stroke="hsl(var(--primary-glow))" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </Section>
        </div>

        <Section title="AI Insight">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-glow/5 border border-primary/20">
              <div className="flex items-center gap-2 text-xs font-medium text-primary"><Sparkles className="w-3.5 h-3.5" /> Prediction</div>
              <p className="mt-2 text-sm">You're on track for an <strong>A+ semester</strong> if you maintain current pace.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted">
              <div className="text-xs font-medium text-muted-foreground">Focus Area</div>
              <p className="mt-1 text-sm">Practice <strong>History</strong> 30 mins/day to boost score by ~8%.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted">
              <div className="text-xs font-medium text-muted-foreground">Strength</div>
              <p className="mt-1 text-sm">Outstanding work in <strong>Art (95%)</strong>. Keep it up!</p>
            </div>
          </motion.div>
        </Section>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Subject Scores">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Section>

        <Section title="Recent Attendance" action={<Calendar className="w-4 h-4 text-muted-foreground" />}>
          <div className="space-y-2">
            {attendance.map((a) => (
              <div key={a.date} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted transition">
                <div>
                  <div className="text-sm font-medium">{a.subject}</div>
                  <div className="text-xs text-muted-foreground">{a.date}</div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${a.status === "Present" ? "bg-success/10 text-success" : a.status === "Late" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section title="Weekly Study Hours">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
            <Bar dataKey="hours" fill="hsl(var(--primary-glow))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Section>
    </div>
  );
}
