import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../../data/constants';

interface Command {
  cmd: string;
  output: React.ReactNode;
}

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([
    { cmd: '', output: 'Nirithy OS v1.0.0. Type "help" for available commands.' }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput('');

    if (!cmd) return;

    if (cmd.startsWith('lxclua')) {
      // Lazy load the WASM script
      const runWasm = async () => {
        try {
          if (!(window as any).LuaModule) {
            const script = document.createElement('script');
            script.src = '/assets/lxclua.js';
            document.body.appendChild(script);
            await new Promise((resolve) => {
              script.onload = resolve;
            });
          }

          let wasmOutput = '';
          const Module = await (window as any).LuaModule({
            print: (text: string) => { wasmOutput += text + '\n'; },
            printErr: (text: string) => { wasmOutput += text + '\n'; },
          });

          // Parse arguments
          const parts = cmd.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
          const args = parts.map(arg => {
            if (arg.startsWith('"') && arg.endsWith('"')) {
              return arg.slice(1, -1);
            }
            return arg;
          });

          Module.callMain(args.slice(1));

          if (!wasmOutput.trim()) {
            wasmOutput = 'Command executed successfully.';
          }
          setHistory(prev => [...prev, { cmd, output: <pre className="text-gray-300 font-mono whitespace-pre-wrap">{wasmOutput}</pre> }]);
        } catch (error: any) {
          setHistory(prev => [...prev, { cmd, output: <span className="text-red-400">Failed to execute lxclua: {error.message}</span> }]);
        }
      };

      runWasm();
      return;
    }

    let output: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="text-gray-300">
            Available commands:<br/>
            <span className="text-cyan-400">whoami</span>   - Display user info<br/>
            <span className="text-cyan-400">projects</span> - List all projects<br/>
            <span className="text-cyan-400">neofetch</span> - Display system info<br/>
            <span className="text-cyan-400">matrix</span>   - Toggle global matrix rain<br/>
            <span className="text-cyan-400">clear</span>    - Clear terminal<br/>
            <span className="text-cyan-400">lxclua</span>   - Access LXCLUA-MORECORE<br/>
            <span className="text-cyan-400">sudo</span>     - Execute with root privileges<br/>
            <span className="text-cyan-400">hack</span>     - ???
          </div>
        );
        break;
      case 'whoami':
        output = `${PERSONAL_INFO.name} - ${PERSONAL_INFO.role}. ${PERSONAL_INFO.highlight}`;
        break;
      case 'projects':
        output = (
          <div className="flex flex-col gap-1">
            {PROJECTS.map(p => (
              <span key={p.name}>- <a href={p.href} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{p.name}</a>: {p.desc}</span>
            ))}
          </div>
        );
        break;
      case 'neofetch':
        output = (
          <div className="flex gap-4 items-center">
            <pre className="text-cyan-500 font-bold text-xs leading-tight">
{`   _  ___     _ __  __     
  / |/ (_)___(_) /_/ /_  __
 /    / / ___/ / __/ __ \\/ /
/ /| / / /  / / /_/ / / / / 
/_/ |_/_/_/ /_/\\__/_/ /_/_/  
`}
            </pre>
            <div className="flex flex-col text-gray-300">
              <span className="text-cyan-400 font-bold">root@nirithy</span>
              <span>------------</span>
              <span><span className="text-cyan-400">OS:</span> NirithyOS v1.0</span>
              <span><span className="text-cyan-400">Kernel:</span> 5.15.0-cyber</span>
              <span><span className="text-cyan-400">Uptime:</span> 999 days</span>
              <span><span className="text-cyan-400">Shell:</span> zsh</span>
              <span><span className="text-cyan-400">Theme:</span> Cyberpunk Dark</span>
            </div>
          </div>
        );
        break;
      case 'matrix':
        window.dispatchEvent(new CustomEvent('toggle-matrix'));
        output = <span className="text-green-400">Matrix protocol toggled.</span>;
        break;
      case 'hack':
        window.dispatchEvent(new CustomEvent('system-breach'));
        output = <span className="text-red-500 font-bold">EXECUTING PAYLOAD... BREACH SUCCESSFUL.</span>;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'sudo':
        output = <span className="text-red-400">Permission denied. This incident will be reported.</span>;
        break;
      case 'date':
        output = new Date().toString();
        break;
      default:
        output = <span className="text-red-400">Command not found: {cmd}</span>;
    }

    setHistory(prev => [...prev, { cmd, output }]);
  };

  return (
    <>
      {/* Floating Action Button to open terminal */}
      <motion.button
        className="fixed bottom-6 right-6 z-[9995] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 p-3 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-500/20 hover:scale-110 transition-all"
        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.3 }}
      >
        <TerminalIcon className="w-6 h-6" />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: isMinimized ? 'calc(50vh - 20px)' : 0,
              x: isMinimized ? 'calc(50vw - 150px)' : 0,
              width: isMinimized ? '300px' : '600px',
              height: isMinimized ? '40px' : '400px'
            }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9996] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxWidth: '90vw' }}
          >
            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex items-center justify-between cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <TerminalIcon className="w-4 h-4 text-cyan-400" />
                root@nirithy:~
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="text-gray-400 hover:text-white transition-colors">
                  {isMinimized ? <Square className="w-3 h-3" /> : <Minus className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            {!isMinimized && (
              <div className="flex-grow p-4 overflow-y-auto font-mono text-sm text-gray-300 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
                {history.map((h, i) => (
                  <div key={i}>
                    {h.cmd && (
                      <div className="flex gap-2">
                        <span className="text-green-400">root@nirithy:~$</span>
                        <span className="text-white">{h.cmd}</span>
                      </div>
                    )}
                    <div className="mt-1 text-gray-400">{h.output}</div>
                  </div>
                ))}
                
                <form onSubmit={handleCommand} className="flex gap-2 mt-2">
                  <span className="text-green-400">root@nirithy:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow bg-transparent outline-none text-white caret-cyan-400"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                  />
                </form>
                <div ref={bottomRef} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
