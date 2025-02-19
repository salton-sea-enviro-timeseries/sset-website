import { Box, Typography, colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AirQualityIndex, AirQualityMapping } from "lib/airnow";
import { RawDeviceAverageDataResponse } from "lib/aqmd";

const calculateAQI = (parameterValue: number | string, aqiStandard: number) => {
  if (typeof parameterValue === "number") {
    return Math.round((parameterValue / aqiStandard) * 100);
  }
  return;
};
const findAqiIndex = (aqi: number): AirQualityIndex => {
  let aqiIndex: number = 0;
  switch (true) {
    case aqi <= 50:
      aqiIndex = 1;
      break;
    case aqi > 50 && aqi <= 100:
      aqiIndex = 2;
      break;
    case aqi > 100 && aqi <= 150:
      aqiIndex = 3;
      break;
    case aqi > 150 && aqi <= 200:
      aqiIndex = 4;
      break;
    case aqi > 200 && aqi <= 300:
      aqiIndex = 5;
      break;
    case aqi > 300 && aqi <= 500:
      aqiIndex = 6;
      break;
  }
  return aqiIndex;
};
const AirQualityParamBox = ({
  parameter,
  unitOfMeasure,
  parameterValue,
  aqiStandard
}: {
  parameter: string;
  unitOfMeasure?: RawDeviceAverageDataResponse[keyof RawDeviceAverageDataResponse];
  parameterValue?: number | string;
  aqiStandard: number | null;
}) => {
  if (parameterValue === undefined) return null;
  if (!aqiStandard)
    return (
      <Box flex={1} border={`1px solid ${colors.grey[300]}`} p={1} m={0.5}>
        <Typography variant="h6" component="p">
          {parameter} &bull; {parameterValue ?? "N/A"} {unitOfMeasure}
        </Typography>
      </Box>
    );
  const aqi = calculateAQI(parameterValue, aqiStandard);
  const aqiIndex = aqi !== undefined && findAqiIndex(aqi);
  return (
    <Box flex={1} border={`1px solid ${colors.grey[300]}`} p={1} m={0.5}>
      <Typography variant="h6" component="p">
        {parameter} &bull; {parameterValue ?? "N/A"} {unitOfMeasure}
      </Typography>
      {aqiIndex && (
        <Box display="flex" alignItems="center">
          <AqiIndicator>
            <circle fill={AirQualityMapping[findAqiIndex(aqi)].color} />
          </AqiIndicator>
          <Typography component="span">{aqi} </Typography>
          <BulletPoint>&bull;</BulletPoint>
          <Typography component="span" noWrap>
            {AirQualityIndex[aqiIndex]}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const AqiIndicator = styled("svg")(({ theme }) => ({
  height: 12,
  width: 12,
  fontSize: 14,
  lineHeight: 20,
  marginRight: theme.spacing(0.5),
  display: "inline-block",
  "& circle": {
    cx: "5px",
    cy: "6px",
    r: "5px",
    fontSize: 14,
    lineHeight: 20
  }
}));
const BulletPoint = styled("span")(({ theme }) => ({
  fontSize: "1.5rem",
  padding: theme.spacing(0, 0.5)
}));
export default AirQualityParamBox;
