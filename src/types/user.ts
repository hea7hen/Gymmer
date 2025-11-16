import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  savedGyms: string[];
  isAdmin: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

