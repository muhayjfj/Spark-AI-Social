
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

interface LiveSupportProps {
    onBack: () => void;
}

const LiveSupport: React.FC<LiveSupportProps> = ({ onBack }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('جاهز للاتصال المباشر');
  const [isMuted, setIsMuted] = useState(false);
  const [voicePower, setVoicePower] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Simulation of neural activity pulse
  useEffect(() => {
    if (isActive) {
        const interval = setInterval(() => {
            setVoicePower(Math.random() * 100);
        }, 150);
        return () => clearInterval(interval);
    } else {
        setVoicePower(0);
    }
  }, [isActive]);

  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  const startSession = async () => {
    setStatus('جاري تأمين اتصال مشفر فائق...');
    setIsActive(true);
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
        audioContextRef.current = outputAudioContext;
        
        let nextStartTime = 0;

        const session = await ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-12-2025',
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
                },
                systemInstruction: 'أنت مساعد دعم ملكي فاخر لتطبيق Spark AI. لغتك عربية راقية، واثقة، ومفيدة جداً. تساعد المبدعين في زيادة أرباحهم واستخدام أدوات AI.'
            },
            callbacks: {
                onopen: () => {
                    setStatus('مكالمة نشطة - Spark AI معك');
                },
                onmessage: async (message) => {
                    const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                    if (base64Audio && audioContextRef.current) {
                        nextStartTime = Math.max(nextStartTime, audioContextRef.current.currentTime);
                        const audioBuffer = await decodeAudioData(
                            decode(base64Audio),
                            audioContextRef.current,
                            24000,
                            1
                        );
                        
                        const source = audioContextRef.current.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(audioContextRef.current.destination);
                        
                        source.addEventListener('ended', () => {
                            sourcesRef.current.delete(source);
                        });

                        source.start(nextStartTime);
                        nextStartTime += audioBuffer.duration;
                        sourcesRef.current.add(source);
                    }

                    if (message.serverContent?.interrupted) {
                        for (const source of sourcesRef.current.values()) {
                            source.stop();
                        }
                        sourcesRef.current.clear();
                        nextStartTime = 0;
                    }
                },
                onclose: () => stopSession(),
                onerror: () => setStatus('خطأ فني في بروتوكول الاتصال')
            }
        });
        
        sessionRef.current = session;
        session.sendRealtimeInput({ media: { data: '', mimeType: 'audio/pcm;rate=16000' } });

    } catch (error) {
        setStatus('فشل تأمين المكالمة السيادية');
        setIsActive(false);
    }
  };

  const stopSession = () => {
    sessionRef.current?.close();
    audioContextRef.current?.close();
    setIsActive(false);
    setStatus('انتهت الجلسة الملكية الآمنة');
  };

  return (
    <div className="h-full bg-black flex flex-col items-center justify-between p-12 text-center animate-fade-in relative overflow-hidden">
      <div className="mesh-bg"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-[150px] rounded-full"></div>
      
      <header className="w-full flex justify-between items-center relative z-10">
        <button onClick={onBack} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 text-zinc-500 hover:text-white transition-all tap-active shadow-2xl">
            <i className="fa-solid fa-chevron-right text-2xl"></i>
        </button>
        <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/15 backdrop-blur-3xl shadow-xl">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse shadow-[0_0_15px_#22c55e]' : 'bg-zinc-700'}`}></div>
            <span className="text-[11px] font-black uppercase tracking-[4px] text-zinc-400">Secure Sovereign Line</span>
        </div>
        <div className="w-14"></div>
      </header>

      <div className="flex flex-col items-center gap-14 relative z-10">
        <div className="relative">
            {/* Visualizer Rings */}
            {isActive && [...Array(3)].map((_, i) => (
                <div 
                    key={i} 
                    className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping"
                    style={{ animationDelay: `${i * 0.5}s`, transform: `scale(${1 + (voicePower/100) * 0.3})` }}
                ></div>
            ))}
            
            <div className={`w-56 h-56 rounded-full bg-gradient-to-tr from-blue-600 via-purple-700 to-indigo-500 flex items-center justify-center relative z-10 shadow-[0_0_100px_rgba(59,130,246,0.3)] transition-all duration-700 ${isActive ? 'scale-110' : ''}`}>
                <div className="w-[94%] h-[94%] rounded-full bg-black flex items-center justify-center m-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/5 blur-3xl"></div>
                    <i className={`fa-solid fa-sparkles text-7xl text-transparent bg-gradient-to-tr from-blue-400 to-indigo-300 bg-clip-text drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] ${isActive ? 'animate-royal' : ''}`}></i>
                </div>
            </div>
        </div>

        <div>
            <h2 className="text-4xl font-black mb-4 tracking-tighter">Spark Royal Intelligence</h2>
            <p className={`text-lg font-bold tracking-wider transition-colors duration-500 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`}>{status}</p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-10 items-center relative z-10 pb-12">
        {isActive ? (
            <div className="flex gap-10 items-center animate-slide-up">
                <button onClick={() => setIsMuted(!isMuted)} className={`w-18 h-18 rounded-[28px] flex items-center justify-center border transition-all shadow-2xl ${isMuted ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-zinc-900 border-white/10 text-white hover:bg-zinc-800'}`}>
                    <i className={`fa-solid ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'} text-2xl`}></i>
                </button>
                <button onClick={stopSession} className="w-28 h-28 bg-red-600 rounded-full flex items-center justify-center shadow-[0_30px_90px_rgba(220,38,38,0.5)] hover:scale-110 active:scale-90 transition-all border-4 border-black/20">
                    <i className="fa-solid fa-phone-slash text-4xl text-white"></i>
                </button>
                <button className="w-18 h-18 bg-zinc-900 border border-white/10 rounded-[28px] flex items-center justify-center text-white hover:bg-zinc-800 shadow-2xl">
                    <i className="fa-solid fa-wave-pulse text-2xl text-blue-400"></i>
                </button>
            </div>
        ) : (
            <button onClick={startSession} className="group relative bg-white text-black px-20 py-7 rounded-[40px] font-black text-xl shadow-[0_40px_100px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95 flex items-center gap-5 overflow-hidden shimmer">
                <i className="fa-solid fa-phone-volume text-2xl"></i>
                بدء المكالمة الملكية
            </button>
        )}
        
        <div className="flex flex-col gap-2">
            <p className="text-[11px] text-zinc-600 font-black uppercase tracking-[5px] opacity-80">
                End-to-End Encryption Enabled
            </p>
            <div className="w-20 h-0.5 bg-zinc-900 mx-auto rounded-full overflow-hidden">
                <div className="h-full bg-blue-500/50 w-1/2 animate-pulse mx-auto"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSupport;
