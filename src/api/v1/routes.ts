import { authenticate } from "#lib/express/auth.js";
import { Router } from "express";
import auth from "./auth/routes.js";
import contentStores from "./contentStores/routes.js";
import organizations from "./organizations/routes.js";

export default Router()
  .use("/auth", auth)
  .use("/content-stores", authenticate, contentStores)
  .use("/organizations", authenticate, organizations);
