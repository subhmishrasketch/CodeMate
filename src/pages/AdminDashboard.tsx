import { motion } from "framer-motion";
import { Users, FolderOpen, Calendar, TrendingUp, Award, BarChart3, PieChart, Activity, ArrowUp, ArrowDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Students", value: "1,248", sub: "+32 this month", icon: Users, color: "text-primary", trend: "up" },
  { label: "Active Projects", value: "156", sub: "12 new this week", icon: FolderOpen, color: "text-success", trend: "up" },
  { label: "Upcoming Events", value: "8", sub: "3 this week", icon: Calendar, color: "text-warning", trend: "neutral" },
  { label: "Avg. Activity", value: "78%", sub: "+5% vs last month", icon: TrendingUp, color: "text-primary", trend: "up" },
];

const events = [
  { name: "Annual Hackathon 2026", date: "Mar 15, 2026", status: "Approved", registrations: 342, capacity: 400, budget: "₹2,00,000" },
  { name: "ML/AI Workshop Series", date: "Mar 20, 2026", status: "Planning", registrations: 89, capacity: 150, budget: "₹50,000" },
  { name: "Code Sprint Challenge", date: "Apr 05, 2026", status: "Approved", registrations: 210, capacity: 300, budget: "₹1,50,000" },
  { name: "Open Source Contribution Day", date: "Apr 12, 2026", status: "Pending", registrations: 45, capacity: 100, budget: "₹25,000" },
];

const topStudents = [
  { name: "Priya Sharma", dept: "CSE", points: 285, projects: 8, performance: "Excellent" },
  { name: "Rahul Mehta", dept: "IT", points: 240, projects: 6, performance: "Excellent" },
  { name: "Sneha Kulkarni", dept: "ECE", points: 210, projects: 5, performance: "Very Good" },
];

const departments = [
  { name: "CSE", students: 320, projects: 45, avgPoints: 85, topperPoints: 285 },
  { name: "IT", students: 280, projects: 38, avgPoints: 78, topperPoints: 240 },
  { name: "ECE", students: 250, projects: 32, avgPoints: 72, topperPoints: 210 },
  { name: "ME", students: 198, projects: 25, avgPoints: 65, topperPoints: 180 },
  { name: "CE", students: 120, projects: 12, avgPoints: 60, topperPoints: 155 },
  { name: "EE", students: 80, projects: 4, avgPoints: 55, topperPoints: 120 },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <h1 className="font-heading text-3xl font-bold">
          Welcome, <span className="text-gradient">{user?.name}</span> 🎓
        </h1>
        <p className="mt-1 text-muted-foreground">Campus project & event overview with analytics.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <motion.div 
            key={s.label} 
            whileHover={{ y: -4, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-heading text-3xl font-bold">{s.value}</p>
              <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <span>{s.sub}</span>
                {s.trend === "up" && <ArrowUp className="h-3 w-3 text-success" />}
                {s.trend === "down" && <ArrowDown className="h-3 w-3 text-destructive" />}
              </div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Events & Analytics Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Events */}
        <motion.div variants={item} className="lg:col-span-2 rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-warning" /> Upcoming Events
            </h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Open create event modal (placeholder)')}
              className="rounded-md px-3 py-1 text-sm font-medium border border-border hover:bg-muted/50 transition-colors">
              + New Event
            </motion.button>
          </div>
          <div className="space-y-3">
            {events.map((e, i) => (
              <motion.div key={e.name}
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 4, backgroundColor: "rgba(0,0,0,0.03)" }}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{e.name}</h3>
                    <Badge variant={
                      e.status === "Approved" ? "default" :
                      e.status === "Planning" ? "secondary" :
                      "outline"
                    } className="text-[10px]">
                      {e.status}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] ml-auto">{e.budget}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{e.date}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>{e.registrations}/{e.capacity} registered</span>
                    <span className="font-semibold text-primary">{Math.round((e.registrations / e.capacity) * 100)}%</span>
                  </div>
                  <Progress value={(e.registrations / e.capacity) * 100} className="h-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Students */}
        <motion.div variants={item} className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h2 className="font-heading text-lg font-bold flex items-center gap-2">
            <Award className="h-5 w-5 text-warning" /> Top Students
          </h2>
          <div className="space-y-3">
            {topStudents.map((s, i) => (
              <motion.div 
                key={s.name} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: -4, backgroundColor: "rgba(0,0,0,0.03)" }}
                className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground shrink-0">
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.dept}</p>
                  <Badge variant="outline" className="text-[9px] mt-0.5">{s.performance}</Badge>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-heading text-lg font-bold text-primary">{s.points}</p>
                  <p className="text-[10px] text-muted-foreground">{s.projects} proj</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Department Analytics */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-heading text-lg font-bold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" /> Department Analysis
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept, idx) => (
            <motion.div 
              key={dept.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-lg border border-border bg-muted/30 p-4 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{dept.name} Department</h3>
                <Badge variant="secondary" className="text-xs">{dept.students} students</Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Active Projects</span>
                    <span className="font-semibold">{dept.projects} projects</span>
                  </div>
                  <Progress value={(dept.projects / 50) * 100} className="h-1.5" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Avg Points</span>
                    <span className="font-semibold text-primary">{dept.avgPoints}</span>
                  </div>
                  <Progress value={dept.avgPoints} className="h-1.5" />
                </div>

                <div className="rounded-md bg-primary/10 p-2 text-center">
                  <p className="text-[10px] text-muted-foreground">Top Scorer</p>
                  <p className="text-sm font-bold text-primary">{dept.topperPoints} pts</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Insights */}
      <motion.div variants={item} className="rounded-xl border border-success/20 bg-gradient-to-br from-success/5 to-success/10 p-6">
        <h2 className="font-heading text-lg font-bold flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-success" /> Key Insights & Metrics
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-card/50 dark:bg-card/30 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Average Team Size</p>
            <p className="text-2xl font-bold">4.2 members</p>
            <p className="text-xs text-muted-foreground mt-1">+0.3 vs last semester</p>
          </div>
          <div className="rounded-lg bg-card/50 dark:bg-card/30 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Project Success Rate</p>
            <p className="text-2xl font-bold text-success">84%</p>
            <p className="text-xs text-muted-foreground mt-1">Completed on schedule</p>
          </div>
          <div className="rounded-lg bg-card/50 dark:bg-card/30 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Student Engagement</p>
            <p className="text-2xl font-bold text-primary">92%</p>
            <p className="text-xs text-muted-foreground mt-1">Active participation</p>
          </div>
          <div className="rounded-lg bg-card/50 dark:bg-card/30 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Collaboration Score</p>
            <p className="text-2xl font-bold">8.7/10</p>
            <p className="text-xs text-muted-foreground mt-1">Team effectiveness</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
