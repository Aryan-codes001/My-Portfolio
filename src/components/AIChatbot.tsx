"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";

interface Message {
  sender: "bot" | "user";
  text: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I am Synapse, Aryan's virtual AI assistant. How can I help you learn about his ML models or web stack today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setUnread(false);
  };

  const getBotResponse = (input: string): string => {
    const text = input.toLowerCase();

    if (text.includes("about") || text.includes("who is") || text.includes("aryan")) {
      return "Aryan Saini is a B.Tech Computer Science student specializing in AI & ML at Quantum University. He builds deep learning models and bridges them with Next.js & React frontend interfaces.";
    }

    if (text.includes("deepfake") || text.includes("detection") || text.includes("image")) {
      return "Aryan's Deepfake Detection System is trained on over 395,000 images, achieving a 98.2% test accuracy. It uses Convolutional Neural Networks (CNN) with TensorFlow, OpenCV, and Next.js to inspect media forgery.";
    }

    if (text.includes("skills") || text.includes("toolkit") || text.includes("technolog")) {
      return "His core tech stack includes Python, TensorFlow, Keras, OpenCV, TypeScript, React 19, Next.js 16, Node.js, and Firebase. You can find a categorized summary in the 'Skills' section!";
    }

    if (text.includes("contact") || text.includes("email") || text.includes("hire")) {
      return `You can reach Aryan directly at ${personalInfo.email} or by filling out the 'Contact Me' form below. He is open to internship roles and collaborative AI research.`;
    }

    if (text.includes("resume") || text.includes("cv") || text.includes("download")) {
      return "You can download Aryan's official resume by clicking the 'Download Resume' button in the Hero section or view it inside the navigation drawer.";
    }

    if (text.includes("recommend") || text.includes("content")) {
      return "The Recommendation Engine Simulator computes dynamic user interest vectors in real-time (< 2ms) from ratings and clicks, generating hybrid recommendations using Cosine Similarity and user-user collaborative filtering.";
    }

    return "That's a good question! I'm preconfigured with facts regarding Aryan's AI coursework, metrics for the Deepfake project, and development skills. Feel free to ask about his skills, projects, or contact details!";
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const responseText = getBotResponse(text);
    setMessages((prev) => [...prev, { sender: "bot", text: responseText }]);
    setIsTyping(false);
  };

  const suggestions = [
    "Tell me about Aryan",
    "Deepfake Detection details",
    "View his core skills",
    "How to contact him",
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/10 group cursor-pointer"
          aria-label="Toggle AI Chatbot"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          
          {/* Notification Badge */}
          {unread && !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border border-black text-[9px] font-extrabold text-black items-center justify-center">1</span>
            </span>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-[340px] sm:w-[380px] h-[480px] bg-gray-950 border border-gray-900 shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden backdrop-blur-md"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-gray-900 to-black border-b border-gray-900 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center relative">
                  <Bot className="w-4.5 h-4.5 text-blue-400" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-gray-950 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">Synapse AI</h4>
                  <span className="text-[10px] text-cyan-400/80 font-medium">Neural Portfolio Agent</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1" aria-label="Close Chat">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Area */}
            <div
              ref={listRef}
              className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-gray-900/80 border border-gray-800 text-gray-300 rounded-tl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-900/80 border border-gray-800 text-gray-400 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-500" />
                    <span className="text-[10px] tracking-wide font-medium">Assistant is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions list */}
            <div className="px-4 py-2 border-t border-gray-950 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0 bg-black/20">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="bg-gray-900 hover:bg-gray-850 hover:border-gray-700 text-gray-400 hover:text-white border border-gray-850 px-2.5 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Message Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 border-t border-gray-900 flex gap-2 items-center bg-gray-950"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a question..."
                className="flex-grow bg-black border border-gray-800 focus:border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 outline-none transition"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-white hover:bg-gray-150 disabled:bg-gray-900 disabled:text-gray-600 text-black p-2.5 rounded-xl transition cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
