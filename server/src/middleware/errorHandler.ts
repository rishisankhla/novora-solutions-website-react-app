import type { Request, Response, NextFunction } from 'express';
import { AppError, sendError } from '../utils/response.js';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.code, err.message, err.fields);
  }

  if (err && typeof err === 'object' && 'code' in err && (err as { code: number }).code === 11000) {
    return sendError(res, 409, 'DUPLICATE', 'A record with this identifier already exists');
  }

  console.error(err);
  return sendError(res, 500, 'INTERNAL_ERROR', 'An unexpected error occurred');
}

export function notFoundHandler(_req: Request, res: Response) {
  return sendError(res, 404, 'NOT_FOUND', 'Route not found');
}
