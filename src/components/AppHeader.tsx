import { Bell, Search, User, LogOut, Settings, X, Sun, Moon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

const SEARCHABLE = [
  { label: "Dashboard", path: "/dashboard", tags: "home overview stats" },
  { label: "Post Project", path: "/post-project", tags: "create new idea" },
  { label: "My Projects", path: "/my-projects", tags: "projects list" },
  { label: "Smart Matching", path: "/smart-matching", tags: "skills teammates find" },
  { label: "Revival Hub", path: "/revival-hub", tags: "abandoned revive adopt" },
  { label: "Leaderboard", path: "/leaderboard", tags: "ranking trophy points" },
  { label: "Notifications", path: "/notifications", tags: "alerts updates" },
  { label: "Help & Support", path: "/help", tags: "guide tutorial complain report" },
  { label: "Profile", path: "/profile", tags: "account settings department skills" },
  { label: "Analytics", path: "/analytics", tags: "admin stats data" },
  { label: "React", path: "/smart-matching", tags: "skill react frontend" },
  { label: "Python", path: "/smart-matching", tags: "skill python backend" },
  { label: "ML/AI", path: "/smart-matching", tags: "skill machine learning ai" },
  { label: "AI Campus Navigator", path: "/dashboard", tags: "project ai navigation" },
  { label: "Green Energy Dashboard", path: "/dashboard", tags: "project energy iot" },
];

export function AppHeader() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const searchResults = searchQuery.length > 1
    ? SEARCHABLE.filter((s) => `${s.label} ${s.tags}`.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card px-4">
      <SidebarTrigger className="text-muted-foreground" />
      <div className="hidden sm:flex items-center gap-3">
        <div className="h-8 w-8 rounded-md flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-purple-500/50">
          CM
        </div>
        <span className="text-sm font-semibold text-foreground">CodeMate</span>
      </div>

      {/* Search */}
      <div ref={searchRef} className="relative hidden max-w-md flex-1 sm:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
          onFocus={() => setShowSearch(true)}
          placeholder="Search projects, skills, students..."
          className="h-9 w-full rounded-lg border border-border bg-muted/50 pl-9 pr-8 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
        />
        {searchQuery && (
          <button onClick={() => { setSearchQuery(""); setShowSearch(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <AnimatePresence>
          {showSearch && searchResults.length > 0 && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              className="absolute left-0 top-11 w-full rounded-xl border border-border bg-card shadow-xl z-50">
              {searchResults.map((r, i) => (
                <button key={i} onClick={() => { navigate(r.path); setSearchQuery(""); setShowSearch(false); }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-muted/50 transition-colors first:rounded-t-xl last:rounded-b-xl">
                  <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span>{r.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-2 ml-auto">
        {/* Mobile search */}
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground sm:hidden hover:bg-muted"
          onClick={() => { /* Could expand mobile search */ }}>
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button onClick={() => setShowNotifs(!showNotifs)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </button>
          <AnimatePresence>
            {showNotifs && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="absolute right-0 top-11 w-80 rounded-xl border border-border bg-card p-0 shadow-xl z-50">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <h3 className="font-heading text-sm font-semibold">Notifications</h3>
                  <button onClick={markAllRead} className="text-xs text-primary hover:underline">Mark all read</button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-sm text-muted-foreground">No notifications yet</p>
                  ) : notifications.slice(0, 8).map((n) => (
                    <button key={n.id} onClick={() => markAsRead(n.id)}
                      className={`flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${!n.read ? "bg-primary/5" : ""}`}>
                      <span className="text-sm font-medium">{n.title}</span>
                      <span className="text-xs text-muted-foreground">{n.message}</span>
                      <span className="text-[10px] text-muted-foreground">{n.time}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => { navigate("/notifications"); setShowNotifs(false); }}
                  className="w-full border-t border-border py-2.5 text-center text-xs font-medium text-primary hover:bg-muted/30">
                  View all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme switch */}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors">
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button onClick={() => setShowProfile(!showProfile)}>
            <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/50 transition-all">
              <AvatarFallback className="gradient-primary text-xs font-bold text-primary-foreground">
                {user?.initials || "?"}
              </AvatarFallback>
            </Avatar>
          </button>
          <AnimatePresence>
            {showProfile && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="absolute right-0 top-11 w-64 rounded-xl border border-border bg-card shadow-xl z-50">
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="gradient-primary text-sm font-bold text-primary-foreground">{user?.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    <p className="text-[10px] text-muted-foreground">{user?.department}{user?.semester ? ` · Sem ${user.semester}` : ""}</p>
                  </div>
                </div>
                {user?.skills && user.skills.length > 0 && (
                  <div className="border-b border-border px-4 py-2">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {user.skills.map((s) => (
                        <span key={s} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="p-1.5">
                  <button onClick={() => { navigate("/profile"); setShowProfile(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted">
                    <User className="h-4 w-4" /> View Profile
                  </button>
                  <button onClick={() => { navigate("/profile"); setShowProfile(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted">
                    <Settings className="h-4 w-4" /> Settings
                  </button>
                  <button onClick={logout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
