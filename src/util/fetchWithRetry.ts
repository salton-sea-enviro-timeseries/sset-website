export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries: number = 2,
  delayMs: number = 2000
): Promise<Response> => {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;

      // Retry only on server/network errors
      if (res.status >= 500 || res.status === 429) {
        throw new Error(`Server error: ${res.status}`);
      }

      // If it's a client error (400-499), don't retry
      throw new Error(`Client error: ${res.status}`);
    } catch (err) {
      if (i === retries) throw err;
      console.warn(`Retrying fetch (${i + 1}/${retries})...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw new Error("Failed to fetch after retries");
};
