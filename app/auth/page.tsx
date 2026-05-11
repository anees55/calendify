"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  ArrowRight, 
  Mail, 
  Lock, 
  Github, 
  ChevronLeft,
  CheckCircle2,
  Zap,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useStore';
import Link from 'next/link';
import { signInWithGoogle } from "../auth/auth";


export default function AuthPage() {


  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // ⚠️ Placeholder only (you can later connect Supabase email auth)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsLoading(false);
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    await signInWithGoogle();
    // redirect handled by Supabase → /auth/callback
  };


  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden selection:bg-primary/30">
      {/* Visual Side (LHS) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-muted p-12 flex-col justify-between overflow-hidden">
        {/* Abstract background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-primary-foreground stroke-[2.5]" />
            </div>
            <span className="font-black text-3xl tracking-tighter">Calendify</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                v2.0 Release
              </div>
            </div>
            <h2 className="text-6xl font-black tracking-tight leading-[0.9] mb-8">
              Focus on <br /> the <span className="text-primary italic">work</span>.<br /> We'll handle <br /> the rest.
            </h2>
            <div className="space-y-6">
              {[
                "Instant cross-timezone sync",
                "Automated meeting hand-offs",
                "Advanced team collective view"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-lg font-medium text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex border-t border-border/40 pt-8 mt-12 gap-12">
          <div>
            <div className="text-3xl font-black tracking-tighter">12k+</div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Professional Users</div>
          </div>
          <div>
            <div className="text-3xl font-black tracking-tighter">99.9%</div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Uptime Record</div>
          </div>
        </div>
      </div>

      {/* Auth Side (RHS) */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10 lg:hidden" />
        
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-12 flex justify-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-black text-2xl tracking-tighter">Calendify</span>
            </Link>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl font-black tracking-tight mb-2">
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </h1>
                <p className="text-muted-foreground font-medium">
                  {mode === 'login' 
                    ? 'Enter your credentials to access your engine.' 
                    : 'Join the next generation of professional schedulers.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button  onClick={handleGoogle} variant="outline" className="flex-1 h-12 rounded-2xl gap-3 font-bold border-border/60 hover:bg-muted/50 transition-all">
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                  Google
                </Button>
                <Button variant="outline" className="flex-1 h-12 rounded-2xl gap-3 font-bold border-border/60 hover:bg-muted/50 transition-all">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/60"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-4 text-muted-foreground font-black tracking-widest">or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      type="email" 
                      placeholder="name@company.com" 
                      className="h-14 pl-12 rounded-2xl bg-muted/30 border-border/50 font-bold focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Password</Label>
                    {mode === 'login' && (
                      <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot?</button>
                    )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-14 pl-12 rounded-2xl bg-muted/30 border-border/50 font-bold focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/20 animate-in fade-in zoom-in-95">
                    <Sparkles className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-xs font-bold text-primary/80 leading-tight">
                      Sign up today to get 1 month of <span className="underline decoration-primary/40 font-black">Pro Features</span> for free.
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-14 rounded-2xl font-black text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      {mode === 'login' ? 'Sign In to Dashboard' : 'Create My Engine'}
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="pt-6 text-center">
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  {mode === 'login' ? (
                    <>Don't have an account? <span className="text-primary group-hover:underline font-black">Get Started</span></>
                  ) : (
                    <>Already have an account? <span className="text-primary group-hover:underline font-black">Sign In</span></>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-24 text-center">
             <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors group">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Overview
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
