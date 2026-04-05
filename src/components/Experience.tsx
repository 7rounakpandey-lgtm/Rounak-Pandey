import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Award, LayoutGrid, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const jobs = [
  { 
    year: '2023 - 2024', 
    role: 'Live Content Creation in High-Pressure Environments', 
    company: 'DC Toli (Delhi Capitals)', 
    desc: 'Worked on-ground during IPL matches, creating real-time content and managing fan engagement. Collaborated in environments involving top figures like Ricky Ponting and Sourav Ganguly, ensuring seamless execution under pressure. Focused on capturing moments, telling stories, and enhancing audience experience.',
    image: 'https://picsum.photos/seed/dc-toli/400/400'
  },
  { 
    year: '2024 - Present', 
    role: 'Data-Driven Content Strategy & Market Research', 
    company: 'COAE International', 
    desc: 'Developed and managed social media content for professional platforms like LinkedIn. Conducted market research on certification and conformity trends to support business growth. Analyzed campaign performance to refine content strategy and improve engagement.',
    image: 'https://picsum.photos/seed/coae-work/400/400'
  },
  { 
    year: '2022 - 2023', 
    role: 'Creative Work for Social Impact', 
    company: 'Pahal Vikas Samiti', 
    desc: 'Designed and executed promotional materials for social initiatives. Contributed to resource distribution campaigns, combining creativity with purpose-driven work.',
    image: 'https://picsum.photos/seed/pahal/400/400'
  },
];

const achievements = [
  { title: 'Club Head', detail: 'Led the Social Media Team at JBS, managing digital platforms and executing multiple campus events.', icon: Star },
  { title: 'Scholarship Holder', detail: 'Recognized for academic performance.', icon: Award },
  { title: 'Fest Winner', detail: 'Winner of multiple techno-cultural and business fests.', icon: LayoutGrid },
];

export const Experience: React.FC = () => {
  return (
    <section id="work" className="py-24 pl-24 pr-12 bg-white min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xs uppercase tracking-[0.5em] font-bold text-lavender mb-4"
            >
              Professional Journey
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-7xl font-bold tracking-tighter leading-[0.9] text-charcoal"
            >
              Experience <br />
              <span className="text-charcoal/20">& Achievements & Leadership.</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          {jobs.map((job, idx) => (
            <motion.div 
              key={job.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 rounded-[40px] bg-charcoal/5 hover:bg-charcoal hover:text-white transition-all duration-500 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity">
                <img src={job.image} alt={job.company} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-lavender mb-6 relative z-10">{job.year}</p>
              <h3 className="text-3xl font-bold mb-2 leading-tight relative z-10">{job.role}</h3>
              <p className="text-lg font-medium opacity-60 mb-6 relative z-10">{job.company}</p>
              <p className="text-sm leading-relaxed opacity-40 group-hover:opacity-80 transition-opacity relative z-10">{job.desc}</p>
              
              <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 relative z-10">
                <span>View Case Study</span>
                <ArrowUpRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-lavender/5 rounded-[40px] p-10 flex items-center gap-8 group hover:bg-lavender transition-all duration-500 cursor-pointer"
            >
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-lavender/10 group-hover:scale-110 transition-transform">
                <item.icon size={32} className="text-lavender" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-lavender group-hover:text-white/60 mb-1">Achievement</p>
                <h4 className="text-2xl font-bold text-charcoal group-hover:text-white">{item.title}</h4>
                <p className="text-sm font-medium text-charcoal/40 group-hover:text-white/40">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
