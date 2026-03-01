export interface Project {
  title: string;
  desc: string;
  tags: string[];
  members: string;
  deadline: string;
  match: number;
  author: string;
  authorEmail: string;
  authorPhone: string;
  urgent: boolean;
  details: {
    technologies: string;
    budget: string;
    difficulty: string;
    estimatedHours: string;
    description: string;
  };
}

export const projects: Project[] = [
  {
    title: "AI-Powered Campus Navigator",
    desc: "An intelligent campus navigation system using computer vision and AR to help new students find classrooms, labs, and facilities. Features real-time routing, indoor mapping, and AR-based wayfinding.",
    tags: ["React", "Python", "TensorFlow", "AR"],
    members: "3/5",
    deadline: "Mar 15, 2026",
    match: 92,
    author: "Priya Sharma",
    authorEmail: "priya@college.edu",
    authorPhone: "+91 99887 11223",
    urgent: true,
    details: {
      technologies: "React, Python, TensorFlow, AR",
      budget: "₹50,000",
      difficulty: "Hard",
      estimatedHours: "400 hours",
      description: "Build a comprehensive campus navigation system with AR visualization and AI-powered route optimization."
    }
  },
  {
    title: "Green Energy Dashboard",
    desc: "Real-time monitoring dashboard for campus solar panels and energy consumption with predictive analytics and alerts.",
    tags: ["React", "Node.js", "IoT", "D3.js"],
    members: "2/4",
    deadline: "Apr 01, 2026",
    match: 78,
    author: "Rahul Mehta",
    authorEmail: "rahul@college.edu",
    authorPhone: "+91 98765 44332",
    urgent: false,
    details: {
      technologies: "React, Node.js, IoT, D3.js",
      budget: "₹30,000",
      difficulty: "Medium",
      estimatedHours: "250 hours",
      description: "Create a real-time energy monitoring and analytics platform for global campus sustainability."
    }
  },
  {
    title: "Smart Attendance System",
    desc: "Face recognition based attendance system for lecture halls with real-time analytics and automatic report generation.",
    tags: ["Python", "OpenCV", "Flask", "React"],
    members: "1/3",
    deadline: "Mar 28, 2026",
    match: 85,
    author: "Neha Rao",
    authorEmail: "neha@college.edu",
    authorPhone: "+91 91234 56789",
    urgent: false,
    details: {
      technologies: "Python, OpenCV, Flask, React",
      budget: "₹40,000",
      difficulty: "Medium",
      estimatedHours: "300 hours",
      description: "Develop an automated attendance system using facial recognition technology for educational institutions."
    }
  },
  {
    title: "Campus Food Ordering App",
    desc: "Mobile-first food ordering platform for campus canteens with pre-order, QR payments, and live order tracking.",
    tags: ["React Native", "Node.js", "MongoDB", "Stripe"],
    members: "2/4",
    deadline: "Apr 15, 2026",
    match: 72,
    author: "Vikram Patel",
    authorEmail: "vikram@college.edu",
    authorPhone: "+91 88776 55443",
    urgent: false,
    details: {
      technologies: "React Native, Node.js, MongoDB, Stripe",
      budget: "₹45,000",
      difficulty: "Medium",
      estimatedHours: "350 hours",
      description: "Create a seamless mobile app for campus food ordering with payment integration and real-time tracking."
    }
  },
  {
    title: "Library Seat Booking System",
    desc: "Web app to check real-time seat availability in the library and book seats with QR-based check-in.",
    tags: ["TypeScript", "PostgreSQL", "React", "IoT"],
    members: "1/3",
    deadline: "Apr 20, 2026",
    match: 88,
    author: "Ananya Iyer",
    authorEmail: "ananya@college.edu",
    authorPhone: "+91 77665 44332",
    urgent: true,
    details: {
      technologies: "TypeScript, PostgreSQL, React, IoT",
      budget: "₹35,000",
      difficulty: "Easy",
      estimatedHours: "200 hours",
      description: "Build a real-time seat reservation system for library management with QR-based verification."
    }
  },
  {
    title: "Peer Code Review Platform",
    desc: "Platform for students to submit code and get peer reviews with automated quality scoring and gamification.",
    tags: ["React", "Node.js", "Docker", "ML/AI"],
    members: "3/5",
    deadline: "May 01, 2026",
    match: 68,
    author: "Rohan Gupta",
    authorEmail: "rohan@college.edu",
    authorPhone: "+91 66554 33221",
    urgent: false,
    details: {
      technologies: "React, Node.js, Docker, ML/AI",
      budget: "₹55,000",
      difficulty: "Hard",
      estimatedHours: "450 hours",
      description: "Develop a collaborative code review platform with automated quality analysis and gamification elements."
    }
  }
];
