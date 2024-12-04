import { Router } from "express";
import v1 from "./v1/routes.js";

export default Router().use("/v1", v1);
