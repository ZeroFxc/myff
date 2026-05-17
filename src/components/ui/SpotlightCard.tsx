import React, { useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';

export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const background = useMotionTemplate`radial-gradient(600px circle at ${localX}px ${localY}px, rgba(6,182,212,.15), transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    const currentLocalX = e.clientX - rect.left;
    const currentLocalY = e.clientY - rect.top;
    
    localX.set(currentLocalX);
    localY.set(currentLocalY);

    const width = rect.width;
    const height = rect.height;
    const normX = currentLocalX / width - 0.5;
    const normY = currentLocalY / height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseEnter = () => { setOpacity(1); };
  const handleMouseLeave = () => { 
    setOpacity(0); 
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className={`relative overflow-hidden rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm bg-white/5 border border-white/10 transition-colors hover:bg-white/10 hover:border-cyan-500/30 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background,
        }}
      />
      
      {/* Cyberpunk Accent Corner */}
      <div className="absolute bottom-0 right-0 w-5 h-5 bg-cyan-500/20 border-t border-l border-cyan-500/50 [clip-path:polygon(100%_0,0_100%,100%_100%)]"></div>

      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
