import type { Request, Response } from "express";
import type { RowDataPacket } from "mysql2/promise";

type ContentEntry = RowDataPacket & {
  Alias: string;
  UpdatedAt: Date;
  Data: Buffer;
};

const template = `
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{name}}</title>

    <link rel="stylesheet" href="/styles/global.css" />
    <link rel="stylesheet" href="../../style.css" />
  </head>

  <body>
    <header class="container">
      <nav>
        <h1 style="font-size: 1.5rem; font-weight: 700">InfoHive</h1>
        <div style="display: flex; gap: 1rem; align-items: center">
          <a href="/" class="btn btn-transparent"
            >Dashboard</a
          >
          <form action="/api/v1/auth/logout" method="post">
            <button type="submit">Cerrar Sesión</button>
          </form>
        </div>
      </nav>
    </header>

    <main class="container" style="margin-top: 2rem">
      <section style="margin-bottom: 3rem">
        <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem">
          {{name}}
        </h2>
      </section>

      <section>
        {{data}}
      </section>
    </main>
  </body>
</html>
`;

export async function byID(req: Request, res: Response) {
  const ceid = req.params.contentId;

  const [[entry]] = await req.db.execute<ContentEntry[]>(
    `SELECT
      ce.Alias,
      ce.UpdatedAt,
      ce.Data
    FROM
      ContentEntry ce
    WHERE
      ce.ID = ?`,
    [ceid]
  );

  const view = `
    <textarea disabled>
      ${entry.Data.toString("utf8")}
    </textarea>
  `;

  res.send(
    template.replace("{{data}}", view).replaceAll("{{name}}", entry.Alias)
  );
}
