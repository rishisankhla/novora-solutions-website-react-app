import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { repo } from '../data/index.js';
import { signToken } from '../utils/helpers.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { logActivity } from '../services/audit.js';
import { env } from '../config/env.js';
import type { UserAuthRecord } from '../types/index.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = (await repo.findUserByEmail(email)) as UserAuthRecord | null;
  if (!user || !user.isActive) {
    return sendError(res, 401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const valid = await bcrypt.compare(password, user.passwordHash ?? '');
  if (!valid) {
    return sendError(res, 401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  await repo.updateUserLastLogin(String(user._id));

  const token = signToken({
    sub: String(user._id),
    email: user.email as string,
    role: user.role,
    name: user.name,
  });

  res.cookie('novora_token', token, COOKIE_OPTIONS);
  await logActivity({
    userId: String(user._id),
    action: 'login',
    entity: 'user',
    entityId: String(user._id),
    ip: req.ip,
  });

  return sendSuccess(res, {
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie('novora_token', { path: '/' });
  return sendSuccess(res, { message: 'Logged out' });
}

export async function me(req: Request, res: Response) {
  if (!req.user) {
    return sendError(res, 401, 'UNAUTHORIZED', 'Not authenticated');
  }
  const user = await repo.findUserById(req.user.id);
  if (!user) {
    return sendError(res, 401, 'UNAUTHORIZED', 'User not found');
  }
  return sendSuccess(res, { user });
}
