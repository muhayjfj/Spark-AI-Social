
import React, { useState, useEffect } from 'react';
import { LiveStream } from '../types';

interface WatchLiveProps {
  stream: LiveStream;
  onBack: () => void;
  crystals: number;
  onDeductCrystals: (amount: number) => boolean;
}

const WatchLive: React.FC<WatchLiveProps> = ({ stream, onBack, crystals, onDeductCrystals }) => {
  const [messages, setMessages] = useState([
    { user: 'خالد', text: 'ما شاء الله مبدع! 😍', color: 'text-blue-400' },
    { user: 'ريم', text: 'كيف عملت هذا التصميم؟ 🔥', color: 'text-pink-400' },
    { user: 'Spark AI Bot', text: 'مرحباً بالجميع! يرجى الالتزام بقواعد البث.', color: 'text-purple-400', isSystem: true },
    { user: 'يوسف', text: 'أرسل لك هدية الآن! 🎁', color: 'text-amber-400' },
  ]);
  const [inputText, setInputText] = useState('');
  const [showGifts, setShowGifts] = useState(false);
  const [activeGift, setActiveGift] = useState<string | null>(null);

  const gifts = [
    { name: 'كريستال', icon: 'fa-gem', price: 10, color: 'text-blue-400' },
    { name: 'قلب', icon: 'fa-heart', price: 50, color: 'text-red-400' },
    { name: 'صاروخ', icon: 'fa-rocket', price: 500, color: 'text-orange-400' },
    { name: 'تاج', icon: 'fa-crown', price: 1000, color: 'text-amber-400' },
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { user: 'أنا', text: inputText, color: 'text-green-400' }]);
    setInputText('');
  };

  const sendGift = (gift: any) => {
    const success = onDeductCrystals(gift.price);
    if (!success) {
      alert('رصيدك غير كافٍ لإرسال هذه الهدية الملكية. يرجى الشحن أولاً.');
      return;
    }
    setActiveGift(gift.icon);
    setMessages(prev => [...prev, { user: 'أنا', text: `أرسل ${gift.name} 💎`, color: 'text-amber-500', isSystem: false }]);
    setTimeout(() => setActiveGift(null), 3000);
    setShowGifts(false);
  };

  return (
    <div className="h-full bg-black relative flex flex-col overflow-hidden animate-fade-in">
      {/* Gift Animation Overlay */}
      {activeGift && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
            <div className="gift-animation flex flex-col items-center">
                <i className={`fa-solid ${activeGift} text-8xl text-amber-500 drop-shadow-[0_0_50px_rgba(245,158,11,0.8)] mb-4`}></i>
                <h4 className="text-2xl font-black text-white bg-black/50 px-6 py-2 rounded-full backdrop-blur-xl border border-amber-500/30">شكراً على الهدية الملكية!</h4>
            </div>
        </div>
      )}

      {/* Video Background (Mock) */}
      <div className="absolute inset-0 z-0">
          <img src={stream.thumbnail} className="w-full h-full object-cover opacity-60 blur-sm scale-110" alt="bg" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
          {/* Main Video Overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="w-full aspect-[9/16] max-h-full rounded-[50px] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,1)] relative">
                  <img src={stream.thumbnail} className="w-full h-full object-cover" alt="stream" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <i className="fa-solid fa-play text-white/30 text-8xl animate-float"></i>
                  </div>
                  {/* Viewers Counter In-Video */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-xs font-black tracking-tighter">LIVE • {stream.viewerCount}</span>
                  </div>
              </div>
          </div>
      </div>

      {/* Header Overlay */}
      <header className="relative z-20 p-6 flex justify-between items-start">
        <div className="flex items-center gap-3 bg-black/50 backdrop-blur-2xl p-2.5 rounded-[30px] border border-white/10">
            <img src={stream.streamerAvatar} className="w-12 h-12 rounded-full border-2 border-amber-500/30" alt="avatar" />
            <div className="ml-2">
                <h3 className="text-xs font-black flex items-center gap-1">
                    {stream.streamerName}
                    <i className="fa-solid fa-circle-check text-blue-500 text-[8px]"></i>
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] font-bold text-zinc-400">@streamer_id</span>
                </div>
            </div>
            <button className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white px-5 py-2 rounded-2xl text-[10px] font-black ml-4 shadow-xl active:scale-95 transition-all">متابعة</button>
        </div>
        
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-2xl border border-white/10 text-white hover:bg-white/10 transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </header>

      {/* Chat Area Overlay */}
      <div className="flex-1 relative z-10 flex flex-col justify-end p-6 gap-6">
          <div className="max-h-[35vh] overflow-y-auto hide-scrollbar flex flex-col gap-3">
              {messages.map((m, i) => (
                  <div key={i} className="flex gap-3 items-start bg-black/30 backdrop-blur-md p-3 rounded-[24px] w-fit max-w-[85%] border border-white/5 animate-slide-up shadow-xl">
                      <span className={`text-[11px] font-black ${m.color} whitespace-nowrap`}>{m.user}:</span>
                      <p className="text-[11px] font-bold text-white/95 leading-relaxed">{m.text}</p>
                  </div>
              ))}
          </div>

          <div className="flex gap-4 items-center">
              <div className="flex-1 relative group">
                  <input 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="قل شيئاً جميلاً..."
                    className="w-full bg-black/50 backdrop-blur-2xl border border-white/10 rounded-[28px] py-4 px-6 text-xs focus:outline-none focus:border-blue-500/50 shadow-2xl transition-all"
                  />
                  <button onClick={handleSendMessage} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform">
                    <i className="fa-solid fa-paper-plane-top"></i>
                  </button>
              </div>
              
              <button 
                onClick={() => setShowGifts(!showGifts)}
                className="w-14 h-14 bg-gradient-to-tr from-amber-400 to-orange-600 rounded-[24px] flex items-center justify-center shadow-[0_15px_30px_rgba(245,158,11,0.3)] active:scale-90 transition-all hover:scale-105"
              >
                  <i className="fa-solid fa-gift text-white text-xl"></i>
              </button>
          </div>
      </div>

      {/* Gifts Panel Overlay */}
      {showGifts && (
          <div className="absolute inset-x-0 bottom-0 z-40 bg-zinc-950/95 backdrop-blur-3xl rounded-t-[50px] border-t border-white/10 p-10 animate-slide-up shadow-[0_-20px_100px_rgba(0,0,0,0.8)]">
              <div className="flex justify-between items-center mb-8">
                  <div>
                      <h4 className="font-black text-xl mb-1 tracking-tight">إرسال هدية ملكية 💎</h4>
                      <p className="text-xs text-zinc-500 font-bold">كل هدية تدعم المبدع وتظهر في البث</p>
                  </div>
                  <button onClick={() => setShowGifts(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                      <i className="fa-solid fa-chevron-down"></i>
                  </button>
              </div>
              
              <div className="grid grid-cols-4 gap-6">
                  {gifts.map((g, i) => (
                      <button key={i} onClick={() => sendGift(g)} className="flex flex-col items-center gap-3 group">
                          <div className="w-20 h-20 rounded-[30px] bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-white group-hover:to-zinc-200 group-hover:text-black transition-all group-active:scale-90 shadow-2xl group-hover:shadow-white/5">
                              <i className={`fa-solid ${g.icon} text-3xl ${g.color} group-hover:text-black transition-colors`}></i>
                          </div>
                          <div className="text-center">
                              <span className="text-xs font-black block">{g.name}</span>
                              <div className="flex items-center justify-center gap-1 mt-0.5">
                                  <i className="fa-solid fa-gem text-[8px] text-amber-500"></i>
                                  <span className="text-[10px] font-black text-amber-500">{g.price}</span>
                              </div>
                          </div>
                      </button>
                  ))}
              </div>

              <div className="mt-10 flex justify-between items-center bg-white/5 p-5 rounded-[30px] border border-white/5 shadow-inner">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                          <i className="fa-solid fa-gem text-amber-500"></i>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 font-black block uppercase tracking-widest">رصيدك الحالي</span>
                        <span className="text-sm font-black text-white tracking-tighter">{crystals.toLocaleString('ar-EG')} كريستالة</span>
                      </div>
                  </div>
                  <button className="text-[10px] font-black text-blue-400 uppercase tracking-[4px] bg-blue-400/10 px-5 py-2.5 rounded-2xl border border-blue-400/20 hover:bg-blue-400 hover:text-white transition-all">شحن الآن</button>
              </div>
          </div>
      )}
    </div>
  );
};

export default WatchLive;
