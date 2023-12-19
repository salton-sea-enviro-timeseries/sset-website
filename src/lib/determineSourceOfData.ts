function determineSourceOfData(sensor: string) {
  // Regular expressions for each sensor type
  const quantRegex = /^MOD/g;
  const aqmdRegex = /^AQY/g;
  const aeroqualRegex = /^AQS1/g;
  // Determine the API route based on the sensor ID prefix
  if (quantRegex.test(sensor)) {
    return `../api/aq/devices/quant/${sensor}`;
  } else if (aqmdRegex.test(sensor)) {
    return `../api/aq/devices/aqmd/${sensor}`;
  } else if (aeroqualRegex.test(sensor)) {
    return `../api/aq/devices/aeroqual/${sensor}`;
  } else {
    throw new Error("Unknown sensor ID prefix");
  }
}

export default determineSourceOfData;
