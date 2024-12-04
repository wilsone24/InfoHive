import type { Request, Response } from "express";

export async function upload(req: Request, res: Response) {
  const csid = req.params.storeId;
  const now = new Date();

  await req.db.execute(
    "INSERT INTO ContentEntry (ContentStoreID, Alias, CreatedAt, UpdatedAt, Data) VALUES (?, ?, ?, ?, ?)",
    [csid, req.file!.originalname, now, now, req.file!.buffer]
  );
  res.redirect(req.get("Referrer") || "/");
}
