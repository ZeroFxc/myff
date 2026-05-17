import React from 'react';
import { ProjectSection } from '../components/sections/ProjectSection';
import { motion } from 'motion/react';

export function Projects() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-24 will-change-transform"
    >
      <ProjectSection />
    </motion.div>
  );
}
