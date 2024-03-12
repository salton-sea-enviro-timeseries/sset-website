import { getQuantDevices } from "lib/quant";
import type { NextApiRequest, NextApiResponse } from "next";

//TODO: query all sensors by a group ID preferably
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method !== "GET")
    return res.status(405).end(`Method ${method} Not Allowed`);

  try {
    const quantSensors = await getQuantDevices();
    return res.status(200).json(quantSensors);
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
}
