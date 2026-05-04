import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Zap, ChevronLeft, Zap as ZapIcon, Activity, 
  Layers, Music, Settings, ShieldCheck,
  ArrowRight, Code, Smartphone, FileText,
  Waves, Cpu
} from 'lucide-react';

const services = [
  {
    id: 'web-dev',
    title: 'Enterprise Web Development',
    description: 'High-performance digital architectures built for scale and precision. We design and deploy bespoke web experiences that command attention.',
    icon: <Code className="w-6 h-6" />,
    features: ['Next.js Architectures', 'Performance Optimization', 'Executive UI/UX']
  },
  {
    id: 'app-dev',
    title: 'Precision App Development',
    description: 'Native and cross-platform mobile solutions engineered for seamless performance. We turn complex logic into intuitive, powerful interfaces.',
    icon: <Smartphone className="w-6 h-6" />,
    features: ['iOS & Android', 'Real-time Systems', 'Secure Infrastructure']
  },
  {
    id: 'music',
    title: 'Empire Production',
    description: 'Professional music production across all genres. From cinematic scores to industrial techno, we craft the sound of the future.',
    icon: <Music className="w-6 h-6" />,
    features: ['Full Production', 'Vocal Engineering', 'Genre Synthesis']
  },
  {
    id: 'soundscapes',
    title: 'Atmospheric Soundscapes',
    description: 'Immersive audio environments designed for physical and digital spaces. We blend organic field recordings with synthetic textures.',
    icon: <Waves className="w-6 h-6" />,
    features: ['Ambient Design', 'Spatial Audio', 'Texture Layering']
  },
  {
    id: 'proposals',
    title: 'Executive Proposal Writing',
    description: 'High-stakes technical and business documentation. We craft compelling narratives that secure investment and define vision.',
    icon: <FileText className="w-6 h-6" />,
    features: ['Technical Writing', 'Pitch Decks', 'Strategic Narratives']
  },
  {
    id: 'custom',
    title: 'Custom Engineering',
    description: 'Bespoke solutions for unique challenges. If it requires precision, logic, and a modern professional touch, we can build it.',
    icon: <Cpu className="w-6 h-6" />,
    features: ['AI Integration', 'Hardware Sync', 'Legacy Systems']
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-empire-black text-white font-sans selection:bg-crimson selection:text-white overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-crimson/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-crimson/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="p-6 flex items-center justify-between relative z-30 max-w-7xl mx-auto w-full">
        <Link 
          to="/" 
          className="group flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-crimson/30 transition-all"
        >
          <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-crimson transition-colors" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Return to Hub</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-crimson flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.3)]">
            <Zap className="w-5 h-5 text-empire-black fill-current" />
          </div>
          <span className="text-xs font-bold tracking-[0.3em] uppercase hidden sm:block">Empire Business</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-6 py-2 rounded-full bg-white/5 text-crimson text-[9px] font-bold tracking-[0.5em] uppercase mb-8 border border-crimson/20 backdrop-blur-sm">
            Executive Solutions
          </span>
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter leading-none">
            EMPIRE <span className="text-crimson">SERVICES</span>
          </h1>
          <div className="w-24 h-px bg-crimson/30 mx-auto mb-8" />
          <p className="text-gray-500 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed font-medium tracking-wide uppercase">
            Precision engineering for the modern digital age. 
            We provide the sonic architecture required for global reach.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-crimson/30 transition-all overflow-hidden"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-crimson/0 group-hover:bg-crimson/5 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-empire-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-crimson">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-crimson transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                  {service.description}
                </p>

                <div className="space-y-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-crimson/50" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-crimson group/btn">
                  Inquire Now 
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-12 rounded-[40px] bg-gradient-to-br from-white/10 to-transparent border border-white/10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-crimson to-transparent" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to build your <span className="text-crimson">legacy?</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 text-sm font-medium">
            Contact our executive team to discuss custom solutions for your next project. 
            We specialize in high-stakes audio production.
          </p>
          
          <button className="px-10 py-4 bg-crimson text-empire-black font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all shadow-[0_0_30px_rgba(255,0,0,0.2)]">
            Contact Executive Team
          </button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-crimson" />
          <span className="text-xs font-bold tracking-[0.4em] uppercase">Empire Business Family</span>
        </div>
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          Precision Engineering • Infinite Space • 2026
        </p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
        
        :root {
          --font-display: 'Outfit', sans-serif;
        }

        .font-display {
          font-family: var(--font-display);
        }
      `}</style>
    </div>
  );
}
