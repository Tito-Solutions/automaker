/**
 * Common utilities for agent routes
 */

import { createLogger } from "../../lib/logger.js";

const logger = createLogger("Agent");

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
