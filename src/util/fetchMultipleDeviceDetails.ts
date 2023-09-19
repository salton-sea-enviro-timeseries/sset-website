import { CommonDeviceType } from "types";
import { fetcher } from "utils";
type DataType = CommonDeviceType[];
export async function fetchMultipleDeviceDetails(
  days: number,
  ...urls: string[]
): Promise<DataType> {
  const deviceArrays = await Promise.all(urls.map((url) => fetcher(url, days)));
  const flattenedArray = deviceArrays.flat();
  const filteredList = flattenedArray.filter(
    (i) => !(Array.isArray(i.data) && i.data.length === 0)
  );
  return filteredList;
}
