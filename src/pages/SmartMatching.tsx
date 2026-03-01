import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Users, Mail, Phone, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const ALL_SKILLS = [
  "React", "Node.js", "Python", "Java", "TypeScript", "MongoDB", "PostgreSQL",
  "Flutter", "ML/AI", "IoT", "DevOps", "UI/UX", "Docker", "TensorFlow", "Figma",
  "C++", "Rust", "Go", "Kotlin", "AWS",
];

const allCandidates = [
  {
    name: "Priya Sharma", initials: "PS", dept: "CSE", semester: 6, points: 285,
    skills: ["React", "Python", "TensorFlow", "ML/AI"], collab: 89, available: true,
    email: "priya@college.edu", phone: "+91 99887 11223",
  },
  {
    name: "Neha Rao", initials: "NR", dept: "ME", semester: 7, points: 180,
    skills: ["Python", "ML/AI", "IoT", "Docker"], collab: 76, available: true,
    email: "neha@college.edu", phone: "+91 91234 56789",
  },
  {
    name: "Amit Desai", initials: "AD", dept: "CSE", semester: 5, points: 195,
    skills: ["React", "Node.js", "TypeScript", "Docker"], collab: 82, available: false,
    email: "amit@college.edu", phone: "+91 88776 12345",
  },
  {
    name: "Vikram Patel", initials: "VP", dept: "CSE", semester: 6, points: 165,
    skills: ["React", "TypeScript", "PostgreSQL", "AWS"], collab: 91, available: true,
    email: "vikram@college.edu", phone: "+91 88776 55443",
  },
  {
    name: "Ananya Iyer", initials: "AI", dept: "IT", semester: 5, points: 150,
    skills: ["Flutter", "UI/UX", "Figma", "Kotlin"], collab: 85, available: true,
    email: "ananya@college.edu", phone: "+91 77665 44332",
  },
  {
    name: "Rohan Gupta", initials: "RG", dept: "ECE", semester: 7, points: 140,
    skills: ["IoT", "C++", "Python", "DevOps"], collab: 72, available: true,
    email: "rohan@college.edu", phone: "+91 66554 33221",
  },
  {
    name: "Sneha Kulkarni", initials: "SK", dept: "ECE", semester: 6, points: 210,
    skills: ["Python", "TensorFlow", "ML/AI", "Docker"], collab: 88, available: false,
    email: "sneha@college.edu", phone: "+91 55443 22110",
  },
  {
    name: "Karan Joshi", initials: "KJ", dept: "CSE", semester: 4, points: 120,
    skills: ["React", "Node.js", "MongoDB", "DevOps"], collab: 78, available: true,
    email: "karan@college.edu", phone: "+91 44332 11009",
  },
];

const SmartMatching = () => {
  const [selected, setSelected] = useState<string[]>(["React", "Python", "ML/AI"]);

  const toggleSkill = (skill: string) => {
    setSelected((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
  };

  const getOverlap = (skills: string[]) => {
    if (selected.length === 0) return 0;
    const matching = skills.filter((s) => selected.includes(s)).length;
    return Math.round((matching / selected.length) * 100);
  };

  const candidates = allCandidates
    .map((c) => ({ 
      ...c, 
      overlap: getOverlap(c.skills),
      matchedSkills: c.skills.filter(s => selected.includes(s))
    }))
    .sort((a, b) => {
      // First sort by overlap percentage (descending)
      const byOverlap = b.overlap - a.overlap;
      if (byOverlap !== 0) return byOverlap;
      // Then by availability
      const byAvailable = (b.available ? 1 : 0) - (a.available ? 1 : 0);
      if (byAvailable !== 0) return byAvailable;
      // Finally by points
      return b.points - a.points;
    });

  const skillGap = selected.map((s) => ({
    skill: s,
    count: allCandidates.filter((c) => c.skills.includes(s)).length,
  }));

  const perfectMatches = candidates.filter((c) => c.overlap === 100 && c.available);
  const goodMatches = candidates.filter((c) => c.overlap >= 50 && c.overlap < 100);
  const otherMatches = candidates.filter((c) => c.overlap < 50);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-primary" /> Smart Matching
          </h1>
          <p className="mt-1 text-muted-foreground">Find the perfect teammates based on skills, availability, and collaboration potential.</p>
        </div>

        {/* Skills Filter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} 
          className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-3 font-heading text-base font-semibold flex items-center gap-2">⚙️ Required Skills for Your Project</h2>
          <div className="flex flex-wrap gap-2">
            {ALL_SKILLS.map((s) => (
              <button key={s} onClick={() => toggleSkill(s)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                  selected.includes(s)
                    ? "gradient-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}>
                {s}
              </button>
            ))}
          </div>
          {selected.length > 0 && (
            <p className="mt-3 text-xs text-muted-foreground">
              🎯 {selected.length} skill{selected.length > 1 ? "s" : ""} selected · 
              <span className="text-success ml-1">✓ {candidates.filter((c) => c.overlap > 0).length} matches found</span>
            </p>
          )}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Skill Gap */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 font-heading text-base font-semibold flex items-center gap-2">⚡ Skill Gap Analysis</h2>
            {skillGap.length === 0 ? (
              <p className="text-sm text-muted-foreground">Select skills to see gap analysis</p>
            ) : skillGap.map((s, idx) => (
              <motion.div key={s.skill} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + idx * 0.05 }} 
                className="mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{s.skill}</span>
                  <span className="text-primary font-semibold">{s.count}/{allCandidates.length}</span>
                </div>
                <Progress value={Math.min((s.count / allCandidates.length) * 100, 100)} className="mt-1 h-2" />
              </motion.div>
            ))}
          </motion.div>

          {/* Candidates */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {perfectMatches.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm font-semibold text-success">Perfect Matches ({perfectMatches.length})</span>
                  </div>
                  <div className="space-y-3">
                    {perfectMatches.map((c, idx) => (
                      <CandidateCard key={c.name} candidate={c} selected={selected} index={idx} />
                    ))}
                  </div>
                </motion.div>
              )}

              {goodMatches.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mt-6 mb-3 flex items-center gap-2">
                    <span className="text-sm font-semibold text-warning">Good Matches ({goodMatches.length})</span>
                  </div>
                  <div className="space-y-3">
                    {goodMatches.map((c, idx) => (
                      <CandidateCard key={c.name} candidate={c} selected={selected} index={idx} />
                    ))}
                  </div>
                </motion.div>
              )}

              {otherMatches.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mt-6 mb-3 flex items-center gap-2">
                    <span className="text-sm font-semibold text-muted-foreground">Other Candidates ({otherMatches.length})</span>
                  </div>
                  <div className="space-y-3">
                    {otherMatches.map((c, idx) => (
                      <CandidateCard key={c.name} candidate={c} selected={selected} index={idx} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {selected.length > 0 && candidates.filter((c) => c.overlap > 0).length === 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center text-muted-foreground py-8">No matches found. Try adjusting your skill filters.</motion.p>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

function CandidateCard({ candidate, selected, index }: any) {
  const orderedSkills = [
    ...candidate.skills.filter((s: string) => selected.includes(s)),
    ...candidate.skills.filter((s: string) => !selected.includes(s)),
  ];

  return (
    <motion.div key={candidate.name} 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
      className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md cursor-pointer">
      <div className="flex items-start gap-4">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full gradient-primary font-bold text-primary-foreground">
          {candidate.initials}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold">{candidate.name}</h3>
            {candidate.overlap === 100 && candidate.available && (
              <Badge className="bg-success text-white text-[10px]">Perfect Match!</Badge>
            )}
            <span className={`flex items-center gap-1 text-xs ${candidate.available ? "text-success" : "text-muted-foreground"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${candidate.available ? "bg-success" : "bg-muted-foreground"}`} />
              {candidate.available ? "Available" : "Busy"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{candidate.dept} · Semester {candidate.semester} · {candidate.points} pts</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {orderedSkills.map((s: string) => (
              <motion.div key={s} whileHover={{ scale: 1.05 }}>
                <Badge 
                  variant={selected.includes(s) ? "default" : "secondary"} 
                  className={`text-[10px] ${selected.includes(s) ? "ring-2 ring-primary/50" : ""}`}>
                  {s}
                </Badge>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {candidate.email}</span>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {candidate.phone}</span>
          </div>
          <div className="mt-3 flex items-center gap-6 text-xs">
            <span>
              Skill Match: <strong className={candidate.overlap === 100 ? "text-success" : "text-primary"}>{candidate.overlap}%</strong>
            </span>
            <span>
              Collab Score: <strong className="text-primary">{candidate.collab}/100</strong>
            </span>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toast.success(`Invitation sent to ${candidate.name}! 📩`)}
          className="flex shrink-0 items-center gap-1 rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          <Users className="h-4 w-4" /> Invite
        </motion.button>
      </div>
    </motion.div>
  );
}

export default SmartMatching;
