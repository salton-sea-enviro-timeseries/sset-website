import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

import { runAeroqualPipeline } from "@/lib/data-pipeline/aq/aeroqual";

function getArgValue(flag: string) {
  const index = process.argv.indexOf(flag);

  if (index === -1) return null;

  return process.argv[index + 1] ?? null;
}

function getAeroqualCredentials(account: string) {
  if (account === "aqmd") {
    return {
      username: process.env.AQMD_AEROQUAL_USERNAME,
      password: process.env.AQMD_AEROQUAL_PASSWORD
    };
  }

  return {
    username: process.env.AEROQUAL_USERNAME,
    password: process.env.AEROQUAL_PASSWORD
  };
}

async function main() {
  const account = getArgValue("--account") ?? "sset";
  const sensorId = getArgValue("--sensor");
  const startDate = getArgValue("--start");
  const endDate = getArgValue("--end");

  if (account !== "sset" && account !== "aqmd") {
    console.error(`Invalid account: ${account}. Use "sset" or "aqmd".`);
    process.exit(1);
  }

  if (!sensorId || !startDate || !endDate) {
    console.error(`
Missing required arguments.

Usage:
  npx tsx scripts/ingest-aeroqual.ts --account sset --sensor "AQS1 04072024-2724" --start 2026-04-01 --end 2026-04-08

  npx tsx scripts/ingest-aeroqual.ts --account aqmd --sensor "AQY BD-1071" --start 2026-04-01 --end 2026-04-08
`);
    process.exit(1);
  }

  const credentials = getAeroqualCredentials(account);

  if (!credentials.username || !credentials.password) {
    console.error(`Missing Aeroqual credentials for account: ${account}`);
    process.exit(1);
  }

  console.log("Starting Aeroqual ingest...");
  console.log("Account:", account);
  console.log("Sensor:", sensorId);
  console.log("Start:", startDate);
  console.log("End:", endDate);

  const result = await runAeroqualPipeline({
    sensorId,
    startDate,
    endDate,
    credentials
  });

  console.log("Pipeline result:", result);
}

main().catch((error) => {
  console.error("Aeroqual ingest failed:", error);
  process.exit(1);
});

// 2023-11-02 oldest date found
// Instruments found aqmd
// "AQY BD-1074",
//   "AQY BD-1092",

// TODO: Need to verify the sensors below
//   "AQY-R AB 0266",
//   "AQY-R AB 0267",
//   "AQY-R AB 0268",
//   "AQY-R AB 0269",
//   "AQY-R AB 0270",
//   "AQY-R AB 0271"
