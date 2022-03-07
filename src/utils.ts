import { maxBy, minBy, meanBy, isNumber } from "lodash";
import chroma from "chroma-js";

import { Data, SiteData } from "types";

export const getAverage = (prop: string, collection: any[]) => {
  const filteredCollection = collection.filter((item: any) =>
    isNumber(item[prop])
  );
  return meanBy(filteredCollection, (o) => {
    return parseFloat(o[prop]);
  });
};

export const getRange = (prop: keyof SiteData, data: Data) => {
  const values: Array<number | undefined> = Object.values(data)
    .map((o) => o[prop] as number | undefined)
    .sort();
  const max =
    maxBy(values) !== undefined
      ? Math.ceil(maxBy(values) as number)
      : undefined;
  const min =
    minBy(values) !== undefined
      ? Math.floor(minBy(values) as number)
      : undefined;

  const mid = ((max ?? 0) - (min ?? 0)) / 2 + (min ?? 0);

  return {
    max,
    mid,
    min
  };
};

export const colorScale = [
  "#00429d",
  "#5681b9",
  "#93c4d2",
  "#ffffe0",
  "#ffa59e",
  "#dd4c65",
  "#93003a"
];
const chromaScale = chroma.scale(colorScale);

export const getColorFromScale = (value: number, min: number, max: number) => {
  if (!value) return "#eee";
  const percent = (value - min) / (max - min);
  const color = chromaScale(percent);
  return color.hex();
};

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // @ts-ignore
    error.info = await res.json();
    // @ts-ignore
    error.status = res.status;
    throw error;
  }

  return res.json();
};
