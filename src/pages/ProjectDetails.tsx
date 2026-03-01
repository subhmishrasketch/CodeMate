import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { projects } from "@/lib/projects";

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = projects.find((p) =>
    p.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!project) {
    return (
      <DashboardLayout>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-6">
          <h1 className="font-heading text-2xl font-bold">Project Not Found</h1>
          <p className="mt-2 text-muted-foreground">No project matches "{slug}"</p>
          <button onClick={() => navigate(-1)} className="mt-4 text-primary hover:underline">Go back</button>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-6 space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="font-heading text-2xl font-bold">{project.title}</h1>
        <p className="text-muted-foreground">{project.desc}</p>
        <div className="mt-4">
          <h2 className="font-semibold">Team Members</h2>
          <p>{project.members}</p>
        </div>
        <div className="mt-2">
          <h2 className="font-semibold">Details</h2>
          <p>{project.details.description}</p>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
