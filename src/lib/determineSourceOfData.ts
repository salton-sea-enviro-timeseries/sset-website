function determineSourceOfData(sensor: string) {
  if (!sensor || sensor === "Unknown") {
    console.warn("Invalid or missing sensor ID.");
    return null;
  }

  const quantRegex = /^MOD/g;
  const aqmdRegex = /^AQY/g;
  const aeroqualRegex = /^AQS1/g;

  const encodedSensor = encodeURIComponent(sensor);

  if (quantRegex.test(sensor)) {
    return `../api/aq/devices/quant/${encodedSensor}`;
  } else if (aqmdRegex.test(sensor)) {
    return `../api/aq/devices/aqmd/${encodedSensor}`;
  } else if (aeroqualRegex.test(sensor)) {
    return `../api/aq/devices/aeroqual/${encodedSensor}`;
  } else {
    throw new Error("Unknown sensor ID prefix");
  }
}

export default determineSourceOfData;
