import useSWR from "swr";

interface MediaObject {
  title?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
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

  return <div>hello {data[0].link}!</div>;

  return <p>In the News</p>;
};

export default FeaturedNewsFeed;
