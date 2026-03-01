import { createContext, useContext, useState, ReactNode } from "react";

type Role = "student" | "admin";

interface User {
  name: string;
  email: string;
  role: Role;
  initials: string;
  department: string;
  semester?: number;
  skills?: string[];
  phone?: string;
  linkedin?: string;
  github?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: Record<Role, User> = {
  student: {
    name: "Arjun Kumar", email: "arjun@college.edu", role: "student", initials: "AK",
    department: "CSE", semester: 6, skills: ["React", "Python", "TypeScript", "ML/AI"],
    phone: "+91 98765 43210", linkedin: "linkedin.com/in/arjunkumar", github: "github.com/arjunkumar",
  },
  admin: {
    name: "Dr. Mehra", email: "admin@college.edu", role: "admin", initials: "DM",
    department: "Administration", phone: "+91 99887 76655",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: Role) => setUser(DEMO_USERS[role]);
  const logout = () => setUser(null);
  const updateProfile = (data: Partial<User>) => setUser((prev) => prev ? { ...prev, ...data } : null);

  return <AuthContext.Provider value={{ user, login, logout, updateProfile }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
