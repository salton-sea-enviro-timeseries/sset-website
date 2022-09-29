import { createClient } from "contentful";

export type LocaleOption<T> = {
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
export type NestedObjBodyText = { content: [BodyValues] };

type PageContent = [
  Fields<{
    body: LocaleOption<NestedObjBodyText>;
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
type MenuItem = Fields<{
  description: LocaleOption<{ content: [BodyValues] }>;
  name: LocaleOption<string>;
  unit: LocaleDefault<string>;
  paramKey: LocaleDefault<string>;
}>;
type memberInfo = Fields<{ name: ""; email: ""; website: ""; affiliation: "" }>;
type MenuList = LocaleDefault<[MenuItem]>;
// ========= Page types ==========================
export type HomePage = {
  content: LocaleOption<PageContent>;
  hero: HeroContent;
  label: LocaleDefault<string>;
  metadata: Metadata;
};

export type DashboardPage = {
  download_nutrients_data_button: LocaleOption<string>;
  download_sensor_data_button: LocaleOption<string>;
  label: LocaleDefault<string>;
  map_caption_main: LocaleOption<string>;
  map_caption_secondary: LocaleOption<string>;
  menuList: MenuList;
};

export type ContactPage = {
  members: LocaleDefault<[memberInfo]>;
  applyLink: LocaleDefault<string>;
  body: LocaleDefault<string>;
  callToAction: LocaleOption<string>;
  metadata: Metadata;
  title: LocaleOption<string>;
};
// ==============================================

const client = createClient({
  space: process.env.CONTENTFUL_SPACE as string,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY as string
});

export async function getCmsContent<T>(contentID: string) {
  const cmsRes = await client.getEntries<T>({
    content_type: contentID,
    select: "fields",
    locale: "*"
  });
  return cmsRes.items[0];
}
