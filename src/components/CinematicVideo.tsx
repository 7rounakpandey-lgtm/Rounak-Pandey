import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface CinematicVideoProps {
  thumbnailUrl: string;
  vimeoId: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const CinematicVideo: React.FC<CinematicVideoProps> = ({ 
  thumbnailUrl, 
  vimeoId, 
  className,
  title,
  subtitle
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const vimeoUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&autopause=0&background=1`;

  return (
    <div 
      className={cn(
        "relative w-full aspect-video rounded-[40px] overflow-hidden shadow-2xl group cursor-pointer bg-black",
        className
      )}
      onClick={() => setIsPlaying(true)}
    >
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            key="thumbnail"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="absolute inset-0 z-10"
          >
            <img 
              src={thumbnailUrl} 
              alt={title || "Video Thumbnail"} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* REC Icon Overlay */}
            <div className="absolute top-8 left-8 flex items-center gap-2 text-white">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase">READY</span>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[32px] max-w-md opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0"
              >
                {title && <h3 className="text-white font-bold text-2xl mb-2">{title}</h3>}
                {subtitle && <p className="text-white/60 text-xs uppercase tracking-[0.3em]">{subtitle}</p>}
              </motion.div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-24 h-24 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white shadow-2xl"
                >
                  <Play fill="currentColor" size={32} className="ml-1" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <iframe
              src={vimeoUrl}
              className="absolute top-1/2 left-1/2 w-[100%] h-[100%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Cinematic Showreel"
            />
            {/* Subtle Overlay to maintain cinematic look */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            
            {/* REC Active Overlay */}
            <div className="absolute top-8 left-8 flex items-center gap-2 text-white z-10">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase">PLAYING</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner UI Elements */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20" />
        <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/20" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/20" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20" />
      </div>
    </div>
  );
};
