import React from 'react';

export default function Logo({ className = "h-12 w-auto", scrolled = false }) {
  return (
    <div className={`flex items-center gap-3 transition-all duration-700 ${className}`}>
      <svg 
        viewBox="0 0 300 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        {/* Modern Minimalist Lotus Icon - Gold */}
        <g stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
          <path d="M40 45C40 32 50 25 50 25C50 25 60 32 60 45C60 55 50 60 50 60C50 60 40 55 40 45Z" />
          <path d="M40 48C32 40 25 35 28 28C31 21 42 28 42 42" />
          <path d="M60 48C68 40 75 35 72 28C69 21 58 28 58 42" />
          <circle cx="50" cy="20" r="1" fill="#D4AF37" />
          <circle cx="25" cy="25" r="0.5" fill="#D4AF37" />
          <circle cx="75" cy="25" r="0.5" fill="#D4AF37" />
        </g>
        
        {/* Brand Text Wrapper */}
        <g className="transition-all duration-700">
          {/* 'ELENA' - Elegant Serif */}
          <text 
            x="95" 
            y="42" 
            fill="currentColor" 
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: '30px',
              fontWeight: '600',
              letterSpacing: '0.05em'
            }}
            className="text-dark dark:text-white transition-colors duration-500"
          >
            ELENA
          </text>
          
          {/* 'EPSHTEIN' - Luxury Spaced Sans */}
          <text 
            x="96" 
            y="58" 
            fill="#D4AF37" 
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.5em'
            }}
          >
            EPSHTEIN
          </text>
        </g>
      </svg>
    </div>
  );
}
