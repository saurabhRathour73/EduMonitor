import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, BookOpen, Brain, FileQuestion, Trophy, Medal, Award, RotateCcw, Loader2, Check, X, Languages, ListOrdered } from "lucide-react";
import { toast } from "sonner";
import { Section } from "@/components/dashboard/Cards";
import { supabase } from "@/integrations/supabase/client";

interface MCQ {
  question: string;
  options: string[];
  answer: string;
}

interface Subjective {
  question: string;
  answer: string;
}

interface StudyPack {
  notes: string[];
  mcqs: MCQ[];
  subjective: Subjective[];
}

type BadgeTier = "gold" | "silver" | "bronze" | null;
type Language = "English" | "Hindi" | "Hinglish";

function getBadge(score: number, total: number): { tier: BadgeTier; label: string; emoji: string; message: string } {
  const pct = total ? (score / total) * 100 : 0;
  if (pct === 100) return { tier: "gold", label: "Gold Badge", emoji: "🥇", message: "Excellent 🎉" };
  if (pct >= 60) return { tier: "silver", label: "Silver Badge", emoji: "🥈", message: "Good 👍" };
  if (pct >= 20) return { tier: "bronze", label: "Bronze Badge", emoji: "🥉", message: "Needs Improvement ⚡" };
  return { tier: null, label: "No Badge Yet", emoji: "✨", message: "Try again to earn a badge!" };
}

export default function AIChatbot() {
  const [topic, setTopic] = useState("");
  const [mcqCount, setMcqCount] = useState(5);
  const [language, setLanguage] = useState<Language>("English");
  const [loading, setLoading] = useState(false);
  const [pack, setPack] = useState<StudyPack | null>(null);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  // Quiz state
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const generate = async () => {
    if (!topic.trim()) {
      toast.error("Enter a topic first");
      return;
    }
    setLoading(true);
    setPack(null);
    setSubmitted(false);
    setScore(0);
    setAnswers([]);
    setRevealed({});
    toast.info("Generating content...");
    try {
      const { data, error } = await supabase.functions.invoke("ai-study", {
        body: { topic: topic.trim(), mcqCount, language },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const sp = data as StudyPack;
      setPack(sp);
      setAnswers(new Array(sp.mcqs.length).fill(null));
      toast.success("Study pack ready!");
    } catch (e: any) {
      console.error(e);
      const msg = e?.message || "Failed to generate";
      if (msg.includes("Rate limit")) toast.error("Rate limit hit. Try again in a moment.");
      else if (msg.includes("credits")) toast.error("AI credits exhausted. Add funds in Settings → Workspace → Usage.");
      else toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = () => {
    if (!pack) return;
    if (answers.some((a) => a === null)) {
      toast.error("Answer all questions first");
      return;
    }
    let s = 0;
    pack.mcqs.forEach((q, i) => {
      if (q.options[answers[i] as number] === q.answer) s++;
    });
    setScore(s);
    setSubmitted(true);
    toast.success("Quiz submitted!");
    const pct = (s / pack.mcqs.length) * 100;
    if (pct >= 80) setTimeout(() => toast.success("Great job! 🎉"), 400);
  };

  const retake = () => {
    if (!pack) return;
    setAnswers(new Array(pack.mcqs.length).fill(null));
    setSubmitted(false);
    setScore(0);
  };

  const total = pack?.mcqs.length ?? 0;
  const badge = getBadge(score, total);
  const badgeColor =
    badge.tier === "gold"
      ? "from-yellow-400 to-amber-600"
      : badge.tier === "silver"
        ? "from-slate-300 to-slate-500"
        : badge.tier === "bronze"
          ? "from-orange-400 to-orange-700"
          : "from-muted to-muted";

  return (
    <div className="space-y-6">
      {/* Hero / Input */}
      <Section title="AI Learning Assistant">
        <p className="text-sm text-muted-foreground mb-4">
          Enter a topic — get bullet notes, an interactive quiz, and subjective Q&A. Choose MCQ count and language.
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-2xl bg-muted">
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && generate()}
                placeholder="e.g., Photosynthesis, Newton's Laws, Trigonometry..."
                className="flex-1 bg-transparent outline-none text-sm"
                disabled={loading}
              />
            </div>
            <button
              onClick={generate}
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-medium shadow-glow flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-muted">
              <ListOrdered className="w-4 h-4 text-primary shrink-0" />
              <label className="text-xs text-muted-foreground shrink-0">MCQs</label>
              <input
                type="range"
                min={5}
                max={25}
                step={1}
                value={mcqCount}
                onChange={(e) => setMcqCount(Number(e.target.value))}
                disabled={loading}
                className="flex-1 accent-primary"
              />
              <span className="text-sm font-semibold w-6 text-right">{mcqCount}</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-muted">
              <Languages className="w-4 h-4 text-primary shrink-0" />
              <label className="text-xs text-muted-foreground shrink-0">Language</label>
              <div className="flex-1 flex gap-1 justify-end">
                {(["English", "Hindi", "Hinglish"] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    disabled={loading}
                    className={`text-xs px-3 py-1.5 rounded-full transition ${
                      language === l
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "border border-border hover:bg-accent"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {!pack && !loading && (
          <div className="mt-4 flex flex-wrap gap-2">
            {["Photosynthesis", "Newton's Laws", "World War II", "Pythagoras Theorem", "Cell Division"].map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-accent transition"
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </Section>

      {loading && (
        <div className="grid lg:grid-cols-2 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="float-card p-6 animate-pulse">
              <div className="h-4 w-1/3 bg-muted rounded mb-3" />
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded" />
                <div className="h-3 bg-muted rounded w-5/6" />
                <div className="h-3 bg-muted rounded w-4/6" />
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {pack && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Notes */}
            <Section
              title="Short Notes"
              action={<BookOpen className="w-4 h-4 text-muted-foreground" />}
            >
              <ul className="space-y-2.5">
                {pack.notes.map((n, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex gap-3 text-sm leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-foreground/90">{n}</span>
                  </motion.li>
                ))}
              </ul>
            </Section>

            {/* Quiz */}
            <Section
              title="Interactive Quiz"
              action={
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Brain className="w-3.5 h-3.5" /> {pack.mcqs.length} questions
                </span>
              }
            >
              <div className="space-y-5">
                {pack.mcqs.map((q, qi) => (
                  <div key={qi} className="p-4 rounded-2xl border border-border">
                    <div className="text-sm font-medium mb-3">
                      <span className="text-primary mr-2">Q{qi + 1}.</span>
                      {q.question}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oi) => {
                        const selected = answers[qi] === oi;
                        const isCorrect = submitted && opt === q.answer;
                        const isWrongPick = submitted && selected && opt !== q.answer;
                        return (
                          <button
                            key={oi}
                            disabled={submitted}
                            onClick={() => {
                              const next = [...answers];
                              next[qi] = oi;
                              setAnswers(next);
                            }}
                            className={`text-left p-3 rounded-xl border text-sm transition flex items-center justify-between gap-2 ${
                              isCorrect
                                ? "border-success bg-success/10"
                                : isWrongPick
                                  ? "border-destructive bg-destructive/10"
                                  : selected
                                    ? "border-primary bg-accent"
                                    : "border-border hover:border-primary/40"
                            }`}
                          >
                            <span>
                              <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + oi)}.</span>
                              {opt}
                            </span>
                            {isCorrect && <Check className="w-4 h-4 text-success shrink-0" />}
                            {isWrongPick && <X className="w-4 h-4 text-destructive shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                {!submitted ? (
                  <button
                    onClick={submitQuiz}
                    className="flex-1 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-medium shadow-glow"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={retake}
                    className="flex-1 py-3 rounded-2xl border border-border hover:bg-muted font-medium flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Retake Quiz
                  </button>
                )}
              </div>
            </Section>

            {/* Result + Badge */}
            {submitted && (
              <div className="grid lg:grid-cols-2 gap-6">
                <Section title="Your Result" action={<Trophy className="w-4 h-4 text-primary" />}>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-4"
                  >
                    <div className="text-5xl font-bold">
                      {score}<span className="text-muted-foreground text-2xl">/{pack.mcqs.length}</span>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {Math.round((score / pack.mcqs.length) * 100)}% accuracy
                    </div>
                    <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-accent text-sm font-medium">
                      {badge.message}
                    </div>
                    <div className="mt-6 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(score / pack.mcqs.length) * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-primary"
                      />
                    </div>
                  </motion.div>
                </Section>

                <Section title="Reward Badge" action={<Award className="w-4 h-4 text-primary" />}>
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className={`w-28 h-28 rounded-full bg-gradient-to-br ${badgeColor} grid place-items-center shadow-glow relative`}
                    >
                      <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
                      <span className="text-5xl drop-shadow">{badge.emoji}</span>
                    </motion.div>
                    <div className="mt-5 font-semibold text-lg flex items-center gap-2">
                      <Medal className="w-4 h-4 text-primary" /> {badge.label}
                    </div>
                    {badge.tier && (
                      <div className="mt-1 text-sm text-muted-foreground">
                        You earned a {badge.label}!
                      </div>
                    )}
                  </motion.div>
                </Section>
              </div>
            )}

            {/* Subjective with answers */}
            <Section
              title="Subjective Practice"
              action={<FileQuestion className="w-4 h-4 text-muted-foreground" />}
            >
              <div className="space-y-3">
                {pack.subjective.map((s, i) => {
                  const open = !!revealed[i];
                  return (
                    <div key={i} className="p-4 rounded-2xl bg-muted">
                      <div className="text-sm font-medium leading-relaxed flex gap-2">
                        <span className="text-primary">Q{i + 1}.</span>
                        <span>{s.question}</span>
                      </div>
                      <button
                        onClick={() => setRevealed((r) => ({ ...r, [i]: !r[i] }))}
                        className="mt-2 text-xs px-3 py-1.5 rounded-full bg-background border border-border hover:bg-accent transition"
                      >
                        {open ? "Hide answer" : "Show answer"}
                      </button>
                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 p-3 rounded-xl bg-background text-sm leading-relaxed text-foreground/90 border border-border">
                              {s.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
