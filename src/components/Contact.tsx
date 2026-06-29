"use client";

import React, { useState } from "react";
import { Mail, User, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // Validate inputs
    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in your name.");
      return;
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setStatus("error");
      setErrorMsg("Please provide a valid email address.");
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setStatus("error");
      setErrorMsg("Please enter a message containing at least 10 characters.");
      return;
    }

    // Check if the API key is configured
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      setStatus("error");
      setErrorMsg("Web3Forms Access Key is not configured. Please add your key in .env.local.");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(result.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please check your network and try again.");
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-28 relative">
      <div className="absolute bottom-0 right-1/3 w-[250px] h-[250px] rounded-full bg-blue-500/5 blur-[90px] pointer-events-none" />

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
          <span className="text-sm font-semibold tracking-wider uppercase text-blue-400">Connection</span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Get In Touch
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl text-base leading-relaxed">
          Have an interesting project proposal, internship opening, or just want to talk about deep learning models? Drop a message.
        </p>
      </motion.div>

      {/* Contact Grid */}
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Left Side: General Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-gray-950/20 backdrop-blur-sm border border-gray-900 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Direct Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-wider font-semibold">Email</span>
                  <a href="mailto:anonymouse.aryan@gmail.com" className="text-sm text-gray-300 hover:text-white transition">
                    anonymouse.aryan@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="lg:col-span-3 bg-gray-950/20 backdrop-blur-sm border border-gray-900 rounded-2xl p-7"
        >
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* Alerts */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Your message has been sent successfully. I will get back to you soon!</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Name */}
            <div className="space-y-1.5">
              <label htmlFor="name-input" className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Full Name</span>
              </label>
              <input
                id="name-input"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "loading"}
                placeholder="Enter your name"
                className="w-full p-4 rounded-xl bg-black/60 border border-gray-800 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 text-white placeholder-gray-600 outline-none transition duration-300 text-sm"
                required
              />
            </div>

            {/* Input Email */}
            <div className="space-y-1.5">
              <label htmlFor="email-input" className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Email Address</span>
              </label>
              <input
                id="email-input"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === "loading"}
                placeholder="Enter your email"
                className="w-full p-4 rounded-xl bg-black/60 border border-gray-800 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 text-white placeholder-gray-600 outline-none transition duration-300 text-sm"
                required
              />
            </div>

            {/* Input Message */}
            <div className="space-y-1.5">
              <label htmlFor="message-input" className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message</span>
              </label>
              <textarea
                id="message-input"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                disabled={status === "loading"}
                placeholder="Your detailed message..."
                className="w-full p-4 rounded-xl bg-black/60 border border-gray-800 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 text-white placeholder-gray-600 outline-none transition duration-300 text-sm resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-gray-100 text-black font-semibold disabled:bg-gray-800 disabled:text-gray-500 transition duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}