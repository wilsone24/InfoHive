import { Router } from "express";
import { byAlias } from "./get.js";
import { list } from "./list.js";

export default Router({ mergeParams: true })
  .get("/", list)
  .get("/:userAlias", byAlias);
