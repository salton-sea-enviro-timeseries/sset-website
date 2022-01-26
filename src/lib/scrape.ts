import getMetaData from "metadata-scraper";
import { MetaData } from "metadata-scraper/lib/types";
import { MediaObject } from "types";

async function scrape(urls: string[]) {
  let promises: Promise<MetaData>[] = [];
  urls.forEach((link: string) => {
    promises.push(getMetaData(link));
  });

  if (urls) {
    try {
      const data = await Promise.all(promises);

      const mediaData: MediaObject[] = data.map((article: any) => {
        const { title, description, image, url, provider } = article;
        return {
          title,
          provider,
          description,
          imageUrl: image,
          link: url
        };
      });

      return mediaData;
    } catch (err) {
      throw new Error(`An unexpected error has ocurred Error:${err}`);
    }
  }

  throw new Error("There was a problem with media urls provided");
}

export default scrape;
