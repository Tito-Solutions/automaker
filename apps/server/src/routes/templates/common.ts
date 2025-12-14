/**
 * Common utilities for templates routes
 */

import { createLogger } from "../../lib/logger.js";

const logger = createLogger("Templates");

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
