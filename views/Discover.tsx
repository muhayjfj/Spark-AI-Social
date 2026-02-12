
import React, { useState } from 'react';
import { ViewType } from '../types';

interface DiscoverProps {
  onNavigateToLive: () => void;
}

const Discover: React.FC<DiscoverProps> = ({ onNavigateToLive }) => {
  const [selectedStory, setSelectedStory] = useState<any | null>(null);

  const mockVideos = [
    {
      id: '1',
      user: '@sara_ai',
      desc: 'تجربة إنشاء محتوى خيالي باستخدام جيميناي الفائق! ✨ #AI #Future #SparkAI #Tech #Vision',
      music: 'ألحان الذكاء السيادي - سارة',
      likes: '1.8M',
      comments: '24.5K',
      shares: '12.8K',
      video: 'https://picsum.photos/1080/1920?random=301'
    },
    {
      id: '2',
      user: '@tech_explorer',
      desc: 'كيف تستخدم الذكاء الاصطناعي لتغيير مستقبلك؟ 🤔 #Tech #Growth #Success #Robotics',
      music: 'رحلة استكشاف الأبعاد - تيك',
      likes: '920K',
      comments: '8.2K',
      shares: '15.4K',
      video: 'https://picsum.photos/1080/1920?random=302'
    }
  ];

  const stories = [
    { id: 's1', user: 'أحمد', avatar: 'https://picsum.photos/100/100?u=10', content: 'https://picsum.photos/1080/1920?random=s1', isLive: true },
    { id: 's2', user: 'ليلى', avatar: 'https://picsum.photos/100/100?u=20', content: 'https://picsum.photos/1080/1920?random=s2' },
    { id: 's3', user: 'يوسف', avatar: 'https://picsum.photos/100/100?u=30', content: 'https://picsum.photos/1080/1920?random=s3' },
    { id: 's4', user: 'نور', avatar: 'https://picsum.photos/100/100?u=40', content: 'https://picsum.photos/1080/1920?random=s4' },
    { id: 's5', user: 'سامي', avatar: 'https://picsum.photos/100/100?u=50', content: 'https://picsum.photos/1080/1920?random=s5' },
  ];

  return (
    <div className="h-full w-full snap-y snap-mandatory overflow-y-scroll hide-scrollbar bg-black relative">
      {/* Ultra Luxury Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 p-12 pt-20 flex flex-col gap-12 pointer-events-none">
          <div className="flex justify-between items-center pointer-events-auto">
             <button onClick={onNavigateToLive} className="glass px-10 py-4 rounded-[32px] flex items-center gap-4 group hover:bg-white transition-all tap-active shadow-2xl border-white/15">
                <div className="w-3.5 h-3.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_25px_#dc2626]"></div>
                <span className="text-[13px] font-black uppercase tracking-[7px] text-white group-hover:text-black">LIVE</span>
             </button>
             <div className="flex gap-14 relative">
                <button className="text-[14px] font-black uppercase tracking-[7px] text-white drop-shadow-2xl relative group">
                  لك
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-white rounded-full shadow-[0_0_20px_white] transition-all group-hover:w-14"></div>
                </button>
                <button className="text-[14px] font-black uppercase tracking-[7px] text-white/40 hover:text-white/80 transition-colors">أتابعهم</button>
             </div>
             <button className="w-18 h-18 glass rounded-[32px] flex items-center justify-center text-white tap-active border-white/15 hover:bg-white/5 transition-all shadow-2xl">
                <i className="fa-solid fa-magnifying-glass text-2xl"></i>
             </button>
          </div>

          {/* Luxury Stories Bar - Elite Refinement */}
          <div className="flex gap-10 overflow-x-auto hide-scrollbar pointer-events-auto pb-10 mask-fade-right">
              <button className="flex flex-col items-center shrink-0 gap-5 group">
                  <div className="w-24 h-24 rounded-[40px] border-2 border-dashed border-white/40 flex items-center justify-center bg-white/5 group-hover:border-white/60 group-hover:bg-white/10 transition-all shadow-2xl">
                      <i className="fa-solid fa-plus text-white/40 text-4xl"></i>
                  </div>
                  <span className="text-[12px] font-black text-white/40 uppercase tracking-widest">إضافة</span>
              </button>
              {stories.map(story => (
                  <button 
                    key={story.id} 
                    onClick={() => setSelectedStory(story)}
                    className="flex flex-col items-center shrink-0 gap-5 group tap-active"
                  >
                      <div className={`w-24 h-24 rounded-[40px] p-2 border-2 transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-3 ${story.isLive ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)]' : 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)]'}`}>
                          <img src={story.avatar} className="w-full h-full rounded-[32px] object-cover border-2 border-black" alt="story" />
                      </div>
                      <span className="text-[12px] font-black uppercase tracking-widest truncate w-24 text-center text-white/95">{story.user}</span>
                  </button>
              ))}
          </div>
      </div>

      {mockVideos.map((vid, idx) => (
        <div key={vid.id} className="h-full w-full snap-start relative flex flex-col justify-end bg-zinc-950 overflow-hidden">
          {/* Elite Quality Video Background */}
          <img src={vid.video} alt="Video Main" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/98 z-10"></div>
          
          {/* Sovereign Side Action Bar */}
          <div className="absolute bottom-40 right-10 flex flex-col items-center gap-14 z-20">
            <div className="flex flex-col items-center group mb-8">
                <div className="w-22 h-22 rounded-[38px] border-2 border-white/70 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.7)] group-hover:border-blue-500 group-hover:scale-115 transition-all duration-1000">
                    <img src={`https://picsum.photos/150/150?u=user${idx+150}`} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <button className="bg-blue-600 rounded-full w-9 h-9 flex items-center justify-center -mt-6 border-4 border-black shadow-2xl hover:scale-130 active:scale-90 transition-all z-10">
                    <i className="fa-solid fa-plus text-[14px] text-white"></i>
                </button>
            </div>
            
            <div className="flex flex-col items-center">
                <button className="text-white hover:text-red-500 transition-all drop-shadow-[0_0_35px_rgba(255,255,255,0.8)] hover:scale-160 active:scale-75">
                    <i className="fa-solid fa-heart text-7xl"></i>
                </button>
                <span className="text-[15px] font-black mt-5 drop-shadow-[0_8px_20px_rgba(0,0,0,1)] text-white">{vid.likes}</span>
            </div>
            
            <div className="flex flex-col items-center">
                <button className="text-white hover:text-blue-400 transition-all drop-shadow-[0_0_35px_rgba(255,255,255,0.8)] hover:scale-160 active:scale-75">
                    <i className="fa-solid fa-comment-dots text-7xl"></i>
                </button>
                <span className="text-[15px] font-black mt-5 drop-shadow-[0_8px_20px_rgba(0,0,0,1)] text-white">{vid.comments}</span>
            </div>
            
            <div className="flex flex-col items-center">
                <button className="text-white hover:text-amber-400 transition-all drop-shadow-[0_0_35px_rgba(255,255,255,0.8)] hover:scale-160 active:scale-75">
                    <i className="fa-solid fa-share-nodes text-7xl"></i>
                </button>
                <span className="text-[15px] font-black mt-5 drop-shadow-[0_8px_20px_rgba(0,0,0,1)] text-white">{vid.shares}</span>
            </div>
            
            <div className="animate-spin-slow mt-10">
                <div className="w-20 h-20 rounded-full glass flex items-center justify-center border border-white/30 shadow-2xl relative group cursor-pointer">
                    <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <i className="fa-solid fa-compact-disc text-5xl text-white/70 group-hover:text-white transition-colors"></i>
                </div>
            </div>
          </div>

          {/* Luxury Video Meta Container */}
          <div className="p-14 pb-48 z-10 w-[90%] animate-slide-up">
            <h3 className="text-5xl font-black mb-6 tracking-tighter flex items-center gap-5 drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
                {vid.user}
                <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black shadow-2xl">
                   <i className="fa-solid fa-check text-[12px] text-white"></i>
                </div>
            </h3>
            <p className="text-[19px] font-bold mb-14 line-clamp-3 text-white leading-relaxed drop-shadow-[0_15px_40px_rgba(0,0,0,1)] max-w-xl">
               {vid.desc}
            </p>
            <div className="flex items-center gap-8 glass px-11 py-6 rounded-[35px] w-fit max-w-full group hover:bg-white/15 transition-all tap-active cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/15">
                <i className="fa-solid fa-waveform-lines text-blue-400 text-2xl animate-pulse"></i>
                <span className="text-[15px] font-black truncate text-white/95 uppercase tracking-[6px]">{vid.music}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Story Viewer Overlay - Filling the Gap */}
      {selectedStory && (
        <div className="fixed inset-0 z-[100] bg-black animate-fade-in flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-1 z-20 flex gap-1 p-2">
                <div className="flex-1 h-full bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white animate-[shimmer-anim_5s_linear_infinite]"></div>
                </div>
            </div>
            
            <header className="absolute top-6 left-0 right-0 p-8 flex justify-between items-center z-20">
                <div className="flex items-center gap-4">
                    <img src={selectedStory.avatar} className="w-12 h-12 rounded-full border-2 border-white" alt="story avatar" />
                    <div className="text-white">
                        <p className="font-black text-sm">{selectedStory.user}</p>
                        <p className="text-[10px] opacity-60">منذ ٢ س</p>
                    </div>
                </div>
                <button onClick={() => setSelectedStory(null)} className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
            </header>

            <img src={selectedStory.content} className="w-full h-full object-cover" alt="story content" />
            
            <footer className="absolute bottom-0 left-0 right-0 p-10 flex gap-5 items-center z-20 bg-gradient-to-t from-black/80 to-transparent">
                <input 
                    placeholder="رد على القصة..."
                    className="flex-1 bg-white/10 border border-white/10 rounded-full py-5 px-8 text-white text-sm focus:outline-none focus:bg-white/20 transition-all backdrop-blur-3xl"
                />
                <button className="w-14 h-14 glass rounded-full flex items-center justify-center text-white tap-active">
                    <i className="fa-solid fa-heart text-2xl"></i>
                </button>
                <button className="w-14 h-14 glass rounded-full flex items-center justify-center text-white tap-active">
                    <i className="fa-solid fa-paper-plane-top text-2xl"></i>
                </button>
            </footer>
        </div>
      )}
    </div>
  );
};

export default Discover;
