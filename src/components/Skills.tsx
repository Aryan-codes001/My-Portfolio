"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolioData";
import { Award } from "lucide-react";

export default function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-28 relative">
      <div className="absolute bottom-0 left-1/3 w-[250px] h-[250px] rounded-full bg-cyan-500/5 blur-[90px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="h-[2px] w-8 bg-blue-500" />
          <span className="text-sm font-semibold tracking-wider uppercase text-blue-400">Toolkit</span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Skills & Expertise
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl text-base leading-relaxed">
          A structured collection of algorithms, web frameworks, and devops infrastructure I leverage to build stable, production-ready systems.
        </p>
      </motion.div>

      {/* Skills Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-950/20 backdrop-blur-sm border border-gray-900 rounded-2xl p-6 hover:border-gray-800 transition-all duration-300 shadow-lg hover:shadow-cyan-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      px-3.5
                      py-2
                      bg-gray-950/60
                      text-gray-300
                      rounded-xl
                      text-sm
                      font-medium
                      border
                      border-gray-800/80
                      hover:border-blue-400/40
                      hover:text-blue-300
                      hover:bg-blue-950/10
                      transition-all
                      duration-300
                      cursor-default
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}