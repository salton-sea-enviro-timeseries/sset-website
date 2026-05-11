import type { Measurement } from "@prisma/client";

type PrismaAeroqualDataParams = {
  sensorId: string;
  measurements: Measurement[];
};

function transformPrismaAeroqualData({
  sensorId,
  measurements
}: PrismaAeroqualDataParams) {
  return measurements.map((measurement) => ({
    sn: sensorId,
    timestamp_local: measurement.timestamp,

    H2S: measurement.h2s,
    NO2: measurement.no2,
    WS: measurement.ws,
    WD: measurement.wd,

    "VOC L": null,
    "Battery voltage": measurement.battery,

    O3: measurement.o3,
    "PM2.5": measurement.pm25,
    PM10: measurement.pm10,

    RAIN: measurement.rain,
    "AIR T": measurement.airT,
    "AIR RH": measurement.airRH,

    TEMP: measurement.temp,
    RH: measurement.rh,
    DP: measurement.dp
  }));
}

export default transformPrismaAeroqualData;
