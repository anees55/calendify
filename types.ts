export type MeetingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Participant {
  email: string;
  name?: string;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO string
  time: string;
  participants: Participant[];
  status: MeetingStatus;
  meetingLink: string;
}
