import type Logger from "bunyan";
import type { Pool } from "mysql2/promise";
import type { ConfigSchema } from "../../config.ts";

declare global {
  namespace Express {
    export interface Request {
      alias?: string;
      config: ConfigSchema;
      db: Pool;
      id: string;
      log: Logger;
    }
  }
}
