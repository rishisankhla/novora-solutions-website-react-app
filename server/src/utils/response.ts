import type { Response } from 'express';
import type { ApiResponse } from '../types/index.js';

export function sendSuccess<T>(res: Response, data: T, status = 200) {
  const body: ApiResponse<T> = { success: true, data };
  return res.status(status).json(body);
}

export function sendError(
  res: Response,
  status: number,
  code: string,
  message: string,
  fields?: Record<string, string>
) {
  const body: ApiResponse = { success: false, error: { code, message, fields } };
  return res.status(status).json(body);
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public fields?: Record<string, string>
  ) {
    super(message);
    this.name = 'AppError';
  }
}
