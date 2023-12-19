import { postContact } from "lib/eztexting";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  if (method !== "POST")
    return res.status(405).end(`Method ${method} Not Allowed`);
  try {
    const data = await postContact(body);
    return res.status(200).json(data);
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
}
