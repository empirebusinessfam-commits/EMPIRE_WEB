import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Users, Monitor, Play,
  Zap, ArrowRight
} from 'lucide-react';

interface LinkItem {
  name: string;
  url: string;
  icon: React.ReactNode;
  description?: string;
  highlight?: boolean;
}

const links: LinkItem[] = [
  { 
    name: 'EBF', 
    url: '/', 
    icon: <Users className="w-5 h-5" />, 
    description: 'Empire Business Family',
    highlight: true 
  },
  { 
    name: 'EMP', 
    url: '/multimedia', 
    icon: <Play className="w-5 h-5" />, 
    description: 'Empire Multimedia Productions' 
  },
];

export default function LinktreePlugin() {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-crimson/10 rounded-full blur-xl" />
          <div className="relative w-24 h-24 rounded-full bg-empire-gray border-2 border-crimson/30 flex items-center justify-center overflow-hidden">
            <Zap className="w-10 h-10 text-crimson fill-current animate-pulse" />
          </div>
        </div>
        <h3 className="text-xl font-display font-bold tracking-tight mb-2 uppercase text-black">Empire Gateway</h3>
      </motion.div>

      {/* Links List */}
      <div className="w-full space-y-4 mb-12">
        {links.map((link, index) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={link.url}
              className={`group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                link.name === 'EMP'
                  ? 'bg-black border-white/20 hover:border-crimson/50 hover:bg-black/90'
                  : (link.highlight 
                      ? 'bg-crimson/5 border-crimson/40 hover:bg-crimson/10 hover:border-crimson' 
                      : 'bg-black/5 border-black/10 hover:bg-black/[0.08] hover:border-black/20')
              }`}
            >
              <div className={`p-3 rounded-xl transition-all ${
                link.name === 'EMP' 
                  ? 'bg-white/10 border border-white/20 text-crimson group-hover:bg-crimson group-hover:border-crimson group-hover:text-white' 
                  : 'bg-white border border-black/5 ' + (link.highlight ? 'text-crimson' : 'text-gray-500 group-hover:text-black')
              }`}>
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold uppercase tracking-wider ${
                    link.name === 'EMP'
                      ? 'text-white group-hover:text-crimson'
                      : (['EBF'].includes(link.name) ? 'text-crimson' : (link.highlight ? 'text-black' : 'text-gray-700 group-hover:text-black'))
                  }`}>
                    {link.name}
                  </span>
                  <ArrowRight className={`w-3 h-3 transition-all transform group-hover:translate-x-1 ${link.name === 'EMP' ? 'text-crimson' : (link.highlight ? 'text-crimson' : 'text-gray-400')}`} />
                </div>
                {link.description && (
                  <p className={`text-[10px] uppercase tracking-tight mt-0.5 ${link.name === 'EMP' ? 'text-gray-500' : 'text-gray-600'}`}>{link.description}</p>
                )}
              </div>
              
              {link.highlight && (
                <div className="absolute -top-px -right-px h-2 w-2">
                  <div className="absolute inset-0 bg-crimson rounded-full animate-ping" />
                  <div className="relative h-full w-full bg-crimson rounded-full" />
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      <p className="text-[9px] text-black/20 font-bold uppercase tracking-[0.4em]">
        Empire Business Family © 2026
      </p>
    </div>
  );
}
