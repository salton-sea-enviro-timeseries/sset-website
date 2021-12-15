import getMetaData from "metadata-scraper";
import { MetaData } from "metadata-scraper/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { MediaObject } from "types";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MediaObject[]>
) {
  const { urls } = req.query;
  const error: any = new Error("No urls provided");

  if (!urls) res.status(400).json(error);
  let promises: Promise<MetaData>[] = [];
  const arrayOfUrls = (urls as string).split(",");
  arrayOfUrls.forEach((link: string) => {
    promises.push(getMetaData(link));
  });

  const data = await Promise.all(promises);

  const response: MediaObject[] = data.map((article: any) => {
    const { title, description, image, url, provider } = article;
    return {
      title,
      provider,
      description,
      imageUrl: image,
      link: url
    };
  });

  res.status(200).json(response);
}

export default handler;
