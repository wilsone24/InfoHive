import convict from "convict";
import { schemaObj } from "./lib/config.js";

const schema = {
  db: {
    credentials: {
      user: schemaObj<string>({
        doc: "The user to log into the database with.",
        format: String,
        default: null,
        env: "DB_USER",
      }),
      password: schemaObj<string>({
        doc: "The password to log into the database with.",
        format: String,
        default: null,
        env: "DB_PASSWORD",
      }),
    },
    host: schemaObj<string>({
      doc: "The database's host.",
      format: String,
      default: null,
      env: "DB_HOST",
    }),
    name: schemaObj<string>({
      doc: "The database name.",
      format: String,
      default: null,
      env: "DB_DATABASE",
    }),
    port: {
      doc: "The database's port.",
      format: Number,
      default: 3306,
      env: "DB_PORT",
    },
  },
  jwt: {
    secretKey: schemaObj<string>({
      doc: "The key to use for JWT signing.",
      format: String,
      default: null,
      env: "JWT_SECRET_KEY",
    }),
  },
};

/**
 * Loads the app's configuration from the current environment.
 */
export function loadConfig() {
  const config = convict(schema);
  config.validate({ allowed: "strict" });

  return config;
}

export type ConfigSchema = ReturnType<typeof loadConfig>;
