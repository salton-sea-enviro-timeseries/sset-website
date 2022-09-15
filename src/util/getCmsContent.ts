import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE as string,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY as string
});

export const getCmsContent = async (contentID: string) => {
  const cmsRes = await client.getEntries({
    content_type: contentID,
    locale: "*"
  });

  return cmsRes;
};
