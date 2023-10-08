import { maxBy, minBy, meanBy, isNumber } from "lodash";
import chroma from "chroma-js";
import { Data, SiteData } from "types";
import { startOfHour, subHours, addHours, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

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
  "#440154",
  "#482777",
  "#3f4a8a",
  "#31678e",
  "#26838f",
  "#1f9d8a",
  "#6cce5a",
  "#b6de2b",
  "#fee825"
];

// magma
// [
//   "#000004",
//   "#180f3d",
//   "#440f76",
//   "#721f81",
//   "#9e2f7f",
//   "#cd4071",
//   "#f1605d",
//   "#fd9668",
//   "#feca8d",
//   "#fcfdbf"
// ];
const chromaScale = chroma.scale(colorScale);

export const getColorFromScale = (value: number, min: number, max: number) => {
  if (!value) return "#eee";
  const percent = (value - min) / (max - min);
  const color = chromaScale(percent);
  return color.hex();
};

export const fetcher = async (url: string, days?: number) => {
  const res = await fetch(days ? `${url}?days=${days}` : url);
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

export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};

export const truncateQuestion = (
  question: string,
  breakpointMatch: boolean
) => {
  if (breakpointMatch) {
    return question.slice(0, 30) + "...";
  }
  if (question.length <= 80) {
    return question;
  }
  return question.slice(0, 80) + "...";
};
const formatInTimeZone = (date: Date, timeZone: string, formatStr: string) => {
  const zonedDate = utcToZonedTime(date, timeZone);
  return format(zonedDate, formatStr);
};

const getAdjustedHour = (baseDate: Date, hoursDiff: number) => {
  return hoursDiff < 0
    ? startOfHour(subHours(baseDate, Math.abs(hoursDiff)))
    : startOfHour(addHours(baseDate, hoursDiff));
};

export const getStartDate = (
  baseDate: Date,
  daysSelected: number,
  formatIso: boolean = false
) => {
  const startDate = getAdjustedHour(baseDate, -(daysSelected * 24));
  return formatInTimeZone(
    startDate,
    "UTC",
    formatIso ? "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" : "yyyy-MM-dd HH:mm:ss"
  );
};

export const getEndDate = (baseDate: Date, formatIso: boolean = false) => {
  const endDate = getAdjustedHour(baseDate, 1);
  return formatInTimeZone(
    endDate,
    "UTC",
    formatIso ? "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" : "yyyy-MM-dd HH:mm:ss"
  );
};
