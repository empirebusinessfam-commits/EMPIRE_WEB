import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, Globe, TrendingUp, Users, ArrowRight, ShoppingBag, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'distribution',
    title: 'Distribution',
    icon: <Globe className="w-6 h-6" />,
    description: '',
    details: [
      "AI-Optimize",
      "Royalty Profits",
      "Real Time Analytics"
    ]
  },
  {
    id: 'business',
    title: 'Business',
    icon: <Users className="w-6 h-6" />,
    description: '',
    details: [
      "Brand  Design",
      "Touring Infrastructure",
      "Creative Direction ",
      "Asset Protection "
    ]
  },
  {
    id: 'consulting',
    title: 'Consulting',
    icon: <TrendingUp className="w-6 h-6" />,
    description: '',
    details: [
      "Market Strategy",
      "Portfolio Audit",
      "Partnership Alignment",
      "Digital Roadmap"
    ]
  }
];

function ServiceTabs() {
  const [activeTab, setActiveTab] = useState(services[0].id);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 mb-12">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setActiveTab(service.id)}
            className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all border ${
              activeTab === service.id 
                ? 'bg-black text-white border-black shadow-xl scale-105' 
                : 'bg-transparent text-gray-500 border-black/10 hover:border-black/30'
            }`}
          >
            {service.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="p-10 rounded-3xl bg-black text-white border border-white/10">
            <div className="w-16 h-16 rounded-2xl bg-crimson/20 flex items-center justify-center mb-8 border border-crimson/30">
              <div className="text-crimson">
                {services.find(s => s.id === activeTab)?.icon}
              </div>
            </div>
            <h3 className="text-3xl font-display font-bold mb-4 uppercase tracking-tighter">
              {services.find(s => s.id === activeTab)?.title} <span className="text-crimson">Operations</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium uppercase tracking-wide">
              {services.find(s => s.id === activeTab)?.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.find(s => s.id === activeTab)?.details.map(detail => (
                <div key={detail} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="w-1.5 h-1.5 bg-crimson rounded-full" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300">{detail}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block relative p-20">
             <div className="absolute inset-0 bg-crimson/5 rounded-full blur-[100px]" />
             <div className="relative border-2 border-black/5 rounded-[40px] aspect-square flex items-center justify-center p-8">
               <div className="w-full h-full border border-crimson/20 rounded-[20px] shadow-[0_0_50px_rgba(220,20,60,0.1)] flex items-center justify-center">
                 <Zap className="w-32 h-32 text-crimson animate-pulse" />
               </div>
             </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function LabelPage() {
  return (
    <div className="relative min-h-screen px-6 py-12 lg:px-24 bg-white overflow-hidden">
      {/* Intro Overlay Animation */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] pointer-events-none bg-black"
        style={{
          backgroundImage: `url('IMG_4454.JPEG')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Background Image with 25% opacity */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div 
          className="w-full h-full opacity-25 scale-110"
          style={{
            backgroundImage: `url('IMG_4454.JPEG')`, // Fallback skyline
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(0%) contrast(120%) brightness(80%)'
          }}
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-24">
          <div className="flex items-center gap-3">
            <Zap className="text-crimson w-6 h-6" />
            <h1 className="font-display text-2xl font-bold tracking-tighter">
              EMPIRE <span className="text-crimson">EBF</span>
            </h1>
          </div>
          <Link 
            to="/"
            className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
          >
            Return Home
          </Link>
        </header>

        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-crimson/10 text-crimson text-[9px] font-bold tracking-[0.3em] uppercase mb-6 border border-crimson/20">
            Enterprise Division
          </span>
          <h2 className="text-4xl md:text-7xl font-display font-bold mb-8 tracking-tighter leading-none max-w-3xl text-black uppercase">
            EMPIRE <span className="text-crimson">BUSINESS</span> FAMILY
          </h2>
          <p className="text-gray-600 max-w-2xl text-xs md:text-sm leading-relaxed font-medium tracking-wide uppercase">
            <p className="text-2xl md:text-2xl font-display font-bold mb-8 tracking-tighter leading-none max-w-3xl text-black uppercase">Artists get what they need</p>
            <p>Where business becomes art.</p>
            <p>Where artists make moves that count.</p>
          </p>
        </motion.div>

        {/* Services Tab System */}
        <div className="mb-32">
          <ServiceTabs />
        </div>

        {/* Store Explorer Template */}
        <div className="mb-32 p-12 rounded-[40px] bg-black text-white relative overflow-hidden border border-black group">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:rotate-12 transition-transform duration-700">
            <ShoppingBag className="w-64 h-64 text-crimson" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="text-crimson text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">EBF PROVISIONING CENTER</span>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight uppercase">Opening <span className="text-crimson">is TBA.</span></h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed uppercase tracking-wide">
              The EBF Marketplace is currently under construction. Future access will include exclusive hardware, limited edition merchandise, and digital assets.
            </p>
            <button className="px-10 py-4 bg-crimson text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-white hover:text-black transition-all">
              Join Access List
            </button>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="p-12 rounded-[40px] bg-black/[0.02] border border-black/10 relative overflow-hidden mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-display font-bold mb-6 text-black uppercase tracking-tighter">Submit <span className="text-crimson">Inquiry</span></h3>
              <p className="text-gray-500 text-xs uppercase tracking-[0.2em] leading-loose mb-10 max-w-md font-medium">
                Partnership, counsel, or other services.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="FULL NAME" 
                  className="w-full bg-white border border-black/10 p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest focus:border-crimson outline-none transition-colors text-black"
                />
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-white border border-black/10 p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest focus:border-crimson outline-none transition-colors text-black"
                />
              </div>
              <div className="relative">
                <select className="w-full bg-white border border-black/10 p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest focus:border-crimson outline-none transition-colors appearance-none text-black">
                  <option>SELECT AREA</option>
                  <option>DISTRIBUTION PARTNERSHIP</option>
                  <option>TALENT MANAGEMENT</option>
                  <option>CONSULTING</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-crimson rotate-90" />
              </div>
              <textarea 
                placeholder="MESSAGE" 
                rows={5}
                className="w-full bg-white border border-black/10 p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest focus:border-crimson outline-none transition-colors resize-none text-black"
              ></textarea>
              <button className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-xl hover:bg-crimson transition-all shadow-xl font-bold">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
