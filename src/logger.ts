import bunyan from "bunyan";
import { stdout } from "node:process";

/**
 * Creates a new logger.
 *
 * @param name Name for the logger.
 * @param level Log level to use.
 */
export function initializeLogger(name: string, level: bunyan.LogLevel) {
  return bunyan.createLogger({
    name,
    serializers: {
      ...bunyan.stdSerializers,
    },
    streams: [{ stream: stdout, level }],
  });
}
