"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Cpu } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/75 backdrop-blur-md border-b border-gray-800/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent"
        >
          <Cpu className="w-5 h-5 text-blue-400 group-hover:rotate-45 transition-transform duration-300" />
          <span>Aryan Saini</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <li>
            <a
              href="#about"
              className="hover:text-white transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300"
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#skills"
              className="hover:text-white transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Skills
            </a>
          </li>

          <li>
            <a
              href="#projects"
              className="hover:text-white transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className="hover:text-white transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Contact
            </a>
          </li>

          <li>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl border border-white/10 transition-all duration-300 hover:scale-[1.03]"
            >
              Resume <ArrowUpRight className="w-4 h-4" />
            </a>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white p-1 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-black/95 backdrop-blur-lg border-b border-gray-800/80 px-6 py-8 flex flex-col gap-5 animate-fade-in shadow-2xl z-40">
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-white text-lg font-medium py-1.5 border-b border-gray-900"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-white text-lg font-medium py-1.5 border-b border-gray-900"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-white text-lg font-medium py-1.5 border-b border-gray-900"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-white text-lg font-medium py-1.5 border-b border-gray-900"
          >
            Contact
          </a>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-center py-3 rounded-xl text-white font-medium transition duration-300 active:scale-95 flex items-center justify-center gap-1"
          >
            View Resume <ArrowUpRight className="w-4.5 h-4.5" />
          </a>
        </div>
      )}
    </nav>
  );
}