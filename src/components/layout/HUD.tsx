import React, { useEffect, useRef } from 'react';

export function HUD() {
  const timeRef = useRef<HTMLSpanElement>(null);
  const hex1Ref = useRef<HTMLSpanElement>(null);
  const hex2Ref = useRef<HTMLSpanElement>(null);
  const hex3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    const interval = 100; // Update every 100ms

    const updateHUD = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(updateHUD);

      const deltaTime = timestamp - lastTime;
      if (deltaTime < interval) return;
      lastTime = timestamp - (deltaTime % interval);

      if (timeRef.current) {
        timeRef.current.textContent = new Date().toISOString().split('T')[1].slice(0, -1) + 'Z';
      }
      
      // Generate random hex codes for visual flair
      if (Math.random() > 0.7) {
        const genHex = () => `0x${Math.floor(Math.random() * 65535).toString(16).padStart(4, '0').toUpperCase()}`;
        if (hex1Ref.current) hex1Ref.current.textContent = genHex();
        if (hex2Ref.current) hex2Ref.current.textContent = genHex();
        if (hex3Ref.current) hex3Ref.current.textContent = genHex();
      }
    };

    animationFrameId = requestAnimationFrame(updateHUD);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9980] overflow-hidden hidden md:block">
      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30 opacity-50"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-cyan-500/30 opacity-50"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-cyan-500/30 opacity-50"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 opacity-50"></div>
      
      {/* System Status */}
      <div className="absolute top-6 left-24 text-[10px] font-mono text-cyan-500/50 flex flex-col gap-1">
        <span>SYS.STATUS: <span className="text-green-400">ONLINE</span></span>
        <span>UPLINK: <span className="text-green-400">SECURE</span></span>
        <span>MEM: <span ref={hex1Ref}>0x0000</span></span>
      </div>

      {/* Time & Hex */}
      <div className="absolute bottom-6 right-24 text-[10px] font-mono text-cyan-500/50 flex flex-col items-end gap-1">
        <span>T-MINUS: <span ref={timeRef}>00:00:00.000Z</span></span>
        <span>SEQ: <span ref={hex2Ref}>0x0000</span></span>
        <span>POS: <span ref={hex3Ref}>0x0000</span></span>
      </div>
      
      {/* REC Indicator */}
      <div className="absolute top-6 right-24 text-[10px] font-mono text-red-500/80 flex items-center gap-2 animate-pulse">
        <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
        LIVE
      </div>
      
      {/* Center Reticle (very subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-cyan-500/10 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-cyan-500/20 rounded-full"></div>
      </div>
    </div>
  );
}
