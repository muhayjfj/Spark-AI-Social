
import React, { useState } from 'react';
import { ViewType } from '../types';

interface SettingsProps {
    onBack: () => void;
    onNavigate: (view: ViewType) => void;
    // Added crystals to SettingsProps to fix the type error in App.tsx
    crystals: number;
}

const Settings: React.FC<SettingsProps> = ({ onBack, onNavigate, crystals }) => {
  const [auraColor, setAuraColor] = useState('text-amber-500');
  
  const sections = [
    {
      id: 'wealth',
      title: '💰 إمبراطورية الأرباح (Wealth Hub)',
      items: [
        { 
            icon: 'fa-crown', 
            label: 'عضوية النخبة الملكية (Elite)', 
            description: 'احصل على 95% من أرباح الهدايا وشارة التوثيق الملكية المضيئة',
            status: 'متاح للترقية',
            color: 'text-amber-400',
            isSpecial: true,
            action: () => alert('جاري توجيهك لنظام النخبة الملكي...')
        },
        { 
            icon: 'fa-chart-mixed', 
            label: 'لوحة التحكم التحليلية الاحترافية', 
            description: 'راقب أداء فيديوهاتك وأرباحك اللحظية بدقة الذكاء الاصطناعي المتناهية',
            action: () => alert('فتح لوحة التحليلات المتقدمة...')
        },
        { 
            icon: 'fa-gem', 
            label: 'إدارة المحفظة والسحوبات الفورية', 
            description: 'سحب الأرباح فوراً إلى حسابك البنكي أو محفظتك الرقمية المشفرة',
            action: () => onNavigate(ViewType.WALLET)
        }
      ]
    },
    {
      id: 'ai-power',
      title: '🤖 قوى Spark AI الخارقة',
      items: [
        { 
            icon: 'fa-wand-magic-sparkles', 
            label: 'مساعد النمو الذكي (Growth AI)', 
            description: 'دع الذكاء الاصطناعي يحلل جمهورك ويقترح عليك استراتيجية المحتوى الرابحة',
            toggle: true 
        },
        { 
            icon: 'fa-sparkles', 
            label: 'تخصيص هالة الحساب (Account Aura)', 
            description: 'تحكم في التأثيرات الضوئية التي تظهر للمتابعين عند دخول ملفك الشخصي',
            value: 'وهج ذهبي ملكي',
            action: () => setAuraColor('text-amber-500')
        }
      ]
    },
    {
      id: 'security',
      title: '🔐 الأمان والسيادة الرقمية',
      items: [
        { icon: 'fa-shield-heart', label: 'التحقق البيومتري المتطور', description: 'تأمين المحفظة عبر بصمة الوجه أو الأصبع', toggle: true },
        { icon: 'fa-user-ninja', label: 'وضع التخفي الملكي', description: 'تصفح التطبيق دون أن يشعر أحد بوجودك', toggle: false },
        { icon: 'fa-laptop-code', label: 'إدارة الجلسات والأجهزة', value: '٣ أجهزة نشطة حالياً' }
      ]
    },
    {
      id: 'support',
      title: '🎧 الدعم والابتكار المستمر',
      items: [
        { 
            icon: 'fa-headset', 
            label: 'مساعد Spark الصوتي المباشر (VIP)', 
            description: 'تحدث صوتياً مع الدعم الفني الذكي فائق السرعة في أي وقت',
            isSpecial: true,
            action: () => onNavigate(ViewType.LIVE_SUPPORT)
        },
        { icon: 'fa-circle-question', label: 'مركز النجاح الأكاديمي', description: 'دليل شامل لاحتراف صناعة المحتوى الربحي' }
      ]
    }
  ];

  return (
    <div className="h-full bg-black flex flex-col animate-fade-in overflow-hidden selection:bg-amber-500/30 relative">
      <div className="mesh-bg"></div>

      {/* Header */}
      <header className="p-8 flex items-center justify-between border-b border-white/5 bg-zinc-950/90 sticky top-0 z-30 backdrop-blur-3xl">
        <div className="flex items-center gap-6">
            <button onClick={onBack} className="w-14 h-14 flex items-center justify-center rounded-[24px] bg-zinc-900 border border-white/10 hover:bg-white/5 transition-all tap-active">
                <i className="fa-solid fa-arrow-right text-2xl text-zinc-400"></i>
            </button>
            <div>
                <h2 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">إمبراطورية التحكم</h2>
                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[5px]">Global Command Center</p>
            </div>
        </div>
        <div className="w-14 h-14 glass rounded-[24px] flex items-center justify-center shadow-2xl relative border-amber-500/20">
            <i className="fa-solid fa-gem text-amber-500 text-xl animate-royal"></i>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-12 hide-scrollbar pb-40">
        {/* VIP Profile Summary */}
        <div className="bg-zinc-900/30 p-10 rounded-[50px] border border-white/5 flex items-center gap-8 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-amber-500/10 transition-all duration-1000"></div>
            <div className={`w-28 h-28 rounded-[35px] p-1 bg-gradient-to-tr from-amber-400 via-orange-600 to-yellow-300 shadow-2xl relative z-10`}>
                <img src="https://picsum.photos/200/200?u=me" className="w-full h-full rounded-[31px] border-4 border-black object-cover" alt="me" />
            </div>
            <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3">
                    <h3 className="text-3xl font-black tracking-tight">المبدع الذكي</h3>
                    <i className="fa-solid fa-badge-check text-blue-500 text-xl"></i>
                </div>
                <p className="text-xs text-zinc-500 font-bold mt-2 uppercase tracking-widest">المستوى الملكي • Elite Level 99</p>
                <div className="mt-6 glass p-4 rounded-2xl flex items-center justify-between border-white/5 shadow-inner">
                    <div className="flex items-center gap-3">
                        <i className="fa-solid fa-gem text-amber-500 text-lg"></i>
                        {/* Use crystals prop for dynamic display to fix hardcoded value */}
                        <span className="text-lg font-black tracking-tighter">{crystals.toLocaleString('ar-EG')}</span>
                    </div>
                    <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">رصيد الكريستال الملكي</span>
                </div>
            </div>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.id} className="space-y-6">
            <h4 className="text-[11px] font-black text-zinc-600 uppercase tracking-[6px] px-4">{section.title}</h4>
            <div className="space-y-4">
              {section.items.map((item: any, i) => (
                <button 
                  key={i} 
                  onClick={item.action}
                  className={`w-full group flex items-center justify-between p-7 rounded-[40px] bg-zinc-900/10 border border-white/5 hover:bg-zinc-900/30 hover:border-white/10 transition-all duration-500 relative overflow-hidden ${item.isSpecial ? 'shadow-[0_0_40px_rgba(59,130,246,0.1)]' : ''}`}
                >
                  {item.isSpecial && <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-blue-600 to-indigo-700"></div>}
                  
                  <div className="flex items-center gap-8 text-right relative z-10">
                    <div className={`w-16 h-16 rounded-[22px] bg-zinc-950 border border-white/5 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700 ${item.color || (item.isSpecial ? 'text-blue-400' : 'text-zinc-600')}`}>
                      <i className={`fa-solid ${item.icon} text-2xl`}></i>
                    </div>
                    <div className="max-w-[240px]">
                        <span className="text-xl font-black block text-zinc-100 tracking-tight">{item.label}</span>
                        {item.description && <span className="text-[11px] text-zinc-500 block mt-2 leading-relaxed font-bold">{item.description}</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 relative z-10">
                    {item.toggle !== undefined ? (
                      <div className={`w-16 h-8 rounded-full transition-all duration-500 relative p-1.5 ${item.toggle ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-zinc-800'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full transition-all duration-500 shadow-xl ${item.toggle ? 'translate-x-8' : 'translate-x-0'}`}></div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                         {item.value && <span className="text-[10px] font-black text-zinc-500 bg-zinc-950/50 px-5 py-2 rounded-full border border-white/5 uppercase tracking-widest">{item.value}</span>}
                         {item.status && <span className={`text-[10px] font-black px-5 py-2 rounded-full bg-zinc-950 border border-white/5 ${item.color} uppercase tracking-widest`}>{item.status}</span>}
                         <i className="fa-solid fa-chevron-left text-xs text-zinc-800 group-hover:text-zinc-400 group-hover:translate-x-[-8px] transition-all"></i>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Wealth Acceleration Card - Final Polish */}
        <div className="bg-gradient-to-br from-amber-500/10 via-orange-600/5 to-transparent p-12 rounded-[60px] border border-amber-500/15 text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="w-28 h-28 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform duration-700">
                <i className="fa-solid fa-money-bill-trend-up text-5xl text-amber-500"></i>
            </div>
            <h5 className="text-3xl font-black mb-4 tracking-tighter">سيادة المبدع الرقمي 👑</h5>
            <p className="text-base text-zinc-400 mb-10 leading-relaxed px-8 font-bold">
                أنت الآن في قمة الهرم الربحي. فعل "وضع السيادة" للوصول إلى مميزات حصرية تشمل البث المباشر بدقة 8K وعمولات تصل إلى 98%.
            </p>
            <button className="w-full py-8 bg-white text-black rounded-[35px] font-black text-lg hover:shadow-[0_25px_60px_rgba(255,255,255,0.2)] active:scale-95 transition-all shimmer">
                امتلاك سيادة النخبة
            </button>
        </div>

        <button className="w-full py-12 text-red-500/40 hover:text-red-500 font-black text-xs transition-all flex items-center justify-center gap-4 uppercase tracking-[6px] tap-active">
          <i className="fa-solid fa-power-off"></i>
          بروتوكول الخروج الآمن
        </button>
      </div>
    </div>
  );
};

export default Settings;
