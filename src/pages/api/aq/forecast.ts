import { getForecast, AQRequestParams, ForecastResponse } from "lib/airnow";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ForecastResponse[]>
) {
  const { method, query } = req;

  const { zipCode, date, format, distance } =
    query as unknown as AQRequestParams;

  if (!zipCode) return res.status(400).end("zipCode is required");

  if (method !== "GET")
    return res.status(405).end(`Method ${method} Not Allowed`);

  try {
    const data = await getForecast({
      zipCode,
      date,
      format,
      distance
    });

    return res.status(200).json(data);
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
}
