import ApiResponse, { getQuantDeviceData } from "lib/quant";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method !== "GET")
    return res.status(405).end(`Method ${method} Not Allowed`);
  try {
    const result: ApiResponse = await getQuantDeviceData(
      query.model as string,
      query.startDate as string,
      query.endDate as string
    );
    if (result.error) {
      console.warn(result.error);
      return res.status(200).json([]);
    }
    const deviceData = result.data || [];
    return res.status(200).json(
      deviceData.map(
        ({
          rh: RH,
          temp: Temp,
          pm1: PM1,
          pm10: PM10,
          pm25,
          co: CO,
          no2: NO2,
          o3: O3,
          sn,
          //period_start used, and renamed as timestamp_local to match aqmd response
          period_start_utc: timestamp_local
        }) => {
          return {
            RH,
            Temp,
            PM1,
            PM10,
            "PM2.5": pm25,
            CO,
            NO2,
            O3,
            sn,
            timestamp_local
          };
        }
      )
    );
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
}
