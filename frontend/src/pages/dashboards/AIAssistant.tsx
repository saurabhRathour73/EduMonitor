import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, User, BookOpen, CalendarRange, HelpCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { Section } from "@/components/dashboard/Cards";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-tutor`;

const quickPrompts = [
  { icon: CalendarRange, label: "7-day study plan for Physics", text: "Create a 7-day study plan for Physics covering Mechanics and Thermodynamics." },
  { icon: BookOpen, label: "Homework: Algebra (medium)", text: "Generate 5 medium-difficulty homework questions on Quadratic Equations." },
  { icon: HelpCircle, label: "Explain Photosynthesis", text: "Explain Photosynthesis step by step with a simple example." },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your **Edvara Study Assistant**.\n\nI can help you with:\n- 📅 Study plans (daily / weekly)\n- 📝 Homework practice questions\n- 💡 Doubt solving for any subject\n\nAsk me anything academic to get started!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const send = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || isLoading) return;
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content !== "" && prev.length > next.length) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });

      if (resp.status === 429) {
        toast.error("Rate limit exceeded. Please wait a moment.");
        setIsLoading(false);
        return;
      }
      if (resp.status === 402) {
        toast.error("AI credits exhausted. Please top up in Settings.");
        setIsLoading(false);
        return;
      }
      if (!resp.ok || !resp.body) {
        toast.error("Failed to reach AI tutor.");
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
      <div className="lg:col-span-2 float-card flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-semibold text-sm">EduMonitor. Study Assistant</div>
            <div className="text-xs text-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Online · Study-only mode
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full grid place-items-center shrink-0 ${
                    m.role === "user" ? "bg-foreground text-background" : "bg-gradient-primary text-primary-foreground"
                  }`}
                >
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-primary text-primary-foreground rounded-tr-md"
                      : "bg-muted rounded-tl-md"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-headings:my-2 prose-ul:my-2 prose-ol:my-2 prose-pre:bg-background/60 prose-pre:rounded-xl">
                      <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </motion.div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-primary grid place-items-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-muted p-4 rounded-3xl flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-border flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask a study question, request a plan, or get homework..."
            disabled={isLoading}
            className="flex-1 px-5 py-3 rounded-full bg-muted focus:outline-none focus:ring-2 focus:ring-primary text-sm disabled:opacity-60"
          />
          <button
            onClick={() => send()}
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center shadow-glow hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <Section title="Quick Prompts">
          <p className="text-xs text-muted-foreground mb-3">One tap to start a study session.</p>
          <div className="space-y-2">
            {quickPrompts.map((q) => (
              <button
                key={q.label}
                onClick={() => send(q.text)}
                disabled={isLoading}
                className="w-full p-3 rounded-2xl bg-muted text-xs flex items-center gap-2 hover:bg-accent transition text-left disabled:opacity-50"
              >
                <q.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="flex-1">{q.label}</span>
                <Sparkles className="w-3 h-3 text-primary" />
              </button>
            ))}
          </div>
        </Section>

        <Section title="Quick Topics">
          <div className="flex flex-wrap gap-2">
            {["Algebra", "Photosynthesis", "Grammar", "WW2", "Geometry", "Loops in Python"].map((t) => (
              <button
                key={t}
                onClick={() => setInput(`Explain ${t} step by step with examples.`)}
                className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-accent transition"
              >
                {t}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Tutor Rules">
          <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
            <li>Answers only academic questions</li>
            <li>Builds study plans & homework</li>
            <li>Politely declines off-topic chat</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
