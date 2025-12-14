/**
 * Common utilities for worktree routes
 */

import { createLogger } from "../../lib/logger.js";
import { exec } from "child_process";
import { promisify } from "util";

const logger = createLogger("Worktree");
const execAsync = promisify(exec);

/**
 * Check if a path is a git repo
 */
export async function isGitRepo(repoPath: string): Promise<boolean> {
  try {
    await execAsync("git rev-parse --is-inside-work-tree", { cwd: repoPath });
    return true;
  } catch {
    return false;
  }
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
