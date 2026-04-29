// Simple zustand-style auth using localStorage + custom event
import { useEffect, useState } from "react";

export type Role = "student" | "parent" | "teacher" | "admin";
export interface User { name: string; email: string; role: Role; }

const KEY = "edvara_user";

export function getUser(): User | null {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}
export function setUser(u: User | null) {
  if (u) localStorage.setItem(KEY, JSON.stringify(u));
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("auth-change"));
}

export function useAuth() {
  const [user, setU] = useState<User | null>(() => getUser());
  useEffect(() => {
    const fn = () => setU(getUser());
    window.addEventListener("auth-change", fn);
    window.addEventListener("storage", fn);
    return () => {
      window.removeEventListener("auth-change", fn);
      window.removeEventListener("storage", fn);
    };
  }, []);
  return { user, signIn: (u: User) => setUser(u), signOut: () => setUser(null) };
}
