import { getDevices, DevicesRequestParams, Device } from "lib/aqmd";
import type { NextApiRequest, NextApiResponse } from "next";

const GROUP_ID = 5;
const COMMUNITY = "Eastern Coachella Valley";
//keeping aqportal api to retrieve aqmd sensor list
//May need to change in the future if aqportal is non-responsive
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Device[]>
) {
  const { method } = req;

  if (method !== "GET")
    return res.status(405).end(`Method ${method} Not Allowed`);

  try {
    const data = await getDevices({
      groupId: GROUP_ID
    });

    // data contains all devices by groupId, we want to filter by "Community"
    const devices = data.filter((device) => device.Community === COMMUNITY);
    return res.status(200).json(devices);
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
}
