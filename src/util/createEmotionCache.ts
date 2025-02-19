import createCache from "@emotion/cache";

// Function to create an emotion cahce
const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};

export default createEmotionCache;
