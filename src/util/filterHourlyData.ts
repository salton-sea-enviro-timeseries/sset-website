import { CommonDeviceType } from "types";

export function filterHourlyData(data: CommonDeviceType[]): CommonDeviceType[] {
  return data.reduce((filteredData: CommonDeviceType[], currentItem) => {
    const timestamp: Date = new Date(currentItem.timestamp_local);
    // If this is the first item, add it to the filteredData
    if (filteredData.length === 0) {
      filteredData.push(currentItem);
    } else {
      // Get the last added item's timestamp
      const lastTimestamp: Date = new Date(
        filteredData[filteredData.length - 1].timestamp_local
      );
      // Calculate the time difference in hours
      const timeDiffInHours: number =
        (lastTimestamp.getTime() - timestamp.getTime()) / (1000 * 60 * 60);
      // If the time difference is equal or greater than 1 hour, add the item to the filteredData
      if (timeDiffInHours >= 1) {
        filteredData.push(currentItem);
      }
    }
    return filteredData;
  }, []);
}
