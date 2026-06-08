import { repo } from '../data/index.js';

export async function logActivity(params: {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  changes?: Record<string, unknown>;
  ip?: string;
}) {
  await repo.createAuditLog(params);
}
