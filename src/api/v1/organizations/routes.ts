import { Router } from "express";
import { byAlias } from "./get.js";
import { list } from "./list.js";
import users from "./users/routes.js";

export default Router()
  .get("/", list)
  .get("/:organizationAlias", byAlias)
  .use("/:organizationAlias/users", users);
