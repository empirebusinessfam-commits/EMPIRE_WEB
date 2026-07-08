import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, Music, ChevronLeft, Search, Activity, Globe, Heart, 
  Upload, FileAudio, Trash2, X, Clock, BarChart3, Menu,
  Play, Pause, Volume2, SkipBack, SkipForward,
  Maximize2, Minimize2
} from 'lucide-react';
import { usePlayer, Track } from '../context/PlayerContext';
import AudioVisualizerPlugin, { AudioVisualizerPluginHandle } from './AudioVisualizerPlugin';

const LOCAL_TRACKS: Track[] = [
  {
    id: 'track1',
    title: "In My Eyes",
    artist: "CjtheCannon X J.1.DA X Q Garçons",
    url: "/music/CjtheCannon X J.1.DA X Q Garçons- In My Eyes (Official Music Film).mp3",
    duration: "4:20",
    bpm: 120,
    key: "Am",
    description: "Official Music Film",
    genre: "Hip-Hop",
    releaseDate: "2024"
  },
  {
    id: 'track2',
    title: "STAY ON 50VILLAINS",
    artist: "CjtheCannon X TriipOut",
    url: "/music/CjtheCannon X TriipOut - STAY ON 50VILLAINS.mp3",
    duration: "3:45",
    bpm: 128,
    key: "Gm",
    description: "Raw Energy",
    genre: "Rap",
    releaseDate: "2024"
  },
  {
    id: 'track3',
    title: "Alright",
    artist: "J.1.DA X CjtheCannon X TriipOut",
    url: "/music/J.1.DA X CjtheCannon X TriipOut - Alright (Official Music Video).mp3",
    duration: "3:58",
    bpm: 115,
    key: "C",
    description: "Official Music Video",
    genre: "Hip-Hop",
    releaseDate: "2024"
  },
  {
    id: 'track4',
    title: "Fuck With Us",
    artist: "TriipOut X CjtheCannon",
    url: "/music/TriipOut X CjtheCannon- Fuck With Us (Official Music Video).mp3",
    duration: "4:05",
    bpm: 130,
    key: "Dm",
    description: "Official Music Video",
    genre: "Rap",
    releaseDate: "2024"
  },
  {
    id: 'track5',
    title: "Woodboyz Freestyle",
    artist: "CjtheCannon x TriipOut",
    url: "/music/Woodboyz Freestyle - CjtheCannon x TriipOut.mp3",
    duration: "2:50",
    bpm: 140,
    key: "Em",
    description: "Freestyle session",
    genre: "Rap",
    releaseDate: "2024"
  }
];

export default function LLMSidebar() {
  const { 
    currentStreamUrl, currentStationName,
    isPlaying, handlePlayToggle, volume, setVolume, visualizerMode, setVisualizerMode,
    handleTrackSelect
  } = usePlayer();
  React.useEffect(() => {
    if (!currentStreamUrl && LOCAL_TRACKS.length > 0) {
      handleTrackSelect(LOCAL_TRACKS[0]);
    }
  }, [currentStreamUrl, handleTrackSelect]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(LOCAL_TRACKS);
  const [isExpanded, setIsExpanded] = useState(false);
  const visualizerRef = useRef<AudioVisualizerPluginHandle>(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const searchLibrary = (query: string) => {
    if (!query) {
      setFilteredTracks(LOCAL_TRACKS);
      return;
    }
    const filtered = LOCAL_TRACKS.filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) || 
      track.artist.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTracks(filtered);
  };

  return (
    <>
      {/* Mobile Toggle Trigger */}
      <div className="fixed top-8 left-8 z-40 lg:hidden">
        <button 
          onClick={toggleSidebar}
          className="p-5 bg-empire-gray border border-crimson/20 rounded-full text-crimson hover:bg-crimson/10 transition-all shadow-lg"
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>

      {/* Desktop Toggle Reveal */}
      <div className="fixed top-1/2 left-0 -translate-y-1/2 z-40 hidden lg:block">
        {!isOpen && (
          <button 
            onClick={toggleSidebar}
            className="p-5 bg-empire-gray border border-crimson/20 rounded-r-2xl text-crimson hover:bg-crimson/10 transition-all flex items-center gap-2 group rotate-180 [writing-mode:vertical-lr]"
          >
            <span className="text-xs font-bold uppercase tracking-widest py-3">EAI-Playr</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
            />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`fixed left-0 top-0 h-full bg-empire-gray border-r border-crimson/20 z-50 flex flex-col shadow-2xl transition-all duration-500 ease-in-out text-white overflow-hidden ${isExpanded ? 'w-[90vw] lg:w-[85vw]' : 'w-80'}`}
              >
                {/* Background Visualizer - Positioned relative to the entire tab */}
                <div className={`absolute bottom-0 left-0 w-full pointer-events-none opacity-20 z-0 transition-all duration-700 ${isExpanded ? 'h-[500px]' : 'h-[250px]'}`}>
                  <AudioVisualizerPlugin 
                    ref={visualizerRef}
                    mode={visualizerMode}
                    variant="compact"
                  />
                  {/* Gradient mask for smooth blending */}
                  <div className="absolute inset-0 bg-gradient-to-t from-empire-gray via-transparent to-black/40 opacity-80" />
                </div>

                <div className="relative z-10 flex flex-col h-full p-6 overflow-y-auto custom-scrollbar">
                  <div className="flex items-center justify-between mb-8 shrink-0">
                    <div className="flex items-center gap-3">
                      <Zap className="text-crimson w-6 h-6" />
                      <span className="font-display text-xl font-bold tracking-tighter text-crimson">EAI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsExpanded(!isExpanded)} 
                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-crimson hidden lg:block"
                        title={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                      </button>
                      <button onClick={toggleSidebar} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 mb-4">
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="text"
                          placeholder="Search Music Library..."
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            searchLibrary(e.target.value);
                          }}
                          className="w-full bg-empire-black border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[11px] focus:border-crimson/50 outline-none transition-all text-white font-medium"
                        />
                      </div>

                      <div className={isExpanded ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "space-y-3"}>
                        {filteredTracks.length > 0 ? (
                          filteredTracks.map((track) => (
                            <button 
                              key={track.id}
                              onClick={() => handleTrackSelect(track)}
                              className={`w-full group p-4 rounded-xl border transition-all text-left ${currentStreamUrl === track.url ? 'bg-crimson/10 border-crimson/50' : 'bg-white/5 border-white/5 hover:border-crimson/30 hover:bg-crimson/5'}`}
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-empire-black flex items-center justify-center overflow-hidden border border-white/5">
                                  <Music className={`w-4 h-4 ${currentStreamUrl === track.url ? 'text-crimson' : 'text-gray-600'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-xs truncate group-hover:text-crimson transition-colors">{track.title}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate">
                                      {track.artist}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-crimson">
                                  <Clock className="w-3 h-3" />
                                  {track.duration}
                                </div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center py-10 opacity-50">
                            <Trash2 className="w-8 h-8 text-gray-500 mb-2" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">No Tracks Found</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col shrink-0">
                    {/* Visuals Carousel Section - Moved from top tabs */}
                    <div className="mb-6 pt-6 border-t border-white/5">
                      <div className="flex items-center justify-between mb-4 px-2">
                        <span className="text-[10px] font-bold text-crimson uppercase tracking-[0.2em]">Engine Visuals</span>
                        <div className="flex gap-2 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                          <span>Swipe</span>
                        </div>
                      </div>
                      
                      <div className="relative overflow-hidden group">
                        <motion.div 
                          className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x no-scrollbar"
                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                          {(['harmonic', 'interference', 'pulse', 'linear'] as const).map(m => (
                            <motion.button 
                              key={m}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setVisualizerMode(m)}
                              className={`flex-shrink-0 w-24 px-2 py-4 snap-center text-[9px] font-bold uppercase tracking-widest rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 ${visualizerMode === m ? 'bg-crimson/20 text-white border-crimson' : 'bg-white/5 text-gray-500 border-white/5 hover:border-crimson/30'}`}
                            >
                              <Activity className={`w-4 h-4 ${visualizerMode === m ? 'text-crimson' : 'text-gray-600'}`} />
                              {m}
                            </motion.button>
                          ))}
                        </motion.div>
                      </div>
                    </div>

                    {/* Player Interface */}
                    {currentStreamUrl && (
                      <div className="p-4 bg-empire-black/80 backdrop-blur-md rounded-2xl border border-white/10 mb-6">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center justify-center flex-shrink-0">
                              <Music className={`w-5 h-5 text-crimson ${isPlaying ? 'animate-pulse' : ''}`} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-[11px] font-bold truncate text-white uppercase tracking-wider">
                                {currentStationName || 'Unknown Transmission'}
                              </h4>
                              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] truncate">
                                {currentStreamUrl.startsWith('blob') ? 'Asset' : 'Live'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <button className="text-gray-500 hover:text-white transition-colors">
                                <SkipBack className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={handlePlayToggle}
                                className="w-10 h-10 rounded-full bg-crimson text-empire-black flex items-center justify-center hover:scale-110 transition-transform"
                              >
                                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                              </button>
                              <button className="text-gray-500 hover:text-white transition-colors">
                                <SkipForward className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <Volume2 className="w-3 h-3 text-gray-600" />
                              <div className="w-16 h-1 bg-white/10 rounded-full relative overflow-hidden group">
                                <input 
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.01"
                                  value={volume}
                                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div 
                                  className="h-full bg-crimson" 
                                  style={{ width: `${volume * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-6 border-t border-white/5 pb-6">
                      <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">Empire Business Family © 2026</p>
                    </div>
                  </div>
                </div>
              </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
