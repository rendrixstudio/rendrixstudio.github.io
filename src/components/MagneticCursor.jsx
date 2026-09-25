import React, { useEffect, useRef, useState } from 'react';

export default function MagneticCursor({ isHoveredInteractive }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine cursor (desktop)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    document.body.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Dot follows immediately without lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth trailing aura ring loop (~60fps lerp)
    const render = () => {
      // Ring smoothly trails the cursor (lerp factor 0.18)
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Smooth Trailing Aura Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full transition-all duration-300 ease-out border pointer-events-none ${
          isHoveredInteractive
            ? 'w-16 h-16 border-white/60 bg-white/10 shadow-[0_0_25px_rgba(255,255,255,0.45)]'
            : 'w-9 h-9 border-white/40 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
        }`}
        style={{
          willChange: 'transform',
        }}
      />

      {/* Glowing White Custom Cursor Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-transform duration-150 ${
          isHoveredInteractive
            ? 'w-3 h-3 bg-white shadow-[0_0_12px_#ffffff]'
            : 'w-2 h-2 bg-white shadow-[0_0_8px_#ffffff]'
        }`}
        style={{
          willChange: 'transform',
        }}
      />
    </div>
  );
}
