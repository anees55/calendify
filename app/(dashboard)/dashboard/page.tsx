"use client"

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  List, 
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useRouter } from 'next/navigation';
import { useMeetingStore } from '@/store/useStore';
import MeetingCard from '@/components/dashboard/MeetingCard';
import DashboardStats from '@/components/dashboard/DashboardStats';

export default function Dashboard() {
  const router = useRouter();
  const { meetings } = useMeetingStore();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your meetings today.</p>
        </div>
        <Button onClick={() => router.push('/meetings/new')} className="gap-2 h-11 px-6 shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
          Create New Meeting
        </Button>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <List className="w-5 h-5 text-primary" />
              Recent Meetings
            </h2>
            <Button variant="ghost" size="sm" onClick={() => router.push('/meetings')} className="text-primary hover:text-primary hover:bg-primary/10">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meetings.slice(0, 4).map((meeting, index) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <MeetingCard meeting={meeting} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              Quick Schedule
            </h2>
            <Button variant="ghost" size="sm" onClick={() => router.push('/calendar')} className="text-primary hover:text-primary hover:bg-primary/10">
              Full View
            </Button>
          </div>
          
          <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-2 h-fit">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-none w-full flex justify-center"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
              Events for {date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Today'}
            </h3>
            <div className="space-y-3">
              {meetings.filter(m => date && new Date(m.date).toDateString() === date.toDateString()).length > 0 ? (
                meetings
                  .filter(m => date && new Date(m.date).toDateString() === date.toDateString())
                  .slice(0, 3)
                  .map(meeting => (
                    <div key={meeting.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border group hover:border-primary/30 transition-all hover:translate-x-1">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{meeting.title}</h4>
                        <p className="text-xs text-muted-foreground">{meeting.time}</p>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="p-8 text-center border border-dashed border-border rounded-xl bg-muted/5">
                  <p className="text-xs text-muted-foreground">Free day! No meetings.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
