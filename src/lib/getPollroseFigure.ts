import { PollroseResponse } from "types";
import { fetchWithRetry } from "util/fetchWithRetry";
const KEY = process.env.FASTAPI_KEY as string;
const url = "https://pollrose-fastapi.onrender.com/generate-pollrose/";
//TODO:fix
interface GetPollroseFigureParams {
  site: string;
  bdate: string;
  edate: string;
  pollv: string;
  csvFile: File;
}

export const getPollroseFigure = async ({
  site,
  bdate,
  edate,
  pollv,
  csvFile
}: GetPollroseFigureParams): Promise<PollroseResponse | null> => {
  const formData = new FormData();
  formData.append("site", site);
  formData.append("bdate", bdate);
  formData.append("edate", edate);
  formData.append("pollv", pollv);
  formData.append(
    "file",
    new Blob([csvFile], { type: "text/csv" }),
    "uploaded.csv"
  );
  const headers = new Headers();
  headers.append("x-api-key", KEY);
  try {
    const response = await fetchWithRetry(url, {
      method: "POST",
      body: formData,
      headers
    });

    if (!response.ok) {
      console.error(`Failed to fetch data. HTTP Status:${response.status}`);
      throw new Error("Failed to generate pollrose.");
    }
    const data: PollroseResponse = await response.json();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error generating pollrose figure: ${err.message}`);
    } else {
      console.error(
        "An unknown error occurred while fetching pollrose  figure",
        err
      );
    }
    return null;
  }
};
