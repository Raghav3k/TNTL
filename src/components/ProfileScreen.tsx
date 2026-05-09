import { AppState } from '../types';
import { Trophy, ChevronLeft, Flame, Award, Crosshair } from 'lucide-react';

export function ProfileScreen({ setScreen }: Pick<AppState, 'setScreen'>) {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans p-4 md:p-8 relative">
      
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-neon-purple/10 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        <header className="flex items-center justify-between mb-12">
          <button 
             onClick={() => setScreen('landing')}
             className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
             <ChevronLeft className="w-6 h-6" /> <span className="font-bold uppercase tracking-wider">Back</span>
          </button>
          <div className="font-display font-bold text-2xl tracking-tight">LaughLoop</div>
          <div className="w-8" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Profile Sidebar */}
          <div className="col-span-1 glass-panel rounded-3xl p-6 flex flex-col items-center border-white/5">
             <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-neon-purple mb-4 relative neon-glow-purple">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover bg-zinc-800" />
               <div className="absolute inset-0 ring-inset ring-2 ring-white/10 rounded-full mix-blend-overlay" />
             </div>
             <h2 className="font-display font-bold text-3xl tracking-tighter mb-1">@felix_the_cat</h2>
             <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8 max-w-max">NA West</span>

             <div className="w-full grid grid-cols-2 gap-4 gap-y-6">
                <div className="flex flex-col items-center">
                  <Flame className="w-6 h-6 text-neon-pink mb-2" />
                  <span className="font-mono text-xl font-bold">12</span>
                  <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Curr Streak</span>
                </div>
                <div className="flex flex-col items-center">
                  <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
                  <span className="font-mono text-xl font-bold">1,402</span>
                  <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Rank Pts</span>
                </div>
                <div className="flex flex-col items-center">
                  <Award className="w-6 h-6 text-neon-lime mb-2" />
                  <span className="font-mono text-xl font-bold">84%</span>
                  <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Win Rate</span>
                </div>
                <div className="flex flex-col items-center">
                  <Crosshair className="w-6 h-6 text-neon-blue mb-2" />
                  <span className="font-mono text-xl font-bold">4.2s</span>
                  <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Avg Time to Break</span>
                </div>
             </div>
          </div>

          {/* Leaderboard Main */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-display font-black text-4xl uppercase tracking-tighter mb-6 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              Global Top Breakers
            </h3>

            <div className="flex flex-col gap-3">
              {[
                { rank: 1, name: '@laughmaster99', points: 4200, streak: 34, isUser: false },
                { rank: 2, name: '@stone_cold', points: 3850, streak: 12, isUser: false },
                { rank: 3, name: '@meme_god', points: 3100, streak: 8, isUser: false },
                { rank: 4, name: '@joker_irl', points: 2900, streak: 5, isUser: false },
                { rank: 542, name: '@felix_the_cat', points: 1402, streak: 12, isUser: true },
              ].map((user, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${user.isUser ? 'bg-white/5 border-neon-purple/50 neon-glow-purple' : 'glass-panel border-white/5 hover:bg-white/5'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 text-center font-display font-black text-2xl ${user.rank <= 3 ? 'text-yellow-400' : 'text-zinc-600'}`}>
                      #{user.rank}
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 shrink-0">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{user.name} {user.isUser && <span className="text-xs bg-neon-purple text-white px-2 py-0.5 rounded-full ml-2 align-middle">YOU</span>}</div>
                      <div className="text-sm font-mono text-zinc-400">{user.points.toLocaleString()} PTS</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                     <div className="flex items-center justify-end gap-1 text-neon-pink">
                       <Flame className="w-4 h-4 fill-current" />
                       <span className="font-bold font-mono">{user.streak}</span>
                     </div>
                     <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Streak</span>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
