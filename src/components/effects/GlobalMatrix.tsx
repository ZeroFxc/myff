import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function GlobalMatrix() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleToggle = () => setActive(prev => !prev);
    window.addEventListener('toggle-matrix', handleToggle);
    return () => window.removeEventListener('toggle-matrix', handleToggle);
  }, []);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const draw = (time: number) => {
      animationFrameId = requestAnimationFrame(draw);

      const deltaTime = time - lastTime;
      if (deltaTime < interval) return;
      lastTime = time - (deltaTime % interval);

      ctx.fillStyle = 'rgba(3, 7, 18, 0.1)'; // Fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#06b6d4'; // Cyan color
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    animationFrameId = requestAnimationFrame(draw);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.canvas
          ref={canvasRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-0 pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
