import React, { useState, useEffect } from 'react';

export function Typewriter({ text, delay = 50, className = '' }: { text: string, delay?: number, className?: string }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse text-cyan-400 font-black ml-1">_</span>
    </span>
  );
}
