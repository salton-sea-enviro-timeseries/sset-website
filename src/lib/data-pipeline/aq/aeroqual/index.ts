import { fetchAeroqualDeviceData } from "./fetch";
import { cleanAeroqualData } from "./clean";
import { normalizeAeroqualData } from "./normalize";
import { reshapeAeroqualRowsToWide } from "./reshape";
import { saveAeroqualMeasurements } from "./save";

export async function runAeroqualPipeline({
  sensorId,
  startDate,
  endDate
}: {
  sensorId: string;
  startDate: string;
  endDate: string;
}) {
  console.log("Fetching Aeroqual data...");

  const rawData = await fetchAeroqualDeviceData({
    sensorId,
    startDate,
    endDate
  });

  console.log("Cleaning Aeroqual data...");
  const cleanedData = cleanAeroqualData(rawData);

  console.log("Normalizing Aeroqual data...");
  const normalizedRows = normalizeAeroqualData(cleanedData);

  console.log(`Normalized rows: ${normalizedRows.length}`);

  console.log("Reshaping Aeroqual rows...");
  const wideRows = reshapeAeroqualRowsToWide(normalizedRows);

  console.log(`Wide rows: ${wideRows.length}`);

  console.log("Saving Aeroqual rows to database...");
  await saveAeroqualMeasurements(wideRows);

  console.log("Aeroqual pipeline complete.");

  return {
    normalizedRows: normalizedRows.length,
    wideRows: wideRows.length
  };
}
