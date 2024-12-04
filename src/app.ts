import api from "#api/routes.js";
import { homeRedirect, loginRedirect } from "#lib/express/auth.js";
import { id } from "#lib/express/id.js";
import { bunyanExpress } from "#lib/express/log.js";
import type Logger from "bunyan";
import cookieParser from "cookie-parser";
import type { RequestHandler } from "express";
import e from "express";
import { createPool, type Pool } from "mysql2/promise";
import { join } from "node:path";
import type { ConfigSchema } from "./config.js";
import ssr from "./ssr/routes.js";

function withConfig(c: ConfigSchema): RequestHandler {
  return (req, _, next) => {
    req.config = c;
    next();
  };
}

function withDb(pool: Pool): RequestHandler {
  return (req, _, next) => {
    req.db = pool;
    next();
  };
}

export async function app(config: ConfigSchema, logger: Logger) {
  const app = e();

  const db = config.get("db");
  const pool = createPool({
    database: db.name,
    host: db.host,
    user: db.credentials.user,
    password: db.credentials.password,
    port: db.port,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.get("/", (_, res, __) => res.redirect("/view/home"));

  app.use(id, bunyanExpress(logger));
  app.use(withConfig(config), withDb(pool));
  app.use(cookieParser());

  app.use("/api", e.json(), e.urlencoded({ extended: true }), api);
  app.use("/auth", homeRedirect);
  app.use("/view", loginRedirect);

  app.use(e.static(join(import.meta.dirname, "./static")));
  app.use("/view", ssr);

  return app;
}
