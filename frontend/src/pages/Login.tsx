import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  GraduationCap,
  Users,
  Briefcase,
  Shield,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth, type Role } from "@/store/auth";

const roles: { id: Role; label: string; icon: any; desc: string }[] = [
  { id: "student", label: "Student", icon: GraduationCap, desc: "Track your learning journey" },
  { id: "parent", label: "Parent", icon: Users, desc: "Monitor your child's progress" },
  { id: "teacher", label: "Teacher", icon: Briefcase, desc: "Manage classes & assignments" },
  { id: "admin", label: "Admin", icon: Shield, desc: "Oversee the platform" },
];

export default function Login() {
  const [step, setStep] = useState<"role" | "auth">("role");
  const [mode, setMode] = useState<"login" | "signup">("login");

  const [role, setRole] = useState<Role>("student");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [enrollment, setEnrollment] = useState("");
  const [pin, setPin] = useState("");
  const [studentName, setStudentName] = useState("");
  const [schoolCode, setSchoolCode] = useState("");

  const { signIn } = useAuth();
  const navigate = useNavigate();

  // ================= SUBMIT =================
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let url = "";
      let body: any = {};

      // ================= VALIDATIONS =================
      if (role === "admin") {
        if (mode === "signup") {
          if (!name || !email || !password || !schoolCode)
            return toast.error("Fill all fields");

          url = "https://edumonitor.onrender.com/school/admin/register";

          body = {
            fullName: name,
            email,
            password,
            schoolCode,
          };
        } else {
          if (!email || !password)
            return toast.error("Fill all fields");

          url = "https://edumonitor.onrender.com/school/admin/login";

          body = {
            email,
            password,
          };
        }
      }

      else if (role === "teacher") {
        if (!email || !password)
          return toast.error("Fill all fields");

        // 🔥 TEACHER LOGIN API
        url = "https://edumonitor.onrender.com/teacher/api/login";

        body = {
          email,
          password,
        };
      }

      else if (role === "student") {
        if (!enrollment || !pin)
          return toast.error("Fill all fields");

        // 🔥 STUDENT LOGIN API
        url = "https://edumonitor.onrender.com/student/profile/login";

        body = {
          enrollmentNumber: enrollment,
          pin,
        };
      }

      else if (role === "parent") {
        if (!studentName || !enrollment)
          return toast.error("Fill all fields");

        // 🔥 (Future API - jab backend banaoge)
        url = "https://edumonitor.onrender.com/parent/student/login";

        body = {
          studentName,
          enrollmentNumber: enrollment,
        };
      }

      // ================= API CALL =================
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 cookie ke liye important
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Something went wrong");
      }

      // ================= SUCCESS =================
      toast.success("Success 🚀");

      // 🔥 backend response handle
      signIn({
        name:
          data?.teacher?.fullName ||
          data?.student?.fullName ||
          name ||
          studentName ||
          "User",
        email: data?.teacher?.email || email || `${enrollment}@demo.com`,
        role,
      });

      navigate(`/dashboard/${role}`);

    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen warm-bg grid lg:grid-cols-2">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex relative overflow-hidden p-12 flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-glow opacity-60" />
        <Link to="/" className="relative flex items-center gap-2 z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">
            EduMonitor.<span className="text-primary">.</span>
          </span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold leading-tight">
            <span className="italic text-primary">Smarter</span> education starts here.
          </h1>
          <p className="mt-4 text-muted-foreground">
            AI powered monitoring for students, parents & teachers.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">
            {step === "role" ? "Select Your Role" : "Authentication"}
          </h2>

          {step === "role" ? (
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRole(r.id);
                    setStep("auth");
                    if (r.id !== "admin") setMode("login");
                  }}
                  className="p-4 rounded-2xl border hover:border-primary text-left"
                >
                  <r.icon className="w-5 h-5 mb-2" />
                  <div className="font-medium">{r.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {r.desc}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <>
              {role === "admin" && (
                <div className="flex gap-2 p-1 rounded-full bg-muted mb-4">
                  {(["login", "signup"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`flex-1 py-2 rounded-full ${
                        mode === m ? "bg-card shadow-soft" : ""
                      }`}
                    >
                      {m === "login" ? "Login" : "Register"}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">

                {role === "admin" && mode === "signup" && (
                  <>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="input" />
                    <input value={schoolCode} onChange={(e) => setSchoolCode(e.target.value)} placeholder="School Code" className="input" />
                  </>
                )}

                {(role === "admin" || role === "teacher") && (
                  <>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input" />
                  </>
                )}

                {role === "student" && (
                  <>
                    <input value={enrollment} onChange={(e) => setEnrollment(e.target.value)} placeholder="Enrollment Number" className="input" />
                    <input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="PIN" className="input" />
                  </>
                )}

                {role === "parent" && (
                  <>
                    <input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Student Name" className="input" />
                    <input value={enrollment} onChange={(e) => setEnrollment(e.target.value)} placeholder="Enrollment Number" className="input" />
                  </>
                )}

                <button className="w-full py-3 rounded-full bg-gradient-primary text-white flex justify-center items-center gap-2">
                  {mode === "login" ? "Login" : "Register"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <button onClick={() => setStep("role")} className="mt-4 text-xs text-muted-foreground">
                ← Change Role
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}