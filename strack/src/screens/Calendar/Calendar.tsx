import { useState } from 'react';
import { ChevronLeft, ChevronRight, History, Beaker, Info, Calendar as CalendarIcon, Clock, MapPin, AlertTriangle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { useAppStore } from '../../lib/store';

export default function Calendar() {
  const { events } = useAppStore();
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

  const getDayEvents = (day: Date) => {
    return events.filter(e => {
      try {
        const eventDate = parseISO(e.date);
        return isSameDay(eventDate, day);
      } catch {
        // Fallback for non-ISO dates if any
        return false;
      }
    });
  };

  return (
    <div className="px-8 mt-10 space-y-12 max-w-6xl mx-auto pb-32">
      {/* Header */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-light text-white tracking-tight leading-none">Weekly <span className="font-bold">Sync</span></h2>
          <p className="text-slate-400 font-medium italic">
            {format(weekStart, 'MMMM d')} – {format(addDays(weekStart, 6), 'd, yyyy')}
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-6 py-3 rounded-2xl bg-slate-900/50 border border-white/5 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all shadow-xl"
          >
            Today
          </button>
          <div className="flex items-center bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <button 
              onClick={() => setCurrentDate(addDays(currentDate, -7))}
              className="p-3 text-slate-500 hover:text-white transition-colors border-r border-white/5"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrentDate(addDays(currentDate, 7))}
              className="p-3 text-slate-500 hover:text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Calendar Grid */}
      <section className="glass-card rounded-[2.5rem] overflow-hidden p-8 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] bg-slate-900/40">
        <div className="grid grid-cols-7 gap-6 mb-8 text-center">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {[0, 1, 2, 3, 4, 5, 6].map(i => {
            const day = addDays(weekStart, i);
            const dayEvents = getDayEvents(day);
            const isToday = isSameDay(day, new Date());

            return (
              <div 
                key={i} 
                className={cn(
                  "min-h-[180px] p-4 rounded-[2rem] border transition-all flex flex-col gap-4 group",
                  isToday 
                    ? "bg-[#a3b18a]/10 border-[#a3b18a]/20 shadow-[0_0_40px_rgba(163,177,138,0.1)]" 
                    : "bg-black/20 border-white/5 hover:border-white/10 hover:bg-slate-900/40"
                )}
              >
                <span className={cn(
                  "text-sm font-black transition-colors",
                  isToday ? "text-[#a3b18a]" : "text-slate-500 group-hover:text-slate-300"
                )}>
                  {format(day, 'd')}
                </span>
                
                <div className="space-y-3 overflow-y-auto scrollbar-hide pr-1">
                  {dayEvents.map((event, idx) => (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        "p-3 rounded-2xl text-[10px] font-bold shadow-2xl border-l-[3px]",
                        event.type === 'exam' 
                          ? "bg-orange-500/10 text-orange-400 border-orange-500" 
                          : "bg-[#a3b18a]/10 border-[#a3b18a] text-[#a3b18a]"
                      )}
                    >
                      <div className="truncate mb-1">{event.title}</div>
                      <div className="flex items-center gap-1 opacity-60 text-[8px] font-black uppercase tracking-tighter">
                         <Clock size={8} /> {event.time}
                      </div>
                    </motion.div>
                  ))}
                  {dayEvents.length === 0 && (
                    <div className="flex-grow flex items-center justify-center opacity-10">
                       <CalendarIcon size={24} className="text-slate-500" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Focus & Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <section className="glass-card rounded-[2.5rem] p-10 space-y-8 border border-white/5 shadow-2xl bg-slate-950/40">
           <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white tracking-tight">Deployment Goals</h3>
              <div className="px-3 py-1 rounded-full bg-[#a3b18a]/10 text-[#a3b18a] text-[10px] font-black uppercase tracking-widest">Active</div>
           </div>
           
           <div className="space-y-8">
             {events.filter(e => e.type === 'exam').slice(0, 2).map((exam, idx) => (
               <div key={idx} className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(249,115,22,0.3)] group-hover:scale-110 transition-transform">
                    <AlertTriangle size={28} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-xl font-bold text-white tracking-tight">{exam.title}</p>
                    <p className="text-sm text-slate-500 font-medium italic">{exam.date} • {exam.location || 'TBA'}</p>
                    <div className="mt-3 inline-flex items-center px-4 py-1.5 rounded-xl bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest border border-orange-500/20">
                      CRITICAL NODE
                    </div>
                  </div>
               </div>
             ))}
             {events.filter(e => e.type === 'exam').length === 0 && (
                <p className="text-slate-600 text-sm font-medium italic">No upcoming exams detected in the tactical stream.</p>
             )}
           </div>
        </section>

        <section className="bg-slate-950 border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden flex flex-col justify-between group">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-[#a3b18a]">
               <Sparkles size={24} />
               <h3 className="text-3xl font-bold tracking-tight">AI Coordination</h3>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed">Neural analysis suggests higher focus levels between 9 AM and 11 AM based on your current schedule.</p>
            <div className="flex items-center gap-2 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mt-6">
              <Info size={14} />
              <span>Optimal Sync Window Identified</span>
            </div>
          </div>
          
          <button className="relative z-10 w-full py-5 bg-white text-[#0f172a] rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-200 active:scale-95 transition-all mt-10 shadow-2xl">
            Authorize Focus Session
          </button>
          
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#a3b18a]/5 rounded-full blur-[100px] group-hover:bg-[#a3b18a]/10 transition-all duration-1000" />
        </section>
      </div>

      <div className="h-20" />
    </div>
  );
}
