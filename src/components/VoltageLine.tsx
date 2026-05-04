import React, { useEffect, useRef } from 'react';

export default function VoltageLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;
    let frequency = 0.01;
    let targetFrequency = 0.01;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time++;
      
      // Gradually change frequency
      if (time % 120 === 0) {
        targetFrequency = 0.005 + Math.random() * 0.04;
      }
      frequency += (targetFrequency - frequency) * 0.02;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(220, 20, 60, 0.4)'; // Crimson with opacity
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(220, 20, 60, 0.8)';

      const midY = canvas.height / 2;
      
      for (let x = 0; x < canvas.width; x++) {
        // Create a wave that has a baseline but spikes "voltage" pulses
        const baseWave = Math.sin(x * frequency + offset) * 10;
        const pulse = Math.pow(Math.sin(x * (frequency * 0.5) + offset * 1.5), 10) * 100;
        const noise = (Math.random() - 0.5) * 5;
        
        const y = midY + baseWave + pulse + noise;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      offset += 0.05;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  );
}
