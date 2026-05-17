import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LOGS = [
  "INITIALIZING KERNEL...",
  "MOUNTING VFS...",
  "LOADING MODULES: [OK]",
  "ESTABLISHING SECURE CONNECTION...",
  "BYPASSING FIREWALL...",
  "DECRYPTING PAYLOAD...",
  "ACCESS GRANTED."
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < LOGS.length) {
        setLines(prev => [...prev, LOGS[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999999] bg-[#030712] flex flex-col justify-center items-start p-8 md:p-24 font-mono text-cyan-500 text-sm md:text-xl overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[length:100%_4px] pointer-events-none"></div>
      {lines.map((line, i) => (
        <motion.div 
          key={i} 
          className="mb-2 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-green-500 font-bold">[SYS]</span>
          <span className={i === LOGS.length - 1 ? "text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" : ""}>
            {line}
          </span>
        </motion.div>
      ))}
      <div className="animate-pulse mt-2 w-3 h-5 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
    </motion.div>
  );
}
