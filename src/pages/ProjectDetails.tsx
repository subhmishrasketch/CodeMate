import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Clock, Tag, UserCheck, UserX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (!slug || !user) return;

    const title = decodeURIComponent(slug);
    try {
      const posted = localStorage.getItem("postedProjects");
      const postedProjects = posted ? JSON.parse(posted) : [];
      const found = postedProjects.find((p: any) => p.title === title && p.owner?.email === user.email);
      setProject(found);
    } catch (err) {
      console.error("Error loading project:", err);
    }
  }, [slug, user]);

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
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Header */}
        <div>
          <h1 className="font-heading text-3xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground mt-2">{project.desc}</p>
        </div>

        {/* Project Details */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Difficulty</p>
            <p className="text-sm font-semibold">{project.details?.difficulty || "Medium"}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Technologies</p>
            <p className="text-sm font-semibold">{project.details?.technologies || project.tags?.join(", ")}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Team Members</p>
            <p className="text-sm font-semibold">{(project.acceptedMembers?.length || 0) + 1} members</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Deadline</p>
            <p className="text-sm font-semibold">{project.deadline}</p>
          </div>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" /> Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, idx: number) => (
                <Badge key={idx} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Join Requests */}
        {project.joinRequests && project.joinRequests.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <UserX className="h-4 w-4" /> Pending Join Requests ({project.joinRequests.length})
            </h3>
            <div className="space-y-3">
              {project.joinRequests.map((request: any, idx: number) => (
                <div key={idx} className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{request.name}</p>
                      <p className="text-sm text-muted-foreground">{request.email}</p>
                      {request.phone && <p className="text-sm text-muted-foreground">{request.phone}</p>}
                      {request.department && <p className="text-sm text-muted-foreground">{request.department}</p>}
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  {request.skills && request.skills.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {request.skills.map((skill: string, sidx: number) => (
                          <Badge key={sidx} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accepted Members */}
        {project.acceptedMembers && project.acceptedMembers.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <UserCheck className="h-4 w-4" /> Team Members ({project.acceptedMembers.length})
            </h3>
            <div className="space-y-3">
              {project.acceptedMembers.map((member: any, idx: number) => (
                <div key={idx} className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                      {member.phone && <p className="text-sm text-muted-foreground">{member.phone}</p>}
                      {member.department && <p className="text-sm text-muted-foreground">{member.department}</p>}
                    </div>
                    <Badge variant="default">Accepted</Badge>
                  </div>
                  {member.skills && member.skills.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill: string, sidx: number) => (
                          <Badge key={sidx} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Owner */}
        <div>
          <h3 className="font-semibold mb-3">Project Lead</h3>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="font-medium">{project.owner?.name}</p>
            <p className="text-sm text-muted-foreground">{project.owner?.email}</p>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
