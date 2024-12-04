import type { Request, Response } from "express";
import type { RowDataPacket } from "mysql2/promise";

type Organization = RowDataPacket & {
  alias: string;
  name: string;
  domain: string;
  active: boolean;
};

export async function list(req: Request, res: Response) {
  const [orgs] = await req.db.execute<Organization[]>(
    "SELECT * FROM Organization"
  );
  res.json({ message: "Organizations fetched successfully.", data: orgs });
}
