import type { Request, Response } from "express";
import type { RowDataPacket } from "mysql2/promise";

type User = RowDataPacket & {
  alias: string;
  name: string;
  email: string;
  active: boolean;
};

export async function list(req: Request, res: Response) {
  const [users] = await req.db.execute<User[]>(
    `SELECT
      u.Alias,
      u.Name,
      u.Email,
      u.Active
    FROM
      OrganizationUser ou
      JOIN User u ON ou.UserAlias = u.Alias
    WHERE
      ou.OrganizationAlias = ?`,
    [req.params.organizationAlias]
  );
  res.json({ message: "Users fetched successfully.", data: users });
}
