import { useState, useEffect } from "react";
import { Users, Plus, Search, MoreHorizontal, Edit2, Trash2, X, Eye, EyeOff, BookOpen, Phone, Mail, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types & Constants ---
interface Teacher {
  _id?: string; // MongoDB ID
  id?: string;  // Fallback
  fullName: string;
  email: string;
  password?: string;
  subject: string;
  className: string;
  phone: string;
  status: string;
  joinDate?: string;
}

const API_BASE = "http://localhost:3000/admin/teacher";
const FETCH_CONFIG = { credentials: "include" as const };

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science", "Hindi", "Sanskrit"];
const CLASSES = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9-A", "Grade 9-B", "Grade 10-A", "Grade 10-B", "Grade 11-A", "Grade 11-B", "Grade 12-A", "Grade 12-B"];

// ── Main Page Component ───────────────────────────────────────────────────────
export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Teacher | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Teacher | null>(null);

  // 1. Get All Teachers
  const fetchTeachers = async () => {
    try {
      const res = await fetch(`${API_BASE}/getTeacher`, FETCH_CONFIG);
      const data = await res.json();
      // Support both array response or object containing array
      setTeachers(Array.isArray(data) ? data : data.teachers || []);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // 2. Create / Update Handlers
  const handleFormSubmit = async (formData: Teacher) => {
    const isEditing = !!editTarget;
    const url = isEditing 
      ? `${API_BASE}/update/${editTarget._id || editTarget.id}` 
      : `${API_BASE}/create`;
    
    try {
      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        ...FETCH_CONFIG
      });

      if (res.ok) {
        await fetchTeachers(); // Refresh UI from source of truth
        setModalOpen(false);
        setEditTarget(null);
      }
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  // 3. Delete Handler
  const confirmDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE",
        credentials: "include", 
        ...FETCH_CONFIG
      });
      if (res.ok) {
        await fetchTeachers();
        setDeleteTarget(null);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const filtered = teachers.filter(t => {
    const matchSearch = t.fullName.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const activeCount = teachers.filter(t => t.status === "Active").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Teachers" value={teachers.length} sub="Real-time sync" delay={0} />
        <StatCard icon={BookOpen} label="Active Teachers" value={activeCount} color="hsl(var(--success))" delay={0.05} />
        <StatCard icon={User} label="Subjects" value={new Set(teachers.map(t => t.subject)).size} color="hsl(var(--warning))" delay={0.1} />
        <StatCard icon={Users} label="Inactive" value={teachers.length - activeCount} color="hsl(var(--muted-foreground))" delay={0.15} />
      </div>

      <Section 
        title="Teacher Directory" 
        action={
          <button onClick={() => { setEditTarget(null); setModalOpen(true); }} className="flex items-center gap-2 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-xl hover:opacity-90">
            <Plus className="w-3.5 h-3.5" /> Add Teacher
          </button>
        }
      >
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input className="w-full bg-muted border border-border rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:border-primary" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            {["All", "Active", "Inactive"].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filterStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="py-3 font-medium">Teacher</th>
                <th className="font-medium">Subject</th>
                <th className="font-medium">Class</th>
                <th className="font-medium">Phone</th>
                <th className="font-medium">Status</th>
                <th className="font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-10 text-center">Loading Teachers...</td></tr>
              ) : (
                <AnimatePresence>
                  {filtered.map((t, i) => (
                    <motion.tr key={t._id || t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.02 }} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary grid place-items-center text-xs font-bold">
                            {t.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-xs">{t.fullName}</p>
                            <p className="text-muted-foreground text-xs">{t.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted-foreground text-xs">{t.subject}</td>
                      <td className="text-muted-foreground text-xs">{t.className}</td>
                      <td className="text-muted-foreground text-xs">{t.phone}</td>
                      <td>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.status === "Active" ? "bg-success/10 text-success" : "bg-muted-foreground/10 text-muted-foreground"}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <ActionMenu onEdit={() => { setEditTarget(t); setModalOpen(true); }} onDelete={() => setDeleteTarget(t)} />
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </Section>

      <TeacherFormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditTarget(null); }} onSubmit={handleFormSubmit} initial={editTarget} />
      <AnimatePresence>
        {deleteTarget && <DeleteModal teacher={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => confirmDelete(String(deleteTarget._id || deleteTarget.id))} />}
      </AnimatePresence>
    </div>
  );
}

// ── Form Modal with API Logic ──────────────────────────────────────────────────
function TeacherFormModal({ open, onClose, onSubmit, initial }: { open: boolean, onClose: () => void, onSubmit: (d: Teacher) => void, initial: Teacher | null }) {
  const [form, setForm] = useState<Teacher>({ fullName: "", email: "", password: "", subject: "", className: "", phone: "", status: "Active" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initial) setForm(initial);
    else setForm({ fullName: "", email: "", password: "", subject: "", className: "", phone: "", status: "Active" });
  }, [initial, open]);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between mb-6">
            <h2 className="text-lg font-bold">{initial ? "Edit Teacher" : "Add Teacher"}</h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl"><X className="w-4 h-4" /></button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Field label="Full Name"><input className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} /></Field>
              <Field label="Email"><input className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></Field>
              {!initial && <Field label="Password"><input type="password" className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm" value={form.password} onChange={e => setForm({...form, password: e.target.value})} /></Field>}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Subject">
                  <select className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
                    <option value="">Select</option>
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Class">
                  <select className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm" value={form.className} onChange={e => setForm({...form, className: e.target.value})}>
                    <option value="">Select</option>
                    {CLASSES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Phone"><input className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></Field>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">
              {loading ? "Processing..." : initial ? "Update" : "Create"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Existing UI Helper Components (StatCard, Section, Field, ActionMenu, DeleteModal kept as per original design) ──
function Section({ title, children, action }: any) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm text-foreground">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color = "hsl(var(--primary))", delay = 0 }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <div className="w-8 h-8 rounded-xl grid place-items-center" style={{ background: `${color}18` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </motion.div>
  );
}

function Field({ label, children }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

function ActionMenu({ onEdit, onDelete }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)} className="p-1 hover:bg-muted rounded"><MoreHorizontal className="w-4 h-4"/></button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden" onMouseLeave={() => setOpen(false)}>
          <button onClick={onEdit} className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-muted"><Edit2 className="w-3 h-3"/> Edit</button>
          <button onClick={onDelete} className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-red-500/10 text-red-500"><Trash2 className="w-3 h-3"/> Delete</button>
        </div>
      )}
    </div>
  );
}

function DeleteModal({ teacher, onClose, onConfirm }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-base font-bold mb-2">Delete Teacher</h2>
        <p className="text-sm text-muted-foreground mb-6">Remove {teacher.fullName}? This is permanent.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 text-sm border border-border rounded-xl">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2 text-sm bg-red-500 text-white rounded-xl">Delete</button>
        </div>
      </motion.div>
    </motion.div>
  );
}