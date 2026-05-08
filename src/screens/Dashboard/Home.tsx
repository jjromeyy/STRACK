import { Zap, Clock, GraduationCap, ChevronRight, Timer, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export default function Home() {
  const tasks = [
    { id: 1, title: 'Review Organic Compounds', subject: 'Chemistry 101', done: false, priority: 'HIGH' },
    { id: 2, title: 'History Essay Outline', subject: 'World History II', done: false, priority: 'MEDIUM' },
  ];

  return (
    <div className="px-4 md:px-8 mt-6 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto pb-32">
      {/* LEFT: Tactical Tasks (Pinned) */}
      <section className="lg:col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-4">Tactical Nodes</h3>
           <div className="glass-card rounded-[2.5rem] p-6 flex flex-col gap-4 border border-white/5 shadow-2xl">
              {tasks.map((task, idx) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "p-5 rounded-3xl border-l-[6px] transition-all hover:bg-white/5 cursor-pointer group relative overflow-hidden",
                    task.priority === 'HIGH' ? "bg-slate-800/80 border-[#a3b18a]" : "bg-slate-800/40 border-slate-600 opacity-80"
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-base font-bold text-white group-hover:text-[#a3b18a] transition-colors tracking-tight">{task.title}</p>
                    {task.priority === 'HIGH' && (
                       <span className="px-2.5 py-1 bg-[#a3b18a]/10 text-[#a3b18a] text-[8px] rounded-lg border border-[#a3b18a]/20 font-black tracking-widest">CRITICAL</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                    <span>{task.subject}</span>
                    <span className="text-white/40">18:00</span>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Study Clock Widget */}
        <div className="glass-card rounded-[2.5rem] p-8 flex flex-col items-center border-[3px] border-dashed border-slate-700/50 bg-[#64748b]/5 relative group overflow-hidden">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a3b18a] mb-6 relative z-10">Deep Work Engine</span>
           <span className="text-6xl font-mono tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] relative z-10">21:04</span>
           <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full relative z-10">
              <button className="btn-primary flex-1 p-4 shadow-2xl">Pause Engine</button>
              <button className="btn-outline flex-1 p-4">Reset Node</button>
           </div>
           <div className="absolute inset-0 bg-[#a3b18a]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </section>

      {/* RIGHT: Main Workspace (Glassmorphism Expansion) */}
      <section className="lg:col-span-8 space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-[2.5rem] md:rounded-[40px] p-6 md:p-12 border border-white/10 relative overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.5)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 relative z-10 gap-8">
            <div className="text-center sm:text-left">
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter leading-none">Chemistry <span className="font-bold">101</span></h2>
              <p className="text-slate-500 mt-3 font-medium italic text-base md:text-lg opacity-80">Room 302 • Synchronizing in 45 mins</p>
            </div>
            <div className="flex -space-x-4 justify-center sm:justify-start">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[4px] border-[#0f172a] bg-slate-700 overflow-hidden shadow-2xl transition-transform hover:z-10 hover:scale-110 ring-1 ring-white/5">
                  <img src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="Study Mate" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[4px] border-[#0f172a] bg-slate-800 flex items-center justify-center text-xs font-black text-[#a3b18a] shadow-2xl ring-1 ring-white/5">
                +8
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="bg-black/40 rounded-[2rem] p-8 border border-white/5 space-y-6 hover:border-[#a3b18a]/30 transition-all group shadow-inner">
              <div className="flex justify-between items-center">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-[#a3b18a] transition-colors">Tactical Notes</h4>
                 <button className="btn-tactical">EDIT NODE</button>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-slate-300 font-serif italic line-clamp-4 opacity-90">
                 "The covalent bond is a chemical bond that involves the sharing of electron pairs between atoms. These electron pairs are known as shared pairs..."
              </p>
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                 <span className="px-4 py-1.5 bg-slate-900/50 text-[10px] font-black text-slate-400 rounded-xl uppercase tracking-widest border border-white/5 group-hover:border-[#a3b18a]/20 transition-all">#Organic</span>
                 <span className="px-4 py-1.5 bg-slate-900/50 text-[10px] font-black text-slate-400 rounded-xl uppercase tracking-widest border border-white/5 group-hover:border-[#a3b18a]/20 transition-all">#Lec_04</span>
              </div>
            </div>

            <div className="bg-black/40 rounded-[2rem] p-8 border border-white/5 space-y-8 shadow-inner">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Activity Pulse</h4>
              <div className="space-y-8">
                 <div className="flex gap-5 items-start">
                    <div className="w-1.5 h-14 bg-[#a3b18a] rounded-full shrink-0 shadow-[0_0_10px_rgba(163,177,138,0.5)]" />
                    <div>
                       <p className="text-sm font-bold text-white leading-tight">Alex just submitted Midterm Draft</p>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">2 mins ago • Shared Uplink</p>
                    </div>
                 </div>
                 <div className="flex gap-5 items-start opacity-50 grayscale">
                    <div className="w-1.5 h-14 bg-slate-600 rounded-full shrink-0" />
                    <div>
                       <p className="text-sm font-bold text-white leading-tight">New meeting scheduled</p>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Today, 4:00 PM • Library Node</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* AI Helper Banner */}
          <div className="mt-12 bg-[#a3b18a]/5 border border-[#a3b18a]/20 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group hover:bg-[#a3b18a]/10 transition-all shadow-2xl">
             <div className="w-14 h-14 rounded-2xl bg-[#a3b18a] flex items-center justify-center shrink-0 shadow-[0_10px_30px_rgba(163,177,138,0.4)] group-hover:scale-110 transition-transform">
                <Zap size={28} className="text-[#0f172a]" />
             </div>
             <div className="space-y-2 text-center sm:text-left">
                <p className="text-sm md:text-base text-slate-200 font-medium leading-relaxed">
                  Detected <span className="text-white font-bold">3 complex reactions</span> in your nodes.
                </p>
                <button className="text-[#a3b18a] text-xs font-black uppercase tracking-widest border-b-2 border-[#a3b18a]/20 hover:border-[#a3b18a] transition-all pb-1">
                  GENERATE TACTICAL QUIZ
                </button>
             </div>
             <div className="absolute right-0 top-0 w-48 h-48 bg-[#a3b18a]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform" />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-2 pb-12">
            <div className="flex flex-col gap-4">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-4">Study Velocity</span>
               <div className="glass-card rounded-[2rem] p-8 flex flex-col gap-4 group hover:border-[#a3b18a]/30 transition-all border border-white/5 shadow-xl">
                  <p className="text-5xl font-bold text-white group-hover:text-[#a3b18a] transition-all tracking-tighter">4.5<span className="text-xl text-slate-600 ml-2 font-medium">hrs</span></p>
                  <div className="flex gap-1.5 h-2 w-full bg-slate-900 rounded-full overflow-hidden mt-4">
                     <div className="w-[80%] bg-[#a3b18a] shadow-[0_0_10px_rgba(163,177,138,0.3)]" />
                     <div className="flex-1 bg-slate-800" />
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-4">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-4">Focus Continuity</span>
               <div className="glass-card rounded-[2rem] p-8 flex flex-col gap-4 group hover:border-orange-500/30 transition-all border border-white/5 shadow-xl">
                  <p className="text-5xl font-bold text-white group-hover:text-orange-400 transition-all tracking-tighter">12<span className="text-xl text-slate-600 ml-2 font-medium">days</span></p>
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mt-2">Tactical Peak</p>
               </div>
            </div>
        </div>
      </section>
    </div>
  );
}
