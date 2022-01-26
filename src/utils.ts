import { maxBy, minBy, meanBy, isNumber } from "lodash";
import chroma from "chroma-js";

import { Data, SiteData } from "types";

export const getAverage = (prop: string, collection: any[]) =>
  meanBy(collection, (o) => {
    return o[prop] && isNumber(o[prop]) ? parseFloat(o[prop]) : 0;
  });

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

export const colorScale = ["#2a4858", "#4abd8c", "#fafa6e"];
const chromaScale = chroma.scale(colorScale);

export const getColorFromScale = (value: number, min: number, max: number) => {
  if (!value) return "#eee";
  const percent = (value - min) / (max - min);
  const color = chromaScale(percent);
  return color.hex();
};
