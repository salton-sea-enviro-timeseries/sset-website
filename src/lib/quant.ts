const MODEL_NUM = "MOD-PM-00404";
const url = `https://app.quant-aq.com/ui-device-data/${MODEL_NUM}?table=clean`;

export interface MODRawDeviceDataResponse {
  "geo.lat": number;
  "geo.lon": number;
  "met.rh": number;
  "met.temp": number;
  "model.pm.pm1": number;
  "model.pm.pm10": number;
  "model.pm.pm25": number;
  pm1: number;
  pm10: number;
  pm25: number;
  PM1: number;
  PM10: number;
  "PM2.5": number;
  sn: string;
  timestamp: string;
  timestamp_local: string;
  url: string;
}

export async function getQuantDevice() {
  const options = {
    method: "GET"
  };

  const {
    data: { data },
    meta
  } = await (await fetch(url, options)).json();
  return data[0] as MODRawDeviceDataResponse;
}
