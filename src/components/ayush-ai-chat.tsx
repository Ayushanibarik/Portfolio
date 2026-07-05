"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Send } from "lucide-react";
import { site } from "@/data/site";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

const promptSuggestions = [
  { text: "Tell me about PRAMANIKA", query: "pramanika" },
  { text: "Tell me about SAVE", query: "save" },
  { text: "What are your core skills?", query: "skills" },
  { text: "How can I contact you?", query: "contact" },
];

export function AyushAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "ai",
      text: "Hi! I am Ayush's digital twin. Ask me anything about his projects, skills, university background, or contact details!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  function handleOpen() {
    setIsOpen(true);
    setShowNotification(false);
  }

  function handleSend(text: string) {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Get response after a short delay
    setTimeout(() => {
      const normalizedText = text.toLowerCase();
      let reply = "";

      if (normalizedText.includes("pramanika")) {
        reply = "PRAMANIKA is Ayush's flagship project: an AI-Powered Publication Title Verification System built under the Press Registration of Periodicals Act. It normalization processes and semantically matches titles across massive datasets using a high-fidelity 8-layer NLP pipeline (FastAPI, Sentence Transformers, spaCy, PyTorch) with a verification capability of 160K+ records.";
      } else if (normalizedText.includes("save")) {
        reply = "SAVE (Strategic Evacuation System) is an AI-driven disaster response platform. It models victim triage and resource allocation using agent-based coordination and GIS maps (Python, Flask, Streamlit, OpenStreetMap), and integrates emergency voice broadcasts and notifications via Twilio APIs.";
      } else if (normalizedText.includes("safechoice") || normalizedText.includes("restaurant") || normalizedText.includes("trust")) {
        reply = "SafeChoice is a Restaurant Trust Index and compliance platform built using Node.js and REST APIs. It organizes food safety compliance signals, consumer complaint workflows, and reporting into a unified trust rating score.";
      } else if (normalizedText.includes("skill") || normalizedText.includes("tech") || normalizedText.includes("languages")) {
        reply = "Ayush's skills cover Programming (Java, Python, JS, SQL), Backend frameworks (FastAPI, Flask, Node.js, Django), Frontend (React, Next.js, CSS, Tailwind), and AI engineering (NLP, Machine Learning, Reinforcement Learning, Agentic systems). Tools include Git, GitHub, Docker, and PostgreSQL.";
      } else if (normalizedText.includes("contact") || normalizedText.includes("email") || normalizedText.includes("hire") || normalizedText.includes("phone")) {
        reply = `You can connect with Ayush directly! Email him at ${site.email} or call him at ${site.phone}. Check the Dock at the bottom for his GitHub and LinkedIn links.`;
      } else if (normalizedText.includes("cgpa") || normalizedText.includes("university") || normalizedText.includes("college") || normalizedText.includes("iter") || normalizedText.includes("study")) {
        reply = "Ayush is currently a B.Tech Computer Science student at ITER, SOA University (expected graduation 2028). He holds a strong CGPA of 8.0/10 and is actively involved in campus communities like the Innovation and Entrepreneurship Cell (IEC) and GFG student chapters.";
      } else {
        reply = "I'm Ayush's AI Assistant! I can tell you about his projects (PRAMANIKA, SAVE, SafeChoice), his technical skills, CGPA, or how to contact him. Click one of the quick suggestions below or type a keyword!";
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: reply,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[60]">
        <button
          type="button"
          onClick={handleOpen}
          className="relative overflow-hidden size-14 rounded-full border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
          aria-label="Open Chat"
        >
          <Image
            src="/images/avatar-profile.png"
            alt="Ayush Assistant"
            fill
            sizes="56px"
            className="object-cover"
          />
          {showNotification && (
            <span className="absolute right-0 top-0 flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-accent-green"></span>
            </span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed bottom-36 sm:bottom-24 right-4 sm:right-6 z-[60] flex h-[calc(100vh-180px)] max-h-[500px] w-[calc(100vw-32px)] sm:w-[360px] flex-col rounded-3xl border border-white/10 bg-[#0d1117]/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="relative size-8 overflow-hidden rounded-full border border-white/10 bg-white/10 shrink-0">
                  <Image
                    src="/images/avatar-profile.png"
                    alt="Ayush Assistant Avatar"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-white leading-none">Ayush Assistant</h3>
                  <span className="inline-flex items-center gap-1 text-[11px] text-accent-green font-semibold mt-1">
                    <span className="size-1.5 rounded-full bg-accent-green animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid size-7 place-items-center rounded-full text-white/40 hover:bg-white/5 hover:text-white transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-5 space-y-4"
              style={{ scrollbarWidth: "thin" }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] font-medium leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-accent text-white rounded-tr-sm"
                        : "bg-white/5 border border-white/[0.06] text-white/90 rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/[0.06] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                    <span className="size-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="size-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="size-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions Chips */}
            <div className="px-4 pb-2 pt-2 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: "none" }}>
              {promptSuggestions.map((s) => (
                <button
                  key={s.text}
                  type="button"
                  onClick={() => handleSend(s.query)}
                  className="flex-shrink-0 rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold text-white/60 hover:bg-white/10 hover:text-white transition active:scale-95"
                >
                  {s.text}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="flex gap-2 p-4 border-t border-white/10"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Ayush..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[14px] text-white placeholder-white/30 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="grid size-10 place-items-center rounded-xl bg-accent text-white transition hover:bg-accent/90 active:scale-95"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
