"use client";

import { motion } from "framer-motion";
import { GraduationCap, BrainCircuit, Target, Star, Layers, Cpu } from "lucide-react";
import { stats, specializations, education } from "@/data/portfolioData";

export default function About() {
  const iconsMap = [BrainCircuit, Cpu, Layers];

  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-28 relative">
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

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
          <span className="text-sm font-semibold tracking-wider uppercase text-blue-400">Identity</span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          About Me
        </h2>
      </motion.div>

      {/* Intro Text */}
      <div className="grid lg:grid-cols-3 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <p className="text-gray-300 text-lg leading-8 max-w-4xl">
            I am a Computer Science engineering undergraduate with a deep focus on **Artificial Intelligence and Machine Learning**. I specialize in bridging the gap between sophisticated neural models and fluid web platforms.
          </p>
          <p className="text-gray-400 text-base leading-7 mt-4">
            My goal is to design scalable software products and train high-accuracy models to solve critical, real-world issues. I actively experiment with deep learning pipelines, frame synthesis detection tools, and low-latency API architectures.
          </p>

          {/* Education Timeline inside About */}
          <div className="mt-10">
            <h4 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              Academic Pathway
            </h4>
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="relative pl-6 border-l-2 border-blue-500/30 py-1"
              >
                <div className="absolute -left-[7px] top-[10px] w-3 h-3 rounded-full bg-blue-500" />
                <h5 className="text-md font-bold text-white">{edu.degree}</h5>
                <p className="text-sm text-gray-400 mt-1">{edu.institution} | {edu.period}</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{edu.details}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating Core Goal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-black border border-gray-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
          <Target className="w-10 h-10 text-cyan-400 mb-4" />
          <h3 className="text-xl font-bold mb-3">Career Objectives</h3>
          <ul className="space-y-3.5 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span>Full Stack / Software Engineer Roles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span>AI Research & Neural Net Deployment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span>Continuous Research in Computer Vision</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Specializations Grid */}
      <h4 className="text-lg font-bold text-gray-200 mt-16 mb-6 flex items-center gap-2">
        <Star className="w-5 h-5 text-purple-400 animate-spin-slow" />
        Core Focus Areas
      </h4>
      <div className="grid md:grid-cols-3 gap-6">
        {specializations.map((spec, index) => {
          const Icon = iconsMap[index] || BrainCircuit;
          return (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-950/30 backdrop-blur-sm border border-gray-900 hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_4px_25px_rgba(59,130,246,0.05)]"
            >
              <Icon className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-bold text-white mb-3">
                {spec.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {spec.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <span className="text-blue-500/70 select-none">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Metrics Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-gray-900/60 to-black/60 border border-gray-800/80 rounded-2xl p-5 text-center hover:border-gray-700/80 transition-colors"
          >
            <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {stat.value}
            </h3>
            <p className="text-xs md:text-sm text-gray-400 mt-2 font-medium tracking-wide">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}