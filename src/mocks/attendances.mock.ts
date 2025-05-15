import { Comment } from "src/comments/entities/comment.entity";


export const mockComments: Comment[] = [
  // Math 101 - Meeting 1 (3 students)
  {
    id: 1,
    content: 'present',
    createdAt: new Date('2023-10-01T09:05:00'),
    meeting: { id: 1 } as any
    //user: { id: 101, name: 'Alice' }
  },
  {
    id: 2,
    content: 'present',
    createdAt: new Date('2023-10-01T09:06:00'),
    meeting: { id: 1 } as any,
    //user: { id: 102, name: 'Bob' }
  },
  {
    id: 3,
    content: 'absent',
    createdAt: new Date('2023-10-01T09:07:00'),
    meeting: { id: 1 } as any,
    //user: { id: 103, name: 'Charlie' }
  },
  
  // Math 101 - Meeting 2 (same 3 students, different attendance)
  {
    id: 4,
    content: 'absent',
    createdAt: new Date('2023-10-08T09:05:00'),
    meeting: { id: 2 } as any,
    //user: { id: 101, name: 'Alice' }
  },
  {
    id: 5,
    content: 'present',
    createdAt: new Date('2023-10-08T09:06:00'),
    meeting: { id: 2 } as any,
    //user: { id: 102, name: 'Bob' }
  },
  {
    id: 6,
    content: 'present',
    createdAt: new Date('2023-10-08T09:07:00'),
    meeting: { id: 2 } as any,
    //user: { id: 103, name: 'Charlie' }
  },
  
  // History 201 - Meeting 4 (2 students)
  {
    id: 7,
    content: 'present',
    createdAt: new Date('2023-10-02T10:05:00'),
    meeting: { id: 4 } as any,
    //user: { id: 104, name: 'Diana' }
  },
  {
    id: 8,
    content: 'absent',
    createdAt: new Date('2023-10-02T10:06:00'),
    meeting: { id: 4 } as any,
    //user: { id: 105, name: 'Eve' }
  },
  
  // Science 301 - Meeting 6 (1 student)
  {
    id: 9,
    content: 'present',
    createdAt: new Date('2023-10-03T11:05:00'),
    meeting: { id: 6 } as any,
    //user: { id: 106, name: 'Frank' }
  }
];