"use client"

import { motion } from 'motion/react';
import { useMeetingStore } from '@/store/useStore';
import MeetingCard from '@/components/dashboard/MeetingCard';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function MyMeetings() {
  const { meetings } = useMeetingStore();
  const [search, setSearch] = useState('');

  const filteredMeetings = meetings.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Meetings</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your scheduled sessions.</p>
        </div>
        <Link href="/meetings/new">
          <Button className="gap-2 bg-primary hover:bg-primary/90 h-11 px-6">
            <PlusCircle className="w-5 h-5" />
            Create New Meeting
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search meetings by title or description..." 
            className="pl-10 h-11 bg-card/50 border-border focus:ring-primary/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-11 gap-2 border-border bg-card/50">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {filteredMeetings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeetings.map((meeting, i) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <MeetingCard meeting={meeting} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-card/30 border border-dashed border-border rounded-3xl">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No meetings found</h3>
          <p className="text-muted-foreground">Try adjusting your search or create a new meeting.</p>
        </div>
      )}
    </div>
  );
}
