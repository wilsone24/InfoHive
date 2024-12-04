import { Router } from "express";
import organizations from "./organizations/routes.js";

export default Router().use("/organizations", organizations);
