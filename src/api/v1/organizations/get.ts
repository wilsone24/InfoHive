import type { Request, Response } from "express";
import type { RowDataPacket } from "mysql2/promise";

type Organization = RowDataPacket & {
  alias: string;
  name: string;
  domain: string;
  active: boolean;
};

export async function byAlias(req: Request, res: Response) {
  const [[org]] = await req.db.execute<Organization[]>(
    "SELECT * FROM Organization WHERE Alias = ?",
    [req.params.organizationAlias]
  );

  if (org) {
    res.json({ message: "Organization fetched successfully.", data: org });
    return;
  }

  res.status(404).json({ message: "Unable to find organization." });
}
