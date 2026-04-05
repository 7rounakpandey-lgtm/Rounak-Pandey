import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Camera, Palette, Video, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 pl-24 pr-12 bg-charcoal text-white min-h-screen relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        
        {/* Left: Collage Portrait */}
        <div className="relative h-[700px] flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            {/* Background Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-lavender rounded-[100px] rotate-12 opacity-20 blur-3xl" />
            
            {/* Main Portrait - Cinematic Video Background */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="absolute inset-0 rounded-[60px] overflow-hidden border-8 border-white/10 shadow-2xl z-20 bg-black group"
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
                className="w-full h-full brightness-75 transition-transform duration-700"
              >
                <iframe 
                  src="https://player.vimeo.com/video/1180321209?autoplay=1&muted=1&loop=1&background=1&autopause=0"
                  className="w-full h-full object-cover pointer-events-none"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Cinematic Background"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            </motion.div>

            {/* Overlapping UI Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 w-64 h-64 bg-white rounded-[40px] p-8 text-charcoal shadow-2xl z-30 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-lavender/10 rounded-2xl flex items-center justify-center text-lavender">
                  <Camera size={24} />
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-40">Focus</div>
              </div>
              <div>
                <p className="text-2xl font-bold leading-tight">Capturing the unseen.</p>
                <div className="mt-4 w-full h-1 bg-charcoal/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "70%" }}
                    className="h-full bg-lavender"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ x: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-12 -left-12 w-56 h-56 bg-mint rounded-[40px] p-8 text-charcoal shadow-2xl z-30 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-charcoal/10 rounded-2xl flex items-center justify-center">
                  <Palette size={24} />
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-40">Style</div>
              </div>
              <p className="text-xl font-bold leading-tight">Minimalist with a touch of chaos.</p>
            </motion.div>

            {/* Camera UI Elements */}
            <div className="absolute inset-0 pointer-events-none z-40">
              <div className="absolute top-12 left-12 w-16 h-16 border-t-2 border-l-2 border-white/40" />
              <div className="absolute top-12 right-12 w-16 h-16 border-t-2 border-r-2 border-white/40" />
              <div className="absolute bottom-12 left-12 w-16 h-16 border-b-2 border-l-2 border-white/40" />
              <div className="absolute bottom-12 right-12 w-16 h-16 border-b-2 border-r-2 border-white/40" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
                <div className="w-4 h-4 border border-white/20 rounded-full" />
                <div className="w-4 h-4 border border-white/20 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Story */}
        <div className="flex flex-col gap-12">
          <div className="space-y-6">
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xs uppercase tracking-[0.5em] font-bold text-lavender"
            >
              The Hook
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-7xl font-bold tracking-tighter leading-[0.9]"
            >
              Data is everywhere. <br />
              <span className="text-white/20">But most people don’t know what to do with it.</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8 text-xl text-white/60 leading-relaxed"
          >
            <p className="text-2xl font-bold text-white">
              I turn data into decisions. <br />
              And decisions into stories that people remember.
            </p>
            <p>
              I believe the future belongs to those who can combine logic with creativity. 
              My goal is to build experiences that are not only visually engaging but also strategically impactful.
            </p>
          </motion.div>

          {/* Core Blocks: Analyze, Create, Execute */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
            {[
              { title: 'ANALYZE', desc: 'I break down complex data to uncover patterns, insights, and opportunities.', icon: Star },
              { title: 'CREATE', desc: 'I transform ideas into compelling visuals using video, design, and storytelling.', icon: Camera },
              { title: 'EXECUTE', desc: 'I deliver real-world results through strategic content and digital campaigns.', icon: Video },
            ].map((block, idx) => (
              <motion.div 
                key={block.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 p-8 rounded-[40px] hover:bg-lavender transition-all duration-500 group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20">
                  <block.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-widest">{block.title}</h3>
                <p className="text-sm opacity-60 group-hover:opacity-100 transition-opacity">{block.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest font-bold text-lavender">📊 Analytics</h3>
              <div className="space-y-4">
                {['Python', 'SQL', 'Tableau', 'Excel'].map((skill) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill}</span>
                      <span className="opacity-40">Expert</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '90%' }}
                        className="h-full bg-mint"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest font-bold text-lavender">🎬 Creative</h3>
              <div className="space-y-4">
                {['DaVinci Resolve', 'Premiere Pro', 'CapCut', 'Canva'].map((skill) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill}</span>
                      <span className="opacity-40">Pro</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        className="h-full bg-yellow"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
            {[
              { label: 'SEO | SEM', category: '📢 Marketing' },
              { label: 'Social Media Strategy', category: '📢 Marketing' },
              { label: 'Leadership', category: '⚙️ Core Strengths' },
              { label: 'Storytelling', category: '⚙️ Core Strengths' },
            ].map((skill, idx) => (
              <motion.div 
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col gap-2 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-lavender group-hover:text-white transition-all">
                  <Star size={20} />
                </div>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">{skill.category}</p>
                <p className="text-sm font-bold">{skill.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-fit flex items-center gap-4 bg-white text-charcoal px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-lavender hover:text-white transition-all"
          >
            Download CV
            <ArrowDown size={16} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
