"use client"

import { useState, useMemo, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card } from '@/components/ui/card';
import { useMeetingStore } from '@/store/useStore';
import { format } from 'date-fns';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search,
  ExternalLink,
  Trash2,
  MoreVertical,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export default function CalendarPage() {
  const { meetings, deleteMeeting } = useMeetingStore();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1280);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const events = useMemo(() => {
    return meetings.map(m => ({
      id: m.id,
      title: m.title,
      start: `${m.date.split('T')[0]}T${m.time}:00`,
      extendedProps: {
        description: m.description,
        participants: m.participants,
        status: m.status
      },
      classNames: [m.status === 'upcoming' ? 'event-upcoming' : 'event-other']
    }));
  }, [meetings]);

  const selectedMeeting = meetings.find(m => m.id === selectedEventId);

  const handleEventClick = (info: any) => {
    setSelectedEventId(info.event.id);
    if (isMobile) {
      setIsSheetOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    deleteMeeting(id);
    setSelectedEventId(null);
    setIsSheetOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-[1600px] mx-auto">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
            <span className="w-2 h-8 bg-primary rounded-full hidden sm:block" />
            Schedule
          </h1>
          <p className="text-muted-foreground text-sm font-medium opacity-70">Total of {meetings.length} appointments synced</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search appointments..." 
              className="pl-10 w-64 bg-card/40 border-border/50 rounded-xl focus:ring-primary/20"
            />
          </div>
          <Button className="rounded-xl px-5 h-11 gap-2 font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <Plus className="w-5 h-5 stroke-[3]" />
            New Meeting
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 min-h-[700px]">
        {/* Main Calendar Card */}
        <Card className="xl:col-span-8 p-0 border-none bg-transparent shadow-none flex flex-col group relative">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10 opacity-50" />
          
          <div className="flex-1 bg-card/40 backdrop-blur-3xl border border-border/60 rounded-[2.5rem] overflow-hidden p-6 shadow-2xl flex flex-col">
            <div className="full-calendar-wrapper flex-1">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={isMobile ? "timeGridDay" : "dayGridMonth"}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: isMobile ? '' : 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
                eventClick={handleEventClick}
                height="100%"
                themeSystem="standard"
                nowIndicator={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                dayHeaderFormat={{ weekday: 'short' }}
                eventTimeFormat={{
                  hour: 'numeric',
                  minute: '2-digit',
                  meridiem: 'short'
                }}
                eventClassNames={(info) => {
                  return cn(
                    "cursor-pointer transition-all border-none py-1 px-2 rounded-xl text-xs font-semibold shadow-sm",
                    "hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
                  );
                }}
              />
            </div>
          </div>
        </Card>

        {/* Sidebar Details - Desktop Only */}
        <div className="hidden xl:flex xl:col-span-4 flex-col gap-6">
          <Card className="flex-1 bg-card/60 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] overflow-hidden flex flex-col shadow-xl">
            <div className="p-8 border-b border-border/30 flex items-center justify-between bg-muted/20">
              <h2 className="text-xl font-bold tracking-tight">Meeting Details</h2>
              {selectedMeeting && (
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(selectedMeeting.id)}>
                     <Trash2 className="w-4 h-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                     <MoreVertical className="w-4 h-4" />
                   </Button>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {selectedMeeting ? (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                  <div className="space-y-4">
                    <Badge className={cn(
                      "text-[10px] uppercase font-black tracking-[0.15em] px-3 py-1 rounded-full",
                      selectedMeeting.status === 'upcoming' 
                        ? 'bg-primary/20 text-primary border-primary/20 border' 
                        : 'bg-muted text-muted-foreground'
                    )}>
                      {selectedMeeting.status}
                    </Badge>
                    <h3 className="text-4xl font-black leading-[1.1] tracking-tighter text-foreground">
                      {selectedMeeting.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed opacity-80">
                      {selectedMeeting.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 rounded-3xl bg-muted/30 border border-border/20 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Time Slot</div>
                        <div className="text-lg font-bold">{selectedMeeting.time}</div>
                      </div>
                    </div>
                    <div className="p-4 rounded-3xl bg-muted/30 border border-border/20 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                        <CalendarIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Date</div>
                        <div className="text-lg font-bold">{format(new Date(selectedMeeting.date), 'EEEE, MMMM do')}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Participants</h4>
                      <Badge variant="outline" className="rounded-full px-2 border-border/50">{selectedMeeting.participants.length}</Badge>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedMeeting.participants.map((p, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/40 hover:border-primary/30 transition-colors group">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-primary group-hover:scale-110 transition-transform">
                            {p.email.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate">{p.email.split('@')[0]}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{p.email}</div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 pt-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <CalendarIcon className="w-20 h-20 text-primary/40 relative z-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight">No Selection</h3>
                    <p className="text-muted-foreground text-sm font-medium max-w-[240px] mx-auto opacity-60">
                      Tap any block on your timeline to reveal the full briefing.
                    </p>
                  </div>
                  <div className="pt-8 grid grid-cols-3 gap-2 w-full opacity-30">
                    {[1, 2, 3].map(i => <div key={i} className="h-1 bg-muted rounded-full" />)}
                  </div>
                </div>
              )}
            </div>

            {selectedMeeting && (
              <div className="p-8 border-t border-border/30 bg-muted/10">
                <Button className="w-full h-14 rounded-2xl gap-3 font-black text-sm uppercase tracking-widest group shadow-xl shadow-primary/10">
                   Enter Meeting Room
                   <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Mobile Details Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-[3rem] p-0 border-none bg-card overflow-hidden">
          {selectedMeeting && (
            <div className="h-full flex flex-col">
              <div className="w-12 h-1.5 bg-muted/40 rounded-full mx-auto my-4 shrink-0" />
              <div className="flex-1 overflow-y-auto px-8 pb-12 space-y-8 pt-4">
                  <div className="space-y-4">
                    <Badge className="bg-primary/20 text-primary border-primary/20 border text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full">
                      {selectedMeeting.status}
                    </Badge>
                    <h2 className="text-4xl font-black leading-tight tracking-tighter">
                      {selectedMeeting.title}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {selectedMeeting.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-3xl bg-muted/50 border border-border/30 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Clock className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Time</div>
                        <div className="text-xl font-bold">{selectedMeeting.time}</div>
                      </div>
                    </div>
                    <div className="p-5 rounded-3xl bg-muted/50 border border-border/30 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                        <CalendarIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Date</div>
                        <div className="text-xl font-bold">{format(new Date(selectedMeeting.date), 'MMM d, yyyy')}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Team ({selectedMeeting.participants.length})</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedMeeting.participants.map((p, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/20">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {p.email.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-base truncate">{p.email}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 flex gap-3">
                    <Button className="flex-1 h-16 rounded-3xl gap-3 font-black text-base uppercase tracking-widest shadow-2xl shadow-primary/20">
                       Join
                    </Button>
                    <Button variant="outline" size="icon" className="h-16 w-16 rounded-3xl text-destructive hover:bg-destructive/10" onClick={() => handleDelete(selectedMeeting.id)}>
                      <Trash2 className="w-6 h-6" />
                    </Button>
                  </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <style jsx global>{`
        .fc {
          --fc-border-color: rgba(255, 255, 255, 0.05);
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: transparent;
          --fc-today-bg-color: rgba(255, 255, 255, 0.03);
          --fc-event-bg-color: hsl(var(--primary));
          --fc-event-border-color: transparent;
          font-family: inherit;
        }
        
        .fc .fc-toolbar {
          margin-bottom: 2rem !important;
          padding: 0 0.5rem;
        }

        .fc .fc-toolbar-title {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: hsl(var(--foreground));
        }

        .fc .fc-button {
          background-color: hsl(var(--muted)/0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: hsl(var(--muted-foreground));
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.6rem 1.25rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 1rem;
        }

        .fc .fc-button:hover {
          background-color: hsl(var(--muted)/0.5);
          color: hsl(var(--foreground));
          transform: translateY(-1px);
        }

        .fc .fc-button-primary:not(:disabled).fc-button-active {
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          border-color: hsl(var(--primary));
          box-shadow: 0 10px 20px -5px rgba(var(--primary-rgb), 0.3);
        }

        .fc th {
          padding: 1.25rem 0;
          font-size: 0.7rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: hsl(var(--muted-foreground));
          opacity: 0.5;
        }

        .fc-theme-standard td, .fc-theme-standard th {
          border-color: rgba(255, 255, 255, 0.04);
        }

        .fc .fc-daygrid-day-number {
          padding: 1rem;
          font-size: 0.875rem;
          font-weight: 700;
          opacity: 0.8;
          color: hsl(var(--muted-foreground));
        }

        .fc .fc-day-today .fc-daygrid-day-number {
          color: hsl(var(--primary));
          opacity: 1;
        }

        .fc-event-main {
          padding: 2px 4px;
        }

        .event-upcoming {
          background-color: hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
        }

        .event-other {
          background-color: hsl(var(--muted)) !important;
          color: hsl(var(--muted-foreground)) !important;
        }

        .fc .fc-scrollgrid {
          border: none !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .fc .fc-toolbar {
            flex-direction: column;
            gap: 1rem;
          }
          .fc .fc-toolbar-title {
            font-size: 1.25rem;
          }
          .fc .fc-button {
            padding: 0.5rem 1rem;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}
