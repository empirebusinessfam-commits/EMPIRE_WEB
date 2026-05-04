import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState, useContext } from 'react';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { usePlayer } from '../context/PlayerContext';
import { getSharedContext } from '../lib/audioUtils';

export interface AudioVisualizerPluginHandle {
  getAnalyzer: () => any;
}

interface AudioVisualizerPluginProps {
  mode?: 'harmonic' | 'interference' | 'pulse' | 'linear';
  variant?: 'full' | 'compact';
}

const AudioVisualizerPlugin = forwardRef<AudioVisualizerPluginHandle, AudioVisualizerPluginProps>(
  ({ mode, variant = 'full' }, ref) => {
    const { sourceNodeRef, ensureAudioContext } = usePlayer();
    const containerRef = useRef<HTMLDivElement>(null);
    const analyzerRef = useRef<any>(null);
    const [initError, setInitError] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      getAnalyzer: () => analyzerRef.current,
    }));

    useEffect(() => {
      if (!containerRef.current || !sourceNodeRef.current || analyzerRef.current) return;

      try {
        const ctx = ensureAudioContext();
        if (!ctx) {
          throw new Error('Web Audio API is not supported in this environment');
        }

        const AMConstructor = (AudioMotionAnalyzer as any).default || AudioMotionAnalyzer;
        
        analyzerRef.current = new AMConstructor(containerRef.current, {
          audioContext: ctx,
          source: sourceNodeRef.current,
          mode: 10, 
          barSpace: 0.5,
          ledBars: true,
          showScaleX: false,
          colorMode: 'gradient',
          gradient: 'prism',
          roundBars: true,
          showPeaks: true,
          weightingFilter: 'D',
          connectSpeakers: false, // PlayerContext already connects to destination
        });
      } catch (err) {
        console.error('AudioVisualizer initialization failed:', err);
        setInitError(err instanceof Error ? err.message : 'Visualizer failed to initialize');
      }

      return () => {
        if (analyzerRef.current) {
          try {
            analyzerRef.current.destroy();
          } catch (e) {
            console.warn('Error destroying visualizer:', e);
          }
          analyzerRef.current = null;
        }
      };
    }, [sourceNodeRef.current]);

    // Update analyzer mode based on prop
    useEffect(() => {
      if (analyzerRef.current && typeof analyzerRef.current.setOptions === 'function') {
        try {
          switch (mode) {
            case 'harmonic':
              analyzerRef.current.setOptions({ mode: 1, barSpace: 0.1, ledBars: false });
              break;
            case 'interference':
              analyzerRef.current.setOptions({ mode: 3, barSpace: 0.5, ledBars: true });
              break;
            case 'pulse':
              analyzerRef.current.setOptions({ mode: 10, barSpace: 0.8, ledBars: true });
              break;
            case 'linear':
              analyzerRef.current.setOptions({ mode: 0, barSpace: 0, ledBars: false });
              break;
          }
        } catch (e) {
          console.warn('Failed to update visualizer options:', e);
        }
      }
    }, [mode]);

    return (
      <div className={`relative w-full mx-auto group ${variant === 'full' ? 'max-w-6xl aspect-[21/9]' : 'h-full'}`}>
        {variant === 'full' && (
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-900/20 via-crimson/10 to-orange-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
        )}
        <div className={`relative h-full w-full border-white/5 bg-empire-gray overflow-hidden ${variant === 'full' ? 'rounded-[2rem] border shadow-2xl' : 'rounded-xl border-y'}`}>
          <div ref={containerRef} className="w-full h-full" />
          
          {initError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10 text-center p-4">
              <div className="max-w-xs">
                <p className="text-crimson font-mono text-[10px] uppercase tracking-widest mb-2 font-bold">Hardware Error</p>
                <p className="text-gray-400 text-[9px] font-medium uppercase tracking-wider">{initError}</p>
              </div>
            </div>
          )}

          {/* Metadata Overlay - only show on full */}
          {variant === 'full' && (
            <div className="absolute top-6 left-8 flex items-center gap-4 pointer-events-none">
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-1 h-4 bg-crimson/20 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <span className="text-[10px] font-mono text-white/20 tracking-[0.4em] uppercase">
                Engine Output: <span className="text-crimson/60">{mode} API</span>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

AudioVisualizerPlugin.displayName = 'AudioVisualizerPlugin';

export default AudioVisualizerPlugin;
