import React from 'react';
import { Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="pt-12 mt-24 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 font-mono text-sm pb-8">
      <div className="flex items-center gap-2">
        <Code2 className="w-4 h-4" />
        <span>Built with React & Tailwind</span>
      </div>
      <div className="flex items-center gap-2">
        <span>© {new Date().getFullYear()} Nirithy. All rights reserved.</span>
      </div>
    </footer>
  );
}
