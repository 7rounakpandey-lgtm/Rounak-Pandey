import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence, useAnimationFrame } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const CinematicCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverType, setHoverType] = useState<'default' | 'button' | 'video' | 'card'>('default');
  const [magneticPos, setMagneticPos] = useState<{ x: number, y: number } | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  
  const cursorX = useSpring(0, { damping: 30, stiffness: 200 });
  const cursorY = useSpring(0, { damping: 30, stiffness: 200 });
  
  const spotlightRef = useRef<HTMLDivElement>(null);

  const updateCursor = useCallback((x: number, y: number) => {
    cursorX.set(x);
    cursorY.set(y);
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty('--x', `${x}px`);
      spotlightRef.current.style.setProperty('--y', `${y}px`);
    }
  }, [cursorX, cursorY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, .interactive-card, .video-container');
      
      if (interactive) {
        setIsHovering(true);
        if (interactive.tagName === 'BUTTON' || interactive.tagName === 'A') {
          setHoverType('button');
        } else if (interactive.classList.contains('video-container')) {
          setHoverType('video');
        } else if (interactive.classList.contains('interactive-card')) {
          setHoverType('card');
        }

        // Magnetic effect
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Only snap if close enough
        const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        if (dist < 100) {
          setMagneticPos({ x: centerX, y: centerY });
          updateCursor(centerX, centerY);
        } else {
          setMagneticPos(null);
          updateCursor(e.clientX, e.clientY);
        }
      } else {
        setIsHovering(false);
        setHoverType('default');
        setMagneticPos(null);
        updateCursor(e.clientX, e.clientY);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 300);
    };
    
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [updateCursor]);

  return (
    <>
      {/* Spotlight Overlay */}
      <div 
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none z-[9999] bg-black/40"
        style={{
          maskImage: `radial-gradient(circle 150px at var(--x) var(--y), transparent 0%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle 150px at var(--x) var(--y), transparent 0%, black 100%)`,
        }}
      />

      {/* Shutter Flicker Effect */}
      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white z-[10001] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Flash Burst */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed z-[10002] pointer-events-none w-20 h-20 rounded-full bg-white blur-xl"
            style={{ left: mousePos.x - 40, top: mousePos.y - 40 }}
          />
        )}
      </AnimatePresence>

      {/* Main Camera Cursor */}
      <motion.div
        className="fixed z-[10000] pointer-events-none flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Handheld Floating Motion */}
        <motion.div
          animate={{
            x: [0, 2, -1, 1, 0],
            y: [0, -1, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative flex items-center justify-center"
        >
          {/* Outer Ring */}
          <motion.div 
            animate={{ 
              scale: isHovering ? 1.4 : 1,
              rotate: hoverType === 'video' ? 90 : 0,
              borderColor: isClicking ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)'
            }}
            className={cn(
              "w-12 h-12 rounded-full border-2 border-white/30 backdrop-blur-[2px] transition-colors duration-300",
              hoverType === 'video' && "w-20 h-20 border-red-500/50"
            )}
          />

          {/* Inner Lens */}
          <motion.div 
            animate={{ 
              scale: isHovering ? 0.8 : 1,
              backgroundColor: isClicking ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.8)'
            }}
            className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          />

          {/* Lens Glow */}
          <div className="absolute inset-0 rounded-full bg-white/5 blur-md" />

          {/* Video Mode Indicators */}
          <AnimatePresence>
            {hoverType === 'video' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -top-8 flex flex-col items-center"
              >
                <div className="flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-tighter animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  REC
                </div>
                {/* Focus Brackets */}
                <div className="absolute top-10 -left-12 w-4 h-4 border-t-2 border-l-2 border-white/50" />
                <div className="absolute top-10 -right-12 w-4 h-4 border-t-2 border-r-2 border-white/50" />
                <div className="absolute top-24 -left-12 w-4 h-4 border-b-2 border-l-2 border-white/50" />
                <div className="absolute top-24 -right-12 w-4 h-4 border-b-2 border-r-2 border-white/50" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trail Effect (Subtle) */}
          <div className="absolute inset-0 -z-10">
             {[...Array(3)].map((_, i) => (
               <motion.div
                 key={i}
                 animate={{
                   opacity: [0, 0.2, 0],
                   scale: [1, 1.5],
                 }}
                 transition={{
                   duration: 1,
                   delay: i * 0.2,
                   repeat: Infinity,
                 }}
                 className="absolute inset-0 rounded-full border border-white/10"
               />
             ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Global Grain Overlay (Briefly spikes on click) */}
      <motion.div 
        animate={{ opacity: isClicking ? 0.4 : 0.1 }}
        className="noise fixed inset-0 pointer-events-none z-[10003]"
      />
    </>
  );
};
