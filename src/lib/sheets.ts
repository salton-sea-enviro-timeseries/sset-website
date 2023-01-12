import { stringify } from "csv-stringify/sync";
import { google } from "googleapis";
import { RawNutrientsData, RawProbeData } from "types";

const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const jwt = new google.auth.JWT(
  process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  undefined,
  (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").split("\\n").join("\n"),
  target
);
const sheets = google.sheets({ version: "v4", auth: jwt });

const sanitizeValue = (value: string) => {
  return Number(value) || value;
};

async function getSheetData(range: "probe_surface" | "nutrients") {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.PHOTOMETER_SHEET_ID,
    range
  });

  if (!response.data.values) return [];

  const rows: string[][] = response.data.values;

  // first row is the header
  const keys = rows[0].map((key) => key);

  return rows.slice(1).reduce((acc, row) => {
    /**
     * if date field is empty, all other fields are empty
     * so we can skip this row
     */
    if (!row[0]?.trim()) return acc;
    acc.push(
      row.reduce((acc1, value, index) => {
        acc1[keys[index]] = sanitizeValue(value);
        return acc1;
      }, {} as { [key: string]: string | number })
    );
    return acc;
  }, [] as { [key: string]: string | number }[]);
}

export function getProbeData() {
  return getSheetData("probe_surface") as unknown as Promise<RawProbeData[]>;
}

export function getNutrientsData() {
  return getSheetData("nutrients") as unknown as Promise<RawNutrientsData[]>;
}

export async function downloadFile(range: "probe_surface" | "nutrients") {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.PHOTOMETER_SHEET_ID,
    range
  });
  // @ts-ignore
  return stringify(response.data.values);
}
