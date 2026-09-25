import React from 'react';
import { ArrowUpRight, MessageSquare, Play, Sparkles } from 'lucide-react';

export default function HeroContent({ onOpenModal, onInteractiveEnter, onInteractiveLeave }) {
  return (
    <div className="absolute bottom-8 sm:bottom-12 md:bottom-14 left-6 sm:left-12 lg:left-16 z-30 pointer-events-auto select-none">
      <div className="flex flex-col items-start gap-1.5">
        
        {/* Role Pill / Tag */}
        <div 
          className="flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[10px] sm:text-[11px] font-mono tracking-wider text-white/90 uppercase mb-1 border border-white/20"
          onMouseEnter={onInteractiveEnter}
          onMouseLeave={onInteractiveLeave}
        >
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Professional Graphic Designer, Video Editor & Motion Graphic Designer</span>
        </div>

        {/* "HI, I'M" in clean, spaced modern sans-serif */}
        <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase">
          <span className="w-6 h-[1.5px] bg-white/40"></span>
          <span>HI, I'M</span>
        </div>

        {/* Name in large, elegant cursive script with subtle soft drop shadow */}
        <h1 
          className="font-cursive text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-normal py-0.5 pr-4"
          style={{
            textShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.45)',
          }}
        >
          Riya
        </h1>

        {/* Exact Sub-description */}
        <p className="mt-1 text-xs sm:text-sm leading-relaxed text-white/90 max-w-[420px] font-normal tracking-wide drop-shadow-md">
          Passionate Graphic Designer and Video Editor specializing in hyper-realistic visuals, 3D conceptual renders, motion graphics, and high-contrast color grading. Turning ideas into striking visual experiences.
        </p>

        {/* Two stylish white pill buttons */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          
          {/* Work / Portfolio (solid white with arrow icon) */}
          <button
            onClick={() => onOpenModal('work')}
            className="group relative flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#770706] font-semibold text-xs sm:text-sm tracking-wide shadow-xl hover:bg-neutral-100 hover:shadow-2xl transition-all duration-200 active:scale-95"
            onMouseEnter={onInteractiveEnter}
            onMouseLeave={onInteractiveLeave}
          >
            <span>Work / Portfolio</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Let's Talk (frosted glass / white border) */}
          <button
            onClick={() => onOpenModal('contact')}
            className="group relative flex items-center gap-2 px-6 py-3 rounded-full glass-pill border border-white/60 text-white font-medium text-xs sm:text-sm tracking-wide shadow-lg hover:bg-white/20 hover:border-white transition-all duration-200 active:scale-95"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            onMouseEnter={onInteractiveEnter}
            onMouseLeave={onInteractiveLeave}
          >
            <MessageSquare className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100" />
            <span>Let's Talk</span>
          </button>

        </div>

      </div>
    </div>
  );
}
