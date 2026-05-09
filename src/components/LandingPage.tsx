import { AppState } from '../types';
import { motion } from 'motion/react';
import { Play, Users, Sparkles, TrendingUp, Trophy } from 'lucide-react';

export function LandingPage({ setScreen }: Pick<AppState, 'setScreen'>) {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Background radial gradients for atmosphere */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neon-purple/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-lime/10 blur-[120px] pointer-events-none" />

      {/* Top Nav (simplified for landing) */}
      <nav className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center z-10 bg-dark-surface/80 backdrop-blur-xl border-b border-white/10 mb-12">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-pink to-neon-purple flex items-center justify-center font-display font-black italic tracking-tighter text-2xl neon-glow-purple">
              TNTL
            </div>
            <span className="font-display font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">LAUGHLOOP</span>
          </div>
          <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-red-500">14,202 LIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-zinc-800/50 px-4 py-1.5 rounded-full border border-white/5 hover:bg-zinc-800 transition-colors">
            <span className="text-yellow-400 font-bold">⚡ 420</span>
            <span className="text-xs text-zinc-400 uppercase tracking-widest">COINS</span>
          </button>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setScreen('profile')}>
            <div className="text-right">
              <div className="text-xs font-bold">CHAD_GIGGLES</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">RANK #42</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white/20 p-0.5 group-hover:scale-105 transition-transform">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full rounded-full object-cover bg-zinc-900" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-center p-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full text-sm font-bold mb-8 text-red-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            14,203 players live now
          </div>

          <h1 className="font-display text-7xl md:text-9xl font-extrabold uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-2xl">
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">First One To</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple mt-2">Laugh Loses.</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto mb-12">
            Face off against strangers in a 30-second battle of holding a straight face. Can you survive?
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setScreen('matchmaking')}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-6 bg-gradient-to-r from-neon-pink to-neon-purple text-white font-display font-black text-xl uppercase tracking-[0.1em] rounded-2xl overflow-hidden shadow-[0_10px_20px_rgba(191,0,255,0.3)] transition-all"
          >
            <Play className="w-8 h-8 fill-current" />
            Start Match
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </motion.button>
        </motion.div>

        {/* Viral Clips Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-24 mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-neon-pink" />
            <h2 className="text-[14px] font-black text-zinc-500 uppercase tracking-[0.2em]">Trending Battles</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-zinc-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <img src={`https://picsum.photos/400/700?random=${i}`} alt={`Clip ${i}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105" />
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                  <Play className="w-4 h-4 text-white fill-white" />
                  <span className="text-sm font-bold">{Math.floor(Math.random() * 900) + 100}K</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
