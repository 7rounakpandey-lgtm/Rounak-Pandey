import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '@/src/lib/utils';

// Initialize Gemini AI
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const KNOWLEDGE_BASE = `
You are a personal AI assistant for Rounak Pandey. Your goal is to answer questions about Rounak, his work, skills, and experience.
Personality: Friendly, confident, slightly creative, professional but chill. Short, clear responses.
Knowledge Base:
- Name: Rounak Pandey
- Role: Content Creator / Editor / Cinematography
- Experience: 
    - DC Toli (Delhi Capitals fan club – editor): Worked on live IPL content, high-engagement social media posts.
    - Cinematic head of JBS social media team: Leading visual storytelling and branding.
- Skills: Video editing (Premiere Pro, DaVinci Resolve), Cinematography, Content creation, Social Media Strategy, Analytics.
- Goal: Future content head in an OTT platform.
- Projects: 
    - IPL Content (DC Toli): High engagement during live matches.
    - Market Research Project: Identified growth opportunities using Python/SQL.
    - COAE Internship: Increased LinkedIn reach by 40%.
    - Cinematic Workshop: Professional event highlights.
    - Campaign Analysis: Optimized marketing spend by 15%.
    - Content Planning Strategy: Consistent multi-platform growth.

If a question is unknown or unrelated to Rounak, respond politely: "I’m not sure about that, but you can explore my work section!"
You can suggest scrolling or checking out the projects section.
Example tone: "Yeah, that project was part of my DC Toli experience where I worked on live IPL content."
Keep responses concise and engaging.
`;

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey! I'm Rounak's digital assistant. Ask me anything about his work, skills, or experience!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const model = "gemini-3-flash-preview";
      const response = await genAI.models.generateContent({
        model,
        contents: [
          { role: "user", parts: [{ text: KNOWLEDGE_BASE + "\n\nUser: " + text }] }
        ],
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || "I'm having a bit of a brain freeze. Try asking again!",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("ChatBot Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops, something went wrong. Check your connection!",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickReplies = [
    { label: "About me", query: "Who is Rounak Pandey?" },
    { label: "My work", query: "Show me your best work and projects" },
    { label: "Contact me", query: "How can I get in touch with you?" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[10000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[380px] h-[550px] bg-charcoal/90 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-lavender flex items-center justify-center text-white shadow-lg shadow-lavender/20">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Rounak's Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
                    msg.sender === 'user' ? "bg-white/10 text-white" : "bg-lavender/20 text-lavender"
                  )}>
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed",
                    msg.sender === 'user' 
                      ? "bg-lavender text-white rounded-tr-none" 
                      : "bg-white/5 text-white/80 border border-white/5 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-lavender/20 text-lavender flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white/5 p-4 rounded-3xl rounded-tl-none flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            <div className="px-6 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {quickReplies.map((reply) => (
                <button
                  key={reply.label}
                  onClick={() => handleSendMessage(reply.query)}
                  className="shrink-0 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white hover:border-lavender hover:bg-lavender/10 transition-all"
                >
                  {reply.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 pt-2">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-lavender transition-all pr-14"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl bg-lavender text-white flex items-center justify-center hover:bg-lavender/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-[24px] flex items-center justify-center text-white shadow-2xl transition-all duration-500",
          isOpen ? "bg-charcoal rotate-90" : "bg-lavender"
        )}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-mint rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};
