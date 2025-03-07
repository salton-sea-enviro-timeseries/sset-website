import ExcelJS from "exceljs";

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
    { header: "PM2.5 (µg/m³)", key: "PM2.5", width: 15 },
    { header: "PM10 (µg/m³)", key: "PM10", width: 15 },
    { header: "H2S ppb", key: "H2S", width: 15 }
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
