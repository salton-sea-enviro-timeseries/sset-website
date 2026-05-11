// netlify/functions/backfill-aq.ts

import type { Config } from "@netlify/functions";
import { runAeroqualPipeline } from "../../src/lib/data-pipeline/aq/aeroqual";

type AeroqualAccount = "sset" | "aqmd";

type SensorConfig = {
  account: AeroqualAccount;
  sensorId: string;
};
// "AQY BD-1074",
//   "AQY BD-1092",

const SENSORS: SensorConfig[] = [
  {
    account: "sset",
    sensorId: "AQS1 04072024-2724"
  },
  {
    account: "aqmd",
    sensorId: "AQY BD-1074"
  },
  {
    account: "aqmd",
    sensorId: "AQY BD-1092"
  }
];

function getAeroqualCredentials(account: AeroqualAccount) {
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

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default async function handler() {
  console.log("Starting scheduled AQ backfill...");

  const today = new Date();

  // Since this runs around 1 AM, this grabs the last 3 completed days.
  const startDate = addDays(today, -3);
  const endDate = today;

  const startString = formatDate(startDate);
  const endString = formatDate(endDate);

  console.log("Backfill range:", startString, "→", endString);

  for (const sensor of SENSORS) {
    const credentials = getAeroqualCredentials(sensor.account);

    if (!credentials.username || !credentials.password) {
      throw new Error(`Missing credentials for account: ${sensor.account}`);
    }

    console.log("----------------------------------------");
    console.log("Account:", sensor.account);
    console.log("Sensor:", sensor.sensorId);

    const result = await runAeroqualPipeline({
      sensorId: sensor.sensorId,
      startDate: startString,
      endDate: endString,
      credentials
    });

    console.log("Normalized rows:", result.normalizedRows);
    console.log("Wide rows:", result.wideRows);
  }

  console.log("Scheduled AQ backfill complete.");

  return new Response("Scheduled AQ backfill complete", {
    status: 200
  });
}

export const config: Config = {
  schedule: "0 8 */3 * *"
};
