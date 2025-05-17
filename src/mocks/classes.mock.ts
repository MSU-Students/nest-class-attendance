import { Class } from "src/class/entities/class.entity";


export const mockClasses: Class[] = [
  {
    id: 1,
    className: 'Math 101',
    classSchedule: new Date('2023-10-01T09:00:00'),
    classSection: 'A',
    meetings: [],
    teacher: {
        id: 1, Lname: 'Dr. Smith',
        classes: []
    },
    students: []
  },
  {
    id: 2,
    className: 'History 201',
    classSchedule: new Date('2023-10-02T10:00:00'),
    classSection: 'B',
    meetings: [],
    teacher: {
        id: 2, Lname: 'Prof. Johnson',
        classes: []
    },
    students: []
  },
  {
    id: 3,
    className: 'Science 301',
    classSchedule: new Date('2023-10-03T11:00:00'),
    classSection: 'C',
    meetings: [],
    teacher: {
        id: 3, Lname: 'Dr. Brown',
        classes: []
    },
    students: []
  }
];