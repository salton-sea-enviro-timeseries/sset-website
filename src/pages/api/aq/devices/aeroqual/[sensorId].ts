import type { NextApiRequest, NextApiResponse } from "next";
import { getMeasurementsByExternalDeviceId } from "@/lib/queries/aq/measurements";
import transformPrismaAeroqualData from "@/util/transformPrismaAeroqualData";
import { getDefaultDateRange } from "@/utils";

function parseDateParam(value: string | string[] | undefined) {
  if (typeof value !== "string") return undefined;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}

function parseTakeParam(value: string | string[] | undefined) {
  if (typeof value !== "string") return 1000;

  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return 1000;
  }

  return parsed;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  if (method !== "GET") {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("CDN-Cache-Control", "no-store");
  res.setHeader("Netlify-CDN-Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const { sensorId, startDate, endDate, take } = query;

  if (typeof sensorId !== "string") {
    return res.status(400).json({
      message: "Invalid sensorId"
    });
  }

  try {
    const parsedStartDate = parseDateParam(startDate);
    const parsedEndDate = parseDateParam(endDate);

    const defaultRange = getDefaultDateRange();

    const measurements = await getMeasurementsByExternalDeviceId({
      externalDeviceId: sensorId,
      startDate: parsedStartDate ?? defaultRange.startDate,
      endDate: parsedEndDate ?? defaultRange.endDate,
      take: parseTakeParam(take)
    });

    const reformatData = transformPrismaAeroqualData({
      sensorId,
      measurements
    });

    return res.status(200).json(reformatData);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }

    console.error("An unexpected error occurred:", err);
    return res.status(500).json({
      message: "An unexpected error occurred"
    });
  }
}
