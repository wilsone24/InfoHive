import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export async function loginRedirect(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reqToken = req.cookies?.token;

  if (typeof reqToken !== "string") {
    res.clearCookie("token").redirect("/auth/login");
  } else {
    jwt.verify(reqToken, req.config.get("jwt.secretKey"), (error, payload) => {
      if (error) {
        res.clearCookie("token").redirect("/auth/login");
      } else {
        req.alias = (payload as JwtPayload).user;
        next();
      }
    });
  }
}

export async function homeRedirect(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reqToken = req.cookies?.token;

  if (typeof reqToken !== "string") {
    res.clearCookie("token");
    next();
  } else {
    jwt.verify(reqToken, req.config.get("jwt.secretKey"), (error, payload) => {
      if (error) {
        res.clearCookie("token");
        next();
      } else {
        req.alias = (payload as JwtPayload).user;
        res.redirect("/view/home");
      }
    });
  }
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reqToken = req.cookies?.token;

  if (typeof reqToken !== "string") {
    res.clearCookie("token").status(401).json({
      message: "Unauthorized.",
    });
  } else {
    jwt.verify(reqToken, req.config.get("jwt.secretKey"), (error, payload) => {
      if (error) {
        res.clearCookie("token").status(401).json({
          message: "Invalid token.",
        });
      } else {
        req.alias = (payload as JwtPayload).user;
        next();
      }
    });
  }
}
