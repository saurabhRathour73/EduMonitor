import { Section } from "@/components/dashboard/Cards";
import { assignments } from "@/mock-data";
import { Upload, FileText } from "lucide-react";
import { toast } from "sonner";

export default function Assignments() {
  return (
    <Section title="My Assignments" action={
      <button onClick={() => toast.success("Assignment uploaded!")} className="text-xs px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground shadow-glow flex items-center gap-1.5">
        <Upload className="w-3.5 h-3.5" /> Submit
      </button>
    }>
      <div className="space-y-3">
        {assignments.map((a) => (
          <div key={a.id} className="flex items-center gap-4 p-4 rounded-2xl bg-muted hover:bg-accent transition">
            <div className="w-10 h-10 rounded-2xl bg-card grid place-items-center"><FileText className="w-4 h-4 text-primary" /></div>
            <div className="flex-1">
              <div className="text-sm font-medium">{a.title}</div>
              <div className="text-xs text-muted-foreground">{a.subject} • Due {a.due}</div>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full ${a.status === "Submitted" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
