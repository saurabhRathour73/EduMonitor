export interface School {
  id: string;
  name: string;
  email: string;
  status: "Active";
  createdAt: string;
}

export interface User {
  name: string;
  email: string;
}

const SCHOOLS_KEY = "edumonitor_schools";
const USER_KEY = "edumonitor_user";
const USERS_KEY = "edumonitor_users";

export const getSchools = (): School[] => {
  try {
    return JSON.parse(localStorage.getItem(SCHOOLS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveSchools = (schools: School[]) => {
  localStorage.setItem(SCHOOLS_KEY, JSON.stringify(schools));
};

export const generateSchoolId = () => {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SCH-${rand}`;
};

export const getUser = (): User | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setUser = (user: User | null) => {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
};

interface StoredUser extends User {
  password: string;
}

export const getUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};
