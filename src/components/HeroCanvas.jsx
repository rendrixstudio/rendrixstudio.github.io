import React, { useEffect, useRef, useState } from 'react';

/**
 * Shortest-path circular angular lerp
 * @param {number} current Current angle in radians
 * @param {number} target Target angle in radians
 * @param {number} factor Lerp smoothing factor (~0.26 for ~35ms tracking)
 * @returns {number} Smoothed angle in radians
 */
function lerpAngle(current, target, factor) {
  let diff = target - current;
  while (diff < -Math.PI) diff += Math.PI * 2;
  while (diff > Math.PI) diff -= Math.PI * 2;
  return current + diff * factor;
}

const TOTAL_FRAMES = 64;
// Face center in normalized 1280x720 video frame (measured via landmark inspection)
const FACE_NORM_X = 0.50;
const FACE_NORM_Y = 0.375;
// Center eye contact deadzone radius (~12% of screen dimension)
const DEADZONE_RATIO = 0.12;
// Fast response factor (~0.26 tracks in ~35ms with zero lag)
const LERP_FACTOR = 0.26;

export default function HeroCanvas({ onLoaded, onLoadProgress, isInteractiveHovered }) {
  const canvasRef = useRef(null);
  const [framesLoaded, setFramesLoaded] = useState(false);
  
  // Mutable animation state in refs to avoid re-renders at 60fps
  const stateRef = useRef({
    images: [],
    centerImage: null,
    // Target cursor position (starts at center of screen)
    cursorX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    cursorY: typeof window !== 'undefined' ? window.innerHeight * 0.375 : 0,
    // Smooth angle (start looking neutral/up)
    currentAngle: -Math.PI / 2,
    targetAngle: -Math.PI / 2,
    inDeadzone: true,
    lastFrameIndex: -1,
    activeFrameType: 'center', // 'center' or 'circular'
    isMouseOver: true,
  });

  // Preload all 64 frames + center frame into memory
  useEffect(() => {
    let loadedCount = 0;
    const totalToLoad = TOTAL_FRAMES + 1;
    const images = new Array(TOTAL_FRAMES);

    const checkAllLoaded = () => {
      loadedCount++;
      const progress = Math.min(100, Math.round((loadedCount / totalToLoad) * 100));
      if (onLoadProgress) onLoadProgress(progress);

      if (loadedCount === totalToLoad) {
        stateRef.current.images = images;
        setFramesLoaded(true);
        if (onLoaded) onLoaded();
      }
    };

    // 1. Load Center Frame
    const centerImg = new Image();
    centerImg.src = '/center.webp';
    centerImg.onload = () => {
      stateRef.current.centerImage = centerImg;
      checkAllLoaded();
    };
    centerImg.onerror = () => {
      console.warn('Failed to load /center.webp, retrying fallback');
      centerImg.src = '/frames/frame_0.webp';
      checkAllLoaded();
    };

    // 2. Load 64 circular trajectory frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${i}.webp`;
      img.onload = () => {
        images[i] = img;
        checkAllLoaded();
      };
      img.onerror = () => {
        // Fallback if needed
        img.src = `/frames/${i}.webp`;
        images[i] = img;
        checkAllLoaded();
      };
    }
  }, [onLoaded, onLoadProgress]);

  // Handle pointer / touch movement
  useEffect(() => {
    const handlePointerMove = (e) => {
      stateRef.current.cursorX = e.clientX;
      stateRef.current.cursorY = e.clientY;
      stateRef.current.isMouseOver = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        stateRef.current.cursorX = e.touches[0].clientX;
        stateRef.current.cursorY = e.touches[0].clientY;
        stateRef.current.isMouseOver = true;
      }
    };

    const handlePointerLeave = () => {
      // Smoothly return gaze to center eye contact when cursor leaves window
      stateRef.current.isMouseOver = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  // 60 FPS RequestAnimationFrame Canvas Renderer
  useEffect(() => {
    if (!framesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // High performance opaque canvas

    let animationFrameId;

    const render = () => {
      const { images, centerImage, cursorX, cursorY, isMouseOver } = stateRef.current;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      // Handle resize and HiDPI crispness
      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        ctx.scale(dpr, dpr);
      }

      // Calculate object-fit: cover placement of 1280x720 video frames
      const imageAspect = 1280 / 720; // 16:9
      const screenAspect = displayWidth / displayHeight;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (screenAspect > imageAspect) {
        // Screen is wider than 16:9
        drawWidth = displayWidth;
        drawHeight = displayWidth / imageAspect;
        offsetX = 0;
        offsetY = (displayHeight - drawHeight) / 2;
      } else {
        // Screen is narrower/taller than 16:9 (e.g. mobile or square)
        drawHeight = displayHeight;
        drawWidth = displayHeight * imageAspect;
        offsetX = (displayWidth - drawWidth) / 2;
        offsetY = 0;
      }

      // Exact pixel coordinates of character's face center on current screen
      const faceX = offsetX + drawWidth * FACE_NORM_X;
      const faceY = offsetY + drawHeight * FACE_NORM_Y;

      // Deadzone calculation (12% of screen min dimension)
      const minDimension = Math.min(displayWidth, displayHeight);
      const deadzoneRadius = minDimension * DEADZONE_RATIO;
      const dx = cursorX - faceX;
      const dy = cursorY - faceY;
      const distance = Math.hypot(dx, dy);

      const inDeadzone = !isMouseOver || distance <= deadzoneRadius;
      stateRef.current.inDeadzone = inDeadzone;

      let imageToDraw = null;

      if (inDeadzone) {
        // CENTER EYE CONTACT: Cursor is near her face
        imageToDraw = centerImage || images[0];
        // Slowly align smooth angle towards top/center while in deadzone
        stateRef.current.currentAngle = lerpAngle(stateRef.current.currentAngle, -Math.PI / 2, 0.05);
      } else {
        // 360° Circular Angle calculation
        const targetAngle = Math.atan2(dy, dx);
        
        // Shortest-path circular angular lerp (factor ~0.26 -> ~35ms tracking)
        const smoothedAngle = lerpAngle(stateRef.current.currentAngle, targetAngle, LERP_FACTOR);
        stateRef.current.currentAngle = smoothedAngle;

        // Map angle to frame index (0..63):
        // atan2 is -PI..PI (0 is RIGHT at 3 o'clock, PI/2 is DOWN, -PI/2 is UP)
        // Adding PI/2 aligns 0 to UP (12 o'clock), matching frame 0 (video #50)
        let normalizedAngle = (smoothedAngle + Math.PI / 2) % (Math.PI * 2);
        if (normalizedAngle < 0) normalizedAngle += Math.PI * 2;

        let frameIdx = Math.round((normalizedAngle / (Math.PI * 2)) * TOTAL_FRAMES) % TOTAL_FRAMES;
        imageToDraw = images[frameIdx] || centerImage;
      }

      // CRITICAL ZERO-GHOSTING RULE:
      // Clear and draw EXACTLY ONE crisp frame at 100% opacity.
      // NO alpha blending between overlapping frames.
      ctx.fillStyle = '#890f0c';
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      if (imageToDraw && imageToDraw.complete) {
        ctx.drawImage(imageToDraw, offsetX, offsetY, drawWidth, drawHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [framesLoaded]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      {/* 
        CRITICAL CONSTRAINT COMPLIANCE:
        NO CSS 3D transforms (NO perspective, NO rotateX, NO rotateY).
        Canvas is 100vw, 100vh, rock-solid motionless.
      */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#890f0c',
        }}
      />
    </div>
  );
}
