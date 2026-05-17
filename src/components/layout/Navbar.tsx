import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FolderGit2, Mail } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/40 border border-cyan-500/20 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-8 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
      <NavLink 
        to="/" 
        className={({isActive}) => `flex items-center gap-2 text-sm font-mono transition-all duration-300 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-gray-400 hover:text-cyan-200'}`}
      >
        <Home className="w-4 h-4" /> 首页
      </NavLink>
      <NavLink 
        to="/projects" 
        className={({isActive}) => `flex items-center gap-2 text-sm font-mono transition-all duration-300 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-gray-400 hover:text-cyan-200'}`}
      >
        <FolderGit2 className="w-4 h-4" /> 项目
      </NavLink>
      <NavLink 
        to="/contact" 
        className={({isActive}) => `flex items-center gap-2 text-sm font-mono transition-all duration-300 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-gray-400 hover:text-cyan-200'}`}
      >
        <Mail className="w-4 h-4" /> 联系
      </NavLink>
    </nav>
  );
}
