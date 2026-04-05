import React from 'react';
import { CinematicVideoPlayer } from './CinematicVideoPlayer';
import { motion } from 'motion/react';
import { ArrowUpRight, Award, LayoutGrid, Mail, Play, Star, Video } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen pt-12 pb-24 pl-24 pr-12 bg-white relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1600px] mx-auto relative z-10">
        
        {/* Left Section: Profile Card (Dashboard Style) */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-3 flex flex-col gap-6"
        >
          <div className="bg-lavender rounded-[40px] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-medium opacity-80 mb-8">
                <Star size={12} fill="currentColor" />
                <span>Creative Strategist</span>
              </div>
              
              <div className="relative mb-12">
                <div className="w-32 h-32 rounded-full border-4 border-white/20 p-2 relative">
                  <div className="w-full h-full rounded-full bg-white/10 overflow-hidden">
                    <img 
                      src="https://i.ibb.co/pBPLXDtR/Whats-App-Image-2025-01-27-at-12-07-48-AM.jpg" 
                      alt="Rounak Pandey" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-2 border border-dashed border-white/40 rounded-full"
                  />
                </div>
              </div>
              
              <h1 className="text-5xl font-bold leading-tight mb-4 tracking-tight">
                Rounak<br />Pandey
              </h1>
              
              <div className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 cursor-pointer transition-opacity">
                <Mail size={16} />
                <span>7rounakpandey@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="bg-charcoal rounded-[32px] p-6 text-white flex flex-col gap-2 group cursor-pointer hover:bg-charcoal/90 transition-all">
            <p className="text-xs opacity-50 uppercase tracking-widest">Bio</p>
            <p className="text-sm font-medium leading-relaxed">
              Business Analytics student blending data, design, and storytelling to create impactful digital experiences.
            </p>
          </div>
        </motion.div>

        {/* Center Section: Layered Collage (Cinematic Style) */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-6 flex flex-col gap-8"
        >
          <div className="flex flex-col mb-2">
            <h2 className="text-7xl font-bold tracking-tighter leading-[0.9] text-charcoal mb-4">
              Visual Storytelling <br />
              <span className="text-lavender">meets Data Intelligence.</span>
            </h2>
            <p className="text-xl text-charcoal/60 font-medium">
              I turn insights into impactful content.
            </p>
          </div>

          <div className="relative w-full group">
            <CinematicVideoPlayer 
              thumbnailUrl="https://picsum.photos/seed/ipl-dc/1200/800"
              vimeoId="1175982358"
              title="DC Toli Experience"
              subtitle="IPL Content Creation"
              hoverText="Real-time content creation in high-pressure live environments"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-charcoal/5 rounded-[32px] p-8 flex items-center gap-6 group hover:bg-charcoal/10 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Star className="text-charcoal" />
              </div>
              <div>
                <p className="text-2xl font-bold">10+</p>
                <p className="text-xs opacity-50 uppercase tracking-widest">Events Managed</p>
              </div>
            </div>
            
            <div className="bg-yellow rounded-[32px] p-8 flex items-center gap-6 group hover:bg-yellow/90 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Award className="text-charcoal" />
              </div>
              <div>
                <p className="text-2xl font-bold">10+</p>
                <p className="text-xs opacity-70 uppercase tracking-widest">Tools Mastered</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Section: Stats & Secondary Collage */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="lg:col-span-3 flex flex-col gap-6"
        >
          <div className="bg-mint rounded-[32px] p-8 flex flex-col justify-between h-[280px]">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <LayoutGrid size={20} className="text-charcoal" />
              </div>
              <div className="w-8 h-8 border border-charcoal/20 rounded-lg flex items-center justify-center text-charcoal text-[10px]">
                REC
              </div>
            </div>
            <div>
              <p className="text-5xl font-bold mb-1">3</p>
              <p className="text-xs uppercase font-bold tracking-widest opacity-60">Platforms Managed</p>
              <p className="text-[10px] opacity-40 mt-1">YT, IG, LinkedIn</p>
            </div>
          </div>

          <div className="bg-lavender/20 rounded-[32px] p-8 flex flex-col justify-between h-[280px] relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
              <img 
                src="https://picsum.photos/seed/content-creation/400/400" 
                alt="Content Strategy" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-10 h-10 bg-lavender rounded-xl flex items-center justify-center text-white shadow-lg shadow-lavender/30">
                <Video size={20} />
              </div>
              <div className="w-8 h-8 border border-lavender/40 rounded-lg flex items-center justify-center text-lavender text-[10px]">
                4K
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-3xl font-bold mb-1 text-lavender leading-tight">Cinematic Creator</p>
              <p className="text-xs uppercase font-bold tracking-widest text-lavender/60">Content Strategist</p>
            </div>
          </div>

          <div className="bg-charcoal rounded-[32px] p-8 h-[200px] flex items-center justify-center relative overflow-hidden group cursor-pointer">
             <motion.div 
               whileHover={{ scale: 1.2, rotate: 5 }}
               className="text-white text-center"
             >
               <p className="text-sm uppercase tracking-[0.3em] font-light opacity-50 mb-2">Next Project</p>
               <p className="text-2xl font-bold">Let's Connect</p>
             </motion.div>
             <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white">
               <ArrowUpRight size={16} />
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
