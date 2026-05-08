import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ClipboardCheck, Users, ArrowRight, ShieldCheck, Cloud, EyeOff } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Onboarding() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Smart Calendar",
      desc: "Intelligent scheduling that breathes with you. Automatically sync deadlines and find the perfect blocks for deep work.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqYJ3Ua-HGNvF9ECueSBPMKcixlwE4djSUdDqNcK7dfoxG7HIudjsgSI_iK0OnzDmt61FwYuC-OvYfAfyGcg8RylqnimeYyMa_V4m5hccvnuObSAwhUNRj_jPfxLluGgwBz_KLNmw366Rmw71jgkU6ii9rwLshVy4oWyH8QS7ifmHNPKkI9JdP-TwqH7djLL85pLnxF2OacSXhhCnkxLOq_MUJoB3PDD5b8w-5c3KxPZ-QLHNSt37vszNJ6GpYZQ7c--gZt3FfrRA",
      features: [
        { icon: Sparkles, label: "Auto-Sync", sub: "Import class schedules instantly.", active: true },
        { icon: ClipboardCheck, label: "Tactical Tasks", sub: "Micro-step breakdown for big goals.", active: false },
        { icon: Users, label: "Group Workspace", sub: "Collaborate without the noise.", active: false },
      ]
    },
    // ... more steps would be added here in a full app
  ];

  const current = steps[step];

  return (
    <div className="min-h-screen bg-zen-gradient flex flex-col font-sans text-on-surface overflow-x-hidden">
      <style>{`
        .bg-zen-gradient {
          background: radial-gradient(circle at top right, #cee5fb, transparent),
                      radial-gradient(circle at bottom left, #e9e8e9, #faf9fa);
        }
      `}</style>
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-md border-b border-outline-variant/30">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
          <span className="text-3xl font-bold tracking-tighter text-primary italic">STRACK</span>
          <NavLink to="/" className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-4 py-2 hover:bg-secondary-container/50 transition-colors rounded-xl border border-primary/20">
            Skip
          </NavLink>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-16 pb-24 px-6 h-screen">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual Section */}
          <motion.div 
            key={`img-${step}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl"
          >
            <div className="absolute inset-0 bg-primary-container/10 rounded-3xl" />
            <img 
              src={current.image} 
              alt={current.title}
              className="z-10 w-4/5 h-4/5 object-cover rounded-2xl shadow-2xl border border-white/20 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
            />
            <div className="absolute top-10 right-10 w-24 h-24 bg-secondary-fixed/40 blur-[80px] rounded-full" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary-fixed/40 blur-[100px] rounded-full" />
          </motion.div>

          {/* Content Section */}
          <div className="flex flex-col space-y-10">
            <motion.div 
              key={`content-${step}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <span className="text-[10px] font-black text-secondary tracking-[0.4em] uppercase">Step 01 / 03</span>
              <h1 className="text-5xl font-bold text-on-surface leading-tight tracking-tight">{current.title}</h1>
              <p className="text-xl text-on-surface-variant font-medium leading-relaxed">{current.desc}</p>
            </motion.div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 gap-4">
              {current.features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={cn(
                    "glass-card p-5 rounded-2xl flex items-center gap-6 border-2 transition-all",
                    feature.active ? "border-primary/20 ring-4 ring-primary/5 translate-x-2" : "opacity-40 grayscale border-transparent"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110",
                    feature.active ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container text-on-surface-variant"
                  )}>
                    <feature.icon size={26} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface">{feature.label}</h3>
                    <p className="text-xs font-bold text-outline uppercase tracking-widest">{feature.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interaction Footer */}
            <div className="pt-6 flex items-center justify-between">
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-2 transition-all duration-300 rounded-full shadow-sm",
                      i === step ? "w-10 bg-primary" : "w-3 bg-outline-variant/30"
                    )} 
                  />
                ))}
              </div>
              
              <NavLink 
                to="/"
                className="btn-primary px-12 h-14 rounded-xl group"
              >
                NEXT
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </NavLink>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Details */}
      <footer className="fixed bottom-0 w-full py-6 px-6 bg-surface/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <p className="text-[10px] font-black text-outline uppercase tracking-[0.3em] opacity-60">Join 50,000+ students finding their focus.</p>
          <div className="flex gap-10">
            {[
              { icon: ShieldCheck, label: "Secure Data" },
              { icon: Cloud, label: "Cloud Sync" },
              { icon: EyeOff, label: "Ad Free" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-outline-variant group">
                <f.icon size={16} className="group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-tighter group-hover:text-on-surface transition-colors">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
