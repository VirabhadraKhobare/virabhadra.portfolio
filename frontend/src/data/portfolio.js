/*
  Updated portfolio data sourced from Full-Stack-Dev_Virabhadra-Khobare.pdf
  All fields reflect extracted resume content; unknown/absent items kept null to avoid fabricating data.
*/

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/VirabhadraKhobare" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/virabhadrakhobare" },
  { label: "Email", href: "mailto:virbhadrakhobare111@gmail.com" },
];

export const heroStats = [
  { label: "Focus", value: "Full Stack + AI" },
  { label: "Degree", value: "B.Tech CSE" },
  { label: "Location", value: "Kolhapur, MH" },
  { label: "Stack", value: "MERN / React / Node" },
];

export const aboutTimeline = [
  {
    year: "2022 - 2026",
    title: "B.Tech (CSE)",
    description:
      "DBATU University | Sharad Institute of Technology College of Engineering — CGPA: 8.75",
  },
  {
    year: "2025 - 2026",
    title: "Full Stack Intern / Projects",
    description:
      "Delivered multiple MERN projects and AI integrations; deployments on Vercel/Railway/Render.",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React.js",
      "Bootstrap 5",
      "Responsive Web Design",
    ],
    progress: 92,
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST API Development",
      "JWT Authentication",
      "RBAC",
    ],
    progress: 90,
  },
  {
    title: "Database",
    items: ["MongoDB", "MongoDB Atlas", "MySQL"],
    progress: 88,
  },
  {
    title: "AI & Realtime",
    items: ["OpenAI API", "WebSockets", "AI-powered feature integration"],
    progress: 80,
  },
];

export const skillRadar = [
  { label: "React.js", value: 95 },
  { label: "Node.js", value: 92 },
  { label: "MongoDB", value: 90 },
  { label: "OpenAI", value: 80 },
  { label: "Deployment", value: 85 },
];

export const projectData = [
  {
    title: "Smart Hospital Management System",
    category: "Full Stack · MERN",
    description:
      "Developed a full-stack Hospital Management System using MERN stack for patient registration, appointment booking, billing, and medical record management.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST API"],
    liveUrl: "https://smart-hospital-management-nu.vercel.app/",
    githubUrl: "https://github.com/VirabhadraKhobare/smart-hospital-management",
    featured: true,
    impact: [
      "Improved system security (JWT + RBAC) — 40%",
      "Improved data retrieval performance by 35%",
      "Improved workflow efficiency by 50%",
    ],
  },
  {
    title: "Smart Agro AI Advisor",
    category: "Full Stack · MERN + AI",
    description:
      "Developed an AI-powered crop advisory platform using React.js, Node.js, MongoDB, and OpenAI API for crop recommendations, disease detection, and weather insights.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "OpenAI API",
      "WebSockets",
    ],
    liveUrl: "https://vk-smart-argo-ai-advisor.vercel.app/",
    githubUrl: "https://github.com/VirabhadraKhobare/vk-smart-argo-ai-advisor",
    featured: true,
    impact: ["Increased user engagement and decision accuracy by 45%"],
  },
  {
    title: "Automobile Service Platform",
    category: "Full Stack · MERN",
    description:
      "Built a full-stack automobile service platform enabling vehicle service booking, appointment management, and digital service history tracking.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
    liveUrl: "https://automobile-service-platform.onrender.com/",
    githubUrl: "https://github.com/VirabhadraKhobare/automobile-service-platform",
    featured: true,
    impact: [
      "Reduced manual workflow by 55%",
      "Improved operational efficiency by 30%",
    ],
  },
];

export const experienceData = [
  {
    company: "Infynow Software Solutions LLP",
    role: "Full Stack Developer Intern",
    type: "Internship",
    location: "On-site Internship (Offline)",
    startDate: "Dec 2025",
    endDate: "Jun 2026",
    summary:
      "Developed and deployed 5+ scalable MERN stack applications, handling database design, REST API development, React.js front-end, and cloud deployment. Built reusable React components and optimized backend services, improving performance and maintainability.",
    highlights: [
      "Built reusable React components",
      "Optimized backend performance",
      "Deployed to Vercel / Railway / Render",
    ],
  },
];

export const certificateData = [
  {
    title: "The Joy of Computing using Python",
    issuer: "NPTEL - IIT Madras",
    issuedAt: "Jan 2026 - Apr 2026",
    pdfUrl:
      "https://drive.google.com/file/d/1NBbwbSvk16Mj-bneuHolZjMdgI0qpafN/view",
    verificationUrl: null,
    notes: "12-week course — Score: 79% (Assignments: 24.88/25, Exam: 54/75)",
  },
  {
    title: "AWS Academy Graduate – Cloud Foundations Training",
    issuer: "Amazon Web Services",
    issuedAt: "Jan 2025 - Mar 2025",
    pdfUrl:
      "https://drive.google.com/file/d/1EbZGfTLSgEyiBlYNWfD5YaPzQNE62siJ/view",
    verificationUrl: null,
    notes: "Virtual Internship — 10-week course",
  },
  {
    title: "Cryptography and Network Security",
    issuer: "NPTEL - IIT Kharagpur",
    issuedAt: "Jan 2026 - Apr 2026",
    pdfUrl:
      "https://drive.google.com/file/d/1_RGOBJpx3V5aQdUC7cnJzSWMQuqD9Ke4/view",
    verificationUrl: null,
    notes: "12-week course — Score: 72% (Assignments: 24.06/25, Exam: 48/75)",
  },
];

export const servicesData = [
  "Full Stack Development",
  "MERN Stack Development",
  "Backend API Development",
  "Responsive Website Design",
  "AI/ML Integration",
];

export const educationData = [
  {
    label: "Bachelor of Technology (B.Tech), Computer Science and Engineering",
    institution: "Sharad Institute of Technology College of Engineering",
    university: "DBATU University",
    location: "Kolhapur, Maharashtra",
    duration: "Aug 2022 - Jun 2026",
    mode: "Full-time on-campus",
    status: "Final year student",
    gpa: "CGPA 8.75",
    specialization: "Computer Science and Engineering",
    highlights: [
      "Strong foundation in full stack web development",
      "Focused on practical MERN and AI-based projects",
      "Built production-ready applications during coursework and internship work",
    ],
  },
];

export const achievementLinks = {
  github: "https://github.com/VirabhadraKhobare",
  leetcode: "https://leetcode.com/virabhadra07",
  codeforces: "https://codeforces.com/profile/virbhadrakhobare111",
  hackerrank: "https://www.hackerrank.com/profile/virbhadra06",
};
