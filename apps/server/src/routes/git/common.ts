/**
 * Common utilities for git routes
 */

import { createLogger } from "../../lib/logger.js";

const logger = createLogger("Git");

/**
 * Get error message from error object
 */
export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

/**
 * Log error details consistently
 */
export function logError(error: unknown, context: string): void {
  logger.error(`❌ ${context}:`, error);
}
