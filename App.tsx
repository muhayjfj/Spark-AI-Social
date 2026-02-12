
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { ViewType, LiveStream } from './types';
import Discover from './views/Discover';
import Chats from './views/Chats';
import Create from './views/Create';
import Search from './views/Search';
import Profile from './views/Profile';
import Settings from './views/Settings';
import Notifications from './views/Notifications';
import Wallet from './views/Wallet';
import LiveSupport from './views/LiveSupport';
import LiveStreams from './views/LiveStreams';
import WatchLive from './views/WatchLive';
import Calls from './views/Calls';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.DISCOVER);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Global User State
  const [crystals, setCrystals] = useState(12450);

  useEffect(() => {
    // Ultra Luxury Loading Sequence - Optimized for Production
    const timer = setTimeout(() => setIsLoading(false), 3000);
    
    const checkKey = async () => {
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      } else {
        setHasApiKey(true);
      }
    };
    checkKey();
    return () => clearTimeout(timer);
  }, []);

  const handleOpenKeySelection = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const deductCrystals = (amount: number) => {
    if (crystals >= amount) {
      setCrystals(prev => prev - amount);
      return true;
    }
    return false;
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#010101] flex flex-col items-center justify-center p-12 text-center animate-fade-in relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_85%)]"></div>
        <div className="w-48 h-48 relative animate-royal mb-16">
          <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-35 animate-pulse"></div>
          <i className="fa-solid fa-sparkles text-[120px] text-white relative z-10 drop-shadow-[0_0_60px_rgba(255,255,255,0.85)]"></i>
        </div>
        <div className="space-y-10">
          <h1 className="text-6xl font-black tracking-[25px] uppercase luxury-gradient-text ml-[25px]">Spark AI</h1>
          <p className="text-zinc-500 font-black uppercase tracking-[10px] text-[14px] opacity-80">Forging Sovereign Social Reality</p>
          <div className="w-80 h-0.5 bg-zinc-900 rounded-full overflow-hidden mx-auto mt-12">
            <div className="h-full bg-white w-3/4 animate-[shimmer-anim_2.5s_infinite] ease-in-out"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-full bg-[#010101] flex flex-col items-center justify-between p-12 text-center animate-fade-in relative overflow-hidden">
        <div className="mesh-bg"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/star-dust.png')] opacity-40"></div>
        
        <div className="mt-40 relative z-10">
            <div className="w-48 h-48 bg-gradient-to-tr from-blue-700 via-indigo-700 to-purple-900 rounded-[65px] flex items-center justify-center mx-auto mb-24 shadow-[0_70px_200px_rgba(59,130,246,0.7)] animate-prestige border border-white/30">
                <i className="fa-solid fa-sparkles text-[110px] text-white"></i>
            </div>
            <h1 className="text-[100px] font-black mb-12 tracking-tighter bg-gradient-to-b from-white to-zinc-800 bg-clip-text text-transparent leading-none">Spark AI</h1>
            <p className="text-zinc-500 font-black uppercase tracking-[22px] text-[14px] opacity-85 ml-[22px]">Ultimate Digital Sovereignty</p>
        </div>

        <div className="w-full max-w-2xl space-y-9 relative z-10 pb-28 px-10">
            <button 
                onClick={() => setIsAuthenticated(true)}
                className="w-full bg-white text-black py-10 rounded-[55px] font-black text-4xl tap-active shadow-[0_60px_140px_rgba(255,255,255,0.35)] flex items-center justify-center gap-8 shimmer transition-all hover:scale-[1.04]"
            >
                <i className="fa-brands fa-apple text-6xl"></i>
                دخول عبر Apple
            </button>
            <button 
                onClick={() => setIsAuthenticated(true)}
                className="w-full bg-zinc-950/60 border border-white/10 text-white py-10 rounded-[55px] font-black text-4xl hover:bg-zinc-900/80 transition-all flex items-center justify-center gap-8 tap-active backdrop-blur-3xl"
            >
                <i className="fa-brands fa-google text-5xl text-red-500"></i>
                دخول عبر Google
            </button>
            <div className="pt-16">
              <p className="text-[14px] text-zinc-600 font-black leading-relaxed px-20 uppercase tracking-[6px] opacity-75">
                Powered by Spark Neural Mesh 5.0 &copy; 2025
              </p>
            </div>
        </div>
      </div>
    );
  }

  if (!hasApiKey && window.aistudio) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#010101] p-12 text-center animate-fade-in relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),transparent_90%)]"></div>
        <div className="w-44 h-44 glass rounded-[60px] flex items-center justify-center mb-24 shadow-[0_80px_180px_rgba(0,0,0,0.8)] relative animate-royal border border-white/25">
            <i className="fa-solid fa-brain-circuit text-[100px] text-blue-500 drop-shadow-[0_0_40px_rgba(59,130,246,1)]"></i>
            <div className="absolute inset-0 bg-blue-500 blur-[70px] opacity-25"></div>
        </div>
        <h2 className="text-8xl font-black mb-14 tracking-tighter">إيقاظ المحرك السيادي</h2>
        <p className="text-zinc-500 mb-24 text-2xl font-bold leading-relaxed max-w-3xl opacity-95 px-16">يرجى ربط مفتاح API الخاص بك لتفعيل القدرات التوليدية المطلقة ونظام الأرباح الفائقة في Spark AI.</p>
        <button onClick={handleOpenKeySelection} className="bg-white text-black px-32 py-10 rounded-[50px] font-black text-4xl tap-active shadow-[0_50px_130px_rgba(255,255,255,0.45)] shimmer hover:scale-105 transition-all">إطلاق الإمبراطورية الرقمية</button>
        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="mt-24 text-[14px] text-blue-400 font-black uppercase tracking-[10px] border-b-2 border-blue-400/20 pb-4 hover:text-blue-300 transition-colors">Billing Protocol & Sovereign Protocol</a>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case ViewType.CHATS: return <Chats onNavigateToCalls={() => setCurrentView(ViewType.CALLS)} />;
      case ViewType.DISCOVER: return <Discover onNavigateToLive={() => setCurrentView(ViewType.LIVE_STREAMS)} />;
      case ViewType.CREATE: return <Create />;
      case ViewType.SEARCH: return <Search />;
      case ViewType.PROFILE: return <Profile />;
      case ViewType.NOTIFICATIONS: return <Notifications />;
      case ViewType.CALLS: return <Calls onBack={() => setCurrentView(ViewType.CHATS)} />;
      case ViewType.LIVE_STREAMS: return <LiveStreams onSelectStream={(s) => { setSelectedStream(s); setCurrentView(ViewType.WATCH_LIVE); }} onBack={() => setCurrentView(ViewType.DISCOVER)} />;
      case ViewType.WATCH_LIVE: return selectedStream ? <WatchLive stream={selectedStream} onBack={() => setCurrentView(ViewType.LIVE_STREAMS)} crystals={crystals} onDeductCrystals={deductCrystals} /> : <Discover onNavigateToLive={() => setCurrentView(ViewType.LIVE_STREAMS)} />;
      case ViewType.LIVE_SUPPORT: return <LiveSupport onBack={() => setCurrentView(ViewType.SETTINGS)} />;
      case ViewType.WALLET: return <Wallet onBack={() => setCurrentView(ViewType.SETTINGS)} crystals={crystals} />;
      case ViewType.SETTINGS: return <Settings onBack={() => setCurrentView(ViewType.PROFILE)} onNavigate={setCurrentView} crystals={crystals} />;
      default: return <Discover onNavigateToLive={() => setCurrentView(ViewType.LIVE_STREAMS)} />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView} crystals={crystals}>
      <div className="h-full w-full page-transition">
        {renderView()}
      </div>
    </Layout>
  );
};

export default App;
