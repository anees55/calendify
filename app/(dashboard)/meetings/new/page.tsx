export const dynamic = "force-dynamic";
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Info,
  Link as LinkIcon,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useMeetingStore } from '@/store/useStore';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function CreateMeeting() {
  const router = useRouter();
  const { addMeeting } = useMeetingStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [participants, setParticipants] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !date || !time) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newMeetingId = Math.random().toString(36).substr(2, 9);
    const url = `https://calendify.app/m/${title.toLowerCase().replace(/\s+/g, '-')}-${newMeetingId}`;
    
    const newMeeting = {
      id: newMeetingId,
      title,
      description,
      date: date.toISOString(),
      time,
      participants: participants.split(',').map(email => ({ email: email.trim() })).filter(p => p.email),
      status: 'upcoming' as const,
      meetingLink: url
    };

    addMeeting(newMeeting);
    setMeetingUrl(url);
    setIsCreated(true);
    toast.success('Meeting created successfully!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(meetingUrl);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom duration-500">
      <Button 
        variant="ghost" 
        onClick={() => router.push('/dashboard')} 
        className="mb-8 gap-2 hover:bg-transparent -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Button>

      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Create New Meeting</h1>
        <p className="text-muted-foreground text-lg">Schedule your next session and invite participants.</p>
      </div>

      <AnimatePresence mode="wait">
        {!isCreated ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit} 
            className="space-y-8 p-8 rounded-3xl bg-card/40 border border-border glass-card"
          >
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base">Meeting Title <span className="text-destructive">*</span></Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Project Kickoff" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 bg-muted/30 border-border focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc" className="text-base text-muted-foreground">Description</Label>
                <textarea 
                  id="desc"
                  placeholder="What's this meeting about?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full min-h-[100px] rounded-xl bg-muted/30 border border-border p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base">Date <span className="text-destructive">*</span></Label>
                  <Popover>
                    <PopoverTrigger render={
                      <Button
                        variant="outline"
                        type="button"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal bg-muted/30 border-border",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    } />
                    <PopoverContent className="w-auto p-0 border-border" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-base">Time <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="time" 
                      type="time" 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="h-12 pl-10 bg-muted/30 border-border"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="participants" className="text-base">Participants <span className="text-sm font-normal text-muted-foreground ml-2">(comma separated emails)</span></Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="participants" 
                    placeholder="sarah@example.com, john@example.com" 
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value)}
                    className="h-12 pl-10 bg-muted/30 border-border"
                  />
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Participants will receive an automatic email invitation.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <Button type="button" variant="ghost" onClick={() => router.push('/dashboard')}>
                Cancel
              </Button>
              <Button type="submit" size="lg" className="px-8 shadow-lg shadow-primary/20">
                Create Meeting
              </Button>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 text-center rounded-3xl bg-card border border-border glass-card"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Meeting Created!</h2>
            <p className="text-muted-foreground mb-12 max-w-sm mx-auto">
              Your meeting has been scheduled. Share the link below with your participants.
            </p>

            <div className="bg-muted/50 p-6 rounded-2xl border border-border relative group mb-8">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-bold">Shareable Link</Label>
              <div className="flex items-center gap-4">
                <LinkIcon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium truncate flex-1 text-left">{meetingUrl}</span>
                <Button variant="secondary" size="icon" className="shrink-0" onClick={handleCopy}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto" onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => setIsCreated(false)}>
                Create Another
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
