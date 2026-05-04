import { useEffect } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

export default function InstagramPlugin() {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mb-20 px-6">
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

      <div className="space-y-8">
        <div className="flex justify-center bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/5">
          <blockquote 
            className="instagram-media w-full" 
            data-instgrm-captioned 
            data-instgrm-permalink="https://www.instagram.com/p/DAZ2h_rSC6v/" 
            data-instgrm-version="14"
            style={{ 
              background: '#FFF', 
              border: '0', 
              borderRadius: '3px', 
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
              margin: '1px', 
              maxWidth: '540px', 
              minWidth: '326px', 
              padding: '0', 
              width: '99.375%' 
            }}
          >
            <div style={{ padding: '16px' }}>
              <a 
                href="https://www.instagram.com/empirebusinessfamily/" 
                style={{ background: '#FFFFFF', lineHeight: '0', padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }} 
                target="_blank"
                rel="noreferrer"
              >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                  </div>
                </div>
                <div style={{ padding: '19% 0' }}></div>
                <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                  <Instagram className="w-full h-full text-gray-200" />
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: '550', lineHeight: '18px' }}>
                    <a
                      href="https://www.instagram.com/empirebusinessfamily/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[12px] text-black font-bold tracking-[0.1em] uppercase hover:text-crimson transition-colors"
                    >View this post on Instagram</a>
                  </div>
                </div>
              </a>
            </div>
          </blockquote>
        </div>
      </div>
      
      <div className="mt-12 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
    </div>
  );
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
