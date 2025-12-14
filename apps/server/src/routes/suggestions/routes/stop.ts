/**
 * POST /stop endpoint - Stop suggestions generation
 */

import type { Request, Response } from "express";
import {
  currentAbortController,
  setRunningState,
  getErrorMessage,
  logError,
} from "../common.js";

export function createStopHandler() {
  return async (_req: Request, res: Response): Promise<void> => {
    try {
      if (currentAbortController) {
        currentAbortController.abort();
      }
      setRunningState(false, null);
      res.json({ success: true });
    } catch (error) {
      logError(error, "Stop suggestions failed");
      res.status(500).json({ success: false, error: getErrorMessage(error) });
    }
  };
}
