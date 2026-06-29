import { personalInfo } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-black/40 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300 p-1.5 hover:bg-white/5 rounded-lg border border-transparent hover:border-gray-800"
            aria-label="Visit Aryan Saini's GitHub profile"
          >
            <GithubIcon className="w-5 h-5" />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300 p-1.5 hover:bg-white/5 rounded-lg border border-transparent hover:border-gray-800"
            aria-label="Visit Aryan Saini's LinkedIn profile"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
}