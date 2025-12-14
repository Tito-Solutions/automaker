/**
 * POST /save-image endpoint - Save image to .automaker/images directory
 */

import type { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { addAllowedPath } from "../../../lib/security.js";
import { getErrorMessage, logError } from "../common.js";

export function createSaveImageHandler() {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { data, filename, mimeType, projectPath } = req.body as {
        data: string;
        filename: string;
        mimeType: string;
        projectPath: string;
      };

      if (!data || !filename || !projectPath) {
        res.status(400).json({
          success: false,
          error: "data, filename, and projectPath are required",
        });
        return;
      }

      // Create .automaker/images directory if it doesn't exist
      const imagesDir = path.join(projectPath, ".automaker", "images");
      await fs.mkdir(imagesDir, { recursive: true });

      // Decode base64 data (remove data URL prefix if present)
      const base64Data = data.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      // Generate unique filename with timestamp
      const timestamp = Date.now();
      const ext = path.extname(filename) || ".png";
      const baseName = path.basename(filename, ext);
      const uniqueFilename = `${baseName}-${timestamp}${ext}`;
      const filePath = path.join(imagesDir, uniqueFilename);

      // Write file
      await fs.writeFile(filePath, buffer);

      // Add project path to allowed paths if not already
      addAllowedPath(projectPath);

      res.json({ success: true, path: filePath });
    } catch (error) {
      logError(error, "Save image failed");
      res.status(500).json({ success: false, error: getErrorMessage(error) });
    }
  };
}
