import React from 'react';
import { motion } from 'motion/react';
import { Terminal, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../../data/constants';
import { SectionHeader } from '../ui/SectionHeader';
import { SpotlightCard } from '../ui/SpotlightCard';
import { HackerText } from '../effects/HackerText';

export function ProjectSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section>
      <SectionHeader icon={<Terminal className="text-cyan-400" />} title="主要项目" />
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {PROJECTS.map((p, i) => {
          const content = (
            <SpotlightCard className="p-6 h-full flex flex-col group relative overflow-hidden">
              {/* Binary Rain Background Effect (Optimized with CSS) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8dGV4dCB4PSIwIiB5PSI4IiBmaWxsPSIjMjJkM2VlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjgiPjE8L3RleHQ+Cjwvc3ZnPg==')] bg-repeat mix-blend-overlay"></div>

              {/* Scanning Line Effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_10px_#22d3ee] -translate-y-full group-hover:animate-scan z-20 pointer-events-none"></div>

              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <ExternalLink className="w-4 h-4 text-cyan-400/50 group-hover:text-cyan-400" />
              </div>
              <div className="text-gray-500 group-hover:text-cyan-400 transition-colors group-hover:scale-110 transform origin-left w-fit duration-300 z-10 relative">
                {p.icon}
              </div>
              <div className="mt-4 flex-grow z-10 relative">
                <h3 className="text-lg font-mono font-medium text-gray-200 group-hover:text-cyan-400 transition-colors leading-snug mb-2">
                  <HackerText text={p.name} />
                </h3>
                {p.desc && (
                  <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors line-clamp-2">
                    {p.desc}
                  </p>
                )}
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-500 ease-out z-10"></div>
            </SpotlightCard>
          );

          return (
            <motion.div key={i} variants={item} className="h-full">
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {content}
                </a>
              ) : (
                <div className="h-full">{content}</div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
