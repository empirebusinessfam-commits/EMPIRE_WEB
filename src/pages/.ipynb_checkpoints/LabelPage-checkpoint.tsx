import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText, TrendingUp, Music, Layers, Radio, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
// 1. Carousel Data Definition
const epkList = [
  {
    name: 'J.1.D.A',
    path: 'https://drive.google.com/file/d/1Jl267xWNJSSx-KjC43SV4p2W0W0DhiCN/view?usp=drive_link',
    bgImage: 'url("./img/j.PNG")',
    borderColor: 'border-red-600/40'
  },
  {
    name: 'CJtheCannon',
    path: 'https://drive.google.com/file/d/1rmIkKkDByN34ug2KAlTk2gEc8qHkLcgW/view?usp=drive_link',
    bgImage: 'url("./img/cj.PNG")',
    borderColor: 'border-amber-600/40'
  },
  {
    name: 'Triip Out',
    path: 'https://drive.google.com/file/d/1_CbL6GJmYT7ajXHOUOL3Qaab5-k_eoxc/view?usp=drive_link',
    bgImage: 'url("./img/trip.PNG")',
    borderColor: 'border-neutral-400/50'
  },
  {
    name: 'EBF',
    path: 'https://drive.google.com/file/d/17J70N6K3QSgkUH4a91FQ_OpQDjsNRLQ9/view?usp=drive_link',
    bgImage: 'url("./img/EBF.JPG")',
    borderColor: 'border-neutral-900/20'
  }
];

const services = [
  {
    id: 'management',
    title: 'Development',
    icon: <Users className="w-6 h-6" />,
    description: 'Keep artists consistent and at the top of their game. EBF brings to you studio time with industry-level audio engineers & a fully secured database. We drive traffic towards your work and book you(the artists) for events that boost your resume and profile.',
    details: ["We bring you into our production workflow", "You get linked up with our audio engineers", "Singles and albums are developed hand in hand with our production team", "We teach artists the mechanics of the industry and distribution thereof."]
  },
  {
    id: 'consulting',
    title: 'Direction',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'An ongoing process where we begin by meeting you where you are. Most artists lack consistent direction. We step in to fill that gap. Generally, we start you off in our unique ecosystem.',
    details: ["We represent the artists through press kit presentation and event bookings such as tours", "Through us and our workflow, arists can actively build their portfolio(s) ", "We operate through an equal partnership between us and the artist", "Digital Roadmaps are given to the artists, establishing a clear outline of deliverables."]
  }
];

export default function LabelPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? epkList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === epkList.length - 1 ? 0 : prev + 1));
  };

  // 2. Redbubble Script Dynamic Injection Hook
  useEffect(() => {
    const existingScript = document.querySelector('script[src*="external_portfolio.js"]');
    
    const initializePortfolio = () => {
      // @ts-ignore
      if (window.RBExternalPortfolio) {
        // @ts-ignore
        new window.RBExternalPortfolio('www.redbubble.com', 'EBF-Market', 5, 2).renderIframe();
      }
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.redbubble.com/assets/external_portfolio.js';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = initializePortfolio;
      document.body.appendChild(script);
    } else {
      initializePortfolio();
    }

    return () => {
      const embedContainer = document.getElementById('rb-embed-script');
      if (embedContainer) embedContainer.innerHTML = '';
    };
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    // Updated background container to bg-white and base text color to text-black
    <div className="min-h-screen bg-white text-black px-6 py-12 selection:bg-red-600/10">
        {/* DATA VIZ COMPONENT  */}
        <style>{`
            .hub{
                margin-bottom: 10px;
            }
            .logo {
                background-image: url("/img/logo.png");
                background-size: contain;     /* Ensures the full logo is visible without clipping */
                background-repeat: no-repeat;
                background-position: left top;
                
                /* Positioning logic */
                position: absolute; 
                top: 5px;                    /* Spacing from the top edge (matches your px-6 padding) */
                right: 5px;                   /* Spacing from the left edge */
                
                /* Responsive sizing */
                width: 120px;                 /* Mobile size */
                height: 40px;
                z-index: 50;                  /* Keeps it layered safely on top of everything else */
            }
            
            /* Upscale the logo slightly for desktop screens */
            @media (min-width: 768px) {
                .logo {
                    width: 160px;
                    height: 50px;
                }
            }
            /* UNIVERSALLY SCALING DATA VIZ */
              .dataViz {
                background-image: url("/img/one_pgr.png"); 
                background-size: contain;       
                background-position: center;
                background-repeat: no-repeat; 
                width: 100%;
                margin-bottom: 25px;
                
                /* Mobile sizing base */
                height: 280px;
                filter: brightness(0.8) contrast(0.8) opacity(0.9);
                border-radius: 2.5%;
              }
            
              @media (min-width: 640px) {
                .dataViz {
                    height: auto;
                    aspect-ratio: 16 / 9; 
                    max-height: 550px;
                    border-radius: 2.5%;
                }
            }
        `}</style>

        {/* LINKTREE STYLE NAVIGATION HUB */}
        <div className="mt-20 max-w-xl mx-auto text-center px-4 hub">
          <div className="flex flex-col gap-3">
            <Link 
              to="/home" 
              className="w-full block py-4 px-6 bg-neutral-950 text-white font-bold tracking-wider uppercase rounded-xl border border-neutral-900 hover:bg-neutral-900 transition-all text-center text-sm shadow-md"
            >
              Empire Hub
            </Link>
          </div>
        </div>
        <div className="relative"> {/* Added 'relative' so the absolute logo positions correctly */}
          <div className="logo"></div>
          <div className="dataViz"></div> {/* Changed from class to className */}
        </div>
      {/* EPK CAROUSEL SECTION */}
      <div className="max-w-5xl mx-auto relative h-[450px] overflow-hidden rounded-2xl border border-neutral-200">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            className="absolute inset-0 w-full h-full bg-cover bg-center flex flex-col justify-end p-8"
            style={{ 
    backgroundImage: epkList[currentIndex].bgImage,
    backgroundSize: 'cover',      // Scales the image to completely fill the container
    backgroundPosition: 'center 20%',  // Centers the image so cropping is balanced on all screens
    backgroundRepeat: 'no-repeat'  // Prevents the image from tiling if it's too small
  }}
          >
            {/* Gradient Overlay tailored for text legibility on white site theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-0" />
            
            <div className="relative z-10 border-l-4 pl-4 backdrop-blur-sm bg-black/20 p-4 rounded-r-lg max-w-xl text-white" style={{ borderColor: epkList[currentIndex].borderColor.split(' ')[0] }}>
              <h2 className="text-4xl font-extrabold tracking-tight uppercase mb-2">{epkList[currentIndex].name}</h2>
              <a 
                href={epkList[currentIndex].path} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-neutral-100 transition-colors text-sm mt-2"
              >
                <FileText className="w-4 h-4" /> View Press Kit
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 border border-neutral-200 text-black hover:bg-neutral-100 z-20 shadow-sm">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 border border-neutral-200 text-black hover:bg-neutral-100 z-20 shadow-sm">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

{/* ABOUT / WHITE PAPER SECTION */}
        <div className="mt-24 max-w-4xl mx-auto px-4 text-center border-t border-neutral-100 pt-16">
          <span className="text-xs font-semibold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            Mission Statement
          </span>
          
          <h2 className="text-4xl font-extrabold text-neutral-900 tracking-tight uppercase mt-6 mb-4">
            Rhythm + Innovation
          </h2>
          
          <p className="text-xl font-medium text-neutral-700 tracking-wide max-w-2xl mx-auto leading-relaxed">
            We live at the intersection of music and technology.
          </p>
          
          <p className="text-neutral-500 text-sm tracking-wider uppercase mt-3">
            Now, we push the boundaries.
          </p>
          
    <div className="mt-8">
        <a 
            href="https://drive.google.com/file/d/1UOfOvxKr-a-hDk6qlCa5nsTulXiQ7ttI/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block text-xs font-bold text-neutral-400 tracking-widest uppercase border-b-2 border-neutral-200 pb-1 hover:border-red-600 transition-colors cursor-pointer"
        >
            Executive Paper
        </a>
    </div>
        </div>

{/* REDBUBBLE MERCHANDISE SECTION */}
<div className="mt-20 max-w-6xl mx-auto px-4">
  <h2 className="text-2xl font-bold mb-6 text-neutral-800 tracking-wider uppercase border-b border-neutral-200 pb-3">
    Official Merch Shop
  </h2>
  
  <div className="bg-neutral-900 rounded-2xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-800">
    <div className="max-w-xl text-center md:text-left">
      <span className="text-xs font-semibold text-red-500 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full">
        EBF Apparel & Collectibles
      </span>
      <h3 className="text-3xl font-bold text-white mt-4 mb-3 tracking-tight">
        Empire Business Family 
      </h3>
      <p className="text-neutral-400 leading-relaxed">
        Explore premium streetwear, exclusive artist merchandise, and high-fidelity prints sourced directly through our official storefront.
      </p>
    </div>
    
    <div className="flex-shrink-0 w-full md:w-auto">
      <a 
        href="https://www.redbubble.com/people/EBF-Market/shop" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block text-center w-full md:w-auto bg-white text-neutral-900 font-bold px-8 py-4 rounded-xl hover:bg-neutral-200 transition-all duration-300 transform hover:-translate-y-0.5 tracking-wider uppercase text-sm shadow-md"
      >
        Shop Collection
      </a>
    </div>
  </div>
</div>

      {/* CAPABILITIES & SERVICES SECTION */}
      <div className="mt-24 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

          {/* PITCH -------------CARDS */}
        {services.map((service) => (
          <div key={service.id} className="p-6 bg-neutral-50 border border-neutral-200 rounded-xl hover:border-neutral-300 transition-colors shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-red-600">
              {service.icon}
              <h3 className="text-xl font-bold tracking-wide uppercase text-neutral-900">{service.title}</h3>
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">{service.description}</p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-neutral-500">
              {service.details.map((detail, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>


    </div>
  );
}