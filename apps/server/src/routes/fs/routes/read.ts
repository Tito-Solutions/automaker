/**
 * POST /read endpoint - Read file
 */

import type { Request, Response } from "express";
import fs from "fs/promises";
import { validatePath } from "../../../lib/security.js";
import { getErrorMessage, logError } from "../common.js";

export function createReadHandler() {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { filePath } = req.body as { filePath: string };

      if (!filePath) {
        res.status(400).json({ success: false, error: "filePath is required" });
        return;
      }

      const resolvedPath = validatePath(filePath);
      const content = await fs.readFile(resolvedPath, "utf-8");

      res.json({ success: true, content });
    } catch (error) {
      logError(error, "Read file failed");
      res.status(500).json({ success: false, error: getErrorMessage(error) });
    }
  };
}
