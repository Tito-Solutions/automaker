/**
 * Worktree routes - HTTP API for git worktree operations
 */

import { Router } from "express";
import { createInfoHandler } from "./routes/info.js";
import { createStatusHandler } from "./routes/status.js";
import { createListHandler } from "./routes/list.js";
import { createDiffsHandler } from "./routes/diffs.js";
import { createFileDiffHandler } from "./routes/file-diff.js";
import { createRevertHandler } from "./routes/revert.js";
import { createMergeHandler } from "./routes/merge.js";

export function createWorktreeRoutes(): Router {
  const router = Router();

  router.post("/info", createInfoHandler());
  router.post("/status", createStatusHandler());
  router.post("/list", createListHandler());
  router.post("/diffs", createDiffsHandler());
  router.post("/file-diff", createFileDiffHandler());
  router.post("/revert", createRevertHandler());
  router.post("/merge", createMergeHandler());

  return router;
}
