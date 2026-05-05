import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

import { runAeroqualPipeline } from "@/lib/data-pipeline/aq/aeroqual";

async function main() {
  const result = await runAeroqualPipeline({
    sensorId: "AQS1 04072024-2724",
    startDate: "2026-04-01",
    endDate: "2026-04-08"
  });

  console.log("Pipeline result:", result);
}

main().catch((error) => {
  console.error("Aeroqual ingest failed:", error);
  process.exit(1);
});
