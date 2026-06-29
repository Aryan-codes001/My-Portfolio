"use client";

import { useState } from "react";
import { projects } from "@/data/portfolioData";
import Image from "next/image";
import { ExternalLink, Cpu, Code, Database } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<"All" | "AI/ML" | "Web Dev">("All");

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-28 relative">
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[2px] w-8 bg-blue-500" />
            <span className="text-sm font-semibold tracking-wider uppercase text-blue-400">Works</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Featured Projects
          </h2>
          <p className="text-gray-400 mt-4 max-w-lg text-base">
            Demonstrating computer vision networks, recommender algorithms, and interactive web structures.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex gap-1.5 bg-gray-950/60 p-1.5 rounded-xl border border-gray-900 self-start md:self-auto">
          {(["All", "AI/ML", "Web Dev"] as const).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === category
                  ? "bg-white text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid lg:grid-cols-2 gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              key={project.title}
              className="border border-gray-900 rounded-2xl overflow-hidden hover:border-blue-500/35 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] hover:-translate-y-2 transition-all duration-500 bg-gray-950/30 backdrop-blur-sm flex flex-col h-full group"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-blue-600/90 text-white font-bold text-xs px-3.5 py-1.5 rounded-full backdrop-blur-sm uppercase tracking-wider">
                  {project.category === "AI/ML" ? <Cpu className="w-3 h-3" /> : <Code className="w-3.5 h-3.5" />}
                  {project.category === "AI/ML" ? "Machine Learning" : "Full Stack Web"}
                </span>
              </div>

              {/* Body */}
              <div className="p-7 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 mt-4 leading-relaxed flex-grow text-sm">
                  {project.description}
                </p>

                {/* Model Training Specifications / Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="mt-5 grid grid-cols-3 gap-3 bg-black/40 border border-gray-900 rounded-xl p-3.5">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{m.label}</span>
                        <span className="block text-xs font-bold text-cyan-400 mt-1">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-900 border border-gray-800 text-[11px] font-medium text-gray-400 px-2.5 py-1 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links Footer */}
                <div className="flex gap-4 mt-8 pt-4 border-t border-gray-900/60">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-150 text-black rounded-xl text-sm font-semibold transition duration-300"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold border border-white/10 hover:border-white/20 transition duration-300"
                    aria-label={`Launch ${project.title} live demo`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}