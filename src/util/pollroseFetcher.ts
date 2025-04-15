interface PollroseParams {
  site: string;
  bdate: string;
  edate: string;
  pollv: string;
  csvFile: string;
}

interface PollroseResponse {
  message: string;
  image: string;
}

export async function pollroseFetcher(
  url: string,
  params: PollroseParams
): Promise<PollroseResponse> {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = { message: "No error body returned" };
      }
      const error = new Error("An error occurred while fetching the data.");
      // @ts-ignore
      error.info = errorData;
      // @ts-ignore
      error.status = res.status;
      throw error;
    }

    return await res.json();
  } catch (err) {
    console.error("Pollrose fetcher error: ", err);
    throw err;
  }
}
