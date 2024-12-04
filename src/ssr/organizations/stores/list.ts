import type { Request, Response } from "express";
import type { RowDataPacket } from "mysql2/promise";

type ContentEntry = RowDataPacket & {
  ID: number;
  Alias: string;
  CreatedAt: Date;
};

const template = `
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contenido</title>

    <link rel="stylesheet" href="/styles/global.css" />
    <link rel="stylesheet" href="../style.css" />
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
          Contenido
        </h2>
      </section>

      <section>
        <form action="/api/v1/content-stores/{{csid}}/upload" enctype="multipart/form-data" method="post">
          <input type="file" name="file" required>
          <input type="submit">
        </form>

        <br>

        <ul>
          {{stored}}
        </ul>
      </section>
    </main>
  </body>
</html>
`;

export async function list(req: Request, res: Response) {
  const csid = req.params.storeId;

  const [entries] = await req.db.execute<ContentEntry[]>(
    `SELECT
      ce.ID,
      ce.Alias,
      ce.CreatedAt
    FROM
      ContentStore cs
      JOIN ContentEntry ce ON cs.ID = ce.ContentStoreID
    WHERE
      cs.ID = ?`,
    [csid]
  );

  const listItems = entries.map(et => {
    return `
    <li>
      <a href="./${csid}/${et.ID}">${et.Alias}</a>
      <p>Created ${et.CreatedAt.toDateString()}</p>
    </li>
    `;
  });

  res.send(
    template
      .replace("{{stored}}", listItems.join("\n"))
      .replace("{{csid}}", csid)
  );
}
