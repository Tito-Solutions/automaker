/**
 * Common utilities for health routes
 */

import { createLogger } from "../../lib/logger.js";

const logger = createLogger("Health");

/**
 * Get error message from error object
 */
export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}
