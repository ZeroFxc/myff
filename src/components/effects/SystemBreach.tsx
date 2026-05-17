import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function SystemBreach() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleBreach = () => {
      setActive(true);
      // Add screen shake to body
      document.body.classList.add('screen-shake');
      
      setTimeout(() => {
        setActive(false);
        document.body.classList.remove('screen-shake');
      }, 4000);
    };
    
    window.addEventListener('system-breach', handleBreach);
    return () => window.removeEventListener('system-breach', handleBreach);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[99999] pointer-events-none flex flex-col items-center justify-center bg-red-900/30 mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
          
          <motion.div
            animate={{ opacity: [0, 1, 0, 1, 0.5, 1], scale: [0.9, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 0.4 }}
            className="text-red-500 font-black text-5xl md:text-8xl tracking-tighter border-y-8 border-red-500 py-6 bg-black/80 backdrop-blur-md w-full text-center shadow-[0_0_50px_rgba(255,0,0,0.8)]"
          >
            SYSTEM BREACH
            <div className="text-xl md:text-3xl tracking-widest mt-2 font-mono">UNAUTHORIZED ACCESS DETECTED</div>
          </motion.div>
          
          <div className="absolute top-10 left-10 text-red-500 font-mono text-xl animate-pulse">
            ERR_CODE: 0xDEADBEEF
          </div>
          <div className="absolute bottom-10 right-10 text-red-500 font-mono text-xl animate-pulse">
            INITIATING LOCKDOWN...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
