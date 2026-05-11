// src/lib/queries/aq/devices.ts

import { prisma } from "@/lib/prisma/client";

export async function getAqDevices() {
  return prisma.device.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
