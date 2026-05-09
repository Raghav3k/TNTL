import { AppState } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Target, X, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function MatchmakingScreen({ setScreen }: Pick<AppState, 'setScreen'>) {
  const [waitTense, setWaitTense] = useState(0);

  // Fake matchmaking logic
  useEffect(() => {
    const timer = setInterval(() => {
      setWaitTense(prev => prev + 1);
    }, 1000);

    const matchFoundTimer = setTimeout(() => {
      setScreen('live');
    }, 4500); // Wait 4.5 seconds then jump to live

    return () => {
      clearInterval(timer);
      clearTimeout(matchFoundTimer);
    };
  }, [setScreen]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-zinc-950">
      
      <button 
        onClick={() => setScreen('landing')}
        className="absolute top-8 left-8 p-3 rounded-full glass-panel hover:bg-white/10 transition-colors z-20"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Radar Animation */}
      <div className="relative flex items-center justify-center w-full max-w-md aspect-square z-10">
        
        {/* Pulsing rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-neon-lime/30 inset-0"
            animate={{
              scale: [0.8, 2.5],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: ring * 1,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(57,255,20,0.4)_360deg)] rounded-full mix-blend-screen animate-[spin_3s_linear_infinite]" />

        {/* Center Target */}
        <div className="relative z-20 w-32 h-32 rounded-full bg-zinc-900 border-2 border-neon-lime flex items-center justify-center neon-glow-lime">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="You" className="w-full h-full rounded-full object-cover" />
          <div className="absolute -bottom-2 px-3 py-1 bg-neon-lime text-black text-xs font-bold rounded-full uppercase tracking-wider">
            Searching
          </div>
        </div>

        {/* Fake connecting points */}
        <AnimatePresence>
          {waitTense > 1 && (
            <motion.div 
              key="opponent1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-10 right-10 w-12 h-12 rounded-full bg-zinc-800 border-2 border-zinc-600 overflow-hidden"
            >
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Opponent1" alt="Op" className="w-full h-full opacity-50 grayscale" />
            </motion.div>
          )}
          {waitTense > 3 && (
            <motion.div 
              key="opponentMatched"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-zinc-800 border-2 border-neon-pink neon-glow-pink overflow-hidden z-30"
            >
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=OpponentMatched" alt="Op" className="w-full h-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-16 text-center z-10">
        <h2 className="font-display text-4xl font-bold uppercase tracking-tight mb-2">
          {waitTense > 3 ? (
            <span className="text-neon-pink animate-pulse">Opponent Found!</span>
          ) : (
            <span>Looking for victim...</span>
          )}
        </h2>
        <div className="flex items-center justify-center gap-2 text-zinc-500 font-mono">
          <Loader2 className="w-4 h-4 animate-spin" />
          Estimated wait: 0:0{5 - (waitTense % 5)}
        </div>
        <div className="mt-4 inline-block px-4 py-1 rounded-full border border-white/10 text-xs font-medium text-white/50 bg-white/5 backdrop-blur-sm">
          Region: NA West
        </div>
      </div>
    </div>
  );
}
