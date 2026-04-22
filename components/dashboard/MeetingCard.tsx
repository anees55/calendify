"use client"

import { Meeting } from '@/types';
import { 
  MoreVertical, 
  Calendar, 
  Clock, 
  Users, 
  ExternalLink,
  Trash2,
  Edit2,
  Share2
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useMeetingStore } from '@/store/useStore';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface MeetingCardProps {
  meeting: Meeting;
}

const statusColors = {
  upcoming: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-500 border-red-500/20'
} as const;

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const { deleteMeeting } = useMeetingStore();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meeting.meetingLink);
    toast.success('Meeting link copied to clipboard!');
  };

  const handleDelete = () => {
    deleteMeeting(meeting.id);
    toast.error('Meeting deleted');
  };

  return (
    <div className="p-6 rounded-2xl bg-card/40 border border-border hover:border-primary/50 transition-all group relative overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <Badge variant="outline" className={statusColors[meeting.status]}>
            {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
          </Badge>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {meeting.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1 italic">
            {meeting.description}
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <button className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
              <MoreVertical className="w-4 h-4" />
            </button>
          } />
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2">
              <Edit2 className="w-4 h-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2" onClick={handleCopyLink}>
              <Share2 className="w-4 h-4" /> Share
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {format(new Date(meeting.date), 'MMM dd, yyyy')}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          {meeting.time}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          {meeting.participants.length} Participants
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button className="flex-1 gap-2" variant="secondary">
          <ExternalLink className="w-4 h-4" />
          Join Meeting
        </Button>
        <Button variant="outline" size="icon" onClick={handleCopyLink}>
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Subtle hover effect background */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
