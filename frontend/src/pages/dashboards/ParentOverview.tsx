import React, { useState } from "react";
import { 
  Users, TrendingUp, BookOpen, Bell, GraduationCap, 
  Send, Sparkles, CreditCard, Receipt, CalendarClock, 
  Download, CheckCircle2, AlertCircle 
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, CartesianGrid 
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { StatCard, Section } from "@/components/dashboard/Cards";
import { performanceData, alerts } from "@/mock-data";

// --- Sub-component: AI Assistant ---
const AIAssistant = () => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello! I'm your AI Academic Assistant. I've analyzed Saurabh's recent data. How can I help you today?" }
  ]);

  const suggestions = ["Weak subjects", "Attendance overview", "Pending fees"];

  const handleSend = () => {
    if (!query.trim()) return;
    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setQuery("");
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "Saurabh is performing 12% above the class average in Math. However, his Science quiz scores have dipped recently. Would you like to see a breakdown?" 
      }]);
    }, 1200);
  };

  return (
    <Section title="AI Academic Insights" icon={<Sparkles className="w-4 h-4 text-primary" />}>
      <div className="flex flex-col h-[400px]">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-medium text-green-700">Strong: Mathematics</span>
          </div>
          <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-2">
            <AlertCircle className="w-3 h-3 text-orange-500" />
            <span className="text-[10px] font-medium text-orange-700">Review: Science</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {messages.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                ? 'bg-primary text-primary-foreground rounded-tr-none shadow-glow' 
                : 'bg-muted border border-border rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {suggestions.map((s) => (
              <button key={s} onClick={() => setQuery(s)} className="whitespace-nowrap text-[10px] px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary transition-colors">
                {s}
              </button>
            ))}
          </div>
          <div className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI about Saurabh..." 
              className="w-full bg-muted border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-1 ring-primary outline-none"
            />
            <button onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-primary-foreground rounded-lg shadow-glow">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

// --- Sub-component: Fee Structure ---
const FeeStructure = () => {
  const fees = [
    { name: "Tuition Fee", date: "April 2026", amount: 1200, status: "Paid" },
    { name: "Transport Fee", date: "April 2026", amount: 200, status: "Paid" },
    { name: "Exam Fee", date: "Due May 15", amount: 450, status: "Pending" },
  ];

  return (
    <Section title="Fee Structure" icon={<Receipt className="w-4 h-4 text-primary" />}>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-card border border-border">
            <div className="text-[10px] text-muted-foreground uppercase font-bold">Total Paid</div>
            <div className="text-lg font-bold">$1,400</div>
          </div>
          <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
            <div className="text-[10px] text-orange-600 uppercase font-bold">Pending</div>
            <div className="text-lg font-bold text-orange-600">$450</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
            <span>Payment Progress</span>
            <span className="text-primary">75%</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} className="h-full bg-primary shadow-glow" />
          </div>
        </div>

        <div className="space-y-2">
          {fees.map((fee, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${fee.status === 'Paid' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600'}`}>
                  {fee.status === 'Paid' ? <CreditCard className="w-3.5 h-3.5" /> : <CalendarClock className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className="text-xs font-semibold">{fee.name}</div>
                  <div className="text-[10px] text-muted-foreground">{fee.date}</div>
                </div>
              </div>
              <div className="text-right font-bold text-sm">${fee.amount}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-xs font-bold shadow-glow flex items-center justify-center gap-2">
            Pay Now
          </button>
          <button className="p-2.5 rounded-xl border border-border bg-card">
            <Download className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </Section>
  );
};

// --- Main Exported Page ---
export default function ParentOverview() {
  return (
    <div className="space-y-6">
      {/* Existing Child Switcher */}
      <div className="float-card p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-bold text-lg shadow-glow">A</div>
        <div className="flex-1">
          <div className="text-sm text-muted-foreground">Tracking</div>
          <div className="font-semibold">Saurabh kumar — Grade 10A</div>
        </div>
        <button className="text-xs px-4 py-2 rounded-full bg-card border border-border hover:bg-muted transition-colors">Switch child</button>
      </div>

      {/* Existing Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label="Average" value="91%" sub="↑ 4%" />
        <StatCard icon={TrendingUp} label="Predicted" value="A+" sub="On track" delay={0.05} />
        <StatCard icon={BookOpen} label="Attendance" value="96%" delay={0.1} />
        <StatCard icon={Bell} label="Alerts" value="3" sub="New" delay={0.15} />
      </div>

      {/* Enhanced Layout Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Performance & AI Section (Left/Center) */}
        <div className="lg:col-span-2 space-y-6">
          <Section title="Child's Performance">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#gp)" />
              </AreaChart>
            </ResponsiveContainer>
          </Section>

          {/* New AI Assistant Panel */}
          <AIAssistant />
        </div>

        {/* Right Sidebar: Fees & Alerts */}
        <div className="space-y-6">
          {/* New Fee Structure Panel */}
          <FeeStructure />

          {/* Existing Recent Alerts */}
          <Section title="Recent Alerts">
            <div className="space-y-2">
              {alerts.map((a, i) => (
                <motion.div 
                  key={a.id} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: i * 0.08 }} 
                  className="p-3 rounded-2xl bg-muted border border-transparent hover:border-border transition-all cursor-default"
                >
                  <div className="text-sm font-medium">{a.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.time}</div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>

      </div>
    </div>
  );
}