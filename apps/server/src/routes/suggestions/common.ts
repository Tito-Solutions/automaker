/**
 * Common utilities and state for suggestions routes
 */

import { createLogger } from "../../lib/logger.js";

const logger = createLogger("Suggestions");

// Shared state for tracking generation status
export let isRunning = false;
export let currentAbortController: AbortController | null = null;

/**
 * Set the running state and abort controller
 */
export function setRunningState(
  running: boolean,
  controller: AbortController | null = null
): void {
  isRunning = running;
  currentAbortController = controller;
}

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
