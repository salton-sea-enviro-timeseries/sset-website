// src/lib/queries/aq/measurements.ts

import { prisma } from "@/lib/prisma/client";

type DateRangeParams = {
  take?: number;
  startDate?: Date;
  endDate?: Date;
};

type GetMeasurementsByDeviceIdParams = DateRangeParams & {
  deviceId: string;
};

type GetMeasurementsByExternalDeviceIdParams = DateRangeParams & {
  externalDeviceId: string;
};

export async function getMeasurementsByDeviceId({
  deviceId,
  take = 100,
  startDate,
  endDate
}: GetMeasurementsByDeviceIdParams) {
  return prisma.measurement.findMany({
    where: {
      deviceId,
      timestamp: {
        ...(startDate ? { gte: startDate } : {}),
        ...(endDate ? { lte: endDate } : {})
      }
    },
    orderBy: {
      timestamp: "desc"
    },
    take
  });
}

export async function getMeasurementsByExternalDeviceId({
  externalDeviceId,
  take = 1000,
  startDate,
  endDate
}: GetMeasurementsByExternalDeviceIdParams) {
  return prisma.measurement.findMany({
    where: {
      device: {
        deviceId: externalDeviceId
      },
      timestamp: {
        ...(startDate ? { gte: startDate } : {}),
        ...(endDate ? { lte: endDate } : {})
      }
    },
    orderBy: {
      timestamp: "asc"
    },
    take
  });
}
