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
    if (row[0] === "") return acc;
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

  // return drive.files.export(
  //   {
  //     fileId,
  //     mimeType: "text/csv"
  //   },
  //   {
  //     // responseType: "stream",
  //     // params: {
  //     //   gid,
  //     //   format: "csv",
  //     //   id: fileId,
  //     //   dat: "AFCstmp4ptZLwPLrzJSO95CblB3IYMisQ7I-39xSNtBti6tSaFAj-IaPSSsPFkhLlW-gCZgzDJbNJg-HkXd4NQufMDJEuiLMWmYYGqBP7DlFydHUMYOMEGzPeJgMacmdOZHkmkmEUTo2YvnN1gsAzEwV6CkKi_eJT605zfEcjrhCWV8PQjnxvI2Cu7VAREkiWXqqXLd0Mk-BwomMkj2lFEJw48YaPDGemk0QH3kTKmABV1DCUxgVdKlheMOK__ELHknO5Qd21WT4JZwH5TeYd25a5VT_X6q1EPvJrbvX3UDtVyTqpLE1nv20iW7tvjfhKMN9DghBHwjPIYZnliDajcTmYz85kctZuR2p8mkj0Vp6A9S4o-88kLF_Rmx-CRIKhnqxVDHLLAcU7PELAh8qTA3aIIvD7pxMAX189l4vduNng52poptq8buAmMkODa-ENtoZWwPvoeNQ-U7OyJzY3IU9NLxg8RM9vvycKJkAHD9lG7eRjaMeXbhLynur3Xyr-85SS7R75MOsOkJCig8K_tu0z9_COHQxoY8i-wwUhbj8CSkewiBn7l1HCswNeHxnxoK9TczjS8sHHWaX9OngCoM6s0Juyq7a4sgyasNhy4byT3nv27BQ0sEgt9pAl17HkhcaCtjx6kao2ycv_dE-Nh0_vMYV35MnUehRUehPvkI_277-tKXhVPOrGxReQyG6rzX0zX0ljY2hnyMBlcUvRhQeng"
  //     // }
  //   }
  // );
  // // .then((response) => response)
  // // .then((data) => Buffer.from(data));
}
