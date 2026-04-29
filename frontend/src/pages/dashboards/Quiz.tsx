import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/dashboard/Cards";
import { quiz } from "@/mock-data";
import { Check, X, Trophy } from "lucide-react";
import { toast } from "sonner";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quiz[step];

  const next = () => {
    if (selected === null) return toast.error("Please choose an answer");
    const correct = selected === q.answer;
    if (correct) {
      setScore((s) => s + 1);
      toast.success("Correct! +1");
    } else {
      toast.error("Not quite. Keep going!");
    }
    if (step + 1 >= quiz.length) setDone(true);
    else { setStep((s) => s + 1); setSelected(null); }
  };

  const reset = () => { setStep(0); setSelected(null); setScore(0); setDone(false); };

  return (
    <div className="max-w-2xl mx-auto">
      <Section title={done ? "Results" : `Question ${step + 1} of ${quiz.length}`}>
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary grid place-items-center shadow-glow">
                <Trophy className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="mt-6 text-3xl font-bold">{score}/{quiz.length}</h2>
              <p className="mt-2 text-muted-foreground">{score === quiz.length ? "Perfect score! 🎉" : "Great effort, keep practicing!"}</p>
              <button onClick={reset} className="mt-6 px-6 py-2.5 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow">
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
                <motion.div animate={{ width: `${((step + 1) / quiz.length) * 100}%` }} className="h-full bg-gradient-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-6">{q.q}</h3>
              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <button key={i} onClick={() => setSelected(i)} className={`w-full text-left p-4 rounded-2xl border transition ${selected === i ? "border-primary bg-accent" : "border-border hover:border-primary/40"}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{opt}</span>
                      {selected === i && <span className="w-5 h-5 rounded-full bg-primary grid place-items-center"><Check className="w-3 h-3 text-primary-foreground" /></span>}
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={next} className="mt-6 w-full py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow">
                {step + 1 === quiz.length ? "Finish" : "Next"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </div>
  );
}
