
import React from 'react';
import { Notification } from '../types';

const Notifications: React.FC = () => {
  const mockNotifications: Notification[] = [
    { id: '1', type: 'WALLET', message: 'لقد استلمت 50 كريستالة كهدية من @أحمد!', timestamp: 'الآن', read: false, userAvatar: 'https://picsum.photos/100/100?u=1' },
    { id: '2', type: 'LIKE', message: 'أعجب @سارة بمقطع الفيديو الخاص بك.', timestamp: 'منذ ٥ د', read: false, userAvatar: 'https://picsum.photos/100/100?u=sara' },
    { id: '3', type: 'FOLLOW', message: 'بدأ @ياسين بمتابعتك.', timestamp: 'منذ ١ س', read: true, userAvatar: 'https://picsum.photos/100/100?u=yasin' },
    { id: '4', type: 'SYSTEM', message: 'تم تفعيل ميزة الذكاء الاصطناعي الجديدة في حسابك.', timestamp: 'منذ ٢ س', read: true },
    { id: '5', type: 'COMMENT', message: 'علق @نور: "إبداع لا يوصف! 🔥"', timestamp: 'منذ ٥ س', read: true, userAvatar: 'https://picsum.photos/100/100?u=nour' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
        case 'LIKE': return 'fa-heart text-red-500';
        case 'FOLLOW': return 'fa-user-plus text-blue-500';
        case 'WALLET': return 'fa-gem text-amber-500';
        case 'COMMENT': return 'fa-comment text-green-500';
        default: return 'fa-bell text-purple-500';
    }
  };

  return (
    <div className="h-full bg-black flex flex-col">
      <header className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-bold">النشاط</h2>
        <button className="text-xs text-blue-400 font-bold">تحديد الكل كمقروء</button>
      </header>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
            <h3 className="text-xs font-bold text-zinc-500 mb-2">جديد</h3>
            {mockNotifications.filter(n => !n.read).map(n => (
                <div key={n.id} className="flex items-center gap-4 p-3 bg-zinc-900/50 rounded-2xl border border-white/5 mb-2">
                    <div className="relative">
                        <img src={n.userAvatar || 'https://picsum.photos/100/100?u=system'} className="w-12 h-12 rounded-full object-cover" alt="user" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center">
                            <i className={`fa-solid ${getIcon(n.type)} text-[10px]`}></i>
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium leading-tight">{n.message}</p>
                        <span className="text-[10px] text-blue-400 font-bold">{n.timestamp}</span>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
            ))}
        </div>

        <div className="p-4 space-y-1">
            <h3 className="text-xs font-bold text-zinc-500 mb-2">سابقاً</h3>
            {mockNotifications.filter(n => n.read).map(n => (
                <div key={n.id} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-2xl transition-colors">
                    <div className="relative">
                        <img src={n.userAvatar || 'https://picsum.photos/100/100?u=sys'} className="w-12 h-12 rounded-full object-cover opacity-60" alt="user" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center">
                            <i className={`fa-solid ${getIcon(n.type)} text-[10px]`}></i>
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-zinc-400 leading-tight">{n.message}</p>
                        <span className="text-[10px] text-zinc-600">{n.timestamp}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
