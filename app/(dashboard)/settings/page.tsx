"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/useStore';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  CreditCard, 
  Mail, 
  Camera, 
  Save, 
  ChevronRight,
  Settings as SettingsIcon,
  LogOut,
  Smartphone,
  Lock,
  Eye,
  Cloud,
  CheckCircle2
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const SETTINGS_TABS = [
  { id: 'profile', label: 'My Profile', icon: User, description: 'Personal info & avatar' },
  { id: 'security', label: 'Security', icon: Shield, description: 'Password & 2FA' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Email & Push alerts' },
  { id: 'billing', label: 'Billing', icon: CreditCard, description: 'Subscription & Invoices' },
  { id: 'connected', label: 'Connected Apps', icon: Globe, description: 'Calendar & API' },
];

export default function Settings() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700">
      <div className="mb-10 space-y-1">
        <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground font-medium opacity-60">Fine-tune your scheduling engine and identity.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-10 items-start">
        {/* Navigation Sidebar */}
        <aside className="w-full xl:w-80 shrink-0 space-y-2">
          {SETTINGS_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-[1.25rem] transition-all group text-left",
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                  : "hover:bg-card/60 text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                activeTab === tab.id ? "bg-white/20" : "bg-muted/30 group-hover:bg-primary/10"
              )}>
                <tab.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm leading-none mb-1">{tab.label}</div>
                <div className={cn(
                  "text-[10px] font-medium opacity-70",
                  activeTab === tab.id ? "text-white/80" : "text-muted-foreground"
                )}>
                  {tab.description}
                </div>
              </div>
              <ChevronRight className={cn(
                "w-4 h-4 transition-transform",
                activeTab === tab.id ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
              )} />
            </button>
          ))}
          
          <div className="pt-8 mt-8 border-t border-border/40">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-4 h-14 rounded-2xl text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => logout()}
            >
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-bold">Logout Session</span>
            </Button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 w-full min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && (
                <section className="space-y-8">
                  <Card className="p-8 bg-card/40 backdrop-blur-3xl border-border/60 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10" />
                    
                    <div className="flex flex-col lg:flex-row gap-12">
                      <div className="flex flex-col items-center gap-6">
                        <div className="relative group">
                          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <Avatar className="h-40 w-40 border-4 border-card p-1 shadow-2xl relative z-10 scale-100 group-hover:scale-105 transition-transform">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback className="text-4xl font-black bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">JD</AvatarFallback>
                          </Avatar>
                          <button className="absolute bottom-2 right-2 p-3 bg-primary text-primary-foreground rounded-2xl shadow-xl z-20 hover:scale-110 active:scale-95 transition-all">
                            <Camera className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="text-center">
                          <h2 className="text-xl font-black tracking-tight">{user?.name}</h2>
                          <p className="text-sm text-muted-foreground font-medium">{user?.email}</p>
                        </div>
                      </div>

                      <div className="flex-1 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">First Name</Label>
                            <Input id="firstName" defaultValue="John" className="h-14 bg-muted/30 border-border/50 rounded-2xl px-5 font-bold focus:ring-primary/20" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Last Name</Label>
                            <Input id="lastName" defaultValue="Doe" className="h-14 bg-muted/30 border-border/50 rounded-2xl px-5 font-bold focus:ring-primary/20" />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="email" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Email Connection</Label>
                            <div className="relative group">
                              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                              <Input id="email" defaultValue={user?.email} className="pl-14 h-14 bg-muted/10 border-border/30 rounded-2xl font-bold opacity-70" disabled />
                              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <Badge className="bg-green-500/10 text-green-500 border-none px-2 py-0">Verified</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="bio" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Professional Bio</Label>
                            <textarea 
                              id="bio" 
                              className="w-full min-h-[120px] rounded-2xl border border-border/50 bg-muted/30 p-5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none transition-all outline-none"
                              placeholder="Describe your role..."
                              defaultValue="Senior Product Manager at TechFlow. Always looking for ways to optimize my schedule."
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                          <Button variant="ghost" className="h-14 px-8 rounded-2xl font-bold">Cancel</Button>
                          <Button className="h-14 px-10 gap-3 bg-primary hover:bg-primary/90 rounded-2xl font-black shadow-xl shadow-primary/20 transition-all hover:-translate-y-1">
                            <Save className="w-5 h-5 stroke-[3]" />
                            Update Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { icon: Smartphone, label: 'Device List', val: '3 Connected' },
                      { icon: Lock, label: 'Last Login', val: '2 hours ago' },
                      { icon: Eye, label: 'Visibility', val: 'Public' },
                    ].map((stat, i) => (
                      <Card key={i} className="p-6 bg-card/20 border-border/40 rounded-[1.5rem] flex items-center gap-4 group hover:bg-card/40 transition-all cursor-pointer">
                        <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">{stat.label}</div>
                          <div className="text-base font-black">{stat.val}</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === 'notifications' && (
                <section className="space-y-8">
                  <Card className="p-10 bg-card/40 backdrop-blur-3xl border-border/60 rounded-[2.5rem] shadow-2xl">
                    <div className="flex items-center justify-between mb-10">
                      <div>
                        <h2 className="text-3xl font-black tracking-tight mb-2">Notification Center</h2>
                        <p className="text-muted-foreground font-medium">Control how and when we reach out to you.</p>
                      </div>
                      <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                        <Bell className="w-8 h-8" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { title: "Smart Reminders", desc: "AI-powered alerts based on your travel and meeting history.", icon: Mail, checked: true },
                        { title: "Weekly Forecast", desc: "A detailed breakdown of your upcoming availability delivered Monday.", icon: Bell, checked: true },
                        { title: "Browser Alerts", desc: "Push notifications for instant meeting requests and changes.", icon: Globe, checked: false },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-muted/20 border border-border/40 hover:bg-muted/30 transition-all cursor-pointer">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground">
                              <item.icon className="w-7 h-7" />
                            </div>
                            <div>
                              <h4 className="font-black text-lg leading-tight">{item.title}</h4>
                              <p className="text-sm text-muted-foreground font-medium opacity-70 leading-relaxed max-w-md">{item.desc}</p>
                            </div>
                          </div>
                          <div 
                            className={cn(
                              "w-16 h-10 rounded-full relative transition-all duration-300 p-1.5",
                              item.checked ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-muted border border-border/50'
                            )}
                          >
                            <div className={cn(
                              "w-7 h-7 rounded-full transition-all duration-300",
                              item.checked ? 'translate-x-6 bg-white' : 'translate-x-0 bg-muted-foreground/30'
                            )} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </section>
              )}

              {activeTab === 'security' && (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="p-8 bg-card/40 backdrop-blur-3xl border-border/60 rounded-[2.5rem] shadow-2xl space-y-6">
                    <div className="w-16 h-16 rounded-3xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <Lock className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight mb-2">Two-Factor Auth</h3>
                      <p className="text-muted-foreground text-sm font-medium leading-relaxed">Secure your session with an external authenticator or SMS verification.</p>
                    </div>
                    <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/20">
                       Secure My Account
                    </Button>
                  </Card>

                  <Card className="p-8 bg-card/40 backdrop-blur-3xl border-border/60 rounded-[2.5rem] shadow-2xl space-y-6">
                    <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Shield className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight mb-2">Session History</h3>
                      <p className="text-muted-foreground text-sm font-medium leading-relaxed">Review all active devices and browsers currently logged into your engine.</p>
                    </div>
                    <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-border/50 hover:bg-muted/30">
                       Revoke All Access
                    </Button>
                  </Card>

                  <Card className="md:col-span-2 p-10 bg-card/40 backdrop-blur-3xl border-border/60 rounded-[2.5rem] shadow-2xl">
                    <div className="flex items-center gap-8">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                          <h3 className="text-2xl font-black tracking-tight">Cloud Backup</h3>
                        </div>
                        <p className="text-muted-foreground font-medium">Your data is currently encrypted and backed up to our secure primary node.</p>
                      </div>
                      <div className="w-32 h-16 rounded-2xl bg-card border border-border/50 flex items-center justify-center font-black text-sm">
                        ACTIVE
                      </div>
                    </div>
                  </Card>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
