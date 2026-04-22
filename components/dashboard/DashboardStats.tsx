"use client"

import { useMeetingStore } from '@/store/useStore';
import { 
  Users, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function DashboardStats() {
  const { meetings } = useMeetingStore();

  const stats = [
    {
      label: 'Total Meetings',
      value: meetings.length,
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      label: 'Upcoming',
      value: meetings.filter(m => m.status === 'upcoming').length,
      icon: CalendarIcon,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      label: 'Completed',
      value: meetings.filter(m => m.status === 'completed').length,
      icon: CheckCircle2,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      label: 'Cancelled',
      value: meetings.filter(m => m.status === 'cancelled').length,
      icon: XCircle,
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="border-border bg-card/40 backdrop-blur-xl overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.bg} p-3 rounded-2xl transition-transform group-hover:scale-110`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">+12%</span>
              <span className="ml-1 text-muted-foreground/60">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
