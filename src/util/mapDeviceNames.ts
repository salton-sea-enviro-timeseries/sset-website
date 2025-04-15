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
    "MOD-00069": "Palm Desert",
    "MOD-PM-00368": "North Shore Yacht Club",
    "MOD-PM-00174": "Salton Sea North Platform",
    "AQS1 04072024-2724": "Offshore North",
    "AQS1 13122022-2194": "Offshore South"
  };
  return DeviceNames[id];
}
