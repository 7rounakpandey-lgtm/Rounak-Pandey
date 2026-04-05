import React from 'react';
import { motion } from 'motion/react';
import { User, Briefcase, LayoutGrid, Mail, Home } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'projects', icon: LayoutGrid, label: 'Projects' },
  { id: 'work', icon: Briefcase, label: 'Work' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

export const Sidebar: React.FC = () => {
  const [active, setActive] = React.useState('home');

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-8 bg-white/80 backdrop-blur-xl border-r border-charcoal/5 z-50"
    >
      <div className="mb-12">
        <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center text-white font-bold text-xl">
          RP
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={cn(
              "group relative p-3 rounded-2xl transition-all duration-300 interactive-card",
              active === item.id ? "bg-lavender text-white shadow-lg shadow-lavender/30" : "text-charcoal/40 hover:text-charcoal hover:bg-charcoal/5"
            )}
          >
            <item.icon size={24} />
            <span className="absolute left-full ml-4 px-3 py-1 bg-charcoal text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="w-8 h-8 rounded-full border-2 border-charcoal/10 flex items-center justify-center text-[10px] font-bold text-charcoal/40">
          2026
        </div>
      </div>
    </motion.aside>
  );
};
