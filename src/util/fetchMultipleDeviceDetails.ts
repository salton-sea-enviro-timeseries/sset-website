import { CommonDeviceType } from "types";
import { fetcher } from "utils";
type DataType = CommonDeviceType[];
export async function fetchMultipleDeviceDetails(
  ...urls: string[]
): Promise<DataType> {
  const deviceArrays = await Promise.all(urls.map((url) => fetcher(url)));
  return deviceArrays.flat();
}
