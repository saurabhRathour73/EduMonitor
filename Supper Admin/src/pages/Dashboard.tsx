import { useEffect, useState } from "react";
import { DashboardCards } from "@/components/dashboard/DashboardCards";
import { SchoolForm } from "@/components/dashboard/SchoolForm";
import { SchoolTable } from "@/components/dashboard/SchoolTable";
import { DeleteModal } from "@/components/dashboard/DeleteModal";
import { getSchools, saveSchools, School, getUser } from "@/lib/storage";

const Dashboard = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [toDelete, setToDelete] = useState<School | null>(null);
  const user = getUser();

  useEffect(() => {
    setSchools(getSchools());
  }, []);

  const handleCreate = (s: School) => {
    const next = [s, ...schools];
    setSchools(next);
    saveSchools(next);
  };

  const handleDelete = (id: string) => {
    const next = schools.filter((s) => s.id !== id);
    setSchools(next);
    saveSchools(next);
  };

  const active = schools.filter((s) => s.status === "Active").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.name?.split(" ")[0] || "Admin"}
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your schools.
          </p>
        </div>
        <SchoolForm onCreate={handleCreate} />
      </div>

      <DashboardCards
        total={schools.length}
        active={active}
        created={schools.length}
      />

      <div>
        <h2 className="mb-4 text-xl font-semibold">Recent Schools</h2>
        <SchoolTable
          schools={schools.slice(0, 5)}
          onDelete={setToDelete}
        />
      </div>

      <DeleteModal
        school={toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
