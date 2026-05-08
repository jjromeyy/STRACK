import { User, Bell, Shield, Moon, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export default function Settings() {
  const sections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile Information', sub: 'jerome.student@univ.edu', color: 'text-primary' },
        { icon: Bell, label: 'Notifications', sub: 'Smart alerts & Class pings', color: 'text-secondary' },
      ]
    },
    {
      title: 'Security',
      items: [
        { icon: Shield, label: 'Privacy & Security', sub: 'Strict data encryption active', color: 'text-tertiary' },
        { icon: Moon, label: 'Appearance', sub: 'Light mode (System default)', color: 'text-primary' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', sub: 'FAQs & Academic support', color: 'text-secondary' },
      ]
    }
  ];

  return (
    <div className="px-6 mt-8 space-y-8 max-w-2xl mx-auto pb-20">
      <header className="mb-10">
        <h2 className="text-4xl font-bold text-on-surface tracking-tight">Settings</h2>
        <p className="text-lg text-on-surface-variant mt-2 font-medium">Fine-tune your productivity hub.</p>
      </header>

      {/* Profile Card */}
      <section className="glass-card rounded-[2rem] p-8 flex items-center gap-6 border-2 border-primary/5 shadow-lg group hover:bg-white/80 transition-all">
        <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-2xl ring-2 ring-primary/10 group-hover:scale-105 transition-transform">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE8e2uTxUTyvLtKUkl4Lt9z2qGp6JBjMcsHYa9QwU6F_aYd-TJmWUEMCB_p1n9d6ZOkWVoeW3eNsWxJt6JEb18TvRCaFm_-UtOWi5as9TvkaZDV-5xfAZmt1xzO6IsYqTBuLBmtzRMsCTdVPMID-cVi1MUn_8Mhfbj2mQFrfQ-JJpypCM_vwQoF5hiEVsVyHbo3VPfA-77RqRPHObkmKW7Cl8NV-O-0JxGQshEwr_yDvO-DWmUgpZu1SW-CUpW_aA-o4GhdOnGab4" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-on-surface">Jerome Andal</h3>
          <p className="text-sm font-bold text-primary uppercase tracking-widest opacity-60">Verified Student Agent</p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-secondary-container/30 text-secondary rounded-full text-[10px] font-black uppercase tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Zen Status: Active
          </div>
        </div>
      </section>

      {/* Setting Sections */}
      <div className="space-y-10">
        {sections.map((section, idx) => (
          <motion.section 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-[10px] font-black text-outline uppercase tracking-[0.3em] px-4">{section.title}</h4>
            <div className="glass-card rounded-[1.5rem] overflow-hidden shadow-sm border border-outline-variant/10">
              {section.items.map((item, i) => (
                <button 
                  key={i}
                  className={cn(
                    "w-full flex items-center gap-5 p-6 hover:bg-surface-container-low transition-all group text-left",
                    i !== section.items.length - 1 && "border-b border-outline-variant/10"
                  )}
                >
                  <div className={cn("p-3 rounded-2xl bg-white shadow-sm ring-1 ring-outline-variant/5 group-hover:scale-110 transition-transform", item.color)}>
                    <item.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface text-lg">{item.label}</p>
                    <p className="text-xs font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">{item.sub}</p>
                  </div>
                  <ChevronRight size={20} className="text-outline-variant group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <button className="w-full mt-8 p-6 flex items-center justify-center gap-3 text-error font-bold text-lg hover:bg-error/5 rounded-3xl transition-all active:scale-95 group">
        <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
        Log Out from STRACK
      </button>

      <footer className="text-center pb-8">
        <p className="text-[10px] font-black text-outline uppercase tracking-[0.4em] opacity-40">Version 2.4.1 (Stable Build)</p>
      </footer>
    </div>
  );
}
