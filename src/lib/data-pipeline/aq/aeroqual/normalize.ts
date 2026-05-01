// src/lib/data-pipeline/aq/aeroqual/normalize.ts
// TODO: rewrite transformAeroqualData here
import transformAeroqualData from "@/util/transformAeroqualData";
import { AeroqualOriginalData } from "./types";

export function normalizeAeroqualData(data: AeroqualOriginalData) {
  return transformAeroqualData(data);
}
