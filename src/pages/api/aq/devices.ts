import { getDevices, DevicesRequestParams } from "lib/aqmd";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, query } = req;

  const { groupId } = query as unknown as DevicesRequestParams;

  if (!groupId) return res.status(400).end("groupId is required");

  if (method !== "GET")
    return res.status(405).end(`Method ${method} Not Allowed`);

  try {
    const data = await getDevices({
      groupId
    });

    return res.status(200).json(data);
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
}
