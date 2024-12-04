import type { Request, Response } from "express";
import type { RowDataPacket } from "mysql2/promise";

type ContentStore = RowDataPacket & {
  ID: number;
  Alias: string;
  Name: string;
  Type: string;
};

const template = `
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Inventario</title>

    <link rel="stylesheet" href="/styles/global.css" />
    <link rel="stylesheet" href="./style.css" />
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
          Inventario
        </h2>
      </section>

      <section>
        <ul>
          {{inventory}}
        </ul>
      </section>
    </main>
  </body>
</html>
`;

export async function byAlias(req: Request, res: Response) {
  const oa = req.params.orgAlias;
  const [stores] = await req.db.execute<ContentStore[]>(
    `SELECT
      cs.ID,
      cs.Alias,
      cs.Name,
      cs.Type
    FROM
      Organization o
      JOIN ContentStore cs ON o.Alias = cs.OrgAlias
    WHERE
      o.Alias = ?`,
    [oa]
  );

  const listItems = stores.map(st => {
    return `
    <li>
      <a href="/view/organizations/${oa}/${st.ID}">${st.Name}</a>
      <p>${st.Alias} - almacena datos de tipo '${st.Type}'</p>
    </li>
    `;
  });

  res.send(template.replace("{{inventory}}", listItems.join("\n")));
}
