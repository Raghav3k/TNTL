import { AppState } from '../types';
import { motion } from 'motion/react';
import { Play, Share2, Home } from 'lucide-react';

export function ResultScreen({ setScreen, gameResult }: Pick<AppState, 'setScreen' | 'gameResult'>) {
  const isWin = gameResult === 'win';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-zinc-950 font-sans">
      
      {/* Background FX */}
      <div className={`absolute inset-0 ${isWin ? 'bg-neon-lime/10' : 'bg-neon-pink/10'} opacity-30 z-0 bg-noise`} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full blur-[150px] z-0 ${isWin ? 'bg-neon-lime/20' : 'bg-neon-pink/20'}`} />

      <main className="z-10 flex flex-col items-center text-center p-6 w-full max-w-2xl">
        
        <motion.div
           initial={{ scale: 0.5, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ type: 'spring', bounce: 0.6, duration: 0.8 }}
        >
          <h1 className={`font-display text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4 ${isWin ? 'text-neon-lime neon-text-lime' : 'text-neon-pink neon-text-pink'}`}>
            {isWin ? 'YOU WIN!' : 'YOU CRACKED!'}
          </h1>
          <p className="text-2xl font-bold text-white/80 uppercase tracking-widest mb-12">
            {isWin ? 'Opponent laughed first.' : 'You couldn\'t hold it in.'}
          </p>
        </motion.div>

        {/* Stats card mock */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full glass-panel rounded-3xl p-6 mb-12 shadow-2xl border-white/5"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-zinc-400 uppercase tracking-wider text-sm">Round Summary</span>
            <span className="font-mono text-zinc-500 text-sm">Match ID: #88392A</span>
          </div>

          <div className="flex justify-between items-center">
            
            <div className="text-left flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mb-2">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="You" className="w-full h-full object-cover bg-zinc-800" />
              </div>
              <span className="font-bold">You</span>
              <span className={`text-sm font-bold mt-1 ${!isWin ? 'text-neon-pink' : 'text-zinc-500'}`}>
                {!isWin ? 'Laughed at 0:12' : 'Stone cold'}
              </span>
            </div>

            <div className="font-display text-4xl font-black text-zinc-700">VS</div>

            <div className="text-right flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mb-2">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Opponent1" alt="Opponent" className="w-full h-full object-cover bg-zinc-800 grayscale" />
              </div>
              <span className="font-bold">@laughmaster99</span>
              <span className={`text-sm font-bold mt-1 ${isWin ? 'text-neon-pink' : 'text-zinc-500'}`}>
                {isWin ? 'Laughed at 0:08' : 'Stone cold'}
              </span>
            </div>
            
          </div>
          
          {isWin && (
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
               <div className="text-sm font-bold text-neon-lime mb-1 uppercase tracking-widest">+25 Rank Points</div>
               <div className="text-xs text-zinc-500">Streak: 5 Bonus</div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row gap-4 w-full"
        >
          <button 
             onClick={() => setScreen('matchmaking')}
             className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-black rounded-xl font-bold font-display uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
             <Play className="w-5 h-5 fill-current" /> Next Match
          </button>
          
          <button 
            className="flex-1 flex items-center justify-center gap-2 py-4 glass-panel hover:bg-white/10 rounded-xl font-bold font-display uppercase tracking-wider transition-colors"
          >
             <Share2 className="w-5 h-5" /> Share Clip
          </button>
        </motion.div>
        
        <button 
          onClick={() => setScreen('landing')}
          className="mt-6 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <Home className="w-4 h-4" /> Return to Lobby
        </button>

      </main>
    </div>
  );
}
