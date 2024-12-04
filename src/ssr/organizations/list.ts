import type { Request, Response } from "express";
import type { RowDataPacket } from "mysql2/promise";

type Organization = RowDataPacket & {
  Alias: string;
  Name: string;
  Domain: string;
  Active: boolean;
};

const template = `
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Organizaciones</title>

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
          Organizaciones
        </h2>
      </section>

      <section>
        <ul>
          {{orgs}}
        </ul>
      </section>
    </main>
  </body>
</html>
`;

export async function list(req: Request, res: Response) {
  const [orgs] = await req.db.execute<Organization[]>(
    `SELECT
      o.Alias,
      o.Name,
      o.Domain,
      o.Active
    FROM
      OrganizationUser ou
      JOIN Organization o ON ou.OrganizationAlias = o.Alias
    WHERE
      ou.UserAlias = ?`,
    [req.alias]
  );

  const listItems = orgs.map(org => {
    return `
    <li>
      <a href="/view/organizations/${org.Alias}">${org.Name}</a>
      <p>${org.Alias}@${org.Domain}</p>
    </li>
    `;
  });

  res.send(template.replace("{{orgs}}", listItems.join("\n")));
}
