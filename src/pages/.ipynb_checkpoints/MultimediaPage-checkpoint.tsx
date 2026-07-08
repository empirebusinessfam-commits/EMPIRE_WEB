import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Zap, ArrowRight, Play, Music, Youtube, Headphones, 
  ExternalLink, Sparkles, Target, Rocket
} from 'lucide-react';
import VoltageLine from '../components/VoltageLine';
import FrequencyLoader from '../components/FrequencyLoader';

const platforms = [
  { name: 'Spotify', icon: <Music className="w-5 h-5 text-[#1DB954]" />, url: '#', description: 'Global Streaming Network' },
  { name: 'YouTube', icon: <Youtube className="w-5 h-5 text-[#FF0000]" />, url: '#', description: 'Visual Content Hub' },
  { name: 'SoundCloud', icon: <Headphones className="w-5 h-5 text-[#FF3300]" />, url: '#', description: 'Underground Frequency' },
  { name: 'Apple Music', icon: <Music className="w-5 h-5 text-[#FA243C]" />, url: '#', description: 'Premium Distribution' }
];

const journeySteps = [
  {
    title: "Exposure",
    description: "Amplify your narrative through our global multimedia network. We specialize in high-stakes visibility.",
    icon: <Sparkles className="w-8 h-8 text-crimson" />
  },
  {
    title: "Guidance",
    description: "Navigating the Empire ecosystem. We provide the architectural blueprint for your career evolution.",
    icon: <Target className="w-8 h-8 text-crimson" />
  },
  {
    title: "Launch",
    description: "Full-scale deployment of your IP across all distribution nodes. Real-time impact monitoring.",
    icon: <Rocket className="w-8 h-8 text-crimson" />
  }
];

export default function EMPPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-crimson selection:text-white overflow-hidden">
      <FrequencyLoader />
      <VoltageLine />
      {/* Cinematic Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-crimson/20 via-black to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(220,20,60,0.15),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:px-24">
        {/* Header */}
        <header className="flex items-center justify-between mb-24">
          <div className="flex items-center gap-3">
            <Zap className="text-crimson w-6 h-6 animate-pulse" />
            <h1 className="font-display text-2xl font-bold tracking-tighter text-crimson uppercase">
              EMP
            </h1>
          </div>
          <Link 
            to="/"
            className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-crimson transition-colors"
          >
            Return Home
          </Link>
        </header>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-crimson/10 text-crimson text-[9px] font-bold tracking-[0.4em] uppercase mb-8 border border-crimson/20">
            Artist Onboarding Gateway
          </span>
          <h2 className="text-5xl md:text-9xl font-display font-bold mb-8 tracking-tighter leading-[0.8] uppercase">
            Empire <br/>
            <span className="text-crimson">Multimedia</span> <br/>
            Productions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed font-medium tracking-widest uppercase mb-12">
            The foundation for artistic excellence. Where raw frequency meets architectural engineering.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="px-12 py-4 bg-crimson text-white text-[11px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(220,20,60,0.3)]">
              Initiate Onboarding
            </button>
            <button className="px-12 py-4 bg-white/5 border border-white/10 text-white text-[11px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-white/10 transition-all">
              Watch Showcase
            </button>
          </div>
        </motion.div>

        {/* The Journey Section */}
        <div className="mb-40">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-display font-bold tracking-[0.3em] uppercase mb-4">The Journey</h3>
            <div className="w-24 h-1 bg-crimson mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group p-10 rounded-[30px] bg-white/[0.03] border border-white/5 hover:border-crimson/30 transition-all text-center"
              >
                <div className="mb-8 flex justify-center">
                  <div className="p-5 rounded-2xl bg-black border border-white/10 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-4 uppercase tracking-tighter">{step.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-wide font-medium">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Linktree Platforms Section */}
        <div className="mb-40 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-display font-bold tracking-[0.3em] uppercase mb-4">Exposure Platforms</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Connect with the global frequency nodes</p>
          </div>
          
          <div className="space-y-4">
            {platforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-6 p-6 rounded-3xl bg-white/[0.05] border border-white/5 hover:bg-white/[0.08] hover:border-crimson/50 transition-all"
              >
                <div className="p-4 rounded-2xl bg-black border border-white/10 text-white">
                  {platform.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold uppercase tracking-[0.2em]">{platform.name}</h4>
                  <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-1">{platform.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-700 group-hover:text-crimson transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer / Contact */}
        <div className="text-center pb-24">
          <div className="bg-gradient-to-r from-transparent via-crimson/10 to-transparent p-12 rounded-[50px] border border-white/5">
            <h3 className="text-3xl font-display font-bold mb-6 tracking-tight uppercase">Ready to enter the <span className="text-crimson">Ecosystem?</span></h3>
            <p className="text-gray-500 max-w-xl mx-auto text-[10px] font-bold uppercase tracking-[0.3em] mb-10 leading-loose">
              Our scouting division is actively monitoring all high-fidelity signals. Submit your frequency for analysis.
            </p>
            <button className="group flex items-center gap-3 px-12 py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.5em] rounded-full mx-auto hover:bg-crimson hover:text-white transition-all">
              Apply to EMP <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
