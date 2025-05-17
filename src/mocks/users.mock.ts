import { User } from '../users/entities/user.entity';

export const mockUsers: User[] = [
    {
      id: 1,
      username: 'Supervisor 1',
      password: 'supervisor1',
      roles: [{ id: 1, type: 'supervisor', status: 'active', user: null as any }],
    },
    {
      id: 2,
      username: 'Teacher 1',
      password: 'supervisor1',
      roles: [{ id: 2, type: 'teacher', status: 'active', user: null as any }],
    },
    {
      id: 3,
      username: 'Supervisor 2',
      password: 'supervisor1',
      roles: [{ id: 3, type: 'supervisor', status: 'active', user: null as any }],
    },
  ];
  