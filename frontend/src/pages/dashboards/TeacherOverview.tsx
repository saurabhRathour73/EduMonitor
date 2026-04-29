import { useState, useEffect } from "react";
import { StatCard, Section } from "@/components/dashboard/Cards";
import { Users, BookOpen, Calendar, TrendingUp, Plus, Edit2, Trash2, Filter, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Interface to handle MongoDB and UI naming
interface Student {
  _id?: string;
  id?: string;
  fullName: string;
  password?: string;
  className: string;
  section: string;
  rollNumber: string;
  enrollmentNumber?: string;
}

const API_BASE = "https://edumonitor.onrender.com/student/api";
const FETCH_CONFIG = { credentials: "include" as const };

export default function TeacherOverview() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedClass, setSelectedClass] = useState("All");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Student>({
    fullName: "",
    password: "",
    className: "",
    section: "",
    rollNumber: "",
  });

  // --- 1. GET ALL STUDENTS ---
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/getAllstudent`, FETCH_CONFIG);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      // Supporting variations in API response structure
      const studentList = Array.isArray(data) ? data : data.students || [];
      setStudents(studentList);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Could not load students from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // --- 2. CREATE / UPDATE STUDENT ---
  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = !!editingStudent;
    
    // Support both id and _id for the URL
    const targetId = editingStudent?._id || editingStudent?.id;
    const url = isEditing 
      ? `${API_BASE}/update/${targetId}` 
      : `${API_BASE}/create`;

    try {
      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        ...FETCH_CONFIG,
      });

      if (res.ok) {
        toast.success(isEditing ? "Student updated!" : "Student registered!");
        setIsModalOpen(false);
        setEditingStudent(null);
        fetchStudents(); // Refresh UI from source of truth
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Request failed");
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Server connection error");
    }
  };

  // --- 3. DELETE STUDENT ---
  const deleteStudent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    
    try {
      const res = await fetch(`${API_BASE}/delete/${id}`, { 
        method: "DELETE",
        ...FETCH_CONFIG 
      });

      if (res.ok) {
        toast.success("Student removed");
        fetchStudents(); // Refresh list
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete student");
    }
  };

  // Local Filter logic for UI
  const filteredStudents = students.filter(s => 
    selectedClass === "All" || s.className === selectedClass
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Students" value={students.length.toString()} />
        <StatCard icon={BookOpen} label="Assignments" value="18" sub="Active" delay={0.05} />
        <StatCard icon={Calendar} label="Classes Today" value="5" delay={0.1} />
        <StatCard icon={TrendingUp} label="Class Avg" value="84%" sub="↑ 3%" delay={0.15} />
      </div>

      <Section 
        title="Student Management" 
        action={
          <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full border border-border">
              <Filter className="w-3 h-3 text-muted-foreground" />
              <select 
                className="bg-transparent text-xs focus:outline-none cursor-pointer"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="All">All Classes</option>
                {[...new Set(students.map(s => s.className))].map(c => (
                   <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={() => { 
                setEditingStudent(null); 
                setFormData({fullName: "", password: "", className: "", section: "", rollNumber: ""}); 
                setIsModalOpen(true); 
              }}
              className="text-xs px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground shadow-glow flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Student
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="py-3">Enrollment ID</th>
                <th className="py-3">Name</th>
                <th className="py-3">Class</th>
                <th className="py-3">Roll No</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="py-10 text-center text-muted-foreground">Syncing with database...</td></tr>
              ) : filteredStudents.map((s, i) => (
                <motion.tr 
                  key={s._id || s.id} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="border-b border-border hover:bg-muted/50 transition"
                >
                  <td className="py-3 font-mono text-[10px] text-primary">{s.enrollmentNumber || `REG-${s.rollNumber}`}</td>
                  <td className="py-3 font-medium">{s.fullName}</td>
                  <td>{s.className}-{s.section}</td>
                  <td>{s.rollNumber}</td>
                  <td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => { setEditingStudent(s); setFormData(s); setIsModalOpen(true); }}
                        className="p-1.5 hover:text-primary transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => deleteStudent(String(s._id || s.id))}
                        className="p-1.5 hover:text-destructive transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* MODAL SECTION */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border p-6 rounded-3xl shadow-xl w-full max-w-md relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-muted-foreground"><X className="w-4 h-4"/></button>
              <h3 className="text-lg font-bold mb-4">{editingStudent ? "Update Records" : "New Student Registration"}</h3>
              <form onSubmit={handleSaveStudent} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground ml-1">Full Name</label>
                  <input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-1 ring-primary outline-none" />
                </div>
                {!editingStudent && (
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground ml-1">Password</label>
                    <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-1 ring-primary outline-none" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground ml-1">Class</label>
                    <input value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} required className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-1 ring-primary outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground ml-1">Section</label>
                    <input value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} required className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-1 ring-primary outline-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground ml-1">Roll Number</label>
                  <input value={formData.rollNumber} onChange={e => setFormData({...formData, rollNumber: e.target.value})} required className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-1 ring-primary outline-none" />
                </div>
                <button type="submit" className="w-full py-3 mt-2 rounded-xl bg-gradient-primary text-primary-foreground font-bold shadow-glow transition-transform active:scale-95">
                  {editingStudent ? "Update Records" : "Register Student"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}