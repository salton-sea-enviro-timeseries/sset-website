// src/lib/data-pipeline/aq/aeroqual/save.ts
import { prisma } from "@/lib/prisma/client";
import type { Device } from "@prisma/client";
import { WideAeroqualMeasurementRow } from "./types";

export async function saveAeroqualMeasurements(
  rows: WideAeroqualMeasurementRow[]
) {
  if (!rows.length) {
    console.log("No Aeroqual rows to save.");
    return;
  }

  /**
   * 1. Create/update devices first
   */
  const uniqueDevices = new Map<string, string>();

  for (const row of rows) {
    uniqueDevices.set(row.device_id, row.device_name);
  }

  for (const [deviceId, deviceName] of uniqueDevices.entries()) {
    await prisma.device.upsert({
      where: {
        deviceId
      },
      update: {
        name: deviceName
      },
      create: {
        deviceId,
        name: deviceName
      }
    });
  }

  /**
   * 2. Get database IDs for those devices
   */
  const devices: Device[] = await prisma.device.findMany({
    where: {
      deviceId: {
        in: Array.from(uniqueDevices.keys())
      }
    }
  });

  const deviceMap = new Map<string, string>(
    devices.map((device) => [device.deviceId, device.id])
  );

  /**
   * 3. Convert wide pipeline rows into Prisma Measurement rows
   */
  const measurementRows = rows
    .map((row) => {
      const dbDeviceId = deviceMap.get(row.device_id);

      if (!dbDeviceId) {
        console.warn(`Skipping row. Device not found: ${row.device_id}`);
        return null;
      }

      const timestamp = new Date(row.timestamp_local);

      if (Number.isNaN(timestamp.getTime())) {
        console.warn(`Skipping row. Invalid timestamp: ${row.timestamp_local}`);
        return null;
      }

      return {
        timestamp,

        h2s: row.h2s ?? null,
        no2: row.no2 ?? null,
        ws: row.ws ?? null,
        wd: row.wd ?? null,
        rain: row.rain ?? null,
        airT: row.airT ?? null,
        airRH: row.airRH ?? null,
        battery: row.battery ?? null,

        o3: row.o3 ?? null,
        pm25: row.pm25 ?? null,
        pm10: row.pm10 ?? null,
        temp: row.temp ?? null,
        rh: row.rh ?? null,
        dp: row.dp ?? null,

        deviceId: dbDeviceId
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  if (!measurementRows.length) {
    console.log("No valid measurement rows to save.");
    return;
  }

  /**
   * 4. Bulk insert measurements
   */
  const result = await prisma.measurement.createMany({
    data: measurementRows,
    skipDuplicates: true
  });

  console.log(`Saved ${result.count} Aeroqual measurement rows.`);
}
