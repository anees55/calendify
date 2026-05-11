"use client";

import { useRouter } from "next/navigation";
import { Search, Bell, HelpCircle, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Navbar() {
   const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // 🔥 Get Supabase user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    // live auth updates
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🔥 Logout (REAL)
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  const fullName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0];

  const avatar =
    user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${fullName}`;

  return (
    <header className="h-16 shrink-0 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-20">
      <div className="flex items-center gap-4 flex-1">
        <Sheet>
          <SheetTrigger render={
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          } />
          <SheetContent side="left" className="p-0 w-72 h-full bg-card overflow-hidden">
            <Sidebar isMobile />
          </SheetContent>
        </Sheet>

        <div className="flex-1 max-w-md relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search meetings..." 
            className="pl-10 bg-muted/50 border-none focus-visible:ring-1 ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <button className={cn(buttonVariants({ variant: "ghost" }), "relative h-10 w-10 rounded-full")}>
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={avatar} />
                <AvatarFallback>
                  {fullName?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </button>
          } />
  
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {fullName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
