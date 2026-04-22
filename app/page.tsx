"use client"
 
import { motion } from 'motion/react';
import { 
  Calendar, 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  Check, 
  Github, 
  Twitter, 
  Linkedin,
  Mail,
  Users,
  Video,
  Clock,
  Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useStore';
import React from 'react';
 
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [mounted, setMounted] = React.useState(false);
 
  React.useEffect(() => {
    setMounted(true);
    console.log("Calendify Landing Page Mounted");
  }, []);
 
  React.useEffect(() => {
    if (mounted && user) {
      router.replace('/dashboard');
    }
  }, [user, router, mounted]);
 
  const handleAuth = () => {
    router.push('/auth');
  };
 
  const [activeSection, setActiveSection] = React.useState('');

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'pricing', 'about'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 100) setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
 
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[150px]" />
      </div>
 
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl tracking-tighter">Calendify</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button 
              onClick={() => scrollToSection('features')} 
              className={cn(
                "transition-colors hover:text-primary",
                activeSection === 'features' ? "text-primary" : "text-muted-foreground"
              )}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className={cn(
                "transition-colors hover:text-primary",
                activeSection === 'pricing' ? "text-primary" : "text-muted-foreground"
              )}
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className={cn(
                "transition-colors hover:text-primary",
                activeSection === 'about' ? "text-primary" : "text-muted-foreground"
              )}
            >
              About
            </button>
          </div>
          <Button onClick={handleAuth}>Sign In</Button>
        </div>
      </nav>
 
      {/* Hero Section */}
      <main className="relative z-10 pt-40 pb-32 px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: Smart Scheduling is here
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent leading-[1.1]">
            Scheduling made <br /> <span className="text-primary">effortlessly simple.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            The all-in-one platform to manage your meetings, sync your calendar, and collaborate with your team without the back-and-forth.
          </p>
 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-10 gap-3 group bg-primary hover:bg-primary/90 text-lg font-black rounded-2xl shadow-xl shadow-primary/20 transition-all hover:-translate-y-1" onClick={handleAuth}>
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3]" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 gap-3 bg-white/5 backdrop-blur-md text-lg font-bold border-border/40 rounded-2xl hover:bg-white/10 transition-all" onClick={handleAuth}>
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-5 h-5" 
                referrerPolicy="no-referrer"
              />
              Sign in with Google
            </Button>
          </div>
        </motion.div>
 
        {/* Hero Mockup */}
        <div className="relative max-w-6xl mx-auto mt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-card/30 backdrop-blur-3xl overflow-hidden shadow-2xl shadow-primary/20"
          >
            <img 
              src="https://picsum.photos/seed/dashboard/1920/1080" 
              alt="Dashboard Preview" 
              className="w-full grayscale opacity-40 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-8 rounded-2xl glass-card max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Real-time scheduling</h2>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-primary/20" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-24 bg-white/20 rounded" />
                        <div className="h-2 w-16 bg-white/10 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
 
      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to <span className="text-primary">master your time.</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful tools designed for teams that value speed, clarity, and collaboration.
          </p>
        </div>
 
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Lightning Fast Setup", desc: "Configuration is a breeze. Set your preferences and start sharing links in under 60 seconds." },
            { icon: Shield, title: "Enterprise Security", desc: "SOC2 compliant with advanced encryption and granular permissions for peace of mind." },
            { icon: Globe, title: "Timezone Intelligence", desc: "Native support for global teams. Automatically syncs and calculates time differences perfectly." },
            { icon: Video, title: "Smart Video Calls", desc: "Automatically generate Zoom, Google Meet, or Teams links for every scheduled meeting." },
            { icon: Users, title: "Team Collaboration", desc: "Shared calendars and collective scheduling for seamless internal coordination." },
            { icon: Layout, title: "Custom Branding", desc: "Make your scheduling page uniquely yours with custom logos, colors, and domains." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all hover:translate-y--1 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
 
      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Simple, transparent <span className="text-primary">pricing.</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Scale your scheduling as you grow. Start for free and upgrade as you need more power.
          </p>
        </div>
 
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { 
              name: "Free", 
              price: "$0", 
              desc: "Perfect for individuals and side projects.",
              features: ["1 Calendar connection", "Basic scheduling", "Limited meeting types", "Calendify branding"]
            },
            { 
              name: "Pro", 
              price: "$12", 
              desc: "Best for professionals and small teams.",
              features: ["Umlimited connections", "Custom branding", "Team scheduling", "Advanced integrations"],
              popular: true
            },
            { 
              name: "Enterprise", 
              price: "Custom", 
              desc: "Tailored for large organizations.",
              features: ["SAML SSO", "Priority support", "API access", "White-label solution"]
            }
          ].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl border flex flex-col transition-all relative ${plan.popular ? 'bg-primary/5 border-primary shadow-xl shadow-primary/10 scale-105' : 'bg-white/[0.02] border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                   POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-8">{plan.desc}</p>
              
              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
 
              <Button 
                variant={plan.popular ? 'default' : 'outline'} 
                className="w-full h-14 rounded-2xl font-black text-lg"
                onClick={handleAuth}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </section>
 
      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Our mission is to <span className="text-primary">give you back your time.</span></h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6 italic">
              "We believe scheduling shouldn't be a chore. It should be a superpower that helps teams focus on what really matters—doing great work together."
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2024, Calendify was born out of frustration with clunky, outdated scheduling tools. We've built a platform that puts the user experience first, leveraging modern AI and a minimal design philosophy to create the fastest scheduling workflow on the planet.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { label: "Active Users", val: "100k+" },
              { label: "Meetings/Day", val: "250k" },
              { label: "Hours Saved", val: "1M+" },
              { label: "Global Teams", val: "5k+" },
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-3xl font-bold text-primary mb-2 tracking-tighter">{stat.val}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
 
      {/* Footer */}
      <footer className="relative z-10 pt-32 pb-16 px-8 max-w-7xl mx-auto">
        <div className="border-t border-white/10 pt-16 grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tighter">Calendify</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Modern scheduling for teams who value their time. Built with love in San Francisco.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:text-primary">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:text-primary">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:text-primary">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
 
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors">Features</button></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Enterprise</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mobile App</a></li>
            </ul>
          </div>
 
          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Status</a></li>
            </ul>
          </div>
 
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8 text-xs text-muted-foreground">
          <p>© 2024 Calendify Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              All systems operational
            </div>
            <div className="flex items-center gap-2 group cursor-pointer hover:text-primary">
              <Mail className="w-3 h-3 group-hover:scale-110 transition-transform" />
              support@calendify.app
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
