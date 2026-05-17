import React from 'react';
import { motion } from 'motion/react';
import { Github, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/constants';
import { Typewriter } from '../ui/Typewriter';
import { HackerText } from '../effects/HackerText';

export function HeroSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="space-y-8 relative"
    >
      <div className="flex flex-col md:flex-row gap-8 md:items-center">
        <motion.div 
          className="relative group cursor-pointer will-change-transform"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-blue-500 rounded-2xl blur opacity-40 group-hover:opacity-80 transition duration-500 group-hover:duration-200 animate-pulse"></div>
          <img 
            src={PERSONAL_INFO.avatar} 
            alt={`${PERSONAL_INFO.name} Avatar`} 
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl border border-white/20 object-cover shadow-2xl avatar-glitch"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-mono backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Terminal className="w-4 h-4" />
            <Typewriter text='System.out.println("Hello World");' delay={80} />
          </div>
          <h1 
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight drop-shadow-lg glitch-text"
            data-text={PERSONAL_INFO.name}
          >
            {PERSONAL_INFO.name}
          </h1>
        </div>
      </div>
      <p className="text-xl md:text-2xl text-gray-400 font-mono max-w-2xl leading-relaxed pt-2 border-l-4 border-cyan-500 pl-4 bg-gradient-to-r from-cyan-500/10 to-transparent py-2">
        <HackerText text={PERSONAL_INFO.role} speed={40} /> <br/>
        <span className="text-cyan-400 font-bold">
          <HackerText text={PERSONAL_INFO.highlight} speed={50} />
        </span>
      </p>
      <div className="flex flex-wrap gap-3 font-mono text-sm pt-4">
        {PERSONAL_INFO.tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.5 }}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-300 transition-all cursor-default backdrop-blur-sm shadow-lg hover:shadow-cyan-500/20"
          >
            {tag}
          </motion.span>
        ))}
        <motion.a 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: PERSONAL_INFO.tags.length * 0.1 + 0.5 }}
          href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" 
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
        >
          <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          {PERSONAL_INFO.repoCount} Repositories
        </motion.a>
      </div>
    </motion.section>
  );
}
