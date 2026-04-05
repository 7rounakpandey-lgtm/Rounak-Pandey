import React, { useEffect, useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { ChatBot } from './components/ChatBot';
import { CinematicIntro } from './components/CinematicIntro';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Smooth scroll behavior for the whole page
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <AnimatePresence>
        {showIntro && (
          <CinematicIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Custom Cursor */}
          <CustomCursor />

          {/* Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-lavender z-[100] origin-left"
            style={{ scaleX }}
          />

          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content */}
          <main className="relative">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Contact />
          </main>

          {/* ChatBot */}
          <ChatBot />

          {/* Footer */}
          <footer className="py-12 pl-24 pr-12 bg-charcoal text-white/20 border-t border-white/5 text-center">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-xs font-bold uppercase tracking-[0.5em]">
                © 2026 Rounak Pandey. All Rights Reserved.
              </p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
