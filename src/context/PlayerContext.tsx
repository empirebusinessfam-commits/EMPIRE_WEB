import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { getSharedContext } from '../lib/audioUtils';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  bpm: number;
  key: string;
  description: string;
  genre: string;
  releaseDate: string;
  coverUrl?: string;
  url?: string;
}

interface PlayerContextType {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  selectedTrack: Track | null;
  setSelectedTrack: (track: Track | null) => void;
  currentStreamUrl: string | null;
  setCurrentStreamUrl: (url: string | null) => void;
  currentStationName: string | null;
  setCurrentStationName: (name: string | null) => void;
  volume: number;
  setVolume: (volume: number) => void;
  visualizerMode: 'harmonic' | 'interference' | 'pulse' | 'linear';
  setVisualizerMode: (mode: 'harmonic' | 'interference' | 'pulse' | 'linear') => void;
  uploadedTracks: Track[];
  setUploadedTracks: React.Dispatch<React.SetStateAction<Track[]>>;
  ensureAudioContext: () => AudioContext | null;
  handlePlayToggle: () => void;
  handleTrackSelect: (track: Track) => void;
  removeTrack: (id: string) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  sourceNodeRef: React.RefObject<MediaElementAudioSourceNode | null>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [currentStreamUrl, setCurrentStreamUrl] = useState<string | null>(null);
  const [currentStationName, setCurrentStationName] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.75);
  const [visualizerMode, setVisualizerMode] = useState<'harmonic' | 'interference' | 'pulse' | 'linear'>('harmonic');
  const [uploadedTracks, setUploadedTracks] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  const ensureAudioContext = () => {
    const ctx = getSharedContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
    }

    const ctx = ensureAudioContext();
    if (ctx && audioRef.current && !sourceNodeRef.current) {
      try {
        sourceNodeRef.current = ctx.createMediaElementSource(audioRef.current);
        sourceNodeRef.current.connect(ctx.destination);
      } catch (e) {
        console.warn('SourceNode connection failed:', e);
      }
    }
  }, []);

  const handlePlayToggle = () => {
    const ctx = ensureAudioContext();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.warn('Playback failed:', e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track: Track) => {
    ensureAudioContext();
    setSelectedTrack(track);
    if (track.url) {
      setCurrentStreamUrl(track.url);
      setCurrentStationName(track.title);
      setIsPlaying(true);
    }
  };

  const removeTrack = (id: string) => {
    setUploadedTracks(prev => {
      const trackToRemove = prev.find(t => t.id === id);
      if (trackToRemove?.url) {
        URL.revokeObjectURL(trackToRemove.url);
      }
      return prev.filter(t => t.id !== id);
    });
    
    if (selectedTrack?.id === id) {
      setSelectedTrack(null);
      setIsPlaying(false);
      setCurrentStreamUrl(null);
      setCurrentStationName(null);
    }
  };

  // Global interaction listener
  useEffect(() => {
    const resume = () => {
      const ctx = getSharedContext();
      if (ctx?.state === 'suspended') {
        ctx.resume();
      }
    };
    window.addEventListener('click', resume);
    window.addEventListener('keydown', resume);
    return () => {
      window.removeEventListener('click', resume);
      window.removeEventListener('keydown', resume);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && currentStreamUrl) {
      audioRef.current.src = currentStreamUrl;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.warn('Stream play failed:', e));
      }
    }
  }, [currentStreamUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <PlayerContext.Provider value={{
      isPlaying, setIsPlaying,
      selectedTrack, setSelectedTrack,
      currentStreamUrl, setCurrentStreamUrl,
      currentStationName, setCurrentStationName,
      volume, setVolume,
      visualizerMode, setVisualizerMode,
      uploadedTracks, setUploadedTracks,
      ensureAudioContext,
      handlePlayToggle,
      handleTrackSelect,
      removeTrack,
      audioRef,
      sourceNodeRef
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
