import { AppState } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Video, VideoOff, Wand2, SmilePlus, SkipForward, AlertTriangle, XOctagon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function LiveChallengeScreen({ setScreen, setGameResult }: Pick<AppState, 'setScreen' | 'setGameResult'>) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isYourTurn, setIsYourTurn] = useState(true);
  const [laughMeter, setLaughMeter] = useState(10); // 0-100

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      if (isYourTurn) {
        setIsYourTurn(false);
        setTimeLeft(30);
      } else {
        // Tie or proceed to sudden death, for demo just randomly win/lose
        setGameResult('win');
        setScreen('result');
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      
      // Simulate laugh meter changes randomly
      if (Math.random() > 0.5) {
        setLaughMeter(prev => {
          const change = (Math.random() * 15) - 5;
          const next = prev + change;
          if (next > 90) {
             // Ops, laughed
             clearInterval(timer);
             setGameResult(isYourTurn ? 'win' : 'lose');
             setTimeout(() => setScreen('result'), 1000);
             return 100;
          }
          return Math.max(0, Math.min(100, next));
        });
      }

    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isYourTurn, setScreen, setGameResult]);

  const timerColor = timeLeft > 15 ? 'text-neon-lime' : timeLeft > 5 ? 'text-yellow-400' : 'text-neon-pink';
  const strokeColor = timeLeft > 15 ? '#39ff14' : timeLeft > 5 ? '#facc15' : '#ff107a';

  return (
    <div className="h-screen w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-dark-bg flex flex-col relative overflow-hidden font-sans">
      
      {/* Background ambient noise */}
      <div className="absolute inset-0 bg-noise opacity-20 z-0 pointer-events-none" />

      {/* Top HUD */}
      <nav className="absolute top-0 left-0 w-full h-16 flex justify-between items-center px-6 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-pink to-neon-purple flex items-center justify-center font-display font-black italic tracking-tighter text-2xl neon-glow-purple">
              TNTL
            </div>
            <span className="font-display font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">LAUGHLOOP</span>
          </div>
          <div className="flex items-center gap-3 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Live Battle</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-zinc-800/50 px-4 py-1.5 rounded-full border border-white/5">
            <span className="text-yellow-400 font-bold">Round 1</span>
            <span className="text-xs text-zinc-400 uppercase tracking-widest">/ 3</span>
          </div>
          <button onClick={() => setScreen('landing')} className="text-zinc-400 hover:text-white transition-colors cursor-pointer">
            <XOctagon className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Split Screen Arena */}
      <main className="flex-1 flex w-full h-full pt-20 pb-28 gap-4 px-6 relative z-10 items-center justify-center max-w-[1400px] mx-auto">
        
        {/* Left: Opponent */}
        <div className={`flex-1 h-full max-h-[600px] relative overflow-hidden rounded-3xl bg-zinc-800 shadow-2xl group transition-all duration-300 ${!isYourTurn ? 'border-2 border-neon-pink neon-glow-pink scale-[1.02]' : 'border-2 border-white/10'}`}>
          {/* Mock Video Feed */}
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop" alt="Opponent" className="absolute inset-0 w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-black/40 flex items-center justify-center">
            {/* Mock Video Content could be image too, keeping existing img but blending */}
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop" alt="Opponent" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80" />
            {!isYourTurn && <div className="text-8xl relative z-10 animate-bounce">🥴</div>}
          </div>
          
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full z-10 border border-white/10">
            <span className="text-xs font-bold tracking-wide">GIGGLE_SNIPER99</span>
            <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse"></div>
          </div>
          
          <div className="absolute top-6 right-6 flex flex-col items-end gap-2 z-10">
            <div className="bg-orange-500 text-[10px] font-black px-2 py-0.5 rounded shadow-lg">STREAK 🔥 4</div>
            {laughMeter > 70 && (
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 className="bg-yellow-400 text-black px-2 py-1 rounded font-black text-[10px] shadow-lg flex items-center gap-1"
               >
                 ⚠️ ALMOST CRACKED!
               </motion.div>
            )}
          </div>
          
          {/* Horizontal Laugh Meter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4 max-w-sm z-10 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <div className="text-[10px] font-black text-center mb-1.5 uppercase tracking-[0.2em] text-zinc-400">LAUGH METER</div>
            <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden border border-white/5 relative">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-yellow-400"
                style={{ boxShadow: '0 0 10px #4ade80' }}
                animate={{ width: `${laughMeter}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            </div>
          </div>
        </div>

        {/* Center Timer Overlay */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
           <div className="relative">
             <div className="w-32 h-32 rounded-full border-4 border-zinc-700 flex items-center justify-center bg-black shadow-2xl relative">
               <svg className="absolute inset-0 w-full h-full -rotate-90">
                 <circle cx="60" cy="60" r="56" className="stroke-zinc-700" strokeWidth="8" fill="none" />
                 <motion.circle 
                   cx="60" cy="60" r="56" 
                   stroke={strokeColor}
                   strokeWidth="8" 
                   fill="none" 
                   strokeLinecap="round"
                   initial={{ strokeDasharray: "352", strokeDashoffset: "0" }}
                   animate={{ strokeDashoffset: 352 - (352 * (timeLeft / 30)) }}
                   transition={{ duration: 1, ease: "linear" }}
                   style={{ filter: `drop-shadow(0 0 10px ${strokeColor})`, transformOrigin: 'center', transform: 'scale(1.07)' }}
                 />
               </svg>
               <motion.span 
                 animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
                 transition={{ repeat: Infinity, duration: 0.5 }}
                 className="text-5xl font-black italic tracking-tighter" 
                 style={{ color: strokeColor, textShadow: `0 0 15px ${strokeColor}80` }}
               >
                 {timeLeft}
               </motion.span>
             </div>
             <motion.div 
               animate={{ scale: [1, 1.05, 1] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className={`absolute -top-4 left-1/2 -translate-x-1/2 text-black text-[10px] font-black px-3 py-1 rounded shadow-lg whitespace-nowrap ${isYourTurn ? 'bg-neon-lime' : 'bg-neon-pink'}`}
             >
               {isYourTurn ? 'YOUR TURN' : 'THEIR TURN'}
             </motion.div>
           </div>
           
           <div className="mt-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex flex-col items-center shadow-xl">
             <div className="text-[10px] text-zinc-400 uppercase font-black tracking-widest mb-1">ROUNDS</div>
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-neon-purple shadow-[0_0_8px_#bf00ff]"></div>
               <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
               <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
             </div>
           </div>
        </div>

        {/* Right: You */}
        <div className={`flex-1 h-full max-h-[600px] relative overflow-hidden rounded-3xl bg-zinc-800 shadow-[0_0_40px_rgba(57,255,20,0.2)] group transition-all duration-300 ${isYourTurn ? 'border-[3px] border-neon-lime scale-[1.02]' : 'border-2 border-white/10'}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/20 to-black flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop" alt="You" className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 mix-blend-overlay opacity-60 grayscale" />
            {isYourTurn && <div className="text-8xl relative z-10 opacity-80">😐</div>}
          </div>
          
          {isYourTurn && <div className="absolute inset-0 border-[10px] border-neon-lime/10 animate-pulse pointer-events-none"></div>}
          
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full z-10 border border-white/10">
            <span className="text-xs font-bold tracking-wide">YOU (BATTLE)</span>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>

          {/* Horizontal Laugh Meter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4 max-w-sm z-10 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <div className="text-[10px] font-black text-center mb-1.5 uppercase tracking-[0.2em] text-zinc-400">LAUGH METER</div>
            <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden border border-white/5 relative">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-orange-500"
                style={{ boxShadow: '0 0 15px #f97316' }}
                animate={{ width: `${Math.max(15, laughMeter - 20)}%` }} // Just some fake difference
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            </div>
          </div>
        </div>

      </main>

      {/* Bottom Control Bar aligned with Vibrant Palette */}
      <footer className="absolute bottom-0 w-full h-24 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 px-8 z-40">
        <div className="absolute left-8 flex gap-3 hidden md:flex">
          <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 border border-white/10 text-xl transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 border border-white/10 text-xl transition-colors">
            <Mic className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <button className="p-3 w-16 h-16 rounded-2xl bg-zinc-800 border border-white/10 flex flex-col items-center justify-center gap-1 hover:border-neon-blue group transition-colors">
            <Wand2 className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:text-neon-blue transition-colors" />
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-neon-blue">Filters</span>
          </button>
          <button className="p-3 w-16 h-16 rounded-2xl bg-zinc-800 border border-white/10 flex flex-col items-center justify-center gap-1 hover:border-yellow-500 group transition-colors">
            <SmilePlus className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:text-yellow-500 transition-colors" />
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-yellow-500">Sounds</span>
          </button>
          
          <button 
            onClick={() => setScreen('result')}
            className="h-16 px-8 md:px-12 mx-2 rounded-2xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-black text-sm tracking-[0.1em] shadow-[0_10px_20px_rgba(191,0,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            NEXT MATCH <SkipForward className="w-4 h-4" />
          </button>

          <button className="p-3 w-16 h-16 rounded-2xl bg-zinc-800 border border-white/10 flex flex-col items-center justify-center gap-1 hover:border-neon-lime group transition-colors hidden sm:flex">
            <span className="text-xl leading-none">😀</span>
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-neon-lime">Emoji</span>
          </button>
          <button className="p-3 w-16 h-16 rounded-2xl bg-zinc-800 border border-white/10 flex flex-col items-center justify-center gap-1 hover:border-red-500 group transition-colors hidden sm:flex">
            <AlertTriangle className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:text-red-500 transition-colors" />
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-red-500">Report</span>
          </button>
        </div>

        <div className="absolute right-8 hidden xl:block">
           <button onClick={() => setScreen('landing')} className="h-10 px-5 rounded-full border border-red-500/50 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 transition-colors">
             Exit Challenge
           </button>
        </div>
      </footer>
    </div>
  );
}
