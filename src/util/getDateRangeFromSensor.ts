import { CommonDeviceType } from "types";

export function getDateRangeFromSensor(data: CommonDeviceType[]): {
  bdate: string;
  edate: string;
} {
  const timestamps = data.map((d) => new Date(d.timestamp_local));
  const sorted = timestamps.sort((a, b) => a.getTime() - b.getTime());
  const format = (date: Date) =>
    `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

  return {
    bdate: format(sorted[0]),
    edate: format(sorted[sorted.length - 1])
  };
}
