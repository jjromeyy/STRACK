import { LogIn, Mail, Lock, ChevronRight, School, Github } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Login() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px]" />
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA38VbzzkpxcqGobDTI2VSrEIrJUFTC_2feB5Pcqa4ejsGclZpTIr3ah1GCW7lFhKjsPiQ73cmeq0JahRszAf9uP46uPvPog-Ad-SnOGAQr70tSHRRLvhOr4TVmrTFu6m4CZGVL9F2I9dX59cfF5NgFDYFn0ElNswiLkX4oDolN5fEkZ1MqJi6xg-lzMebY0Jpux2kHxO2_NLQFsnUnZ_2GOxJD36LmctPBs-AUZMhsl66wWVx19CM-WBJcIEIeTBPHhYYgLndc7P4" 
          alt="Atmospheric"
          className="w-full h-full object-cover opacity-10 mix-blend-multiply grayscale brightness-125"
        />
      </div>

      <motion.main 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="glass-card border-outline-variant/30 rounded-3xl p-10 shadow-2xl backdrop-blur-3xl bg-white/60">
          <header className="text-center mb-10">
            <h1 className="text-5xl font-bold text-primary tracking-tighter mb-2 italic">STRACK</h1>
            <p className="text-sm font-medium text-on-surface-variant uppercase tracking-widest opacity-70">Focus on what matters most.</p>
          </header>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest px-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-outline group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="name@university.edu"
                  className="w-full h-14 bg-surface-container-low border-b-2 border-outline-variant text-on-surface focus:border-primary focus:ring-0 transition-all pl-12 pr-4 text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Password</label>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-outline group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-14 bg-surface-container-low border-b-2 border-outline-variant text-on-surface focus:border-primary focus:ring-0 transition-all pl-12 pr-4 text-sm font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 px-1 py-1">
              <input type="checkbox" id="remember" className="w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary focus:ring-offset-background cursor-pointer" />
              <label htmlFor="remember" className="text-sm font-medium text-on-surface-variant cursor-pointer">Stay focused on this device</label>
            </div>

            <NavLink to="/" className="w-full h-14 bg-primary text-on-primary font-bold text-lg border-2 border-[#0F172A] rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-3 shadow-lg hover:shadow-primary/20">
              Login
              <LogIn size={20} />
            </NavLink>
          </form>

          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="w-full flex items-center gap-4">
              <div className="flex-grow h-[1px] bg-outline-variant/30" />
              <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em] whitespace-nowrap">OR CONTINUE WITH</span>
              <div className="flex-grow h-[1px] bg-outline-variant/30" />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <button className="flex items-center justify-center h-12 border-2 border-[#0F172A] rounded-xl bg-white hover:bg-surface-container-low transition-all active:scale-95 shadow-sm">
                <div className="w-5 h-5 mr-2">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRjs9YUeHkYSyedOVLGmviPGcpTsbEhogsyYjq2htATbrNypNyOpTj5-uv_5dRZ_j2LMESXzLBjuUnniZBrT8H5UcXFFXhRzVXA5J4w4LZl1jKu8h2Q3zg_o3WeUAoR4d-Nikg51FPlflpE4NlZQ2EAkMNJX6UdRkXqUnxPD7mqAoEZwZvymv_o_BOqEq8ycvJjb6xdC17f3yTQ3NEBgMOgQfndZSrN7nUMEat8NxjXZeYzYqmFDY31vbnkAumelbn-Tj-hBc3WNc" alt="Google" className="w-full h-full" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">Google</span>
              </button>
              <button className="flex items-center justify-center h-12 border-2 border-[#0F172A] rounded-xl bg-white hover:bg-surface-container-low transition-all active:scale-95 shadow-sm">
                <div className="mr-2 text-primary">
                  <School size={18} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">EduID</span>
              </button>
            </div>
          </div>

          <footer className="mt-10 text-center border-t border-outline-variant/20 pt-8">
            <p className="text-sm font-medium text-on-surface-variant">
              New to the system? 
              <NavLink to="/register" className="text-primary font-bold ml-2 hover:underline">Register</NavLink>
            </p>
          </footer>
        </div>

        <div className="mt-8 flex justify-center space-x-8">
          <button className="text-[10px] font-black text-outline hover:text-primary transition-colors uppercase tracking-[0.2em]">Accessibility</button>
          <button className="text-[10px] font-black text-outline hover:text-primary transition-colors uppercase tracking-[0.2em]">Privacy</button>
          <button className="text-[10px] font-black text-outline hover:text-primary transition-colors uppercase tracking-[0.2em]">Support</button>
        </div>
      </motion.main>
    </div>
  );
}
