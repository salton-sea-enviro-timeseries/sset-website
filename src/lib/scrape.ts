import getMetaData from "metadata-scraper";
import { MetaData } from "metadata-scraper/lib/types";
import { MediaObject } from "types";

async function getFeaturedMedia() {
  const arrayOfUrls = [
    "https://www.npr.org/podcasts/655974992/living-downstream",
    "https://kesq.com/news/2021/07/07/changes-happening-at-the-salton-sea-on-a-state-federal-level/",
    "https://www.cnbc.com/2021/11/06/californias-salton-sea-spewing-toxic-fumes-creating-ghost-towns-.html"
  ];

  let promises: Promise<MetaData>[] = [];
  arrayOfUrls.forEach((link: string) => {
    promises.push(getMetaData(link));
  });

  if (arrayOfUrls) {
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

export default getFeaturedMedia;
