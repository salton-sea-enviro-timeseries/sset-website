import { AirQualityDevices, CommonDeviceType } from "types";
import { mapDeviceNames } from "./mapDeviceNames";
import { Device } from "lib/aqmd";
type DeviceRawData = {
  id: string;
  name: string;
  data: CommonDeviceType[];
};
type DataType = CommonDeviceType[];
type PurpleAirSensor = {
  site: string;
  value: string;
  sensorId: string;
  latitude: string;
  longitude: string;
  color: string;
  location: string;
};
export function groupSensorData(data: DataType): Record<string, DeviceRawData> {
  return data.reduce(
    (sensors: Record<string, DeviceRawData>, curr: CommonDeviceType) => {
      const id = curr.DeviceID || curr.sn || curr.DeviceId;
      if (!sensors[id]) {
        sensors[id] = {
          id,
          name: mapDeviceNames(id),
          data: [{ ...curr }]
        };
      } else {
        sensors[id].data.push({ ...curr });
      }
      return sensors;
    },
    {}
  );
}

export function transformSensorData(sensorList: Device[]) {
  return sensorList.map((device) => {
    let status: string = "";
    const name = mapDeviceNames(device.DeviceId);
    const statusMapping: { [key: string]: string } = {
      "Not Working": "🔴",
      Offline: "⭕",
      Working: "🟢",
      "Working-Quant": "🟩",
      "Not Working-Quant": "🟥"
    };
    status = statusMapping[device.WorkingStatus] || "";
    return {
      site: `${status} ${name}`,
      value: device.WorkingStatus,
      latitude: device.Latitude,
      longitude: device.Longitude,
      sensorId: `${device.DeviceId}: ${name}`,
      location: name,
      color: "#040273"
    };
  });
}

export function transformPurpleAirSensorData(
  purpleAirSensorList: PurpleAirSensor[]
) {
  return purpleAirSensorList.map((sensor) => ({
    ...sensor,
    site: `${sensor.sensorId}: ${sensor.site} `,
    latitude: parseFloat(sensor.latitude),
    longitude: parseFloat(sensor.longitude)
  }));
}

export function filteredSensors(sensors: AirQualityDevices[]) {
  return sensors.filter(({ value }) => value !== "purple_air");
}
