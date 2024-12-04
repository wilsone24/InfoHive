import type { Request, Response } from "express";
import type { RowDataPacket } from "mysql2/promise";

type User = RowDataPacket & {
  alias: string;
  name: string;
  email: string;
  active: boolean;
};

export async function byAlias(req: Request, res: Response) {
  const [[user]] = await req.db.execute<User[]>(
    `SELECT
      u.Alias,
      u.Name,
      u.Email,
      u.Active
    FROM
      OrganizationUser ou
      JOIN User u ON ou.UserAlias = u.Alias
    WHERE
      ou.OrganizationAlias = ?
      AND u.Alias = ?`,
    [req.params.organizationAlias, req.params.userAlias]
  );

  if (user) {
    res.json({ message: "User fetched successfully.", data: user });
    return;
  }

  res.status(404).json({ message: "Unable to find user." });
}
