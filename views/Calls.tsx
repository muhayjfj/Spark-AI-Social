
import React, { useState } from 'react';

interface CallsProps {
  onBack: () => void;
}

const Calls: React.FC<CallsProps> = ({ onBack }) => {
  const [activeCall, setActiveCall] = useState<any | null>(null);
  
  const mockCalls = [
    { id: '1', name: 'أحمد علي', time: 'اليوم، ١٢:٣٠ م', type: 'VIDEO', incoming: true, missed: false, avatar: 'https://picsum.photos/100/100?u=1' },
    { id: '2', name: 'سارة لايف', time: 'أمس، ٩:١٥ م', type: 'VOICE', incoming: false, missed: false, avatar: 'https://picsum.photos/100/100?u=sara' },
    { id: '3', name: 'ليلى مراد', time: 'منذ يومين', type: 'VIDEO', incoming: true, missed: true, avatar: 'https://picsum.photos/100/100?u=2' },
  ];

  return (
    <div className="h-full bg-black flex flex-col page-transition overflow-hidden">
      <div className="mesh-bg"></div>
      
      {activeCall ? (
        <div className="h-full flex flex-col items-center justify-between p-12 text-center animate-fade-in relative">
          <div className="absolute inset-0 z-0">
             <img src={activeCall.avatar} className="w-full h-full object-cover blur-[100px] opacity-40 scale-150" alt="blur" />
             <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
          </div>
          
          <header className="w-full flex justify-end relative z-10">
            <button className="w-14 h-14 glass rounded-2xl flex items-center justify-center tap-active">
              <i className="fa-solid fa-expand text-xl text-zinc-400"></i>
            </button>
          </header>

          <div className="flex flex-col items-center gap-10 relative z-10">
            <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <img src={activeCall.avatar} className="w-56 h-56 rounded-[60px] object-cover border-4 border-white/20 shadow-2xl relative z-10" alt="avatar" />
            </div>
            <div>
              <h2 className="text-5xl font-black mb-4 tracking-tighter">{activeCall.name}</h2>
              <p className="text-blue-400 text-lg font-black tracking-widest uppercase animate-pulse">مكالمة فيديو مشفرة...</p>
            </div>
          </div>

          <div className="flex gap-10 items-center relative z-10 pb-16">
            <button className="w-20 h-20 glass rounded-[30px] flex items-center justify-center text-zinc-400 tap-active border-white/10 hover:bg-white/5">
                <i className="fa-solid fa-microphone-slash text-2xl"></i>
            </button>
            <button onClick={() => setActiveCall(null)} className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center shadow-[0_30px_100px_rgba(220,38,38,0.5)] tap-active hover:scale-110 active:scale-90 border-4 border-black/20">
                <i className="fa-solid fa-phone-slash text-5xl text-white"></i>
            </button>
            <button className="w-20 h-20 glass rounded-[30px] flex items-center justify-center text-zinc-400 tap-active border-white/10 hover:bg-white/5">
                <i className="fa-solid fa-camera-rotate text-2xl"></i>
            </button>
          </div>
        </div>
      ) : (
        <>
          <header className="p-8 flex items-center justify-between border-b border-white/5 bg-zinc-950/80 backdrop-blur-3xl sticky top-0 z-30">
            <div className="flex items-center gap-6">
                <button onClick={onBack} className="w-14 h-14 flex items-center justify-center rounded-[24px] bg-zinc-900 border border-white/10 text-zinc-400 tap-active">
                    <i className="fa-solid fa-arrow-right text-2xl"></i>
                </button>
                <div>
                    <h2 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-white to-zinc-600 bg-clip-text text-transparent">المكالمات الملكية</h2>
                    <p className="text-[11px] text-zinc-600 font-black uppercase tracking-[6px]">Sovereign Communication</p>
                </div>
            </div>
            <button className="w-14 h-14 glass rounded-[24px] flex items-center justify-center shadow-2xl border-white/10 text-blue-500 tap-active">
                <i className="fa-solid fa-phone-plus text-xl"></i>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-8 hide-scrollbar space-y-8 pb-32">
            <div className="glass p-8 rounded-[45px] border-white/5 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
                <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-[4px] mb-6">المكالمات الحديثة</h4>
                <div className="space-y-6">
                    {mockCalls.map(call => (
                        <div key={call.id} onClick={() => setActiveCall(call)} className="flex items-center justify-between group cursor-pointer tap-active">
                            <div className="flex items-center gap-6">
                                <img src={call.avatar} className="w-16 h-16 rounded-[24px] object-cover border border-white/10 group-hover:border-blue-500 transition-all shadow-xl" alt="avatar" />
                                <div>
                                    <h5 className={`text-xl font-black tracking-tight ${call.missed ? 'text-red-500' : 'text-zinc-200'}`}>{call.name}</h5>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <i className={`fa-solid ${call.incoming ? 'fa-arrow-down-left' : 'fa-arrow-up-right'} text-[10px] ${call.missed ? 'text-red-500' : 'text-zinc-600'}`}></i>
                                        <span className="text-[11px] font-black text-zinc-600 uppercase tracking-widest">{call.time}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`w-14 h-14 glass rounded-2xl flex items-center justify-center text-zinc-600 group-hover:text-blue-500 group-hover:bg-white/5 transition-all`}>
                                <i className={`fa-solid ${call.type === 'VIDEO' ? 'fa-video' : 'fa-phone'} text-xl`}></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-10 bg-gradient-to-br from-blue-600/10 to-transparent rounded-[55px] border border-blue-500/15 text-center shadow-2xl">
                <i className="fa-solid fa-shield-keyhole text-4xl text-blue-500 mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"></i>
                <h4 className="text-2xl font-black mb-4 tracking-tighter">خصوصية تامة</h4>
                <p className="text-zinc-500 text-sm font-bold leading-relaxed px-6">
                    جميع مكالمات Spark AI مشفرة بتقنية Neural Shield لضمان أقصى درجات السيادة الرقمية.
                </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Calls;
