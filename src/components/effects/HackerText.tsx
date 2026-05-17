import React, { useState, useEffect } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>[]{}|";

export function HackerText({ text, className = "", speed = 30 }: { text: string, className?: string, speed?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let animationFrameId: number;
    let lastTime = 0;

    const startAnimation = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;

      if (deltaTime > speed) {
        setDisplayText(() =>
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) return text[index];
              return LETTERS[Math.floor(Math.random() * LETTERS.length)];
            })
            .join("")
        );

        iteration += 1 / 3;
        lastTime = timestamp;
      }

      if (iteration < text.length) {
        animationFrameId = requestAnimationFrame(startAnimation);
      }
    };

    animationFrameId = requestAnimationFrame(startAnimation);
    return () => cancelAnimationFrame(animationFrameId);
  }, [text, isHovering, speed]);

  return (
    <span 
      className={className} 
      onMouseEnter={() => setIsHovering(!isHovering)}
    >
      {displayText}
    </span>
  );
}
