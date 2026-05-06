import { prisma } from "@/lib/prisma/client";

type GetMeasurementsByExternalDeviceIdParams = {
  externalDeviceId: string;
  take?: number;
  startDate?: Date;
  endDate?: Date;
};

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
