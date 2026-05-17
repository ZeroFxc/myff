import React from 'react';
import {
  Github, Mail, MessageCircle, MessageSquare, Send, Tv, Terminal, User,
  Code2, Cpu, Layers, Wrench, Smartphone
} from 'lucide-react';

export const PERSONAL_INFO = {
  name: 'Nirithy',
  avatar: 'https://avatars.githubusercontent.com/u/211793895?v=4',
  role: 'Lua 虚拟机 / C / Java / Android',
  highlight: '逆向 & 开发爱好者',
  tags: ['Lua字节码', 'ELF分析', '解编译', '内核编译'],
  github: 'https://github.com/Nirithy',
  repoCount: 80
};

export const PROJECTS = [
  { name: 'LxcLua_magisk', icon: <Layers />, href: 'https://github.com/Nirithy/LxcLua_magisk', desc: 'Magisk module for LxcLua' },
  { name: 'LXCLUA-CORE-CODE', icon: <Code2 />, href: 'https://github.com/Nirithy/LXCLUA-CORE-CODE', desc: 'Core implementation of LXCLUA' },
  { name: 'LXCLUA-MORECORE', icon: <Code2 />, href: 'https://github.com/Nirithy/LXCLUA-MORECORE', desc: 'Extended core features for LXCLUA' },
  { name: 'luajitvm', icon: <Cpu />, href: 'https://github.com/Nirithy/luajitvm', desc: 'LuaJIT Virtual Machine exploration' },
  { name: 'LuaJIT-lua5.5', icon: <Cpu />, href: 'https://github.com/Nirithy/LuaJIT-lua5.5', desc: 'LuaJIT adapted for Lua 5.5' },
  { name: 'YIPGet', icon: <Terminal />, href: 'https://github.com/Nirithy/YIPGet', desc: 'Command-line utility tool' },
  { name: 'ALCC（luadec）', icon: <Wrench />, href: 'https://github.com/Nirithy/ALCC', desc: 'Lua decompiler tool' },
  { name: 'ELF 相关工具', icon: <Wrench />, href: 'https://github.com/Nirithy?tab=repositories&q=elf', desc: 'Tools for ELF binary analysis' },
  { name: 'oppo_oplus_realme_sm8750', icon: <Smartphone />, href: 'https://github.com/Nirithy/oppo_oplus_realme_sm8750', desc: 'Automated kernel build scripts' },
  { name: 'Java / Lua 逆向工具', icon: <Terminal />, href: 'https://github.com/Nirithy', desc: 'Various reverse engineering tools' },
];

export const TECH_STACK = [
  { name: 'C / C++', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  { name: 'Java', color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
  { name: 'Lua / LuaJIT', color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/20' },
  { name: 'Android / Kernel', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
  { name: 'Reverse Engineering', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
  { name: 'React / TS', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
];

export const CONTACTS = [
  { icon: <MessageCircle />, label: 'QQ', value: '1434436108' },
  { icon: <MessageSquare />, label: '微信', value: 'ovo-oxowo' },
  { icon: <Mail />, label: '邮箱', value: 'nirithy@foxmail.com', href: 'mailto:nirithy@foxmail.com' },
  { icon: <Send />, label: 'Telegram', value: '@Nirithy', href: 'https://t.me/Nirithy' },
  { icon: <User />, label: 'XID', value: '@DifierLineOL' },
];

export const PLATFORMS = [
  { icon: <Github />, label: 'GitHub', href: 'https://github.com/Nirithy' },
  { icon: <Tv />, label: 'Bilibili', href: 'https://space.bilibili.com/503153248' },
  { icon: <MessageCircle />, label: 'QQ群', href: 'https://qm.qq.com/cgi-bin/qm/qr?k=BtEXvhXzhY' },
  { icon: <Send />, label: 'Telegram', href: 'https://t.me/Nirithy' },
];
