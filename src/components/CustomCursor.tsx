import React, { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);

  const springConfig = { damping: 30, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="relative flex items-center justify-center"
      >
        {/* Outer Ring - Slow Rotation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-10 h-10 border border-white/20 rounded-full"
        >
          {/* Subtle lens markers */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/40 rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/40 rounded-full" />
        </motion.div>

        {/* Inner Lens - Breathing Effect */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 10px rgba(255,255,255,0.1)',
              '0 0 20px rgba(255,255,255,0.2)',
              '0 0 10px rgba(255,255,255,0.1)'
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-6 h-6 bg-white/10 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center overflow-hidden"
        >
          {/* Lens Center */}
          <div className="w-2 h-2 bg-white/60 rounded-full shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]" />
          
          {/* Internal Flash Animation */}
          <AnimatePresence>
            {isClicked && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 2 }}
                exit={{ opacity: 0, scale: 3 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-white z-10 rounded-full"
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Shutter Press Animation (Scale Down) */}
        <motion.div
          animate={{ scale: isClicked ? 0.85 : 1 }}
          transition={{ duration: 0.1 }}
          className="absolute inset-0"
        />
      </motion.div>
    </div>
  );
};
