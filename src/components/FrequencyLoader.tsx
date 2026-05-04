import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function FrequencyLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1500);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let x = 0;
    const points: {x: number, y: number}[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const midY = canvas.height / 2;
      
      // Generate EEG-like spike pattern
      let targetY = midY;
      const spikeChance = Math.random();
      if (spikeChance > 0.95) {
        targetY = midY - (Math.random() * 150 + 50); // Sharp Up
      } else if (spikeChance > 0.90) {
        targetY = midY + (Math.random() * 80 + 20); // Down
      } else {
        targetY = midY + (Math.random() - 0.5) * 10; // Baseline noise
      }

      points.push({ x, y: targetY });
      if (points.length > 100) points.shift();

      ctx.beginPath();
      ctx.strokeStyle = '#DC143C'; // Crimson
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#DC143C';

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        // Offset X relative to the moving head
        const drawX = canvas.width - (points.length - i) * (canvas.width / 50);
        if (i === 0) ctx.moveTo(drawX, p.y);
        else ctx.lineTo(drawX, p.y);
      }
      ctx.stroke();

      x += 5;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-center"
          >
            <h2 className="text-crimson font-display text-4xl font-bold tracking-[0.5em] uppercase mb-4">
              Syncing Frequency
            </h2>
            <div className="w-48 h-0.5 bg-crimson/30 mx-auto overflow-hidden">
              <motion.div 
                className="w-full h-full bg-crimson"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.5, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
