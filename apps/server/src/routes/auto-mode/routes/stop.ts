/**
 * POST /stop endpoint - Stop auto mode loop
 */

import type { Request, Response } from "express";
import type { AutoModeService } from "../../../services/auto-mode-service.js";
import { getErrorMessage, logError } from "../common.js";

export function createStopHandler(autoModeService: AutoModeService) {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const runningCount = await autoModeService.stopAutoLoop();
      res.json({ success: true, runningFeatures: runningCount });
    } catch (error) {
      logError(error, "Stop auto loop failed");
      res.status(500).json({ success: false, error: getErrorMessage(error) });
    }
  };
}
