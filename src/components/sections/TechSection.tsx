import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';
import { TECH_STACK } from '../../data/constants';
import { SectionHeader } from '../ui/SectionHeader';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1 }
};

export function TechSection() {
  return (
    <section>
      <SectionHeader icon={<Activity className="text-cyan-400" />} title="技术栈 & 领域" />
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px" }}
        className="flex flex-wrap gap-4"
      >
        {TECH_STACK.map((tech, i) => (
          <motion.div 
            key={i} 
            variants={item}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-xl border ${tech.bg} ${tech.border} flex items-center gap-3 cursor-default backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all`}
          >
            <span className={`font-mono font-bold tracking-wide ${tech.color}`}>{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
