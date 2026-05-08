import { useState } from 'react';
import { Send, Users, Sparkles, CheckCircle, PlusCircle, MessageSquare, Calendar as CalendarIcon, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function GroupHub() {
  const [activeTab, setActiveTab] = useState<'board' | 'chat'>('board');

  const members = [
    { id: 1, name: 'Sarah', avatar: 'https://i.pravatar.cc/100?img=32' },
    { id: 2, name: 'Mark', avatar: 'https://i.pravatar.cc/100?img=12' },
    { id: 3, name: 'Alex', avatar: 'https://i.pravatar.cc/100?img=52' },
  ];

  return (
    <div className="px-4 md:px-8 mt-6 md:mt-10 space-y-8 max-w-6xl mx-auto h-[calc(100vh-200px)] flex flex-col pb-10">
      {/* Header */}
      <section className="flex flex-col gap-8 sm:flex-row sm:items-end justify-between shrink-0">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tighter leading-none">Collaboration <span className="font-bold text-[#a3b18a]">Hub</span></h2>
            <div className="px-3 py-1 rounded-lg bg-[#a3b18a]/10 border border-[#a3b18a]/20 text-[#a3b18a] text-[10px] font-black uppercase tracking-[0.3em] animate-pulse shadow-[0_0_15px_rgba(163,177,138,0.2)]">Live</div>
          </div>
          <p className="text-slate-500 font-medium italic text-sm md:text-base opacity-80">Psychology Research Group • Winter Semester Pipeline</p>
        </div>
        
        <div className="flex -space-x-3 items-center">
          {members.map(member => (
            <div key={member.id} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[4px] border-[#0f172a] overflow-hidden shadow-2xl transition-transform hover:z-10 hover:scale-110 ring-1 ring-white/5">
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[4px] border-[#0f172a] bg-slate-900 flex items-center justify-center text-[10px] font-black text-slate-500 shadow-2xl ring-1 ring-white/5">
            +5
          </div>
          <button className="ml-6 btn-primary w-12 h-12 md:w-14 md:h-14 !p-0 !rounded-2xl">
            <PlusCircle size={24} />
          </button>
        </div>
      </section>

      {/* Progress Monitor */}
      <div className="glass-card p-6 md:p-8 rounded-[2rem] space-y-6 shrink-0 border border-white/5 shadow-2xl bg-slate-900/40 relative overflow-hidden group">
        <div className="flex justify-between items-center relative z-10">
          <div className="flex flex-col gap-1">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Collective Synchronization</span>
             <p className="text-xs text-slate-400 font-medium italic">High-velocity processing active</p>
          </div>
          <div className="text-right">
             <span className="text-[#a3b18a] text-3xl font-black tracking-tighter shadow-glow">68%</span>
          </div>
        </div>
        <div className="w-full bg-black/40 h-3 md:h-4 rounded-full overflow-hidden shadow-inner flex p-1 relative z-10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '68%' }}
            transition={{ duration: 2, ease: "anticipate" }}
            className="bg-[#a3b18a] h-full rounded-full shadow-[0_0_20px_rgba(163,177,138,0.6)]" 
          />
        </div>
        <div className="absolute inset-0 bg-[#a3b18a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>

      {/* Main Workspace */}
      <div className="glass-card rounded-[2.5rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row flex-grow shadow-[0_40px_120px_rgba(0,0,0,0.6)] border border-white/10 ring-1 ring-white/5">
        {/* Navigation Rail */}
        <div className="flex md:flex-col border-b md:border-b-0 md:border-r border-white/5 bg-slate-900/80 shrink-0 backdrop-blur-2xl">
          <button 
            onClick={() => setActiveTab('board')}
            className={cn(
              "flex-1 md:w-24 md:h-1/2 flex flex-col items-center justify-center transition-all px-6 py-6 md:py-0 border-b-2 md:border-b-0 md:border-r-4 gap-2 group",
              activeTab === 'board' ? "bg-[#a3b18a] text-[#0f172a] border-[#a3b18a]" : "text-slate-600 border-transparent hover:text-white hover:bg-white/5"
            )}
          >
             <Users size={32} className={cn("transition-transform group-active:scale-90", activeTab === 'board' && "fill-current")} />
             <span className="text-[8px] font-black uppercase tracking-[0.2em] md:hidden">Board</span>
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            className={cn(
              "flex-1 md:w-24 md:h-1/2 flex flex-col items-center justify-center transition-all px-6 py-6 md:py-0 border-b-2 md:border-b-0 md:border-r-4 gap-2 group",
              activeTab === 'chat' ? "bg-[#a3b18a] text-[#0f172a] border-[#a3b18a]" : "text-slate-600 border-transparent hover:text-white hover:bg-white/5"
            )}
          >
             <MessageSquare size={32} className={cn("transition-transform group-active:scale-90", activeTab === 'chat' && "fill-current")} />
             <span className="text-[8px] font-black uppercase tracking-[0.2em] md:hidden">Chat</span>
          </button>
        </div>

        {/* Workspace Content */}
        <div className="flex-grow flex flex-col h-full bg-[#020617]/40">
          <AnimatePresence mode="wait">
            {activeTab === 'board' ? (
              <motion.div 
                key="board"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="flex-grow flex flex-col p-6 md:p-12 overflow-hidden h-full"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-10 shrink-0 gap-6">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-white tracking-tighter">Tactical Sync</h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <ShieldCheck size={12} className="text-[#a3b18a]" />
                       DATA SYNCHRONIZED
                    </p>
                  </div>
                  <button className="btn-primary w-full sm:w-auto">
                    <PlusCircle size={20} />
                    Deploy NODE
                  </button>
                </div>

                <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-10 overflow-y-auto scrollbar-hide pb-10">
                  <TaskColumn title="PENDING DEPLOYMENT" status="pending" />
                  <TaskColumn title="EXECUTED NODES" status="completed" />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="chat"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="flex-grow flex flex-col overflow-hidden h-full"
              >
                <div className="px-8 py-8 border-b border-white/5 flex justify-between items-center bg-slate-900/60 shrink-0 backdrop-blur-xl">
                   <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#a3b18a] shadow-[0_0_12px_rgba(163,177,138,0.8)]" />
                        <span className="text-xs font-black text-white uppercase tracking-[0.3em]">Encrypted Data Stream</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase ml-5 tracking-widest italic opacity-60">P2P Coordination Active</span>
                   </div>
                   <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden shadow-inner ring-1 ring-white/5">
                           <img src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="Active" className="w-full h-full object-cover grayscale opacity-50 contrast-125" />
                        </div>
                      ))}
                   </div>
                </div>

                <div className="flex-grow overflow-y-auto p-6 md:p-12 space-y-12 scrollbar-hide">
                  <ChatMessage avatar={members[0].avatar} name="Sarah" time="10:42 AM" text="Hey guys, I've just uploaded the draft for the research methodology section. Need tactical feedback on the sample size." self={false} />
                  <ChatMessage avatar={null} name="You" time="10:45 AM" text="Scanning now. I noticed we can optimize the regression model. Applying node update in 5 mins." self={true} />
                  <ChatMessage avatar={members[1].avatar} name="Mark" time="11:05 AM" text="Sync session at the library node at 16:00 still operational?" self={false} hasMeta />
                </div>

                <div className="p-6 md:p-10 bg-[#020617]/80 border-t border-white/5 shrink-0 backdrop-blur-3xl">
                   <div className="relative flex items-center group max-w-4xl mx-auto">
                      <input 
                        type="text" 
                        placeholder="Broadcast coordination..." 
                        className="w-full bg-slate-900/40 border-2 border-white/5 rounded-[1.8rem] focus:border-[#a3b18a] focus:ring-4 focus:ring-[#a3b18a]/5 transition-all pr-24 pl-8 py-6 text-base font-medium text-white placeholder-slate-600 shadow-2xl"
                      />
                      <button className="absolute right-4 btn-primary !p-4 !rounded-2xl">
                        <Send size={28} />
                      </button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TaskColumn({ title, status }: { title: string, status: 'pending' | 'completed' }) {
  const tasks = status === 'pending' 
    ? [
        { title: 'Data Analysis Draft', due: 'OCT 24', priority: true },
        { title: 'Interview Transcription', due: 'OCT 26', priority: false },
      ]
    : [
        { title: 'Topic Selection', due: 'EXECUTED', done: true },
        { title: 'Literature Review', due: 'EXECUTED', done: true },
      ];

  return (
    <div className="flex flex-col gap-8">
      <div className={cn(
        "flex items-center gap-4 font-black text-[10px] uppercase tracking-[0.4em] px-6 py-3 rounded-2xl w-fit border shadow-2xl",
        status === 'pending' ? "text-slate-500 bg-slate-900/40 border-white/5" : "text-[#a3b18a] bg-[#a3b18a]/10 border-[#a3b18a]/20"
      )}>
        <div className={cn("w-2.5 h-2.5 rounded-full", status === 'pending' ? "bg-slate-700" : "bg-[#a3b18a] shadow-[0_0_10px_rgba(163,177,138,0.5)]")} />
        {title}
      </div>
      
      <div className="space-y-6">
        {tasks.map((task, idx) => (
          <div key={idx} className={cn(
            "p-8 rounded-[2.5rem] space-y-6 group transition-all cursor-pointer border-2 shadow-2xl overflow-hidden relative",
            task.done 
              ? "bg-slate-950/40 border-white/5 opacity-40 grayscale" 
              : "bg-black/60 border-white/5 hover:border-[#a3b18a]/30 hover:bg-slate-900/80"
          )}>
            <h4 className={cn("text-xl font-bold text-white group-hover:text-[#a3b18a] transition-all tracking-tight leading-tight", task.done && "line-through text-slate-500")}>
               {task.title}
            </h4>
            <div className="flex justify-between items-center relative z-10">
              <span className={cn(
                "text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3",
                task.done ? "text-[#a3b18a]" : "text-slate-600"
              )}>
                {task.done && <CheckCircle size={16} />}
                {task.due}
              </span>
              {task.priority && (
                <div className="bg-[#a3b18a] text-[#0f172a] text-[9px] px-4 py-1.5 rounded-xl shadow-lg font-black uppercase tracking-widest animate-pulse">Priority Node</div>
              )}
            </div>
            {!task.done && <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3b18a]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatMessage({ avatar, name, time, text, self, hasMeta }: { avatar: string | null, name: string, time: string, text: string, self: boolean, hasMeta?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30, x: self ? 30 : -30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      className={cn("flex items-start gap-5", self ? "justify-end" : "justify-start")}
    >
      {!self && avatar && (
        <div className="w-12 h-12 rounded-[1.2rem] border-2 border-white/5 overflow-hidden shadow-2xl shrink-0 group hover:scale-110 transition-transform">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className={cn("flex flex-col gap-3 max-w-[85%] md:max-w-[70%]", self ? "items-end" : "items-start")}>
        <div className={cn(
          "px-8 py-5 rounded-[2.2rem] shadow-2xl text-base font-medium leading-relaxed transition-all relative overflow-hidden group",
          self 
            ? "bg-[#a3b18a] text-[#0f172a] rounded-tr-none shadow-[0_20px_50px_rgba(163,177,138,0.2)]" 
            : "bg-slate-900/60 text-slate-100 rounded-tl-none border border-white/5 shadow-2xl backdrop-blur-xl"
        )}>
           {text}
           {self && <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />}
        </div>
        
        {hasMeta && (
          <div className="mt-4 bg-slate-950/60 p-6 rounded-[2.5rem] border border-[#a3b18a]/20 flex items-center gap-6 w-full shadow-inner group hover:border-[#a3b18a]/50 transition-all">
            <div className="p-4 bg-[#a3b18a] rounded-2xl text-[#0f172a] shadow-xl shadow-[#a3b18a]/10 group-hover:scale-110 transition-transform">
              <CalendarIcon size={24} />
            </div>
            <div className="space-y-1.5 flex-1">
              <p className="text-[10px] font-black text-[#a3b18a] uppercase tracking-[0.3em]">Coordinated Node</p>
              <p className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight">Data Analysis @ Node Level 3</p>
              <div className="flex items-center gap-3">
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Today, 16:00</p>
                 <div className="w-1 h-1 rounded-full bg-slate-800" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Link</span>
              </div>
            </div>
          </div>
        )}

        <div className={cn("flex items-center gap-3 px-4", self ? "flex-row-reverse" : "flex-row")}>
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">{name}</span>
           <span className="w-1 h-1 rounded-full bg-slate-800" />
           <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">{time}</span>
        </div>
      </div>
    </motion.div>
  );
}
