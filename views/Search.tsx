
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{text: string, sources: any[]} | null>(null);

  const gemini = GeminiService.getInstance();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setResults(null);
    try {
      const res = await gemini.searchGrounding(query);
      setResults(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="p-6 flex flex-col h-full bg-black page-transition overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none"></div>

      <div className="relative mb-8 z-10">
        <div className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
           <i className="fa-solid fa-magnifying-glass text-zinc-600 text-lg"></i>
        </div>
        <input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="ابحث عن الإلهام، الأشخاص، أو اسأل Spark AI..."
          className="w-full bg-zinc-950 border border-zinc-900 rounded-[30px] py-5 pr-14 pl-6 text-sm focus:outline-none focus:border-blue-500/50 transition-all shadow-inner placeholder:text-zinc-800 font-bold"
        />
        {query && (
          <button onClick={handleSearch} className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar z-10 pb-20">
        {isSearching && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
             <div className="w-20 h-20 rounded-[30px] bg-zinc-900 border border-white/5 flex items-center justify-center mb-6 shadow-2xl">
                <i className="fa-solid fa-wand-sparkles text-3xl text-blue-500 animate-spin-slow"></i>
             </div>
             <p className="text-zinc-600 font-black uppercase tracking-[5px] text-[10px]">Spark Insight Active</p>
          </div>
        )}

        {results && (
          <div className="animate-fade-in space-y-10">
             <div className="glass p-8 rounded-[45px] border border-blue-500/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="flex items-center gap-3 text-blue-400 mb-5 font-black text-xs uppercase tracking-widest">
                   <i className="fa-solid fa-brain-circuit"></i>
                   <span>تحليل Spark AI الفائق</span>
                </div>
                <p className="text-base leading-relaxed mb-8 text-zinc-300 font-medium">
                  {results.text}
                </p>
                {results.sources.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <span className="text-[9px] font-black text-zinc-600 mb-4 block uppercase tracking-widest">المصادر الموثوقة:</span>
                    <div className="grid grid-cols-1 gap-3">
                      {results.sources.map((chunk, i) => (
                        <a key={i} href={chunk.web?.uri} target="_blank" className="glass p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-all group">
                          <div className="flex items-center gap-3 truncate">
                            <i className="fa-solid fa-link-simple text-blue-500 text-xs"></i>
                            <span className="text-xs font-bold text-zinc-400 truncate">{chunk.web?.title || 'رابط خارجي'}</span>
                          </div>
                          <i className="fa-solid fa-chevron-left text-[10px] text-zinc-800 group-hover:translate-x-[-4px] transition-transform"></i>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
             </div>

             <div>
                <h3 className="text-xl font-black mb-6 px-4 tracking-tighter">اكتشافات ذات صلة</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                      <div key={i} className="aspect-[3/4] bg-zinc-950 rounded-[35px] overflow-hidden relative group border border-white/5 shadow-2xl">
                        <img src={`https://picsum.photos/400/533?s=${i+200}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="search result" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 mb-1">
                                <img src={`https://picsum.photos/50/50?u=${i}`} className="w-5 h-5 rounded-full border border-white/20" alt="avatar" />
                                <span className="text-[10px] font-black tracking-tighter text-white/80 truncate">@creator_{i+100}</span>
                            </div>
                            <p className="text-[9px] font-bold text-zinc-400 line-clamp-1">إبداع رقمي متقدم في عالم متطور</p>
                        </div>
                      </div>
                  ))}
                </div>
             </div>
          </div>
        )}

        {!isSearching && !results && (
          <div className="animate-fade-in space-y-12">
            <div>
              <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[5px] mb-6 px-4">رائج الآن</h3>
              <div className="flex flex-wrap gap-3 px-2">
                {['#الذكاء_الاصطناعي', '#Spark_Elite', '#مستقبل_التقنية', '#ابداع_خارق', '#Metaverse'].map(tag => (
                  <button key={tag} className="px-6 py-3 glass rounded-full text-xs font-black hover:bg-white text-zinc-400 hover:text-black transition-all tap-active border-white/5">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center px-4 mb-6">
                 <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[5px]">نخبة المبدعين</h3>
                 <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest">عرض الكل</button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="glass p-5 rounded-[30px] flex items-center justify-between group hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                         <img src={`https://picsum.photos/100/100?u=elite${i}`} className="w-14 h-14 rounded-[22px] border-2 border-zinc-800 group-hover:border-blue-500 transition-colors object-cover" alt="suggested" />
                         <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center">
                            <i className="fa-solid fa-check text-[8px]"></i>
                         </div>
                      </div>
                      <div>
                        <h4 className="font-black text-sm group-hover:text-blue-400 transition-colors">مبدع النخبة {i}</h4>
                        <p className="text-[10px] text-zinc-500 font-bold">خبير في توليد العوالم • ٢.٥ مليون متابع</p>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-white text-black rounded-full text-[10px] font-black tap-active shadow-xl">متابعة</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
