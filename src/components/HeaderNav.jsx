import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function HeaderNav({ activeModal, onSelectNav, soundEnabled, toggleSound, onInteractiveEnter, onInteractiveLeave }) {
  const navItems = [
    { key: 'home', label: 'HOME' },
    { key: 'about', label: 'ABOUT' },
    { key: 'work', label: 'WORK / PORTFOLIO' },
    { key: 'contact', label: 'CONTACT' },
  ];

  const currentTab = activeModal || 'home';

  return (
    <header className="fixed top-5 left-0 right-0 z-40 flex items-center justify-center px-4 pointer-events-none">
      <div className="w-full max-w-6xl flex items-center justify-between pointer-events-auto">
        
        {/* Left: Minimal Brand / Status Pill */}
        <div 
          className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-white/90 shadow-lg tracking-wider"
          onMouseEnter={onInteractiveEnter}
          onMouseLeave={onInteractiveLeave}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] uppercase tracking-widest text-white/80 font-mono">Open for Collaborations</span>
        </div>

        {/* Center: Floating Frosted-Glass Navigation Pill Centered At The Very Top */}
        <nav 
          className="mx-auto flex items-center gap-1 p-1.5 rounded-full glass-pill text-xs sm:text-sm font-medium tracking-widest uppercase shadow-2xl transition-all duration-300"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          onMouseEnter={onInteractiveEnter}
          onMouseLeave={onInteractiveLeave}
        >
          {navItems.map(({ key, label }) => {
            const isActive = currentTab === key;
            return (
              <button
                key={key}
                onClick={() => onSelectNav(key)}
                className={`relative px-3.5 sm:px-4 py-2 rounded-full transition-all duration-200 text-xs font-semibold tracking-wider ${
                  isActive
                    ? 'bg-white text-[#770706] shadow-md'
                    : 'text-white/85 hover:text-white hover:bg-white/15 active:scale-95'
                }`}
                onMouseEnter={onInteractiveEnter}
                onMouseLeave={onInteractiveLeave}
              >
                [{label}]
              </button>
            );
          })}
        </nav>

        {/* Right: Sound toggle */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className="flex items-center justify-center w-9 h-9 rounded-full glass-pill text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 shadow-lg"
            onMouseEnter={onInteractiveEnter}
            onMouseLeave={onInteractiveLeave}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-white" />
            ) : (
              <VolumeX className="w-4 h-4 text-white/60" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
