import { useEffect, useState } from "react";
import { SchoolTable } from "@/components/dashboard/SchoolTable";
import { SchoolForm } from "@/components/dashboard/SchoolForm";
import { DeleteModal } from "@/components/dashboard/DeleteModal";
import { getSchools, saveSchools, School } from "@/lib/storage";

const Schools = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [toDelete, setToDelete] = useState<School | null>(null);

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schools</h1>
          <p className="text-muted-foreground">
            Manage all schools from one place.
          </p>
        </div>
        <SchoolForm onCreate={handleCreate} />
      </div>

      <SchoolTable schools={schools} onDelete={setToDelete} />

      <DeleteModal
        school={toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Schools;
