import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Calendar, ClipboardCheck, Users, FileText, Settings, User, Bell, Zap, Brain, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';

import { useAppStore } from '../lib/store';

export default function Layout() {
  const location = useLocation();
  const { tasks } = useAppStore();

  const completedTasks = tasks.filter(t => t.status === 'Completed').length || 4; // Mock 4 if none
  const totalTasks = tasks.length || 5; // Mock 5 if none
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const navItems = [
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
    { name: 'Tasks', icon: ClipboardCheck, path: '/tasks' },
    { name: 'Groups', icon: Users, path: '/groups' },
    { name: 'Notes', icon: FileText, path: '/notes' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const today = format(new Date(), 'EEEE, MMM d');

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col">
      {/* Immersive Header: Contextual Progress */}
      <header className="h-20 md:h-24 px-4 md:px-8 flex items-center justify-between border-b border-white/5 bg-[#1e293b]/50 sticky top-0 z-50 backdrop-blur-xl">
        <div className="flex flex-col">
          <NavLink to="/" className="flex flex-col group">
            <h1 className="text-xl md:text-2xl font-bold tracking-tighter text-white italic group-hover:text-[#a3b18a] transition-colors">STRACK</h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{today}</p>
          </NavLink>
        </div>
        
        {/* Daily Progress Visualization */}
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex flex-col text-right">
            <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-black mb-1">Tactical Progress</p>
            <p className="text-sm font-bold text-white tracking-tight">{completedTasks}/{totalTasks} Nodes Synced</p>
            <p className="text-[10px] text-[#a3b18a] font-bold uppercase tracking-widest">{progressPercent}% Efficiency</p>
          </div>
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl md:rounded-full bg-slate-900 border border-white/5 flex items-center justify-center relative shadow-2xl group cursor-help overflow-hidden">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="44%"
                fill="transparent"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="4"
              />
              <motion.circle
                initial={{ strokeDashoffset: 150 }}
                animate={{ strokeDashoffset: 150 - (150 * progressPercent / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="50%"
                cy="50%"
                r="44%"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-[#a3b18a] drop-shadow-[0_0_8px_rgba(163,177,138,0.5)]"
                strokeDasharray="150"
              />
            </svg>
            <span className="text-[10px] md:text-xs font-black relative z-10 text-white">{progressPercent}%</span>
            <div className="absolute inset-0 bg-[#a3b18a]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-slate-500 hover:text-white transition-all rounded-xl md:rounded-2xl bg-slate-900/50 border border-white/5 shadow-xl hover:scale-110 active:scale-95">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Context-Aware AI FAB */}
      <AIFab currentPath={location.pathname} />

      {/* Bottom Nav: Immersive Style */}
      <nav className="fixed bottom-0 w-full z-40 bg-[#1e293b]/80 border-t border-white/5 flex justify-around items-center h-20 px-2 md:px-8 rounded-t-[2.5rem] md:rounded-t-[3.5rem] backdrop-blur-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-500 min-w-16 md:min-w-20",
                isActive 
                  ? "text-[#a3b18a] -translate-y-1" 
                  : "text-slate-600 hover:text-slate-400"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "p-2 rounded-2xl transition-all duration-500",
                  isActive && "bg-[#a3b18a]/10 shadow-[0_0_20px_rgba(163,177,138,0.2)]"
                )}>
                  <item.icon className={cn("w-5 h-5 md:w-6 md:h-6 transition-all", isActive && "drop-shadow-[0_0_8px_rgba(163,177,138,0.5)]")} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={cn(
                  "text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500",
                  !isActive ? "opacity-0 scale-75" : "opacity-100 scale-100"
                )}>
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

function AIFab({ currentPath }: { currentPath: string }) {
  const getLabel = () => {
    if (currentPath.includes('notes')) return 'Summarize Note';
    if (currentPath.includes('tasks')) return 'Break down task';
    if (currentPath.includes('groups')) return 'Summarize discussion';
    return null;
  };

  const label = getLabel();

  return (
    <div className="fixed bottom-24 md:bottom-28 right-4 md:right-8 flex flex-col items-end gap-4 z-50">
      <AnimatePresence>
        {label && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900/80 border border-white/10 text-white backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          >
             {currentPath.includes('notes') ? <Sparkles size={18} className="text-[#a3b18a]" /> : <Zap size={18} className="text-[#a3b18a]" />}
            <span className="text-xs font-black uppercase tracking-widest">{label}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 md:w-20 md:h-20 bg-[#a3b18a] text-[#0f172a] rounded-[2rem] shadow-[0_15px_40px_rgba(163,177,138,0.4)] flex items-center justify-center border-4 border-slate-900 group relative overflow-hidden active:bg-[#a3b18a]/90 transition-all ring-1 ring-white/10"
      >
        <Brain className="w-8 h-8 md:w-10 md:h-10 relative z-10 group-hover:scale-110 transition-transform" />
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
      </motion.button>
    </div>
  );
}
