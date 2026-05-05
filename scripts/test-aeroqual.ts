// {
//     "site": "AQS1 04072024-2724: Offshore North",
//     "value": "aeroqual",
//     "sensorId": "AQS1 04072024-2724",
//     "latitude": 33.475697,
//     "longitude": -116.04686,
//     "color": "rgb(255, 172, 28)",
//     "location": "Offshore North"
//   },

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { runAeroqualPipeline } from "@/lib/data-pipeline/aq/aeroqual";

const sensorId = "AQS1 04072024-2724";

const ranges = [
  // {
  //   label: "1 day",
  //   startDate: "2026-04-01",
  //   endDate: "2026-04-02"
  // },
  // {
  //   label: "1 week",
  //   startDate: "2026-04-01",
  //   endDate: "2026-04-08"
  // },
  // {
  //   label: "1 month",
  //   startDate: "2026-04-01",
  //   endDate: "2026-05-01"
  // },
  {
    label: "older month test",
    startDate: "2024-07-01",
    endDate: "2024-08-01"
  }
  // Not for this sensor  ID
  // id:AQS1 13122022-2194
  // {
  //   label: "older month test",
  //   startDate: "2023-11-01",
  //   endDate: "2023-12-01"
  // }
];

async function testRange(startDate: string, endDate: string, label: string) {
  console.log("\n==============================");
  console.log(`Testing: ${label}`);
  console.log(`Range: ${startDate} → ${endDate}`);

  const result = await runAeroqualPipeline({
    sensorId,
    startDate,
    endDate
  });

  console.log("Pipeline result:", result);
}

async function run() {
  for (const range of ranges) {
    try {
      await testRange(range.startDate, range.endDate, range.label);
    } catch (err) {
      console.error(`Failed range: ${range.label}`, err);
    }
  }
}

run();
