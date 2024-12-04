import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

export const IdHeader = "X-Request-Id";

export function id(req: Request, res: Response, next: NextFunction) {
  const prev = req.get(IdHeader);
  const uuid = prev ?? randomUUID();

  res.set(IdHeader, uuid);
  req.id = uuid;

  next();
}
