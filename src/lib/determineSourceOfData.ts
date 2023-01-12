function determineSourceOfData(sensor: string) {
  const regex = /^M/g;
  return sensor.match(regex)
    ? `../api/aq/devices/quant/${sensor}`
    : `../api/aq/devices/aqmd/${sensor}`;
}

export default determineSourceOfData;
