
import React from 'react';
import { ViewType, LiveStream } from '../types';

interface LiveStreamsProps {
  onSelectStream: (stream: LiveStream) => void;
  onBack: () => void;
}

const LiveStreams: React.FC<LiveStreamsProps> = ({ onSelectStream, onBack }) => {
  const categories = ['للألعاب', 'موسيقى', 'دردشة', 'ذكاء اصطناعي', 'فن'];
  
  const mockStreams: LiveStream[] = [
    { id: 'l1', streamerName: 'أحمد برو', streamerAvatar: 'https://picsum.photos/100/100?u=1', viewerCount: '١٢.٥ ألف', title: 'تحدي الرسم بالذكاء الاصطناعي! 🎨', thumbnail: 'https://picsum.photos/400/600?random=11', category: 'فن' },
    { id: 'l2', streamerName: 'سارة لايف', streamerAvatar: 'https://picsum.photos/100/100?u=sara', viewerCount: '٨٠٠', title: 'دردشة مسائية حول مستقبل التقنية ✨', thumbnail: 'https://picsum.photos/400/600?random=12', category: 'دردشة' },
    { id: 'l3', streamerName: 'المصمم العبقري', streamerAvatar: 'https://picsum.photos/100/100?u=3', viewerCount: '٣.٢ ألف', title: 'بناء تطبيق كامل في ساعة واحدة 🚀', thumbnail: 'https://picsum.photos/400/600?random=13', category: 'ذكاء اصطناعي' },
    { id: 'l4', streamerName: 'نور جيمينج', streamerAvatar: 'https://picsum.photos/100/100?u=4', viewerCount: '٥٠ ألف', title: 'بطولة Spark للألعاب الإلكترونية 🎮', thumbnail: 'https://picsum.photos/400/600?random=14', category: 'للألعاب' },
  ];

  return (
    <div className="h-full bg-black flex flex-col animate-fade-in overflow-hidden">
      <header className="p-6 flex items-center justify-between border-b border-white/5 bg-zinc-950/80 backdrop-blur-3xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-white/10 text-white">
                <i className="fa-solid fa-arrow-right"></i>
            </button>
            <h2 className="text-xl font-black">البث المباشر</h2>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-full font-black text-xs flex items-center gap-2 shadow-lg shadow-red-600/30">
            <i className="fa-solid fa-tower-broadcast animate-pulse"></i>
            ابدأ بثك الآن
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-8 pb-2">
            {categories.map((cat, i) => (
                <button key={i} className={`px-6 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all ${i === 0 ? 'bg-white text-black' : 'bg-zinc-900 border border-white/5 text-zinc-400 hover:bg-zinc-800'}`}>
                    {cat}
                </button>
            ))}
        </div>

        <h3 className="text-sm font-black text-zinc-500 uppercase tracking-[3px] mb-6 px-2">القنوات الأكثر رواجاً</h3>
        
        <div className="grid grid-cols-2 gap-4">
            {mockStreams.map((stream) => (
                <button 
                    key={stream.id} 
                    onClick={() => onSelectStream(stream)}
                    className="flex flex-col text-right group relative"
                >
                    <div className="aspect-[3/4] rounded-[32px] overflow-hidden relative mb-3 border border-white/5 group-hover:border-white/20 transition-all duration-500">
                        <img src={stream.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="live" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        
                        <div className="absolute top-3 left-3 bg-red-600 px-2 py-0.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-tighter">LIVE</span>
                        </div>
                        
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-[9px] font-black">
                                <i className="fa-solid fa-eye text-red-400"></i>
                                {stream.viewerCount}
                            </div>
                            <span className="text-[9px] font-black bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg border border-blue-500/20">{stream.category}</span>
                        </div>
                    </div>
                    <div className="px-1">
                        <h4 className="font-bold text-sm line-clamp-1 mb-1 group-hover:text-blue-400 transition-colors">{stream.title}</h4>
                        <div className="flex items-center gap-2">
                            <img src={stream.streamerAvatar} className="w-5 h-5 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="avatar" />
                            <span className="text-[10px] text-zinc-500 font-bold">{stream.streamerName}</span>
                        </div>
                    </div>
                </button>
            ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-br from-blue-600/10 to-transparent rounded-[40px] border border-blue-500/10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <i className="fa-solid fa-clapperboard-play text-4xl text-blue-500 mb-4"></i>
            <h4 className="text-lg font-black mb-2">هل تريد أن تصبح نجماً؟</h4>
            <p className="text-xs text-zinc-500 mb-6 leading-relaxed">انضم إلى برنامج شركاء البث المباشر وابدأ في جني الكريستالات من متابعيك فوراً.</p>
            <button className="bg-white text-black px-8 py-3 rounded-full font-black text-xs hover:scale-105 active:scale-95 transition-all">تقديم طلب بث</button>
        </div>
      </div>
    </div>
  );
};

export default LiveStreams;
