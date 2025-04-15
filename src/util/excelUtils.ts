import ExcelJS from "exceljs";
import { CommonDeviceType, pollutantKey } from "types";

export async function downloadExcel(data: Record<string, any>): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Air Quality Data");

  // Define columns
  worksheet.columns = [
    { header: "Sensor ID", key: "sn", width: 20 },
    { header: "Sensor Name", key: "station_name", width: 25 },
    { header: "Timestamp", key: "timestamp_local", width: 25 },
    { header: "NO2 (ppb)", key: "NO2", width: 15 },
    { header: "O3 (ppb)", key: "O3", width: 15 },
    { header: "CO (ppb)", key: "CO", width: 15 },
    { header: "PM2.5 (µg/m³)", key: "PM2.5", width: 15 },
    { header: "PM10 (µg/m³)", key: "PM10", width: 15 },
    { header: "PM1 (µg/m³)", key: "PM1", width: 15 },
    { header: "H2S ppb", key: "H2S", width: 15 },
    { header: "WS m/s", key: "WS", width: 15 },
    { header: "WD deg", key: "WD", width: 15 }
  ];
  // Extract data from Json
  Object.values(data).forEach((station: any) => {
    station.data.forEach((entry: any) => {
      worksheet.addRow({
        ...entry,
        station_name: station.name
      });
    });
  });
  // Generate excel file and trigger download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  // create link trigger download
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "air_quality_data.xlsx";
  a.click();
  window.URL.revokeObjectURL(url);
}

export function generatePollroseCSV(
  data: CommonDeviceType[],
  pollutant: pollutantKey
): string {
  const headers = ["sn", "timestamp_local", "WD", "WS", pollutant];
  const rows = data
    .filter(
      (row) =>
        row.WD !== undefined &&
        row.WS !== undefined &&
        row[pollutant as keyof CommonDeviceType] !== undefined
    )
    .map((row) => [
      row.sn ?? "",
      row["timestamp_local"] ?? "",
      row.WD,
      row.WS,
      row[pollutant as keyof CommonDeviceType]
    ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
