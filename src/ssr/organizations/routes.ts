import { Router } from "express";
import { byAlias } from "./get.js";
import { list } from "./list.js";
import stores from "./stores/routes.js";

export default Router()
  .get("/", list)
  .get("/:orgAlias", byAlias)
  .use("/:orgAlias/:storeId", stores);
