import { maxBy, minBy, meanBy } from "lodash";
import { Data, SiteData } from "types";

export const getAverage = (prop: string, collection: any[]) =>
  meanBy(collection, (o) => {
    return o[prop] && o[prop] !== "NA" ? parseFloat(o[prop]) : 0;
  });

export const getRange = (prop: keyof SiteData, data: Data) => {
  const values: Array<number | undefined> = Object.values(data)
    .map((o) => o[prop] as number | undefined)
    .sort();
  const max =
    maxBy(values) !== undefined
      ? parseFloat((maxBy(values) as number).toFixed(0))
      : undefined;
  const min =
    minBy(values) !== undefined
      ? parseFloat((minBy(values) as number).toFixed(0))
      : undefined;

  const length = values.length;
  let mid: number | undefined;
  if (length % 2 == 1) {
    mid = values[length / 2 - 0.5];
  } else {
    mid = ((values[length / 2] ?? 0) + (values[length / 2 - 1] ?? 0)) / 2;
  }

  mid = mid ? parseFloat(mid.toFixed(0)) : undefined;

  return {
    max,
    mid,
    min
  };
};
