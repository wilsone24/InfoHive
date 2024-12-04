import bunyan from "bunyan";
import type { RequestHandler } from "express";
import { hrtime } from "node:process";

function getDuration(start: [number, number]) {
  const diff = hrtime(start);
  return diff[0] * 1e3 + diff[1] * 1e-6;
}

export function bunyanExpress(logger: bunyan): RequestHandler {
  logger = logger.child({
    serializers: {
      req: bunyan.stdSerializers.req,
      res: bunyan.stdSerializers.res,
    },
  });

  return (req, res, next) => {
    const start = hrtime();
    const child = logger.child({ "req.id": req.id }, true);

    req.log = child;
    child.info({ req }, "Started");

    res.on("finish", () => {
      const reqFinishData = {
        res,
        duration: getDuration(start),
      };

      child.info(reqFinishData, "Completed");
    });

    next();
  };
}
