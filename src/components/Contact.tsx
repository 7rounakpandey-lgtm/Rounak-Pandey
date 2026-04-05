import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Instagram, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 pl-24 pr-12 bg-charcoal text-white min-h-screen relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        
        {/* Left: Contact Info */}
        <div className="flex flex-col gap-12">
          <div className="space-y-6">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xs uppercase tracking-[0.5em] font-bold text-lavender"
            >
              Get in Touch
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-7xl font-bold tracking-tighter leading-[0.9]"
            >
              Let’s build <br />
              <span className="text-white/20">something impactful together.</span>
            </motion.h2>
            <p className="text-xl text-white/40">Open to internships, collaborations, and creative opportunities.</p>
          </div>

          <div className="space-y-8">
            {[
              { icon: Mail, label: 'Email', value: '7rounakpandey@gmail.com' },
              { icon: Phone, label: 'Phone', value: '6265590867' },
              { icon: MapPin, label: 'Location', value: 'Ghaziabad, UP' },
            ].map((item, idx) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-lavender group-hover:text-white transition-all">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-1">{item.label}</p>
                  <p className="text-xl font-bold">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-8 pt-12 border-t border-white/10">
            {[
              { 
                icon: Instagram, 
                href: 'https://www.instagram.com/rounakpandae?igsh=cmgwMDkxbWI4em45',
                label: 'Instagram'
              },
              { 
                icon: Linkedin, 
                href: 'https://www.linkedin.com/in/rounak-pandey-4ba449291?utm_source=share_via&utm_content=profile&utm_medium=member_android',
                label: 'LinkedIn'
              }
            ].map((social, idx) => (
              <motion.a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.15, filter: 'brightness(1.5)' }}
                transition={{ 
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="text-white/40 hover:text-lavender transition-all duration-300"
              >
                <social.icon size={28} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right: Contact Form */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-white/5 backdrop-blur-xl rounded-[60px] p-12 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-lavender/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">Let's create something impactful together.</h3>
              <p className="text-white/40">Ready to blend data intelligence with cinematic storytelling?</p>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-4">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-lavender transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-4">Email</label>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-lavender transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-4">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell me about your project" 
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-lavender transition-colors resize-none"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-4 bg-lavender text-white px-8 py-6 rounded-3xl font-bold text-sm uppercase tracking-widest hover:bg-lavender/90 transition-all shadow-xl shadow-lavender/20 group"
              >
                Send Message
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </form>
          </div>

          {/* Floating UI Elements */}
          <div className="absolute top-12 right-12 w-12 h-12 border-t-2 border-r-2 border-white/20" />
          <div className="absolute bottom-12 left-12 w-12 h-12 border-b-2 border-l-2 border-white/20" />
        </motion.div>

      </div>
    </section>
  );
};
