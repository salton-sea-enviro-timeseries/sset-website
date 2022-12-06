import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { colors, Typography } from "@material-ui/core";
import useSWR from "swr";
import { Skeleton } from "@material-ui/lab";
import { format } from "date-fns";
import Translation from "./Translation";
import { MenuItem, TextField } from "@material-ui/core";
import { AirQualityMapping, ForecastResponse } from "lib/airnow";
import { fetcher } from "utils";
import AQLegend from "./AQLegend";
import WithLoading from "./WithLoading";
import { Device } from "lib/aqmd";
import { useState } from "react";

const SALTON_SEA_ZIPCODE = "92254";

const filterData = (
  item: ForecastResponse,
  index: number,
  array: ForecastResponse[]
) => {
  if (array.length > 5) {
    return index < 5;
  }
  return true;
};

function determineSourceOfData(sensor: string) {
  const regex = /^M/g;
  return sensor.match(regex)
    ? `../api/aq/devices/quant/${sensor}`
    : `../api/aq/devices/aqmd/${sensor}`;
}

const AirQualitySection = ({ sensorId }: { sensorId: string[] }) => {
  console.log("sensors", sensorId);
  const classes = useStyles();
  const [sensor, setSensor] = useState("AQY BD-1071");

  const { data: forecastData = [], error: forecastError } = useSWR<
    ForecastResponse[]
  >(`/api/aq/forecast?zipCode=${SALTON_SEA_ZIPCODE}`, fetcher);
  const { data: deviceData, error: aqmdError } = useSWR(
    determineSourceOfData(sensor),
    fetcher
  );

  console.log("device Data", deviceData);
  if (forecastError) console.error(forecastError);

  const isLoading = !forecastData.length && !forecastError;

  console.log("sensor select value", sensor);
  const handleChangeSensor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSensor(event.target.value);
  };

  if (forecastError) return <Typography>Error loading data</Typography>;

  const forecastDate = forecastData[0]?.DateForecast
    ? new Date(forecastData[0]?.DateForecast.trim() + "T00:00:00")
    : undefined;

  return (
    <Box pb={5}>
      {/* selector start */}
      <Box pr={0.5} pb={1}>
        <WithLoading variant="rect" height={40} isLoading={isLoading}>
          {sensorId.length > 0 && (
            <TextField
              fullWidth
              label="Sensor"
              select
              size="small"
              variant="outlined"
              value={sensor}
              onChange={handleChangeSensor}
            >
              {sensorId.map((option) => {
                const sensorInfoArray = option.split(":");
                return (
                  <MenuItem key={option} value={sensorInfoArray[0]}>
                    {option}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        </WithLoading>
      </Box>
      {/* selector end */}
      <WithLoading isLoading={isLoading}>
        <Typography>
          {`Air Quality Forecast for ${
            forecastDate ? format(forecastDate, "EEE, MMM dd, yyyy") : ""
          }`}
        </Typography>
      </WithLoading>
      <WithLoading isLoading={isLoading}>
        <Typography variant="caption">{`Zip Code ${SALTON_SEA_ZIPCODE}`}</Typography>
      </WithLoading>

      <Box display="flex" flexWrap="wrap">
        {isLoading ? (
          <>
            <Box flex={1} p={1} m={0.5}>
              <Skeleton variant="rect" height={85} width="100%" />
            </Box>
            <Box flex={1} p={1} m={0.5}>
              <Skeleton variant="rect" height={85} width="100%" />
            </Box>
            <Box flex={1} p={1} m={0.5}>
              <Skeleton variant="rect" height={85} width="100%" />
            </Box>
            <Box flex={1} p={1} m={0.5}>
              <Skeleton variant="rect" height={85} width="100%" />
            </Box>
            <Box flex={1} p={1} m={0.5}>
              <Skeleton variant="rect" height={85} width="100%" />
            </Box>
          </>
        ) : (
          forecastData.filter(filterData).map((d) => {
            return (
              <Box
                key={d.ParameterName}
                flex={1}
                border={`1px solid ${colors.grey[300]}`}
                p={1}
                m={0.5}
              >
                <Typography variant="h6" component="p">
                  {d.ParameterName}
                </Typography>
                <Box display="flex" alignItems="center">
                  <svg className={classes.aqIndicator}>
                    <circle fill={AirQualityMapping[d.Category.Number].color} />
                  </svg>
                  <Typography component="span">{d.AQI}</Typography>
                  <span className={classes.bullet}>&bull;</span>
                  <Typography component="span" noWrap>
                    {d.Category.Name}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>

      {isLoading ? <Skeleton height={50} width="100%" /> : <AQLegend />}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.secondary.light}`
  },
  bullet: {
    fontSize: "1.5rem",
    padding: theme.spacing(0, 0.5)
  },
  aqIndicator: {
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
  }
}));

export default AirQualitySection;
