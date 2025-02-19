import { createClient } from "contentful";
const client = createClient({
  space: process.env.CONTENTFUL_SPACE as string,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY as string
});

export async function getCmsContent<T>(contentID: string) {
  const cmsRes = await client.getEntries<T>({
    content_type: contentID,
    select: "fields",
    locale: "*",
    include: 2 // includes nested linked entries up to 2 levels
  });
  return cmsRes.items[0];
}
