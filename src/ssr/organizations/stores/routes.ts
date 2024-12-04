import { Router } from "express";
import { byID } from "./get.js";
import { list } from "./list.js";

export default Router({ mergeParams: true })
  .get("/", list)
  .get("/:contentId", byID);
