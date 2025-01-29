import { getAuth } from 'firebase-admin/auth';
import { Request, Response, NextFunction } from 'express';
import * as express from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
}

async function authenticateUser(req: AuthenticatedRequest,
  res: Response,
  next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  const token = authHeader!.split('Bearer ')[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    next();
  } catch (error) {
    console.error('Error verifying auth token:', error);
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
}

export const withAuth = (handler: (request: Request, response: express.Response) => void | Promise<void>) => {
  return async (req: AuthenticatedRequest, res: Response) => {
    try {
      await authenticateUser(req, res, () => handler(req, res));
    } catch (error) {
      console.error('Error in auth middleware:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}; 