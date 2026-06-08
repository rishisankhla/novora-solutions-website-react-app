import type { Request, Response, NextFunction } from 'express';
import { verifyToken, type JwtPayload } from '../utils/helpers.js';
import { sendError } from '../utils/response.js';
import { repo } from '../data/index.js';
import type { UserAuthRecord, UserRole } from '../types/index.js';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: string };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.novora_token;
    if (!token) {
      return sendError(res, 401, 'UNAUTHORIZED', 'Authentication required');
    }

    const payload = verifyToken(token);
    const user = (await repo.findUserById(payload.sub)) as UserAuthRecord | null;
    if (!user || !user.isActive) {
      return sendError(res, 401, 'UNAUTHORIZED', 'Invalid or inactive account');
    }

    req.user = {
      ...payload,
      id: payload.sub,
      role: user.role,
      email: user.email,
      name: user.name,
    };
    next();
  } catch {
    return sendError(res, 401, 'UNAUTHORIZED', 'Invalid or expired session');
  }
}

export function requireRoles(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendError(res, 401, 'UNAUTHORIZED', 'Authentication required');
    }
    if (!roles.includes(req.user.role)) {
      return sendError(res, 403, 'FORBIDDEN', 'Insufficient permissions');
    }
    next();
  };
}

export const adminRoles: UserRole[] = ['super_admin', 'admin'];
export const contentRoles: UserRole[] = ['super_admin', 'admin', 'editor'];
export const hrRoles: UserRole[] = ['super_admin', 'admin', 'hr'];
export const readRoles: UserRole[] = ['super_admin', 'admin', 'editor', 'hr', 'viewer'];
