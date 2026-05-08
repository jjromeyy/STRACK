import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSupabase } from './supabase';

export interface Task {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  targetDate: string;
  officialCutoff: string;
  status: string;
  progress?: number;
  members?: number;
  parentTaskId?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  type: 'class' | 'exam' | 'assignment';
  color: string;
}

interface AppState {
  tasks: Task[];
  events: Event[];
  addTask: (task: Task) => void;
  addTasks: (tasks: Task[]) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  addEvents: (events: Event[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: '1',
          title: 'Final Thesis Draft',
          tag: 'ARCHITECTURE',
          tagColor: 'bg-[#a3b18a]/20 text-[#a3b18a] border-[#a3b18a]/30',
          targetDate: 'Oct 24',
          officialCutoff: 'Oct 28',
          status: 'In Progress',
          members: 4,
        },
        {
          id: '2',
          title: 'Data Set Analysis',
          tag: 'MACROECONOMICS',
          tagColor: 'bg-orange-900/20 text-orange-400 border-orange-800/30',
          targetDate: 'Tomorrow',
          officialCutoff: 'Friday',
          progress: 65,
          status: 'Warning',
        },
      ],
      events: [
        { id: '1', date: '2024-10-21', title: 'Physics Lab', time: '09:00 AM', type: 'class', color: 'primary' },
        { id: '2', date: '2024-10-22', title: 'Literature Essay', time: '11:59 PM', type: 'assignment', color: 'secondary' },
      ],
      addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
      addTasks: (newTasks) => set((state) => ({ tasks: [...newTasks, ...state.tasks] })),
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
      })),
      addEvents: (newEvents) => set((state) => ({ events: [...newEvents, ...state.events] })),
    }),
    {
      name: 'strack-storage',
    }
  )
);

export async function syncToSupabase() {
  const supabase = getSupabase();
  if (!supabase) return;

  const { tasks, events } = useAppStore.getState();
  
  // Example sync logic (simplified)
  // In a real app we'd handle auth and specific user rows
  console.log('Syncing to Supabase...', { tasks, events });
}
