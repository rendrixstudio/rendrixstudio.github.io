import React, { useState, useCallback } from 'react';
import HeroCanvas from './components/HeroCanvas.jsx';
import HeaderNav from './components/HeaderNav.jsx';
import HeroContent from './components/HeroContent.jsx';
import MagneticCursor from './components/MagneticCursor.jsx';
import Modals from './components/Modals.jsx';
import { playHoverSound, playClickSound } from './utils/audio.js';

export default function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'home' (null), 'about', 'work', 'contact'
  const [isHoveredInteractive, setIsHoveredInteractive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleInteractiveEnter = useCallback(() => {
    setIsHoveredInteractive(true);
    if (soundEnabled) playHoverSound();
  }, [soundEnabled]);

  const handleInteractiveLeave = useCallback(() => {
    setIsHoveredInteractive(false);
  }, []);

  const handleSelectNav = useCallback((navKey) => {
    if (navKey === 'home') {
      setActiveModal(null);
    } else {
      setActiveModal(navKey);
    }
    if (soundEnabled) playClickSound();
  }, [soundEnabled]);

  const handleOpenModal = useCallback((modalKey) => {
    setActiveModal(modalKey);
    if (soundEnabled) playClickSound();
  }, [soundEnabled]);

  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
    if (soundEnabled) playClickSound();
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) playClickSound();
      return next;
    });
  }, []);

  return (
    <main 
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        backgroundColor: '#890f0c',
        backgroundImage: 'radial-gradient(circle at 50% 38%, #b81f18 0%, #890f0c 50%, #700605 100%)',
      }}
    >
      {/* 
        Zero-Ghosting 60 FPS Canvas Renderer 
        - Preloaded image array
        - Shortest-path circular angular lerp (~0.26)
        - 100% crisp single frame opacity
        - Rock-solid motionless body, only head rotates
      */}
      <HeroCanvas
        onLoadProgress={setLoadProgress}
        onLoaded={() => setIsLoaded(true)}
        isInteractiveHovered={isHoveredInteractive}
      />

      {/* Floating Header Navigation Pill Centered At The Top (Home, About, Work, Contact) */}
      <HeaderNav
        activeModal={activeModal}
        onSelectNav={handleSelectNav}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        onInteractiveEnter={handleInteractiveEnter}
        onInteractiveLeave={handleInteractiveLeave}
      />

      {/* Bottom-Left Hero Typography & Action Buttons */}
      <HeroContent
        onOpenModal={handleOpenModal}
        onInteractiveEnter={handleInteractiveEnter}
        onInteractiveLeave={handleInteractiveLeave}
      />

      {/* Interactive Modals ([WORK / PORTFOLIO], [ABOUT], [CONTACT]) */}
      <Modals
        activeModal={activeModal}
        onClose={handleCloseModal}
        onSwitchModal={handleOpenModal}
        onInteractiveEnter={handleInteractiveEnter}
        onInteractiveLeave={handleInteractiveLeave}
      />

      {/* Custom Glowing Magnetic Cursor with Trailing Aura */}
      <MagneticCursor isHoveredInteractive={isHoveredInteractive} />

      {/* Minimalist Luxury Preloader overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#890f0c] text-white">
          <div className="flex flex-col items-center gap-4 max-w-xs text-center px-6">
            <span className="font-cursive text-5xl text-white font-semibold">Riya Srivastava</span>
            <div className="w-48 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-150 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/60">
              Visual Design & Motion • {loadProgress}%
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
