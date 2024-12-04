import type { LogLevel } from "bunyan";
import convict from "convict";
import { schemaObj } from "./lib/config.js";

export const environment = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development"],
    default: "development",
    env: "NODE_ENV",
  },
  logLevel: schemaObj<LogLevel>({
    doc: "How verbose logging should be.",
    format: ["trace", "debug", "info", "warn", "error", "fatal"],
    default: "info",
    env: "LOG_LEVEL",
  }),
  packageName: schemaObj<string>({
    doc: "The NPM package name for this project.",
    format: String,
    default: null,
    env: "npm_package_name",
  }),
  port: {
    doc: "The port to listen on.",
    format: Number,
    default: 8080,
    env: "WEBSITES_PORT",
  },
});

environment.validate({ allowed: "strict" });
