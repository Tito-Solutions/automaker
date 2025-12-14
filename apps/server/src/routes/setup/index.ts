/**
 * Setup routes - HTTP API for CLI detection, API keys, and platform info
 */

import { Router } from "express";
import { createClaudeStatusHandler } from "./routes/claude-status.js";
import { createInstallClaudeHandler } from "./routes/install-claude.js";
import { createAuthClaudeHandler } from "./routes/auth-claude.js";
import { createStoreApiKeyHandler } from "./routes/store-api-key.js";
import { createApiKeysHandler } from "./routes/api-keys.js";
import { createPlatformHandler } from "./routes/platform.js";

export function createSetupRoutes(): Router {
  const router = Router();

  router.get("/claude-status", createClaudeStatusHandler());
  router.post("/install-claude", createInstallClaudeHandler());
  router.post("/auth-claude", createAuthClaudeHandler());
  router.post("/store-api-key", createStoreApiKeyHandler());
  router.get("/api-keys", createApiKeysHandler());
  router.get("/platform", createPlatformHandler());

  return router;
}
