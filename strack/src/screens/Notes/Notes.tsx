import { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Share2, MoreVertical, Bold, Italic, List, Link as LinkIcon, Image as ImageIcon, Code, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import ReactMarkdown from 'react-markdown';

export default function Notes() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [noteTitle, setNoteTitle] = useState('Advanced Quantum Mechanics: Week 4');
  const [content, setContent] = useState(`# Schrödinger Equation Fundamentals

The Schrödinger equation is a linear partial differential equation that governs the wave function of a quantum-mechanical system. It is a key result in quantum mechanics, and its discovery was a significant landmark in the development of the subject.

> "The wave function ψ is the most complete description that can be given of a physical system."

## Key Postulates

- The state of a quantum mechanical system is completely specified by a wave function.
- Observables are represented by Hermitian operators.
- The average value of an observable is given by the expectation value.

### Resources
- Griffiths, Chapter 2.4
- Quantum Hall Effect Intro (PDF)
`);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="px-4 md:px-8 mt-6 md:mt-10 space-y-12 max-w-6xl mx-auto pb-32">
      {/* Study Clock Section */}
      <section className="animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="glass-card rounded-[2.5rem] p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-10 border border-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.5)] relative overflow-hidden group bg-slate-900/40 backdrop-blur-3xl">
          <div className="flex items-center gap-6 relative z-10 w-full lg:w-auto justify-center lg:justify-start">
            <div className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-[1.8rem] flex items-center justify-center transition-all shadow-2xl group-hover:rotate-12 duration-500",
              isActive ? "bg-orange-500 text-white shadow-orange-500/20" : "bg-[#a3b18a] text-[#0f172a] shadow-[#a3b18a]/20"
            )}>
              <Timer size={36} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tighter leading-none">Deep Work Engine</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] opacity-80">
                {isActive ? 'SYCHRONIZATION ACTIVE' : 'READY FOR EXECUTION'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-16 relative z-10">
            <span className="text-6xl md:text-8xl font-mono font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              {formatTime(timeLeft)}
            </span>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTimer}
                className={cn(
                  "btn-primary h-16 md:h-20 px-8 md:px-12 rounded-[1.8rem]",
                  isActive ? "bg-slate-800 text-slate-400 border-white/5 shadow-none" : ""
                )}
              >
                {isActive ? <Pause size={32} /> : <span className="flex items-center gap-3"><Play size={24} fill="currentColor" /> INITIALIZE</span>}
              </button>
              <button 
                onClick={resetTimer}
                className="btn-icon w-16 h-16 md:w-20 md:h-20 rounded-[1.8rem] border-white/5 bg-slate-900/60"
              >
                <RotateCcw size={28} className="group-active:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          </div>
          
          {/* Background Highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#a3b18a]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
        </div>
      </section>

      {/* Note Editor Area */}
      <section className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex flex-col flex-1 space-y-4">
            <input 
              type="text" 
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-3xl md:text-5xl font-bold text-white p-0 placeholder:text-slate-800 tracking-tighter"
              placeholder="Note Title..."
            />
            <div className="flex items-center gap-4 opacity-50">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none">
                SYNTHESIZED 2 MINS AGO • V1.4.20
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-[#a3b18a]" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none">
                1,240 DATA POINTS
              </p>
            </div>
          </div>
          <div className="flex gap-4 shrink-0">
            <button className="btn-icon h-14 w-14">
              <Share2 size={24} />
            </button>
            <button className="btn-icon h-14 w-14">
              <MoreVertical size={24} />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 p-3 glass-card rounded-3xl items-center border border-white/5 shadow-2xl overflow-x-auto scrollbar-hide bg-slate-950/40 backdrop-blur-xl">
          {[Bold, Italic, List, LinkIcon, ImageIcon, Code].map((Icon, idx) => (
            <button key={idx} className="p-4 text-slate-500 hover:text-[#a3b18a] hover:bg-[#a3b18a]/10 rounded-2xl transition-all active:scale-90 group">
              <Icon size={22} />
            </button>
          ))}
          <div className="w-px h-10 bg-white/5 mx-4 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-4 ml-auto px-6">
             <div className="w-2.5 h-2.5 rounded-full bg-[#a3b18a] shadow-[0_0_12px_rgba(163,177,138,0.6)]" />
             <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">PHYSICS</span>
             <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] border-l border-white/10 pl-4">EXAM PREP</span>
          </div>
        </div>

        {/* Editor Layout */}
        <div className="note-canvas min-h-[800px] p-6 md:p-16 lg:p-24 rounded-[3rem] border border-white/5 relative shadow-[0_60px_150px_rgba(0,0,0,0.6)] overflow-hidden bg-[#020617]/40 ring-1 ring-white/5 group">
          <div className="flex-1 space-y-16 max-w-4xl mx-auto relative z-10 w-full animate-in fade-in duration-1000">
             <div className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tighter prose-blockquote:border-[#a3b18a] prose-blockquote:bg-[#a3b18a]/5 prose-blockquote:p-8 md:prose-blockquote:p-12 prose-blockquote:rounded-[2.5rem] prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-slate-300 prose-strong:text-[#a3b18a] prose-li:text-slate-400 prose-p:leading-relaxed prose-p:text-slate-400">
               <ReactMarkdown>{content}</ReactMarkdown>
             </div>
             
             {/* Note Meta Boxes */}
             <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl group/meta hover:border-[#a3b18a]/30 transition-all bg-black/40"
                >
                  <h4 className="text-[10px] font-black text-[#a3b18a] uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <Sparkles size={18} />
                    Tactical Insight
                  </h4>
                  <p className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug group-hover/meta:translate-x-2 transition-transform">Review Heisenberg Uncertainty Principle tomorrow at 16:00.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl group/meta hover:border-slate-500/30 transition-all bg-black/40"
                >
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <BookOpen size={18} />
                    Linked Repository
                  </h4>
                  <p className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug group-hover/meta:translate-x-2 transition-transform">Griffiths: Introduction to Quantum Mechanics, Ch. 2.4</p>
                </motion.div>
             </div>
          </div>
          
          {/* Subtle Grid Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none z-0">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/20 to-[#020617]/80 pointer-events-none" />
        </div>
      </section>
      
      <div className="h-20" />
    </div>
  );
}
