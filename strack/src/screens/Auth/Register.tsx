import { User, Mail, Lock, ChevronRight, HelpCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Register() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Hero Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsdrCkRO7oYWvPsrcycC7t_fmx5HcKzOu-MjK_4a0IrcNO67N0YE8BdF3MCUEtNBxDHvTvNUyVo8Tm7uAt98UQyDVfNExwhjaJjQIwuL2ADOx_l0-_eDA-S4OTTkE5whnyi_TUmNLR1YpaZLJqFnj_R8Ff0_z2Ho38Gm4YHRAHCjapRRXMQ1CtTNSL8mB2hIZkwwO6aRwnDJIww7cvBfJU37P8PVW3grBn4S9tcLa-tFA2TZDTv5294t3novz5R7yNa7oMOONBW1I" 
          alt="Atmospheric"
          className="w-full h-full object-cover opacity-10 grayscale-[20%]"
        />
      </div>

      <main className="relative z-10 flex-grow flex items-center justify-center p-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <header className="text-center mb-10">
            <h1 className="text-5xl font-bold text-primary tracking-tighter italic">STRACK</h1>
            <p className="text-sm font-medium text-on-surface-variant uppercase tracking-widest mt-2">Focus on what matters most.</p>
          </header>

          <div className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-3xl bg-white/70 border-2 border-white/50">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-on-surface tracking-tight">Join the community</h2>
              <p className="text-sm font-semibold text-on-surface-variant mt-2 opacity-70">Create your student account to get started.</p>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
                  <User size={14} />
                  Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  className="w-full h-12 bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-0 text-sm font-bold placeholder:text-outline-variant/60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
                  <Mail size={14} />
                  Student Email
                </label>
                <input 
                  type="email" 
                  placeholder="yourname@university.edu"
                  className="w-full h-12 bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-0 text-sm font-bold placeholder:text-outline-variant/60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
                  <Lock size={14} />
                  Password
                </label>
                <input 
                  type="password" 
                  placeholder="Create a secure password"
                  className="w-full h-12 bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-0 text-sm font-bold placeholder:text-outline-variant/60"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-secondary">Password Strength</span>
                  <span className="text-on-surface-variant opacity-60">Optimal</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    className="h-full bg-secondary rounded-full" 
                  />
                </div>
              </div>

              <div className="pt-6">
                <NavLink to="/onboarding" className="w-full h-14 bg-primary text-on-primary font-bold text-lg border-2 border-on-surface active:scale-[0.98] transition-transform flex items-center justify-center gap-3 shadow-xl hover:shadow-primary/20">
                  Create Account
                  <ChevronRight size={20} />
                </NavLink>
              </div>
            </form>

            <div className="mt-10 pt-10 border-t border-outline-variant/20 text-center">
              <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed px-4">
                By joining, you agree to our 
                <a href="#" className="text-primary font-bold hover:underline mx-1">Terms of Service</a> and 
                <a href="#" className="text-primary font-bold hover:underline mx-1">Privacy Policy</a>.
              </p>
            </div>
          </div>

          <footer className="mt-10 text-center">
            <p className="text-sm font-bold text-on-surface-variant">
              Already have an account? 
              <NavLink to="/login" className="text-primary font-black ml-2 hover:opacity-80 transition-opacity underline decoration-2 underline-offset-4">Login</NavLink>
            </p>
          </footer>
        </motion.div>
      </main>

      <footer className="relative z-10 p-8 flex justify-center items-center">
        <button className="flex items-center gap-2 text-[10px] font-black text-outline hover:text-primary transition-colors uppercase tracking-[0.2em] active:scale-95">
          <HelpCircle size={16} />
          Student Support Center
        </button>
      </footer>
    </div>
  );
}
