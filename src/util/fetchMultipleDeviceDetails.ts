import { CommonDeviceType } from "types";
import { fetcher } from "utils";
type DataType = CommonDeviceType[];
type DateRange = {
  startDate?: string | null;
  endDate?: string | null;
};

export async function fetchMultipleDeviceDetails(
  { startDate, endDate }: DateRange = {},
  ...urls: string[]
): Promise<DataType> {
  try {
    const deviceArrays = await Promise.all(
      urls.map((url) =>
        fetcher(url, startDate || undefined, endDate || undefined).catch(
          (err) => {
            console.error(`Error fetching data from ${url}:`, err);
            return null;
          }
        )
      )
    );
    const flattenedArray = deviceArrays.flat().filter((i) => i !== null);
    const filteredList = flattenedArray.filter(
      (i) => !(Array.isArray(i.data) && i.data.length === 0)
    );
    return filteredList;
  } catch (err) {
    console.error("Error fetching  data:", err);
    return [];
  }
}
