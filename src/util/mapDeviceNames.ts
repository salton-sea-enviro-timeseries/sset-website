export function mapDeviceNames(id: string) {
  const DeviceNames: { [key: string]: string } = {
    "AQY BD-1071": "AQY1 Indio",
    "AQY BD-1080": "Mecca",
    "AQY BD-1072": "AQY2 Indio",
    "AQY BD-1065": "Fillmore St. and 52nd Ave",
    "AQY BD-1092": "Mission San Jose",
    "AQY BD-1074": "Salton Sea State Park",
    "AQY BD-1094": "Thermal Airport",
    "AQY BD-1063": "Torres Martinez - Headquarters",
    "AQY BD-1152": "Torres Martinez - Near Shore",
    "MOD-PM-00404": "Palm Desert"
  };
  return DeviceNames[id];
}