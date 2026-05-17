import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function Background() {
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Deep dark background */}
      <div className="fixed inset-0 bg-[#030712] z-0"></div>
      
      {/* Animated Grid with Radial Mask */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] z-0"></div>
      
      {/* Mouse following glow (Flashlight effect - Optimized) */}
      <div 
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 hidden md:block will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(6,182,212,0) 70%)',
          transform: 'translate3d(calc(var(--mouse-x, 0) - 300px), calc(var(--mouse-y, 0) - 300px), 0)',
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Static ambient glows for mobile or base ambiance */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0) 70%)' }}></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(6,182,212,0) 70%)' }}></div>
    </>
  );
}
