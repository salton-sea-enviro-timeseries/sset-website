import useSWR from "swr";
import { MediaObject } from "types";
import NewsCard from "./NewsCard";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const mediaLinks = [
  "https://www.cnbc.com/2021/11/06/californias-salton-sea-spewing-toxic-fumes-creating-ghost-towns-.html",
  "https://www.cnbc.com/2021/11/06/californias-salton-sea-spewing-toxic-fumes-creating-ghost-towns-.html"
];

const FeaturedNewsFeed = () => {
  const { data, error } = useSWR<MediaObject[]>(
    `/api/scrape?urls=${mediaLinks.join(",")}`,
    fetcher
  );

  console.log("data", data);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // map through data

  return data.map((nd, index) => {
    return <NewsCard key={index} newsData={nd} />;
  });

  // return <NewsCard newsData={data} />;
};

export default FeaturedNewsFeed;
