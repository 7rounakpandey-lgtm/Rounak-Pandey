import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

import { cn } from '@/src/lib/utils';

interface CinematicVideoPlayerProps {
  thumbnailUrl: string;
  vimeoId: string;
  title?: string;
  subtitle?: string;
  hoverText?: string;
  aspectRatio?: string;
}

export const CinematicVideoPlayer: React.FC<CinematicVideoPlayerProps> = ({
  thumbnailUrl,
  vimeoId,
  aspectRatio = "aspect-video",
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  // background=1 hides controls, loop=1 enables looping, autopause=0 prevents stopping, autoplay=1 muted=1 for browser compliance
  const vimeoUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&autopause=0&transparent=0&quality=1080p`;

  useEffect(() => {
    setVideoLoaded(false);
    // Simulate a short delay for the video to start buffering before revealing
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [vimeoId]);

  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden rounded-[40px] shadow-2xl bg-black group",
        aspectRatio
      )}
    >
      {/* Thumbnail Placeholder (Fades out) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: videoLoaded ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-0 z-20 pointer-events-none"
      >
        <img
          src={thumbnailUrl}
          alt="Video Thumbnail"
          className={cn(
            "w-full h-full object-cover transition-all duration-1000",
            !videoLoaded && "blur-sm scale-110"
          )}
          referrerPolicy="no-referrer"
        />
        {/* Shimmer Effect while loading */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        )}
      </motion.div>

      {/* Video Content (Fades in) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: videoLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 z-10 bg-black overflow-hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.08] }}
          whileHover={{ scale: 1.1 }}
          transition={{
            scale: {
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
          className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700"
        >
          <iframe
            src={vimeoUrl}
            className="w-full h-full object-cover pointer-events-none"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Vimeo Video"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

