import { app } from "./app.js";
import { loadConfig } from "./config.js";
import { environment } from "./environment.js";
import { initializeLogger } from "./logger.js";

export default async function main() {
  const log = initializeLogger(
    environment.get("packageName"),
    environment.get("logLevel")
  );

  const config = loadConfig();

  const port = environment.get("port");
  (await app(config, log)).listen(port, () => {
    log.info(`Server listening on port ${port}`);
  });
}

main();
