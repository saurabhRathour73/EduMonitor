import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { Section, StatCard } from "@/components/dashboard/Cards";
import { performanceData, subjectData } from "@/mock-data";
import { TrendingUp, BookOpen, Award, GraduationCap, Bell, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { alerts } from "@/mock-data";

export function Performance() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Award} label="GPA" value="3.92" sub="↑ 0.2" />
        <StatCard icon={TrendingUp} label="Trend" value="Rising" sub="Stable" delay={0.05} />
        <StatCard icon={BookOpen} label="Subjects" value="5" delay={0.1} />
        <StatCard icon={GraduationCap} label="Rank" value="#4" sub="Top 5%" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Score Progression">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Section>

        <Section title="Subject Strength">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={subjectData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </Section>
      </div>
    </div>
  );
}

const iconMap = { warning: AlertTriangle, info: Info, success: CheckCircle2 };
const colorMap = { warning: "text-warning bg-warning/10", info: "text-primary bg-primary/10", success: "text-success bg-success/10" };

export function Alerts() {
  return (
    <Section title="Alerts & Notifications" action={<Bell className="w-4 h-4 text-muted-foreground" />}>
      <div className="space-y-3">
        {alerts.map((a, i) => {
          const Icon = iconMap[a.type as keyof typeof iconMap];
          return (
            <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-muted hover:bg-accent transition">
              <div className={`w-10 h-10 rounded-2xl grid place-items-center ${colorMap[a.type as keyof typeof colorMap]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.time}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
