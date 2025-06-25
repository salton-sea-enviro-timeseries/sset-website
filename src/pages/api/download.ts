import { downloadFile } from "lib/sheets";
import type { NextApiRequest, NextApiResponse } from "next";
import stream from "stream";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { range, filename }
  } = req;

  if (method !== "GET") {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    return res.status(500).end("No private key found");
  }

  if (!process.env.PHOTOMETER_SHEET_ID) {
    return res.status(500).end("No sheet id found");
  }

  try {
    const response = await downloadFile(range as "probe_surface" | "nutrients");
    console.log(response);
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    await pipeline(stream.Readable.from(Buffer.from(response)), res);
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
}
