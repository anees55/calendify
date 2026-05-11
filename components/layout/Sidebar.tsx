"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  Calendar as CalendarIcon,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "My Meetings", path: "/meetings" },
  { icon: PlusCircle, label: "Create Meeting", path: "/meetings/new" },
  { icon: CalendarIcon, label: "Calendar", path: "/calendar" },
  { icon: Settings, label: "Settings", path: "/settings" },
];


export default function Sidebar({ isMobile = false }: { isMobile?: boolean }) {

  const pathname = usePathname();
  const router = useRouter();

  // 🔥 Supabase logout (REAL FIX)
  const handleLogout = async () => {
    await supabase.auth.signOut(); // remove session
    router.replace("/"); // send to home/login
  };
  return (
    <aside className={cn(
      "border-r border-border bg-card/30 backdrop-blur-xl flex flex-col z-20 h-full transition-all duration-300 ease-in-out",
      isMobile ? "w-full" : "w-20 xl:w-72 hidden md:flex"
    )}>
      <div className={cn(
        "p-6 flex items-center gap-3",
        !isMobile && "justify-center xl:justify-start"
      )}>
        <Link href="/dashboard" className="flex items-center gap-3 text-foreground group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <CalendarIcon className="w-6 h-6 text-primary-foreground stroke-[2.5]" />
          </div>
          <span className={cn(
            "font-black text-2xl tracking-tighter transition-opacity duration-300",
            !isMobile && "hidden xl:block"
          )}>
            Calendify
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              title={item.label}
              className={cn(
                "flex items-center gap-4 px-3 h-12 rounded-2xl text-sm font-bold transition-all group overflow-hidden",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                !isMobile && "xl:justify-start justify-center"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              )} />
              <span className={cn(
                "transition-opacity duration-300 whitespace-nowrap",
                !isMobile && "hidden xl:block"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/40">
        <Button
          variant="ghost"
          className={cn(
            "w-full h-12 rounded-2xl gap-4 font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all",
            !isMobile && "xl:justify-start justify-center"
          )}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className={cn(
            "transition-opacity duration-300",
            !isMobile && "hidden xl:block"
          )}>
            Logout Session
          </span>
        </Button>
      </div>
    </aside>
  );
}
