import { Meeting } from "src/meetings/entities/meeting.entity";
import { MeetingStatus } from "src/enums/meeting-status.enum";


export const mockMeetings: Meeting[] = [
  // Math 101 Meetings (3 meetings)
  {
    id: 1,
    content: 'Algebra Basics',
    createdAt: new Date('2023-10-01T09:00:00'),
    status: MeetingStatus.COMPLETED,
    attendances: [],
    comments: [],
    class: { id: 1 } as any
  },
  {
    id: 2,
    content: 'Calculus Intro',
    createdAt: new Date('2023-10-08T09:00:00'),
    status: MeetingStatus.CANCELLED,
    attendances: [],
    comments: [],
    class: { id: 1 } as any
  },
  {
    id: 3,
    content: 'Trigonometry',
    createdAt: new Date('2023-10-15T09:00:00'),
    status: MeetingStatus.COMPLETED,
    attendances: [],
    comments: [],
    class: { id: 1 } as any
  },
  
  // History 201 Meetings (2 meetings)
  {
    id: 4,
    content: 'World War II',
    createdAt: new Date('2023-10-02T10:00:00'),
    status: MeetingStatus.ONGOING,
    attendances: [],
    comments: [],
    class: { id: 2 } as any
  },
  {
    id: 5,
    content: 'Ancient Civilizations',
    createdAt: new Date('2023-10-09T10:00:00'),
    status: MeetingStatus.ONGOING,
    attendances: [],
    comments: [],
    class: { id: 2 } as any
  },
  
  // Science 301 Meetings (1 meeting)
  {
    id: 6,
    content: 'Chemistry Lab',
    createdAt: new Date('2023-10-03T11:00:00'),
    status: MeetingStatus.ONGOING,
    attendances: [],
    comments: [],
    class: { id: 3 } as any
  }
];