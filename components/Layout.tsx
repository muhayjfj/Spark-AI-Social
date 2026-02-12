
import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  children: React.ReactNode;
  crystals: number;
}

const Layout: React.FC<LayoutProps> = ({ currentView, onViewChange, children, crystals }) => {
  const tabs = [
    { id: ViewType.CHATS, icon: 'fa-comment-dots', label: 'الدردشات' },
    { id: ViewType.DISCOVER, icon: 'fa-compass', label: 'اكتشاف' },
    { id: ViewType.CREATE, icon: 'fa-plus', label: 'إنشاء', isPrimary: true },
    { id: ViewType.SEARCH, icon: 'fa-magnifying-glass', label: 'بحث' },
    { id: ViewType.PROFILE, icon: 'fa-user-vneck', label: 'ملفي' },
  ];

  const hideHeader = [
    ViewType.DISCOVER, 
    ViewType.SETTINGS, 
    ViewType.WALLET, 
    ViewType.NOTIFICATIONS, 
    ViewType.WATCH_LIVE, 
    ViewType.LIVE_SUPPORT,
    ViewType.CALLS
  ].includes(currentView);

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white overflow-hidden relative">
      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* Header */}
      {!hideHeader && (
        <header className="p-6 flex items-center justify-between border-b border-white/5 shrink-0 glass z-40">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-sparkles text-white text-lg"></i>
             </div>
             <h1 className="text-3xl font-black bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tracking-tighter">
               Spark AI
             </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
                onClick={() => onViewChange(ViewType.WALLET)}
                className="flex items-center gap-2.5 px-5 py-2.5 glass border border-white/10 rounded-2xl text-xs font-black shadow-xl tap-active"
            >
              <i className="fa-solid fa-gem text-amber-500 animate-pulse"></i>
              <span className="tracking-tighter uppercase">{crystals.toLocaleString('ar-EG')}</span>
            </button>
            <button 
              onClick={() => onViewChange(ViewType.NOTIFICATIONS)}
              className="w-12 h-12 glass flex items-center justify-center rounded-2xl transition-all relative tap-active hover:bg-white/5"
            >
              <i className="fa-solid fa-bell text-xl text-zinc-400"></i>
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-black"></div>
            </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar relative z-10">
        {children}
      </main>

      {/* Master Bottom Navigation */}
      <nav className="flex items-center justify-around px-4 py-4 pb-10 border-t border-white/5 bg-black/80 backdrop-blur-3xl sticky bottom-0 z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className={`flex flex-col items-center transition-all duration-500 relative tap-active group ${
              tab.isPrimary 
                ? 'bg-gradient-to-tr from-blue-600 via-blue-500 to-purple-600 p-5 -mt-14 rounded-[30px] shadow-[0_25px_60px_rgba(59,130,246,0.4)] border-8 border-black z-50 active:scale-90 shimmer' 
                : currentView === tab.id ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            <div className="relative">
               <i className={`fa-solid ${tab.icon} ${tab.isPrimary ? 'text-3xl text-white' : 'text-2xl'} transition-transform group-hover:scale-110`}></i>
               {currentView === tab.id && !tab.isPrimary && (
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
               )}
            </div>
            {!tab.isPrimary && (
              <span className={`text-[9px] mt-2 font-black uppercase tracking-[3px] transition-all ${currentView === tab.id ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-1'}`}>
                {tab.label}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
