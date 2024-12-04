import { genSalt, hash } from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { ResultSetHeader } from "mysql2/promise";

export async function register(req: Request, res: Response) {
  const { alias, name, email, password } = req.body;
  const salt = await genSalt();
  const encryptedPass = await hash(password, salt);

  try {
    const [result] = await req.db.execute<ResultSetHeader>(
      "INSERT INTO User VALUES (?, ?, ?, ?, ?)",
      [alias, name, email, encryptedPass, true]
    );

    if (result.affectedRows > 0) {
      const token = jwt.sign({ user: alias }, req.config.get("jwt.secretKey"), {
        expiresIn: "30m",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          expires: new Date(Number(new Date()) + 30 * 60 * 1000),
        })
        .redirect("/view/home");
      return;
    }
  } catch (err) {
    req.log.error({ err }, "Unable to register.");
  }

  res.status(422).json({ message: "Unable to create user." });
}
