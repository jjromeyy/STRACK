import React, { useRef, useState } from 'react';
import { MoreVertical, AlertTriangle, Clock, FastForward, CheckCircle2, Scan, Sparkles, Loader2, Upload, Calendar as CalendarIcon, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useAppStore, Task } from '../../lib/store';
import { compressImage, fileToBase64 } from '../../lib/image';
import { extractSyllabus, breakDownTask } from '../../lib/gemini';
import ReviewAndConfirm from '../../components/ReviewAndConfirm';

export default function TaskList() {
  const { tasks, addTasks, addEvents } = useAppStore();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any[]>([]);
  const [showSyllabusReview, setShowSyllabusReview] = useState(false);
  const [activeBreakdownId, setActiveBreakdownId] = useState<string | null>(null);
  const [breakdownData, setBreakdownData] = useState<any[]>([]);
  const [showBreakdownReview, setShowBreakdownReview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filters = ['Priority Focus', 'Today', 'Advanced Lab', 'Archived'];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    try {
      const compressed = await compressImage(file);
      const b64 = await fileToBase64(compressed);
      const results = await extractSyllabus(b64, file.type);
      setScannedData(results);
      setShowSyllabusReview(true);
    } catch (err) {
      console.error('Scan failed', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleConfirmSyllabus = (data: any[]) => {
    const newTasks: Task[] = [];
    const newEvents: any[] = [];

    data.forEach((item, idx) => {
      if (item.type === 'assignment' || item.type === 'exam') {
        newTasks.push({
          id: `task-${Date.now()}-${idx}`,
          title: item.title,
          tag: item.type.toUpperCase(),
          tagColor: item.type === 'exam' ? 'bg-orange-900/20 text-orange-400 border-orange-800/30' : 'bg-slate-800 text-slate-400 border-slate-700',
          targetDate: item.date || 'Pending',
          officialCutoff: item.date || 'Pending',
          status: 'Scheduled',
        });
      }
      
      newEvents.push({
        id: `event-${Date.now()}-${idx}`,
        title: item.title,
        date: item.date,
        time: item.time || 'All Day',
        location: item.location,
        type: item.type,
        color: item.type === 'exam' ? 'secondary' : 'primary',
      });
    });

    addTasks(newTasks);
    addEvents(newEvents);
    setShowSyllabusReview(false);
  };

  const handleBreakdown = async (task: Task) => {
    setActiveBreakdownId(task.id);
    try {
      const subSteps = await breakDownTask(task.title);
      setBreakdownData(subSteps);
      setShowBreakdownReview(true);
    } catch (err) {
      console.error('Breakdown failed', err);
    } finally {
      setActiveBreakdownId(null);
    }
  };

  const handleConfirmBreakdown = (data: any[]) => {
    const newSubTasks: Task[] = data.map((item, idx) => ({
      id: `sub-${Date.now()}-${idx}`,
      title: item.title,
      tag: 'SUB-TASK',
      tagColor: 'bg-[#a3b18a]/10 text-[#a3b18a] border-[#a3b18a]/20',
      targetDate: 'Active',
      officialCutoff: 'Synced',
      status: 'In Progress',
      parentTaskId: activeBreakdownId || undefined,
    }));
    
    addTasks(newSubTasks);
    setShowBreakdownReview(false);
  };

  return (
    <div className="px-4 md:px-8 mt-6 md:mt-10 space-y-8 md:space-y-10 max-w-4xl mx-auto pb-32">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight leading-none text-center md:text-left">Tactical <span className="font-bold">List</span></h2>
          <p className="text-slate-400 mt-3 font-medium italic text-center md:text-left text-sm md:text-base opacity-80">
            Optimize focus with self-imposed deadlines & AI-synced intelligence.
          </p>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isScanning}
          className="btn-primary w-full md:w-auto"
        >
          {isScanning ? <Loader2 size={18} className="animate-spin" /> : <Scan size={18} />}
          {isScanning ? 'Processing...' : 'Scan Syllabus'}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileUpload}
        />
      </section>

      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-2 -mx-2">
        {filters.map((filter, i) => (
          <button 
            key={filter}
            className={cn(
              "px-5 py-2.5 rounded-2xl whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] transition-all border",
              i === 0 ? "bg-[#a3b18a] text-[#0f172a] border-[#a3b18a]" : "bg-slate-900/50 text-slate-500 border-white/5 hover:text-slate-300"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tasks.map((task) => (
          <motion.div 
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group glass-card rounded-[2.5rem] p-6 md:p-8 space-y-6 relative overflow-hidden border border-white/5"
          >
            <div className="flex justify-between items-start relative z-10 gap-4">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] border transition-colors",
                    task.tagColor
                  )}>
                    {task.tag}
                  </span>
                  {task.parentTaskId && (
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest bg-slate-900/50 px-2.5 py-1 rounded-md border border-white/5">
                      Sub-task of #{task.parentTaskId.slice(-4)}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-[#a3b18a] transition-colors leading-tight">
                  {task.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleBreakdown(task)}
                  disabled={activeBreakdownId === task.id}
                  className="btn-icon w-10 h-10 md:w-12 md:h-12"
                  title="AI Task Breakdown"
                >
                  {activeBreakdownId === task.id ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} className="text-[#a3b18a]" />}
                </button>
                <button className="btn-icon w-10 h-10 md:w-12 md:h-12">
                  {task.status === 'Warning' ? <AlertTriangle size={18} className="text-orange-500" /> : <MoreVertical size={18} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 relative z-10">
              <div className="p-5 rounded-3xl border transition-all bg-slate-900/40 border-white/5">
                <div className="flex justify-between items-center mb-3">
                   <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Target Goal</h4>
                   <Clock size={14} className="text-[#a3b18a]" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-[#a3b18a] tracking-tight">{task.targetDate}</p>
              </div>

              <div className={cn(
                "p-5 rounded-3xl border transition-all",
                task.status === 'Warning' ? "bg-orange-500/5 border-orange-500/20" : "bg-slate-900/40 border-white/5"
              )}>
                <div className="flex justify-between items-center mb-3">
                   <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Node Expiry</h4>
                   <AlertTriangle size={14} className={cn(task.status === 'Warning' ? "text-orange-500" : "text-slate-600")} />
                </div>
                <p className="text-xl md:text-2xl font-bold text-white tracking-tight">{task.officialCutoff}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 relative z-10 border-t border-white/5 gap-6">
              <div className="flex -space-x-3 self-start sm:self-center">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-[#0f172a] bg-slate-700 overflow-hidden shadow-lg transition-transform hover:z-10 hover:scale-110">
                       <img 
                         src={`https://i.pravatar.cc/100?img=${i + 20}`} 
                         alt="member" 
                         className="w-full h-full object-cover"
                       />
                    </div>
                 ))}
                 <div className="w-10 h-10 rounded-full border-4 border-[#0f172a] bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 shadow-xl">
                    +2
                 </div>
              </div>

              <button className="btn-primary w-full sm:w-auto px-10">
                <span className="relative z-10">Execute Node</span>
                <CheckCircle2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <ReviewAndConfirm 
        isOpen={showSyllabusReview}
        onClose={() => setShowSyllabusReview(false)}
        onConfirm={handleConfirmSyllabus}
        title="Detected Syllabus Records"
        data={scannedData}
        renderItem={(item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between gap-4 group">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                item.type === 'exam' ? "bg-orange-500/10 text-orange-500" : "bg-[#a3b18a]/10 text-[#a3b18a]"
              )}>
                {item.type === 'exam' ? <AlertTriangle size={20} /> : <CalendarIcon size={20} />}
              </div>
              <div>
                <h4 className="text-white font-bold tracking-tight">{item.title}</h4>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">
                  {item.date} {item.time ? `• ${item.time}` : ''}
                </p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 text-[9px] font-black uppercase tracking-widest">
              {item.type}
            </div>
          </div>
        )}
      />

      <ReviewAndConfirm 
        isOpen={showBreakdownReview}
        onClose={() => setShowBreakdownReview(false)}
        onConfirm={handleConfirmBreakdown}
        title="AI Tactical Breakdown"
        data={breakdownData}
        renderItem={(item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/5 flex items-start gap-4">
            <div className="mt-1 w-6 h-6 rounded-lg bg-[#a3b18a] text-[#0f172a] flex items-center justify-center text-[10px] font-black">
              {idx + 1}
            </div>
            <div>
              <h4 className="text-white font-bold tracking-tight">{item.title}</h4>
              <p className="text-slate-500 text-sm mt-1">{item.description}</p>
            </div>
          </div>
        )}
      />

      <div className="h-20" />
    </div>
  );
}
