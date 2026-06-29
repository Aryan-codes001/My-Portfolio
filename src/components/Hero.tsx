"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, Terminal } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl text-center z-10">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          <span>Available for Internships & Projects</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-8xl font-black tracking-tight"
        >
          <span className="text-gray-400">Hi, I'm </span>
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
            {personalInfo.name}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center justify-center gap-2 text-xl md:text-3xl text-gray-300 font-semibold mt-6"
        >
          <Terminal className="w-5 h-5 md:w-7 md:h-7 text-cyan-400" />
          <span>AI & ML Student | Full Stack Developer</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-400 mt-8 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Building high-precision computer vision systems, training complex deep learning architectures, and crafting responsive frontend platforms with React, Next.js, and Python.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.03] transition-all duration-300"
          >
            <span>View My Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.resumeUrl}
            download
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.03]"
          >
            <Download className="w-4 h-4 text-gray-400" />
            <span>Download Resume</span>
          </a>
        </motion.div>
      </div>

      {/* Bounce Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, y: [0, 8, 0] }}
        transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer pointer-events-none"
      >
        <span className="text-xs uppercase tracking-widest text-gray-500">Scroll Down</span>
        <div className="w-5 h-8 border border-gray-600 rounded-full flex justify-center p-1 mt-1">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}