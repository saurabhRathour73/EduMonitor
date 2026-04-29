import { GraduationCap } from "lucide-react";

export const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: { icon: 18, text: "text-lg" },
    md: { icon: 22, text: "text-xl" },
    lg: { icon: 28, text: "text-2xl" },
  };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
        <GraduationCap size={s.icon} className="text-primary-foreground" />
      </div>
      <span className={`font-bold tracking-tight ${s.text}`}>
        Edu<span className="text-primary">Monitor</span>
      </span>
    </div>
  );
};
