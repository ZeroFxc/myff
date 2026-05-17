import React from 'react';
import { Background } from './Background';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { CustomCursor } from '../effects/CustomCursor';
import { HUD } from './HUD';
import { Terminal } from '../effects/Terminal';
import { SystemBreach } from '../effects/SystemBreach';
import { GlobalMatrix } from '../effects/GlobalMatrix';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-50 relative cursor-none">
      <div className="scanlines"></div>
      <GlobalMatrix />
      <Background />
      <HUD />
      <CustomCursor />
      <Navbar />
      <Terminal />
      <SystemBreach />
      
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-8 relative z-10 min-h-screen flex flex-col">
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
