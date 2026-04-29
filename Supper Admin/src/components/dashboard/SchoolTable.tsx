import { School } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, Inbox } from "lucide-react";
import { toast } from "sonner";

export const SchoolTable = ({
  schools,
  onDelete,
}: {
  schools: School[];
  onDelete: (school: School) => void;
}) => {
  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`Copied ${id}`);
  };

  if (schools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-16 text-center animate-fade-in">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <Inbox className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold">No schools created yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Click "Create School" to add your first institution.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">School Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">School ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {schools.map((s) => (
              <tr key={s.id} className="transition-colors hover:bg-muted/40">
                <td className="px-6 py-4 font-medium">{s.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{s.email}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="rounded-md bg-muted px-2 py-1 text-xs font-mono">{s.id}</code>
                    <button
                      onClick={() => handleCopy(s.id)}
                      className="text-muted-foreground transition-colors hover:text-primary"
                      title="Copy ID"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(s)}
                    className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
