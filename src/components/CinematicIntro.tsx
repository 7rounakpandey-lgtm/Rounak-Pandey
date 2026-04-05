import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000), // Light emergence
      setTimeout(() => setPhase(2), 2000), // Camera activation
      setTimeout(() => setPhase(3), 3000), // Data transformation
      setTimeout(() => setPhase(4), 4000), // Identity reveal
      setTimeout(() => setPhase(5), 5500), // Shutter close
      setTimeout(() => onComplete(), 6000), // Finish
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[10000] flex items-center justify-center overflow-hidden select-none">
      <div className="noise absolute inset-0 opacity-20 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {/* Phase 1 & 2: Light Emergence */}
        {phase >= 1 && phase < 3 && (
          <motion.div
            key="light-streak"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute w-full h-[1px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          />
        )}

        {/* Phase 3: Camera System Activation */}
        {phase >= 2 && phase < 5 && (
          <motion.div
            key="camera-ui"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Crosshair */}
            <div className="absolute w-24 h-24 border border-white/20 rounded-full" />
            <div className="absolute w-[1px] h-12 bg-white/40 top-1/2 -translate-y-1/2" />
            <div className="absolute w-12 h-[1px] bg-white/40 left-1/2 -translate-x-1/2" />
            
            {/* Corner Markers */}
            <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-white/40" />
            <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-white/40" />
            <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-white/40" />
            <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-white/40" />

            {/* Status Text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <p className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                {phase === 2 ? "Initializing Vision..." : "Calibrating Frames..."}
              </p>
              <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-lavender"
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Phase 4: Data Transformation */}
        {phase === 3 && (
          <motion.div
            key="particles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: (Math.random() - 0.5) * 1000, 
                  y: (Math.random() - 0.5) * 1000,
                  opacity: 0 
                }}
                animate={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 1,
                  scale: [1, 1.5, 1]
                }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.02,
                  ease: "circOut"
                }}
                className="absolute w-1 h-1 bg-lavender rounded-full shadow-[0_0_10px_#7B7FD4]"
              />
            ))}
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              className="w-32 h-32 border-2 border-lavender rounded-full flex items-center justify-center"
            >
              <div className="w-24 h-24 border border-white/20 rounded-full" />
            </motion.div>
          </motion.div>
        )}

        {/* Phase 5: Identity Reveal */}
        {phase >= 4 && phase < 5 && (
          <motion.div
            key="identity"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center relative z-10"
          >
            <motion.h1 
              animate={{ 
                textShadow: ["0 0 0px #fff", "0 0 20px #7B7FD4", "0 0 0px #fff"],
                x: [0, -2, 2, -1, 1, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl font-bold text-white tracking-tighter mb-4"
            >
              ROUNAK PANDEY
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm font-mono text-lavender tracking-[0.5em] uppercase"
            >
              Data × Design × Storytelling
            </motion.p>
          </motion.div>
        )}

        {/* Phase 6: Shutter Close */}
        {phase === 5 && (
          <motion.div
            key="shutter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[10001] flex flex-col"
          >
            <motion.div 
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: "circIn" }}
              className="flex-1 bg-black border-b border-white/10"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: "circIn" }}
              className="flex-1 bg-black border-t border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glow */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[800px] h-[800px] bg-lavender/10 rounded-full blur-[120px] pointer-events-none"
      />
    </div>
  );
};
