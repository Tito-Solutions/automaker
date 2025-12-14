/**
 * POST /start endpoint - Start auto mode loop
 */

import type { Request, Response } from "express";
import type { AutoModeService } from "../../../services/auto-mode-service.js";
import { getErrorMessage, logError } from "../common.js";

export function createStartHandler(autoModeService: AutoModeService) {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { projectPath, maxConcurrency } = req.body as {
        projectPath: string;
        maxConcurrency?: number;
      };

      if (!projectPath) {
        res
          .status(400)
          .json({ success: false, error: "projectPath is required" });
        return;
      }

      await autoModeService.startAutoLoop(projectPath, maxConcurrency || 3);
      res.json({ success: true });
    } catch (error) {
      logError(error, "Start auto loop failed");
      res.status(500).json({ success: false, error: getErrorMessage(error) });
    }
  };
}
