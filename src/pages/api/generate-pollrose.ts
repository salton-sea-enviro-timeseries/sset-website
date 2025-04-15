import { getPollroseFigure } from "lib/getPollroseFigure";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method !== "POST") {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  const { site, bdate, edate, pollv, csvFile } = req.body;
  if (!csvFile) return res.status(400).json({ error: "CSV file missing" });
  try {
    const data = await getPollroseFigure({
      site,
      bdate,
      edate,
      pollv,
      csvFile
    });
    const sanitizedImage = data?.image.replace(/\\/g, "/");
    const cleanedPath = sanitizedImage?.replace(/^(\.\.\/|\/)*/, ""); // remove ../ or /
    return res.status(200).json({ ...data, image: cleanedPath });
  } catch (err) {
    console.error("API error: ", err);
    return res.status(500).json({ error: "Failed to fetch pollrose figure" });
  }
}
