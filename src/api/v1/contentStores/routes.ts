import { Router } from "express";
import multer from "multer";
import { upload } from "./upload.js";

const up = multer();

export default Router().post("/:storeId/upload", up.single("file"), upload);
