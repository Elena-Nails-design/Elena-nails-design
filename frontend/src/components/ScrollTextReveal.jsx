import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

function Word({ children, progress, range }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const start = range[0];
  const end = range[1];
  
  // Single-layer animations for maximum text sharpness and perfect anti-aliasing
  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  const y = useTransform(progress, [start, end], [6, 0]);
  
  // Dynamic color transition based on theme (light/dark)
  const color = useTransform(
    progress,
    [start, start + (end - start) * 0.5, end],
    [
      isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(18, 18, 18, 0.3)", // Muted start state
      isDark ? "rgba(255, 255, 255, 1)" : "rgba(18, 18, 18, 1)",     // Active state (readable)
      isDark ? "#F1E2A8" : "#B8860B"                                 // Premium gold accent finish
    ]
  );

  return (
    <motion.span 
      style={{ 
        opacity,
        y,
        color,
        display: "inline-block"
      }}
      className="me-2 lg:me-3 mt-1 select-none font-light leading-relaxed"
    >
      {children}
    </motion.span>
  );
}

export default function ScrollTextReveal({ text, className = "" }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"]
  });

  const words = text ? text.split(" ") : [];

  return (
    <p 
      ref={containerRef} 
      className={`flex flex-wrap ${className.includes('justify-') ? '' : 'justify-center'} ${className.includes('items-') ? '' : 'items-center'} ${className.includes('text-') ? '' : 'text-center'} ${className}`}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word 
            key={i} 
            progress={scrollYProgress} 
            range={[start, end]}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}
