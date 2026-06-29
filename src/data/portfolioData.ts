export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  category: "AI/ML" | "Web Dev";
  tech: string[];
  image: string;
  github: string;
  demo: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Stat {
  value: string;
  label: string;
  color?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface Specialization {
  title: string;
  items: string[];
}

export const personalInfo = {
  name: "Aryan Saini",
  title: "AI & ML Student | Full Stack Developer",
  email: "anonymouse.aryan@gmail.com",
  github: "https://github.com/aryan-saini", // Pinned template replacement
  linkedin: "https://linkedin.com/in/aryan-saini",
  resumeUrl: "/resume.pdf",
};

export const stats: Stat[] = [
  { value: "395K+", label: "Images Processed" },
  { value: "98.2%", label: "Deepfake Accuracy" },
  { value: "2+", label: "AI Core Projects" },
  { value: "5+", label: "Web Frameworks" },
];

export const specializations: Specialization[] = [
  {
    title: "AI & Machine Learning",
    items: ["Neural Networks (CNN, RNN)", "Computer Vision (OpenCV)", "TensorFlow & Keras Models", "Data Preprocessing & Augmentation"],
  },
  {
    title: "Full Stack Development",
    items: ["Next.js (React 19, Server Components)", "Tailwind CSS v4 & Styling systems", "Node.js & Express Backends", "Firebase Authentication & Datastore"],
  },
  {
    title: "Engineering Pillars",
    items: ["Git & GitHub Workflow", "System Design & Architecture", "RESTful API Integration", "Responsive UI/UX Concepts"],
  },
];

export const education: EducationItem[] = [
  {
    degree: "B.Tech Computer Science (AI & ML)",
    institution: "Quantum University,Roorkee",
    period: "2025 - Present",
    details: "Focusing on Deep Learning architectures, Neural Net designs, Computer Vision applications, and advanced Data Structures.",
  },
  {
    degree: "Senior Secondary (Class 12)",
    institution: "Shakumbari Public School,Saharanpur",
    period: "Completed: 2025",
    details: "Science Stream (Physics, Chemistry, Mathematics).",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    skills: ["Python", "TensorFlow", "Keras", "OpenCV", "Scikit-Learn", "NumPy", "Pandas"],
  },
  {
    title: "Frontend Development",
    skills: ["HTML5 / CSS3", "JavaScript (ES6+)", "TypeScript", "React 19", "Next.js 16", "Tailwind CSS v4", "Framer Motion"],
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "RESTful APIs", "Firebase", "MongoDB"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Postman"],
  },
];

export const projects: Project[] = [
  {
    title: "Deepfake Detection System",
    description:
      "A high-precision neural network architecture trained on 395,000+ facial frames. Designed to isolate fake profiles and altered media using custom CNN features and video frame sequencing.",
    category: "AI/ML",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "React", "Next.js"],
    image: "/deepfake-project.png",
    github: "https://github.com/Aryan-codes001/deepfake-detector",
    demo: "https://deepfake-detector-ssgg.vercel.app/",
    metrics: [
      { label: "Dataset Size", value: "395,000+ Images" },
      { label: "Accuracy", value: "98.2%" },
      { label: "Model Type", value: "CNN / ResNet55" },
    ],
  },
  {
    title: "Recommendation Engine Simulator",
    description:
      "An interactive simulator displaying personalization workflows. Computes dynamic interest profiles from explicit ratings and implicit clicks, utilizing Cosine Similarity, collaborative peer matching vectors, and hybrid weights.",
    category: "Web Dev",
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Lucide React"],
    image: "/recommendation-project.png",
    github: "https://github.com/Aryan-codes001/content-recommender",
    demo: "https://content-recommender-ssgg.vercel.app/",
    metrics: [
      { label: "Vector Distance", value: "Cosine Similarity" },
      { label: "Compute Speed", value: "Real-Time < 2ms" },
      { label: "Weight Models", value: "Hybrid Blending" },
    ],
  },
];