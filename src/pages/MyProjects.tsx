import { DashboardLayout } from "@/components/DashboardLayout";
import { FolderOpen, Users, Clock, Settings, ExternalLink, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { projects as myProjects } from "@/lib/projects";


const MyProjects = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
              <FolderOpen className="h-7 w-7 text-primary" /> My Projects
            </h1>
            <p className="mt-1 text-muted-foreground">Manage and track your active projects.</p>
          </div>
          <button onClick={() => navigate("/post-project")}
            className="flex items-center gap-2 rounded-lg gradient-cta px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <Plus className="h-4 w-4" /> New Project
          </button>
        </div>

        <div className="space-y-4">
          {myProjects.map((p) => {
            const slug = p.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={p.title} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
                      <Badge variant={p.status === "In Progress" ? "default" : "secondary"} className="text-[10px]">{p.status}</Badge>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{p.role}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">{t}</span>
                      ))}
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span className="font-semibold text-primary">{p.progress}%</span>
                      </div>
                      <Progress value={p.progress} className="h-2" />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {p.members} members</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Due: {p.deadline}</span>
                      <span>Updated {p.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => navigate(`/my-projects/${slug}/manage`)} className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-muted transition-colors">
                      <Settings className="h-3.5 w-3.5" /> Manage
                    </button>
                    <button onClick={() => navigate(`/my-projects/${slug}`)} className="flex items-center gap-1 rounded-lg gradient-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90">
                      <ExternalLink className="h-3.5 w-3.5" /> Open
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default MyProjects;
