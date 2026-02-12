
import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';

const Create: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'AI' | 'CAMERA' | 'UPLOAD'>('AI');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [genType, setGenType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [quality, setQuality] = useState('4K'); // Exclusive to Spark Pro

  const gemini = GeminiService.getInstance();

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    try {
      const enhanced = await gemini.generateFastResponse(
        `أنت خبير في صياغة الأوامر (Prompt Engineering). قم بتحسين الوصف التالي لجعله أكثر تفصيلاً وسينمائية لنموذج توليد الصور/الفيديو، اجعل النتيجة باللغة الإنجليزية حصراً لضمان أفضل دقة للتوليد: "${prompt}"`
      );
      setPrompt(enhanced);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResultUrl(null);
    try {
      if (genType === 'IMAGE') {
        const url = await gemini.generateImage(prompt, aspectRatio, quality === '4K' ? "2K" : "1K");
        if (url) setResultUrl(url);
      } else {
        const url = await gemini.generateVideo(prompt, aspectRatio as any);
        if (url) setResultUrl(url);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-black overflow-hidden page-transition">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10 pointer-events-none"></div>

      <header className="p-8 shrink-0 relative z-20 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-1">
             <i className="fa-solid fa-wand-sparkles text-blue-400"></i>
             <h2 className="text-3xl font-black tracking-tighter">استوديو النخبة</h2>
          </div>
          <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[10px] opacity-60">Spark AI Studio Pro v2.5</p>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar p-6 relative z-10 pb-32">
        <div className="flex gap-4 mb-10 glass p-2 rounded-[32px]">
            {[
                { id: 'AI', label: 'توليد ذكي', icon: 'fa-sparkles' },
                { id: 'CAMERA', label: 'عدسة Spark', icon: 'fa-camera-viewfinder' },
                { id: 'UPLOAD', label: 'استيراد', icon: 'fa-arrow-up-to-bracket' }
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-4 rounded-[26px] text-[11px] font-black transition-all flex items-center justify-center gap-2 tap-active ${
                        activeTab === tab.id ? 'bg-white text-black shadow-2xl' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                >
                    <i className={`fa-solid ${tab.icon}`}></i>
                    {tab.label}
                </button>
            ))}
        </div>

        {activeTab === 'AI' && (
            <div className="space-y-8 animate-fade-in">
                <div className="glass p-8 rounded-[48px] space-y-10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setGenType('IMAGE')}
                            className={`flex-1 py-6 rounded-[30px] border-2 transition-all flex flex-col items-center gap-3 tap-active ${
                                genType === 'IMAGE' ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.15)]' : 'bg-transparent border-zinc-900 text-zinc-500 hover:border-zinc-800'
                            }`}
                        >
                            <i className="fa-solid fa-paintbrush-pencil text-2xl"></i>
                            <span className="text-[10px] font-black uppercase tracking-wider">لوحة فنية (Pro)</span>
                        </button>
                        <button 
                            onClick={() => setGenType('VIDEO')}
                            className={`flex-1 py-6 rounded-[30px] border-2 transition-all flex flex-col items-center gap-3 tap-active ${
                                genType === 'VIDEO' ? 'bg-purple-600/10 border-purple-500 text-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.15)]' : 'bg-transparent border-zinc-900 text-zinc-500 hover:border-zinc-800'
                            }`}
                        >
                            <i className="fa-solid fa-clapperboard text-2xl"></i>
                            <span className="text-[10px] font-black uppercase tracking-wider">مشهد Veo 3.1</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-2">
                           <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[4px]">وصف المشهد الإبداعي</label>
                           <button 
                            onClick={handleEnhancePrompt}
                            disabled={isEnhancing || !prompt.trim()}
                            className="text-[8px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all tap-active"
                           >
                               {isEnhancing ? 'جاري التحسين...' : 'Magic Prompt'}
                           </button>
                        </div>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="تخيل رائد فضاء يتجول في غابة من الكريستال المتوهج بأسلوب واقعي سينمائي..."
                            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-[35px] p-7 text-sm focus:border-blue-500/50 focus:outline-none h-44 resize-none transition-all placeholder:text-zinc-800 font-bold leading-relaxed shadow-inner"
                        />
                    </div>

                    <div className="flex gap-10">
                       <div className="flex-1 space-y-4">
                           <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[4px] px-2">الأبعاد</label>
                           <div className="flex gap-2 flex-wrap">
                               {['9:16', '16:9', '1:1'].map(ratio => (
                                   <button
                                       key={ratio}
                                       onClick={() => setAspectRatio(ratio)}
                                       className={`px-5 py-2 rounded-2xl text-[10px] font-black border transition-all tap-active ${
                                           aspectRatio === ratio ? 'bg-white text-black border-white' : 'border-zinc-900 text-zinc-600 hover:text-zinc-400'
                                       }`}
                                   >
                                       {ratio}
                                   </button>
                               ))}
                           </div>
                       </div>
                       <div className="flex-1 space-y-4">
                           <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[4px] px-2">الجودة</label>
                           <div className="flex gap-2">
                               {['HD', '4K'].map(q => (
                                   <button
                                       key={q}
                                       onClick={() => setQuality(q)}
                                       className={`flex-1 py-2 rounded-2xl text-[10px] font-black border transition-all tap-active ${
                                           quality === q ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'border-zinc-900 text-zinc-600'
                                       }`}
                                   >
                                       {q}
                                   </button>
                               ))}
                           </div>
                       </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt.trim()}
                        className={`w-full py-7 rounded-[35px] font-black text-lg flex items-center justify-center gap-4 transition-all shadow-2xl tap-active group overflow-hidden ${
                            isLoading ? 'bg-zinc-900 cursor-not-allowed' : 'bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-500 text-white hover:shadow-blue-500/20'
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <i className="fa-solid fa-atom-simple animate-spin text-2xl"></i>
                                <span className="animate-pulse tracking-tight">جاري نسج الواقع الافتراضي...</span>
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-sparkles text-xl group-hover:scale-125 transition-transform duration-500"></i>
                                إطلاق محرك Spark AI
                            </>
                        )}
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                </div>

                {resultUrl && (
                    <div className="animate-slide-up space-y-8">
                        <div className="relative rounded-[50px] overflow-hidden glass p-3 shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5 group">
                            <div className="rounded-[40px] overflow-hidden relative">
                                {genType === 'IMAGE' ? (
                                    <img src={resultUrl} alt="Output" className="w-full object-cover max-h-[75vh]" />
                                ) : (
                                    <video src={resultUrl} controls className="w-full object-cover max-h-[75vh]" autoPlay loop />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            
                            <div className="absolute top-8 right-8 flex flex-col gap-2">
                                <span className="glass px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest text-amber-500 shadow-xl border border-amber-500/20">Spark Pro Original</span>
                                <span className="glass px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest text-blue-400 shadow-xl border border-blue-400/20">{quality} Ultra</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 p-2">
                            <button className="flex-1 py-6 glass rounded-[30px] font-black text-xs hover:bg-white/5 transition-all flex items-center justify-center gap-3 tap-active shadow-xl border border-white/10">
                                <i className="fa-solid fa-floppy-disk"></i>
                                حفظ للمعرض
                            </button>
                            <button className="flex-[1.5] py-6 bg-white text-black rounded-[30px] font-black text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                                <i className="fa-solid fa-paper-plane"></i>
                                نشر في "لك"
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}

        {(activeTab === 'CAMERA' || activeTab === 'UPLOAD') && (
            <div className="h-[65vh] flex flex-col items-center justify-center text-center p-12 glass rounded-[60px] border-2 border-dashed border-white/10 animate-fade-in">
                <div className="w-40 h-40 glass rounded-[50px] flex items-center justify-center mb-10 shadow-2xl relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <i className={`fa-solid ${activeTab === 'CAMERA' ? 'fa-camera-cctv' : 'fa-folder-arrow-up'} text-6xl text-zinc-800 group-hover:text-blue-500 transition-all duration-700 scale-90 group-hover:scale-110`}></i>
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tight">جاهز للإبداع؟</h3>
                <p className="text-zinc-600 text-sm font-bold mb-12 leading-relaxed max-w-xs">التقط لحظاتك الملكية أو ارفع أعمالك ليقوم Spark AI بتحويلها إلى تحفة فنية.</p>
                <input type="file" className="hidden" id="studio-upload-pro" accept={activeTab === 'CAMERA' ? "image/*,video/*" : "*"} capture={activeTab === 'CAMERA' ? "environment" : undefined} />
                <label htmlFor="studio-upload-pro" className="bg-white text-black px-16 py-6 rounded-[30px] font-black text-sm cursor-pointer hover:shadow-2xl transition-all active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center gap-3">
                    <i className={`fa-solid ${activeTab === 'CAMERA' ? 'fa-aperture' : 'fa-cloud-arrow-up'}`}></i>
                    {activeTab === 'CAMERA' ? 'تشغيل عدسة Spark' : 'تصفح الاستوديو'}
                </label>
            </div>
        )}
      </div>
    </div>
  );
};

export default Create;
