import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, Play, Pause 
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import LinktreePlugin from '../components/LinktreePlugin';
import InstagramPlugin from '../components/InstagramPlugin';

export default function EmpireHome() {
  const { isPlaying, handlePlayToggle, currentStationName } = usePlayer();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between relative z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-crimson rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.3)]">
            <Zap className="text-empire-black w-6 h-6" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tighter hidden sm:block">
            EMPIRE
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Header links removed - migrated to linktree */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-crimson/5 rounded-full blur-[160px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter leading-none text-black">
            EMPIRE
          </h2>
          <div className="w-24 h-px bg-crimson/30 mx-auto mb-8" />
          <p className="text-gray-600 max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-medium tracking-wide uppercase">
            {currentStationName ? currentStationName : ''}
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-10 relative z-10">
          <button 
            onClick={handlePlayToggle}
            className="w-24 h-24 rounded-full bg-empire-black border border-white/10 flex items-center justify-center hover:border-crimson/50 transition-all transform hover:scale-105 shadow-[0_0_60px_rgba(0,0,0,0.5)] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-crimson/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            {isPlaying ? (
              <Pause className="w-8 h-8 text-crimson fill-current relative z-10" />
            ) : (
              <Play className="w-8 h-8 text-crimson fill-current ml-1 relative z-10" />
            )}
          </button>
        </div>
      </section>

      {/* Linktree Plugin Section */}
      <footer className="w-full max-w-5xl mx-auto px-6 pb-24 pt-12 relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-crimson/20 mb-12" />
          <InstagramPlugin />
          <LinktreePlugin />
        </div>
      </footer>
    </div>
  );
}
