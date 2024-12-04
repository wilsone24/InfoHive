import { Router } from "express";
import { login } from "./login.js";
import { logout } from "./logout.js";
import { register } from "./register.js";

export default Router()
  .post("/login", login)
  .post("/logout", logout)
  .post("/register", register);
