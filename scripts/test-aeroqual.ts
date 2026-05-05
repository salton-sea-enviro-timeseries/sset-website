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

import {
  fetchAeroqualDeviceData,
  cleanAeroqualData,
  normalizeAeroqualData
} from "@/lib/data-pipeline/aq/aeroqual";

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

  const rawData = await fetchAeroqualDeviceData({
    sensorId,
    startDate,
    endDate
  });

  const cleanedData = cleanAeroqualData(rawData);
  const normalizedData = normalizeAeroqualData(cleanedData);

  const instrument = rawData.Instruments?.[0];
  const rawRows = instrument?.Data ?? [];

  const firstRow = rawRows[0];
  const lastRow = rawRows[rawRows.length - 1];

  console.log("Device:", instrument?.Serial ?? "No device returned");
  console.log("Device name:", instrument?.Name ?? "No device name returned");
  console.log("Raw timestamp rows:", rawRows.length);
  console.log("Normalized rows:", normalizedData.length);
  console.log("First timestamp:", firstRow?.Time ?? null);
  console.log("Last timestamp:", lastRow?.Time ?? null);
  console.log("Metrics:", Object.keys(firstRow?.Data ?? {}));

  console.log("First 5 normalized rows:");
  console.log(JSON.stringify(normalizedData.slice(0, 5), null, 2));
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
