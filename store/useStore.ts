import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Meeting } from '../types';

interface MeetingState {
  meetings: Meeting[];
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  setMeetings: (meetings: Meeting[]) => void;
}

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set) => ({
      meetings: [
        {
          id: '1',
          title: 'Project Sync',
          description: 'Weekly sync with the development team',
          date: new Date().toISOString(),
          time: '10:00',
          participants: [{ email: 'john@example.com' }, { email: 'sarah@example.com' }],
          status: 'upcoming',
          meetingLink: 'https://calendify.app/m/project-sync-123'
        },
        {
          id: '2',
          title: 'Client Review',
          description: 'Reviewing the latest mockups with the client',
          date: new Date().toISOString(),
          time: '14:30',
          participants: [{ email: 'client@example.com' }],
          status: 'upcoming',
          meetingLink: 'https://calendify.app/m/client-review-456'
        }
      ],
      addMeeting: (meeting) => set((state) => ({ meetings: [meeting, ...state.meetings] })),
      updateMeeting: (id, updates) => set((state) => ({
        meetings: state.meetings.map((m) => m.id === id ? { ...m, ...updates } : m)
      })),
      deleteMeeting: (id) => set((state) => ({
        meetings: state.meetings.filter((m) => m.id !== id)
      })),
      setMeetings: (meetings) => set({ meetings }),
    }),
    {
      name: 'meeting-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface AuthState {
  user: { name: string; email: string; avatar: string } | null;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null, 
      login: () => set({ 
        user: { 
          name: 'John Doe', 
          email: 'john@calendify.app', 
          avatar: 'https://picsum.photos/seed/john/200' 
        } 
      }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface UIState {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}));
