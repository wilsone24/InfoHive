import { compare } from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { RowDataPacket } from "mysql2/promise";

type User = RowDataPacket & {
  password: string;
};

export async function login(req: Request, res: Response) {
  const { alias, password } = req.body;
  try {
    const [[user]] = await req.db.execute<User[]>(
      "SELECT password FROM User WHERE Alias = ?",
      [alias]
    );

    if (!user) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const isValidPassword = await compare(password, user.password);
    if (isValidPassword) {
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
    } else {
      res.status(401).json({
        message: "Invalid alias or password.",
      });
    }
  } catch (err) {
    req.log.error({ err }, "Unable to authenticate user.");
    res.status(422).json({
      message: "Unable to process login.",
    });
  }
}
