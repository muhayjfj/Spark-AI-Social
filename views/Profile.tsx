
import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('GRID');

  return (
    <div className="h-full bg-black overflow-y-auto hide-scrollbar pb-32 page-transition relative">
      <div className="mesh-bg"></div>

      {/* Immersive Cover */}
      <div className="h-72 w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/1200/600?random=pro')] bg-cover bg-center opacity-40 scale-105"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black"></div>
          {/* Cover Overlay Badge */}
          <div className="absolute top-14 right-8 glass px-5 py-2.5 rounded-2xl flex items-center gap-3 border-white/10 shadow-2xl">
             <i className="fa-solid fa-crown text-amber-500 text-sm animate-pulse"></i>
             <span className="text-[11px] font-black uppercase tracking-widest text-white/90">Elite Partner</span>
          </div>
      </div>

      <div className="px-10 -mt-28 flex flex-col items-center relative z-10">
        <div className="relative group">
            {/* Avatar with Royal Aura */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500 via-purple-600 to-amber-500 rounded-[60px] blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="w-44 h-44 rounded-[55px] p-2 bg-zinc-950 relative z-10 shadow-2xl overflow-hidden border border-white/10">
                <img 
                    src="https://picsum.photos/400/400?u=premium" 
                    className="w-full h-full rounded-[48px] object-cover group-hover:scale-105 transition-transform duration-1000" 
                    alt="avatar" 
                />
                <div className="absolute bottom-5 right-5 w-6 h-6 bg-green-500 border-4 border-black rounded-full shadow-lg"></div>
            </div>
            
            <button className="absolute -bottom-2 -right-2 bg-white text-black w-14 h-14 rounded-2xl border-4 border-black flex items-center justify-center shadow-2xl tap-active hover:rotate-12 transition-transform">
                <i className="fa-solid fa-aperture text-xl"></i>
            </button>
        </div>
        
        <div className="mt-10 text-center">
            <h2 className="text-4xl font-black tracking-tighter flex items-center justify-center gap-4">
                المبدع الملكي 
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black shadow-xl">
                   <i className="fa-solid fa-check text-[10px] text-white"></i>
                </div>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
               <span className="text-zinc-500 text-xs font-black tracking-[5px] uppercase opacity-70">@royal_spark_25</span>
               <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>
               <span className="text-amber-500 text-[11px] font-black uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">Top 1% Creator</span>
            </div>
        </div>
        
        <p className="mt-8 text-center text-[15px] text-zinc-400 max-w-md leading-relaxed font-medium px-4">
            نصمم المستقبل باستخدام Spark AI • مؤسس استوديو الخيال الرقمي • أحول الأحلام إلى واقع سينمائي مذهل 🎬✨
        </p>

        {/* Global Stats Hub - Ultra Luxury */}
        <div className="grid grid-cols-3 gap-0.5 mt-12 w-full glass rounded-[45px] p-1 border-white/5 shadow-2xl overflow-hidden">
            <div className="flex flex-col items-center py-8 bg-black/20">
                <span className="text-3xl font-black tracking-tighter">١.٢M</span>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[4px] mt-2">المتابعون</span>
            </div>
            <div className="flex flex-col items-center py-8 bg-black/20 border-x border-white/5">
                <span className="text-3xl font-black tracking-tighter">٨٥٠</span>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[4px] mt-2">أتابعهم</span>
            </div>
            <div className="flex flex-col items-center py-8 bg-black/20">
                <span className="text-3xl font-black tracking-tighter">٥.٨M</span>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[4px] mt-2">تفاعل</span>
            </div>
        </div>

        {/* Analytics Sneak Peek */}
        <div className="w-full mt-12 p-8 glass rounded-[40px] border border-blue-500/10 relative overflow-hidden group tap-active">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-black uppercase tracking-[3px] text-zinc-400">أداء النمو الأخير</h4>
                <i className="fa-solid fa-chart-line-up text-blue-500"></i>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-black">+٢٤,٥٠٠</span>
                <span className="text-green-500 text-xs font-black mb-1.5">١٢٪+ هذا الأسبوع</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-3/4 animate-pulse"></div>
            </div>
        </div>

        <div className="flex gap-4 mt-8 w-full">
            <button className="flex-[3] py-6 bg-white text-black rounded-[32px] font-black text-sm shadow-[0_20px_60px_rgba(255,255,255,0.1)] tap-active shimmer transition-transform hover:scale-[1.02]">إدارة المحتوى الملكي</button>
            <button className="flex-1 py-6 glass rounded-[32px] font-black text-sm tap-active border-white/10 hover:bg-white/5 transition-all">
                <i className="fa-solid fa-qrcode text-xl"></i>
            </button>
        </div>
      </div>

      {/* Luxury Content Navigation */}
      <div className="mt-16 flex justify-around border-b border-white/5 px-12">
          {[
              { id: 'GRID', icon: 'fa-table-cells' },
              { id: 'LIKES', icon: 'fa-heart' },
              { id: 'BOOKMARKS', icon: 'fa-bookmark' },
              { id: 'STATS', icon: 'fa-chart-mixed' }
          ].map(tab => (
              <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-7 px-5 transition-all relative ${activeTab === tab.id ? 'text-white' : 'text-zinc-700 hover:text-zinc-500'}`}
              >
                  <i className={`fa-solid ${tab.icon} text-2xl`}></i>
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white rounded-t-full shadow-[0_-5px_20px_rgba(255,255,255,0.5)]"></div>}
              </button>
          ))}
      </div>

      {/* Elite Content Grid */}
      <div className="grid grid-cols-3 gap-1 mt-1 px-1">
          {[...Array(15)].map((_, i) => (
              <div key={i} className="aspect-[9/16] bg-zinc-900 relative group overflow-hidden cursor-pointer shadow-inner">
                <img 
                    src={`https://picsum.photos/400/711?random=${i + 600}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" 
                    alt="post" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all translate-y-3 group-hover:translate-y-0 duration-500">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-black">
                        <i className="fa-solid fa-play text-blue-400"></i>
                        {(Math.random() * 90).toFixed(1)}k
                    </div>
                </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
