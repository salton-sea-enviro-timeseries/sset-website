import _ from "lodash";
import { OriginalData, TransformedData } from "types";

function ppmToPpb(ppm: number): number {
  return _.round(ppm * 1000, 2);
}

function transformAeroqualData(originalData: OriginalData): TransformedData[] {
  if (!originalData.Instruments || originalData.Instruments.length === 0) {
    return [];
  }
  return originalData.Instruments.flatMap((instrument) =>
    instrument.Data.map((dataPoint) => {
      const h2s_ppb = dataPoint.Data.H2S
        ? ppmToPpb(dataPoint.Data.H2S)
        : dataPoint.Data.H2S;
      // some sensors do not measure H2S, NO2, VOC, or Battery voltage
      return {
        sn: instrument.Serial,
        timestamp_local: dataPoint.Time,
        H2S: h2s_ppb,
        NO2: dataPoint.Data.NO2,
        WS: dataPoint.Data.WS, // m/s
        WD: dataPoint.Data.WD, // deg
        "VOC L": dataPoint.Data["VOC L"],
        "Battery voltage": dataPoint.Data["Battery voltage"],
        O3: dataPoint.Data.O3,
        "PM2.5": dataPoint.Data["PM2.5"],
        PM10: dataPoint.Data.PM10
      };
    })
  );
}

export default transformAeroqualData;
