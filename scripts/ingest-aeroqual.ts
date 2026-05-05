import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

import { runAeroqualPipeline } from "@/lib/data-pipeline/aq/aeroqual";

function getArgValue(flag: string) {
  const index = process.argv.indexOf(flag);

  if (index === -1) return null;

  return process.argv[index + 1] ?? null;
}

async function main() {
  const sensorId = getArgValue("--sensor");
  const startDate = getArgValue("--start");
  const endDate = getArgValue("--end");

  if (!sensorId || !startDate || !endDate) {
    console.error(`
Missing required arguments.

Usage:
  npx tsx scripts/ingest-aeroqual.ts --sensor "AQS1 04072024-2724" --start 2026-04-01 --end 2026-04-08
`);
    process.exit(1);
  }

  console.log("Starting Aeroqual ingest...");
  console.log("Sensor:", sensorId);
  console.log("Start:", startDate);
  console.log("End:", endDate);

  const result = await runAeroqualPipeline({
    sensorId,
    startDate,
    endDate
  });

  console.log("Pipeline result:", result);
}

main().catch((error) => {
  console.error("Aeroqual ingest failed:", error);
  process.exit(1);
});
