/**
 * POST /mkdir endpoint - Create directory
 */

import type { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { addAllowedPath } from "../../../lib/security.js";
import { getErrorMessage, logError } from "../common.js";

export function createMkdirHandler() {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { dirPath } = req.body as { dirPath: string };

      if (!dirPath) {
        res.status(400).json({ success: false, error: "dirPath is required" });
        return;
      }

      const resolvedPath = path.resolve(dirPath);

      await fs.mkdir(resolvedPath, { recursive: true });

      // Add the new directory to allowed paths for tracking
      addAllowedPath(resolvedPath);

      res.json({ success: true });
    } catch (error) {
      logError(error, "Create directory failed");
      res.status(500).json({ success: false, error: getErrorMessage(error) });
    }
  };
}
