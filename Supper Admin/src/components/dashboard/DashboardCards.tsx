import { useEffect, useState } from "react";
import { School, CheckCircle2, PlusCircle, LucideIcon } from "lucide-react";

interface StatCard {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone: string;
}

interface SchoolType {
  _id: string;
  name: string;
  email: string;
  schoolCode: string;
}

export const DashboardCards = () => {
  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/auth/superAdmin/getSchools"
        );

        const data = await res.json();

        setSchools(data.schools || []);
        setTotal(data.total || 0); // ✅ IMPORTANT FIX
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // ❌ isActive field backend me nahi hai => so active = total (or later add backend field)
  const active = schools.length;
  const created = total;

  const cards: StatCard[] = [
    {
      label: "Total Schools",
      value: total,
      icon: School,
      tone: "bg-accent text-accent-foreground",
    },
    {
      label: "Active Schools",
      value: active,
      icon: CheckCircle2,
      tone: "bg-green-100 text-green-700",
    },
    {
      label: "Created Schools",
      value: created,
      icon: PlusCircle,
      tone: "bg-blue-100 text-blue-700",
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c, i) => (
        <div
          key={c.label}
          className="group rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft animate-fade-in-up"
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{c.label}</p>
              <p className="mt-2 text-3xl font-bold">{c.value}</p>
            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.tone}`}
            >
              <c.icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};