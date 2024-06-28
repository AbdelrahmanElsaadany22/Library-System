import { Request } from 'express';
interface User {
    id: string; // This will be the MongoDB ObjectId as a string
    email: string;
    role: 'user' | 'admin';
    iat?: number; // Issued at timestamp
    exp?: number; // Expiry timestamp
  }
  
declare global {
  namespace Express {
    interface Request {
      user?: User; // Adjust the type as necessary
    }
  }
}
