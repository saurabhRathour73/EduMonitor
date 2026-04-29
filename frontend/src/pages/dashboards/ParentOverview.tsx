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

import { motion } from "framer-motion";
import { StatCard, Section } from "@/components/dashboard/Cards";
import { performanceData, alerts } from "@/mock-data";

// ---------------- AI ASSISTANT ----------------
const AIAssistant = () => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Hello! I'm your AI Academic Assistant. I've analyzed Saurabh's recent data. How can I help you today?",
    },
  ]);

  const suggestions = ["Weak subjects", "Attendance overview", "Pending fees"];

  const handleSend = () => {
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setQuery("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Saurabh is performing 12% above the class average in Math. However, his Science scores have dipped recently.",
        },
      ]);
    }, 1200);
  };

  return (
    <Section title="AI Academic Insights">
      <div className="flex flex-col h-[400px]">

        {/* status cards */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-medium text-green-700">
              Strong: Mathematics
            </span>
          </div>

          <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-2">
            <AlertCircle className="w-3 h-3 text-orange-500" />
            <span className="text-[10px] font-medium text-orange-700">
              Review: Science
            </span>
          </div>
        </div>

        {/* messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-muted border"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {/* input */}
        <div className="mt-3 flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask AI about Saurabh..."
            className="flex-1 p-3 rounded-xl bg-muted outline-none"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-primary text-white rounded-xl"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* suggestions */}
        <div className="flex gap-2 mt-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="text-xs px-3 py-1 rounded-full border"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
};

// ---------------- FEE STRUCTURE ----------------
const FeeStructure = () => {
  const fees = [
    { name: "Tuition Fee", date: "April 2026", amount: 1200, status: "Paid" },
    { name: "Transport Fee", date: "April 2026", amount: 200, status: "Paid" },
    { name: "Exam Fee", date: "Due May 15", amount: 450, status: "Pending" },
  ];

  return (
    <Section title="Fee Structure">
      <div className="space-y-3">
        {fees.map((f, i) => (
          <div key={i} className="flex justify-between p-3 border rounded-xl">
            <div>
              <div className="text-sm font-medium">{f.name}</div>
              <div className="text-xs text-gray-500">{f.date}</div>
            </div>
            <div className="font-bold">${f.amount}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

// ---------------- MAIN PAGE ----------------
export default function ParentOverview() {
  return (
    <div className="space-y-6">

      {/* child info */}
      <div className="p-5 flex items-center gap-4 border rounded-xl">
        <div className="w-12 h-12 bg-primary text-white grid place-items-center rounded-full">
          A
        </div>
        <div>
          <div className="text-sm text-gray-500">Tracking</div>
          <div className="font-semibold">
            Saurabh Kumar — Grade 10A
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label="Average" value="91%" />
        <StatCard icon={TrendingUp} label="Predicted" value="A+" />
        <StatCard icon={BookOpen} label="Attendance" value="96%" />
        <StatCard icon={Bell} label="Alerts" value="3" />
      </div>

      {/* main grid */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* left */}
        <div className="lg:col-span-2 space-y-6">

          <Section title="Child Performance">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area dataKey="score" stroke="#6366f1" fill="#6366f1" />
              </AreaChart>
            </ResponsiveContainer>
          </Section>

          <AIAssistant />
        </div>

        {/* right */}
        <div className="space-y-6">
          <FeeStructure />

          <Section title="Recent Alerts">
            <div className="space-y-2">
              {alerts.map((a) => (
                <div key={a.id} className="p-3 border rounded-xl">
                  <div className="text-sm">{a.title}</div>
                  <div className="text-xs text-gray-500">{a.time}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>

      </div>
    </div>
  );
}