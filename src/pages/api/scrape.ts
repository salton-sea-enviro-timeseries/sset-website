const getMetaData = require("metadata-scraper");
import type { NextApiRequest, NextApiResponse } from "next";
import { MediaObject } from "types";

// interface MediaObject {
//   title?: string;
//   description?: string;
//   imageUrl?: string;
//   link?: string;
// }

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MediaObject[]>
) {
  const { urls } = req.query;
  const error: any = new Error("No url provided");
  console.log("urls", urls);

  if (!urls) res.status(400).json(error);
  let promises: string[] = [];
  const arrayOfUrls = (urls as string).split(",");
  arrayOfUrls.forEach((link: string) => {
    promises.push(getMetaData(link));
  });

  const response = await Promise.all(promises);
  console.log(response);

  const feature = response.map((article: any) => {
    const { title, description, image, url } = article;
    return {
      title,
      description,
      imageUrl: image,
      link: url
    };
  });

  res.status(200).json(feature);
}

export default handler;
