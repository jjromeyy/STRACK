import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ReviewAndConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any[]) => void;
  title: string;
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
}

export default function ReviewAndConfirm({ isOpen, onClose, onConfirm, title, data, renderItem }: ReviewAndConfirmProps) {
  const [confirmedData, setConfirmedData] = React.useState<any[]>(data);

  React.useEffect(() => {
    setConfirmedData(data);
  }, [data]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
        >
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/40">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">AI-Synthesized Data Review</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-8 space-y-4 scrollbar-hide">
            {confirmedData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <AlertCircle size={48} className="mb-4 opacity-20" />
                <p className="font-bold">No data extracted.</p>
              </div>
            ) : (
              confirmedData.map((item, idx) => renderItem(item, idx))
            )}
          </div>

          <div className="p-8 border-t border-white/5 bg-slate-900/40 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl bg-slate-800 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={() => onConfirm(confirmedData)}
              className="flex-1 px-6 py-4 rounded-2xl bg-[#a3b18a] text-[#0f172a] font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#a3b18a]/20 flex items-center justify-center gap-2"
            >
              <Check size={18} />
              Confirm & Sync
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
