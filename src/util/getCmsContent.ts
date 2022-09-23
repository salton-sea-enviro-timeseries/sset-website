import { createClient } from "contentful";

type LocaleOption<T> = {
  "en-US": T;
  es: T;
};
type LocaleDefault<T> = {
  "en-US": T;
};

type Metadata = {
  metadata: LocaleDefault<{
    fields: {
      site_title: LocaleDefault<string>;
      open_graph_image?: LocaleDefault<string>;
      open_graph_site_type?: LocaleDefault<string>;
      open_graph_site_url?: LocaleDefault<string>;
      open_graph_site_description?: LocaleDefault<string>;
    };
  }>;
};

type Fields<T> = {
  fields: T;
};

type BodyValues = {
  content: [{ value: string }];
};
type PageContent = [
  Fields<{
    body: LocaleOption<{ content: [BodyValues] }>;
    title: LocaleOption<string>;
  }>
];

type HeroImage = LocaleDefault<
  Fields<{
    title: LocaleDefault<string>;
    file: LocaleDefault<{ url: string }>;
  }>
>;

type HeroContent = LocaleDefault<
  Fields<{
    subTitle: LocaleOption<string>;
    title: LocaleOption<string>;
    buttonText: LocaleOption<string>;
    heroImage: HeroImage;
  }>
>;

type HomePage = {
  content: LocaleOption<PageContent>;
  hero: HeroContent;
  label: LocaleDefault<string>;
  metadata: Metadata;
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE as string,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY as string
});

export const getCmsContent = async (contentID: string) => {
  const cmsRes = await client.getEntries<HomePage>({
    content_type: contentID,
    select: "fields",
    locale: "*"
  });

  return cmsRes;
};
