import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, ArrowRight, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const projects = [
  { title: "Virtual Lab Simulator", desc: "A VR-based virtual lab for physics and chemistry experiments with 3D molecule rendering and interactive simulations.", tags: ["Unity", "C#", "WebGL"], author: "Karan J.", reason: "Team disbanded", date: "Jan 2026", interested: 12 },
  { title: "College Carpooling App", desc: "Ride-sharing platform exclusively for college students with route matching, fare splitting, and safety features.", tags: ["React Native", "Node.js", "Maps API"], author: "Divya S.", reason: "Deadline missed", date: "Dec 2025", interested: 8 },
  { title: "Research Paper Finder", desc: "AI-powered tool to find and summarize relevant research papers with citation management and reading lists.", tags: ["Python", "NLP", "FastAPI"], author: "Amit P.", reason: "Scope too large", date: "Nov 2025", interested: 15 },
  { title: "Student Marketplace", desc: "Buy and sell used textbooks, lab equipment, and study materials within campus with verified student profiles.", tags: ["React", "Node.js", "Stripe", "MongoDB"], author: "Sneha K.", reason: "Team graduated", date: "Feb 2026", interested: 20 },
  { title: "AI Study Buddy", desc: "Personalized study companion that creates flashcards, quizzes, and summaries from lecture notes using AI.", tags: ["Python", "TensorFlow", "React", "GPT API"], author: "Rohan G.", reason: "Funding issues", date: "Jan 2026", interested: 25 },
];

const RevivalHub = () => {
  const { user } = useAuth();

  const adopt = (p: any) => {
    try {
      const key = "adoptedIdeas";
      const raw = localStorage.getItem(key);
      const list = raw ? JSON.parse(raw) : [];
      list.push({ ...p, adoptedBy: user?.email || "anonymous", adoptedAt: Date.now() });
      localStorage.setItem(key, JSON.stringify(list));
      toast.success(`You've adopted "${p.title}"! Start building your team. 🚀`);
    } catch (e) {
      toast.error("Unable to adopt idea. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
          <RefreshCw className="h-7 w-7 text-primary" /> Revival Hub
        </h1>
        <p className="mt-1 text-muted-foreground">Give abandoned project ideas a second chance.</p>
      </div>

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.title} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2 flex-wrap">
                  <Badge variant="destructive" className="text-[10px]">Abandoned</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                  <span className="text-xs text-muted-foreground">· Reason: {p.reason}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Originally by <strong>{p.author}</strong></span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {p.interested} interested</span>
                </div>
              </div>
              <button onClick={() => adopt(p)}
                className="flex shrink-0 items-center gap-1 rounded-lg gradient-cta px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                Adopt Idea <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </DashboardLayout>
  );
};

export default RevivalHub;
