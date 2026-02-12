
import React, { useState } from 'react';

interface WalletProps {
    onBack: () => void;
    crystals: number;
}

const Wallet: React.FC<WalletProps> = ({ onBack, crystals }) => {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const transactions = [
    { id: 1, type: 'IN', title: 'هدية "الأسد الملك" من @سارة', amount: '+2,500', date: 'اليوم، ٤:٣٠ م', icon: 'fa-gift', color: 'text-amber-500' },
    { id: 2, type: 'IN', title: 'مكافأة الفيديو الأكثر رواجاً', amount: '+5,000', date: 'أمس، ١٠:٠٠ ص', icon: 'fa-bolt-lightning', color: 'text-blue-500' },
    { id: 3, type: 'OUT', title: 'تحويل إلى PayPal', amount: '-1,500', date: 'منذ يومين', icon: 'fa-bank', color: 'text-zinc-500' },
    { id: 4, type: 'IN', title: 'أرباح الإعلانات المدمجة', amount: '+1,200', date: 'منذ ٣ أيام', icon: 'fa-rectangle-ad', color: 'text-green-500' },
  ];

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setShowWithdrawModal(false);
      alert('تم إرسال طلب السحب بنجاح! ستصلك الأموال خلال دقائق عبر Spark Instant Pay.');
    }, 2500);
  };

  return (
    <div className="h-full bg-black flex flex-col page-transition overflow-hidden selection:bg-amber-500/30">
      <header className="p-8 flex items-center justify-between border-b border-white/5 bg-zinc-950/80 backdrop-blur-3xl sticky top-0 z-30">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="w-14 h-14 flex items-center justify-center rounded-[24px] bg-zinc-900 border border-white/10 shadow-lg hover:bg-zinc-800 transition-all tap-active">
            <i className="fa-solid fa-arrow-right text-2xl text-zinc-400"></i>
          </button>
          <div>
              <h2 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-amber-200 to-amber-600 bg-clip-text text-transparent">الخزينة الملكية</h2>
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[6px] opacity-60">Global Wealth Management</p>
          </div>
        </div>
        <div className="w-14 h-14 glass rounded-[24px] flex items-center justify-center shadow-2xl relative">
            <i className="fa-solid fa-shield-check text-blue-500 text-xl"></i>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 hide-scrollbar pb-40 relative">
        {/* Dynamic Wealth Aura */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* The Master Card */}
        <div className="relative h-96 w-full mb-12 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 via-orange-600 to-yellow-400 rounded-[60px] blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000"></div>
            <div className="relative h-full w-full bg-zinc-900/40 backdrop-blur-3xl rounded-[60px] border border-white/10 p-12 flex flex-col justify-between overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] group-hover:border-amber-500/30 transition-all duration-700">
                <div className="absolute top-[-20%] right-[-20%] opacity-5 group-hover:opacity-10 transition-all duration-1000 rotate-12 group-hover:rotate-0">
                    <i className="fa-solid fa-gem text-[400px] text-amber-500"></i>
                </div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-3 bg-amber-500/10 px-4 py-2 rounded-2xl border border-amber-500/20">
                           <i className="fa-solid fa-sparkles text-amber-500 text-xs animate-pulse"></i>
                           <p className="text-[10px] font-black text-amber-500 uppercase tracking-[4px]">إجمالي الثروة اللحظية</p>
                        </div>
                        <span className="text-[10px] font-black text-white/40 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 uppercase tracking-widest">Royal Platinum</span>
                    </div>
                    <div className="flex items-end gap-6 mb-8">
                        <h3 className="text-9xl font-black text-white tracking-tighter drop-shadow-2xl">{crystals.toLocaleString('ar-EG')}</h3>
                        <div className="mb-4">
                           <div className="w-16 h-16 glass rounded-[24px] border border-amber-500/20 flex items-center justify-center shadow-2xl">
                               <i className="fa-solid fa-gem text-3xl text-amber-500 animate-royal"></i>
                           </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl w-fit px-6 py-3 rounded-2xl border border-white/5 shadow-inner">
                        <i className="fa-solid fa-coins text-amber-500 text-xl"></i>
                        <span className="text-xl text-zinc-400 font-bold">يعادل <span className="text-white font-black">${(crystals / 100).toFixed(2)}</span> دولار</span>
                    </div>
                </div>

                <div className="flex gap-5 relative z-10">
                    <button className="flex-[2] py-7 bg-white text-black rounded-[32px] font-black text-sm shadow-[0_25px_50px_rgba(255,255,255,0.1)] tap-active shimmer">
                       شحن الكريستالات
                    </button>
                    <button 
                      onClick={() => setShowWithdrawModal(true)}
                      className="flex-1 py-7 bg-zinc-950/80 rounded-[32px] font-black text-sm border border-white/10 transition-all tap-active backdrop-blur-xl flex items-center justify-center gap-3 hover:bg-zinc-800"
                    >
                        <i className="fa-solid fa-paper-plane-top text-amber-500"></i>
                        سحب
                    </button>
                </div>
            </div>
        </div>

        {/* Advanced Growth Analytics */}
        <div className="flex justify-between items-center mb-8 px-4">
            <h3 className="text-2xl font-black tracking-tight">تحليلات التسارع المالي</h3>
            <div className="flex gap-2">
                <button className="px-4 py-1.5 glass rounded-full text-[10px] font-black text-zinc-500">أسبوع</button>
                <button className="px-4 py-1.5 bg-white text-black rounded-full text-[10px] font-black">شهر</button>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-12">
            {[
                { label: 'أرباح اليوم', value: '+٤,٢٠٠', trend: '+١٢٪', icon: 'fa-chart-line-up', color: 'text-green-400' },
                { label: 'أرباح الشهر', value: '+٨٩,٥٠٠', trend: '+٤٥٪', icon: 'fa-calendar-star', color: 'text-purple-400' },
                { label: 'أداء المحتوى', value: '٩٨٪', trend: 'ممتاز', icon: 'fa-bolt-lightning', color: 'text-blue-400' },
                { label: 'معدل الهدايا', value: '١,٢٤٠', trend: '+٨٪', icon: 'fa-gift', color: 'text-amber-500' },
            ].map((stat, idx) => (
                <div key={idx} className="glass p-8 rounded-[48px] border border-white/5 hover:border-white/20 transition-all group tap-active">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center border border-white/10 shadow-2xl group-hover:scale-110 transition-transform ${stat.color}`}>
                            <i className={`fa-solid ${stat.icon} text-2xl`}></i>
                        </div>
                        <span className={`text-[9px] font-black px-3 py-1 rounded-full bg-white/5 border border-white/5 ${stat.color}`}>{stat.trend}</span>
                    </div>
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[4px] mb-2">{stat.label}</p>
                    <h4 className="text-4xl font-black text-white tracking-tighter">{stat.value}</h4>
                </div>
            ))}
        </div>

        {/* Transaction History - High Precision UI */}
        <div className="flex justify-between items-center mb-8 px-4">
            <h3 className="text-2xl font-black tracking-tight">سجل المعاملات الملكية</h3>
            <i className="fa-solid fa-sliders text-zinc-600 hover:text-white transition-colors cursor-pointer"></i>
        </div>

        <div className="space-y-5">
            {transactions.map(t => (
                <div key={t.id} className="flex items-center justify-between p-8 glass rounded-[45px] hover:bg-white/5 transition-all group cursor-pointer border border-white/5">
                    <div className="flex items-center gap-8">
                        <div className={`w-16 h-16 rounded-[22px] glass flex items-center justify-center border border-white/10 shadow-2xl group-hover:rotate-6 transition-all ${t.color}`}>
                            <i className={`fa-solid ${t.icon} text-2xl`}></i>
                        </div>
                        <div>
                            <p className="text-lg font-black text-zinc-200 tracking-tight">{t.title}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{t.date}</span>
                                <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>
                                <span className="text-[10px] font-black text-amber-500/60 uppercase tracking-[3px]">Verified Transaction</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-left">
                        <span className={`text-3xl font-black ${t.type === 'IN' ? 'text-green-400' : 'text-zinc-500'} tracking-tighter`}>{t.amount}</span>
                        <div className="flex items-center justify-end gap-1 mt-1">
                           <i className="fa-solid fa-gem text-[8px] text-zinc-700"></i>
                           <p className="text-[9px] text-zinc-700 font-black uppercase tracking-tighter">Crystals</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Withdrawal Modal - Professional Flow */}
      {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowWithdrawModal(false)}></div>
              <div className="relative w-full max-w-lg glass rounded-[50px] p-10 border border-white/10 animate-slide-up shadow-[0_50px_200px_rgba(0,0,0,1)]">
                  <h3 className="text-2xl font-black mb-6 text-center tracking-tighter">تحويل الثروة إلى العالم الحقيقي</h3>
                  <div className="space-y-6 mb-10">
                      {[
                        { name: 'PayPal Elite', icon: 'fa-brands fa-paypal', detail: 'تحويل فوري (عمولة ١٪)' },
                        { name: 'التحويل البنكي السيادي', icon: 'fa-solid fa-bank', detail: 'خلال ٢٤ ساعة (عمولة ٠٪)' },
                        { name: 'محفظة Crypto المتقدمة', icon: 'fa-brands fa-ethereum', detail: 'تحويل بلوكتشين مشفر' }
                      ].map((method, i) => (
                          <button key={i} className="w-full flex items-center justify-between p-6 glass rounded-3xl border-white/5 hover:border-amber-500/30 transition-all group">
                              <div className="flex items-center gap-6">
                                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 transition-all">
                                      <i className={`${method.icon} text-2xl text-zinc-400 group-hover:text-amber-500`}></i>
                                  </div>
                                  <div className="text-right">
                                      <p className="font-black text-base">{method.name}</p>
                                      <p className="text-[10px] text-zinc-500 font-bold">{method.detail}</p>
                                  </div>
                              </div>
                              <div className="w-6 h-6 rounded-full border-2 border-zinc-800 group-hover:border-amber-500 group-hover:bg-amber-500/20"></div>
                          </button>
                      ))}
                  </div>
                  <button 
                    onClick={handleWithdraw}
                    disabled={isWithdrawing}
                    className="w-full py-8 bg-white text-black rounded-full font-black text-xl shadow-[0_20px_60px_rgba(255,255,255,0.2)] tap-active shimmer flex items-center justify-center gap-4"
                  >
                      {isWithdrawing ? (
                        <>
                          <i className="fa-solid fa-spinner-third animate-spin"></i>
                          جاري معالجة البروتوكول...
                        </>
                      ) : (
                        `تأكيد سحب $${(crystals / 100).toFixed(2)} دولار`
                      )}
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default Wallet;
