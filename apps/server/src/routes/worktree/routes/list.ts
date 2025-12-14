/**
 * POST /list endpoint - List all worktrees
 */

import type { Request, Response } from "express";
import { exec } from "child_process";
import { promisify } from "util";
import { isGitRepo, getErrorMessage, logError } from "../common.js";

const execAsync = promisify(exec);

export function createListHandler() {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { projectPath } = req.body as { projectPath: string };

      if (!projectPath) {
        res.status(400).json({ success: false, error: "projectPath required" });
        return;
      }

      if (!(await isGitRepo(projectPath))) {
        res.json({ success: true, worktrees: [] });
        return;
      }

      const { stdout } = await execAsync("git worktree list --porcelain", {
        cwd: projectPath,
      });

      const worktrees: Array<{ path: string; branch: string }> = [];
      const lines = stdout.split("\n");
      let current: { path?: string; branch?: string } = {};

      for (const line of lines) {
        if (line.startsWith("worktree ")) {
          current.path = line.slice(9);
        } else if (line.startsWith("branch ")) {
          current.branch = line.slice(7).replace("refs/heads/", "");
        } else if (line === "") {
          if (current.path && current.branch) {
            worktrees.push({ path: current.path, branch: current.branch });
          }
          current = {};
        }
      }

      res.json({ success: true, worktrees });
    } catch (error) {
      logError(error, "List worktrees failed");
      res.status(500).json({ success: false, error: getErrorMessage(error) });
    }
  };
}
