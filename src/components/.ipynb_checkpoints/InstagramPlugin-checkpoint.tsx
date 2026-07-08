import { useEffect } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

export default function InstagramPlugin() {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Process the embed if script is already loaded
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mb-20 px-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg text-white">
            <Instagram className="w-4 h-4" />
          </div>
          <div>
            <a 
              href="https://www.instagram.com/empirebusinessfamily/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[12px] text-black font-bold tracking-[0.1em] uppercase hover:text-crimson transition-colors"
            >
              @empirebusinessfamily
            </a>
          </div>
        </div>
        <a 
          href="https://www.instagram.com/empirebusinessfamily/" 
          target="_blank" 
          rel="noreferrer" 
          className="text-[10px] font-bold uppercase tracking-widest text-crimson hover:opacity-70 transition-opacity flex items-center gap-1"
        >
          Follow <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* The Actual Feed Embed */}
      <div className="flex justify-center">
        <blockquote 
          className="instagram-media" 
          data-instgrm-permalink="https://www.instagram.com/empirebusinessfamily/?utm_source=ig_embed&amp;utm_campaign=loading" 
          data-instgrm-version="14" 
          style={{ background: '#FFF', border: 0, borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', width: 'calc(100% - 2px)' }}
        >
          {/* Instagram will replace this content automatically */}
          <div style={{ padding: '16px' }}>
            <a href="https://www.instagram.com/empirebusinessfamily/" target="_blank" rel="noopener noreferrer" style={{ color: '#c9c8cd', textDecoration: 'none' }}>
              Loading Empire Business Family feed...
            </a>
          </div>
        </blockquote>
      </div>
    </div>
  );
}