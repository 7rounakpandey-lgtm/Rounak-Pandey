import React from 'react';
import { CinematicVideoPlayer } from './CinematicVideoPlayer';
import { motion } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const projects = [
  { id: 1, title: 'IPL Content (DC Toli)', category: 'Content & Cinematography', role: 'Content Creator', tools: 'Premiere Pro, Camera', outcome: 'High engagement during live IPL matches', color: 'bg-lavender', image: 'https://picsum.photos/seed/ipl-dc/800/1000', vimeoId: '1180323293', aspectRatio: 'aspect-[4/5]' },
  { id: 2, title: 'Market Research Project', category: 'Analytics & Research', role: 'Data Analyst', tools: 'Python, SQL', outcome: 'Identified key market growth opportunities', color: 'bg-mint', image: 'https://picsum.photos/seed/market-research/800/600', vimeoId: '1175983966', aspectRatio: 'aspect-video' },
  { id: 3, title: 'COAE Internship Work', category: 'Social Media & Branding', role: 'Social Media Intern', tools: 'Canva, LinkedIn', outcome: 'Increased LinkedIn reach by 40%', color: 'bg-yellow', image: 'https://picsum.photos/seed/coae/800/1200', vimeoId: '1180322647', aspectRatio: 'aspect-[2/3]' },
  { id: 4, title: 'Cinematic Workshop', category: 'Content & Cinematography', role: 'Editor', tools: 'DaVinci Resolve', outcome: 'Professional grade event highlights', color: 'bg-charcoal', image: 'https://picsum.photos/seed/workshop/800/800', vimeoId: '1180324428', aspectRatio: 'aspect-square' },
  { id: 5, title: 'Campaign Analysis', category: 'Analytics & Research', role: 'Strategist', tools: 'Tableau, Excel', outcome: 'Optimized marketing spend by 15%', color: 'bg-lavender', image: 'https://picsum.photos/seed/campaign/800/1000', vimeoId: '1180323059', aspectRatio: 'aspect-[4/5]' },
  { id: 6, title: 'Content Planning Strategy', category: 'Social Media & Branding', role: 'Strategist', tools: 'Notion, SEO', outcome: 'Consistent multi-platform growth', color: 'bg-mint', image: 'https://picsum.photos/seed/strategy/800/700', vimeoId: '1175993166', aspectRatio: 'aspect-[16/14]' },
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 pl-24 pr-12 bg-white min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xs uppercase tracking-[0.5em] font-bold text-lavender mb-4"
            >
              Selected Works
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-7xl font-bold tracking-tighter leading-[0.9] text-charcoal"
            >
              Where Analytics <br />
              <span className="text-charcoal/20">meets Storytelling.</span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/40 hover:text-charcoal hover:border-charcoal transition-all cursor-pointer">
              <Plus size={24} />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-charcoal/40">View All</p>
          </motion.div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid group interactive-card"
            >
              <CinematicVideoPlayer 
                thumbnailUrl={project.image}
                vimeoId={project.vimeoId || "1175982358"} // Fallback for demo
                title={project.title}
                subtitle={project.category}
                hoverText={project.outcome}
                aspectRatio={project.aspectRatio}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
