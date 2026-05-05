import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

import { runAeroqualPipeline } from "@/lib/data-pipeline/aq/aeroqual";

function getArgValue(flag: string) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return null;
  return process.argv[index + 1] ?? null;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

async function main() {
  const sensorId = getArgValue("--sensor");
  const start = getArgValue("--start");
  const end = getArgValue("--end");
  const chunkDaysArg = getArgValue("--chunk-days");

  const chunkDays = chunkDaysArg ? Number(chunkDaysArg) : 7;

  if (!sensorId || !start || !end) {
    console.error(`
Missing required arguments.

Usage:
  npx tsx scripts/backfill-aeroqual.ts --sensor "AQS1 04072024-2724" --start 2026-04-01 --end 2026-05-01 --chunk-days 7
`);
    process.exit(1);
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    throw new Error("Invalid start or end date.");
  }

  if (startDate >= endDate) {
    throw new Error("Start date must be before end date.");
  }

  console.log("Starting Aeroqual backfill...");
  console.log("Sensor:", sensorId);
  console.log("Start:", start);
  console.log("End:", end);
  console.log("Chunk days:", chunkDays);

  let currentStart = startDate;
  let totalNormalizedRows = 0;
  let totalWideRows = 0;

  while (currentStart < endDate) {
    const currentEnd = addDays(currentStart, chunkDays);
    const chunkEnd = currentEnd > endDate ? endDate : currentEnd;

    const startString = formatDate(currentStart);
    const endString = formatDate(chunkEnd);

    console.log("----------------------------------------");
    console.log(`Running chunk: ${startString} → ${endString}`);

    try {
      const result = await runAeroqualPipeline({
        sensorId,
        startDate: startString,
        endDate: endString
      });

      totalNormalizedRows += result.normalizedRows;
      totalWideRows += result.wideRows;

      console.log(`Chunk complete: ${startString} → ${endString}`);
    } catch (error) {
      console.error(`Chunk failed: ${startString} → ${endString}`);
      console.error(error);
      process.exit(1);
    }

    currentStart = chunkEnd;
  }

  console.log("----------------------------------------");
  console.log("Backfill complete.");
  console.log("Total normalized rows:", totalNormalizedRows);
  console.log("Total wide rows:", totalWideRows);
}

main().catch((error) => {
  console.error("Aeroqual backfill failed:", error);
  process.exit(1);
});
