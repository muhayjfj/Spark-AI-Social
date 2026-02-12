
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

interface ChatsProps {
  onNavigateToCalls?: () => void;
}

const Chats: React.FC<ChatsProps> = ({ onNavigateToCalls }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const mockChats = [
    { id: 'ai', name: 'Spark AI Assistant', lastMsg: 'مرحباً! كيف يمكنني مساعدتك اليوم؟', time: 'الآن', avatar: 'https://picsum.photos/100/100?u=ai', isOnline: true, isAi: true },
    { id: '1', name: 'أحمد علي', lastMsg: 'هل رأيت المقطع الجديد؟ 🔥', time: '١٠ د', avatar: 'https://picsum.photos/100/100?u=1', isOnline: true },
    { id: '2', name: 'ليلى مراد', lastMsg: 'شكراً لك على الهدية! ✨', time: '١ س', avatar: 'https://picsum.photos/100/100?u=2', isOnline: false },
    { id: '3', name: 'مجتمع المصممين', lastMsg: 'يوجد تحدي جديد غداً', time: '٤ س', avatar: 'https://picsum.photos/100/100?u=3', isOnline: true, isGroup: true },
  ];

  const [messages, setMessages] = useState<any[]>([
    { id: '1', text: 'مرحباً! أنا مساعدك الذكي. يمكنني تحليل الصور، إنشاء المحتوى، أو حتى الدردشة معك.', sender: 'bot' }
  ]);

  const gemini = GeminiService.getInstance();

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
        const response = await gemini.generateFastResponse(input);
        setMessages(prev => [...prev, { id: Date.now().toString(), text: response, sender: 'bot' }]);
    } catch (e) {
        setMessages(prev => [...prev, { id: Date.now().toString(), text: "عذراً، حدث خطأ ما.", sender: 'bot' }]);
    } finally {
        setIsTyping(false);
    }
  };

  if (selectedChat) {
    const chat = mockChats.find(c => c.id === selectedChat);
    return (
      <div className="flex flex-col h-full bg-black page-transition">
        <header className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-950/80 backdrop-blur-3xl sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <button onClick={() => setSelectedChat(null)} className="p-3 -mr-3 tap-active">
                    <i className="fa-solid fa-chevron-right text-2xl text-zinc-400"></i>
                </button>
                <div className="relative">
                    <img src={chat?.avatar} className="w-12 h-12 rounded-full object-cover border border-white/10" alt="avatar" />
                    {chat?.isOnline && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full shadow-[0_0_10px_#22c55e]"></div>}
                </div>
                <div>
                    <h3 className="font-black text-lg tracking-tight">{chat?.name}</h3>
                    <span className="text-[11px] text-zinc-500 font-bold tracking-widest uppercase">{chat?.isOnline ? 'نشط الآن' : 'غير متصل'}</span>
                </div>
            </div>
            <div className="flex gap-6">
                <button onClick={onNavigateToCalls} className="w-12 h-12 glass rounded-2xl flex items-center justify-center tap-active">
                    <i className="fa-solid fa-phone text-xl text-zinc-300"></i>
                </button>
                <button onClick={onNavigateToCalls} className="w-12 h-12 glass rounded-2xl flex items-center justify-center tap-active">
                    <i className="fa-solid fa-video text-xl text-zinc-300"></i>
                </button>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 hide-scrollbar">
            {messages.map(m => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-5 rounded-[28px] text-sm font-medium leading-relaxed shadow-xl border ${
                        m.sender === 'user' ? 'bg-blue-600 border-blue-500 text-white rounded-br-none' : 'bg-zinc-900 border-white/5 text-zinc-300 rounded-bl-none'
                    }`}>
                        {m.text}
                    </div>
                </div>
            ))}
            {isTyping && (
                <div className="flex justify-end">
                    <div className="bg-zinc-900/50 p-5 rounded-[28px] flex gap-2 border border-white/5 shadow-inner">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                    </div>
                </div>
            )}
        </div>

        <div className="p-6 bg-zinc-950/80 backdrop-blur-3xl border-t border-white/10 flex items-center gap-5 sticky bottom-0">
            <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-zinc-500 tap-active"><i className="fa-solid fa-plus text-xl"></i></button>
            <div className="flex-1 relative">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="أرسل رسالة مبدعة..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-[28px] py-4 px-6 text-sm focus:outline-none focus:border-blue-500/50 shadow-inner transition-all"
                />
            </div>
            {input ? (
                <button onClick={handleSend} className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all tap-active hover:scale-110 active:scale-90">
                    <i className="fa-solid fa-paper-plane text-white"></i>
                </button>
            ) : (
                <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-zinc-500 tap-active"><i className="fa-solid fa-microphone text-xl"></i></button>
            )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col page-transition">
      <div className="p-6 flex overflow-x-auto gap-6 border-b border-white/5 hide-scrollbar bg-black/50 backdrop-blur-xl">
          {mockChats.map(c => (
              <div key={c.id} className="flex flex-col items-center shrink-0 gap-3 group">
                  <div className="w-20 h-20 rounded-[30px] p-1 bg-gradient-to-tr from-blue-500 to-purple-600 shadow-xl group-hover:scale-105 transition-all">
                      <div className="w-full h-full rounded-[26px] border-4 border-black overflow-hidden relative">
                        <img src={c.avatar} alt="story" className="w-full h-full object-cover" />
                        {c.isAi && <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center"><i className="fa-solid fa-sparkles text-white text-xl animate-pulse"></i></div>}
                      </div>
                  </div>
                  <span className="text-[11px] font-black tracking-widest uppercase truncate w-20 text-center opacity-70">{c.name.split(' ')[0]}</span>
              </div>
          ))}
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-32">
        {mockChats.map(chat => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className="w-full flex items-center gap-6 p-7 hover:bg-white/5 transition-all border-b border-white/5 group tap-active"
          >
            <div className="relative">
                <img src={chat.avatar} className="w-18 h-18 rounded-[28px] object-cover border border-white/10 group-hover:border-blue-500 transition-all shadow-2xl" alt="avatar" />
                {chat.isOnline && <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-4 border-black rounded-full shadow-[0_0_15px_#22c55e]"></div>}
            </div>
            <div className="flex-1 text-right">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-black text-xl tracking-tight flex items-center gap-3">
                        {chat.name}
                        {chat.isAi && <i className="fa-solid fa-wand-sparkles text-blue-400 text-xs"></i>}
                    </h4>
                    <span className="text-[11px] font-black text-zinc-600 uppercase tracking-widest">{chat.time}</span>
                </div>
                <p className="text-[13px] text-zinc-500 font-bold truncate tracking-tight">{chat.lastMsg}</p>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chats;
