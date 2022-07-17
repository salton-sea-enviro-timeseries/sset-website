import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { colors, Typography } from "@material-ui/core";
import useSWR from "swr";
import { Skeleton } from "@material-ui/lab";
import { format } from "date-fns";

import { AirQualityMapping, ForecastResponse } from "lib/airnow";
import { fetcher } from "utils";
import AQLegend from "./AQLegend";

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

const AirQualitySection = () => {
  const classes = useStyles();
  const { data = [], error } = useSWR<ForecastResponse[]>(
    `/api/aq/forecast?zipCode=${SALTON_SEA_ZIPCODE}`,
    fetcher
  );

  console.log(data);
  if (error) console.error(error);

  const isLoading = !data.length && !error;

  if (error) return <Typography>Error loading data</Typography>;

  const forecastDate = data[0]?.DateForecast
    ? new Date(data[0]?.DateForecast.trim() + "T00:00:00")
    : undefined;

  return (
    <Box pb={5}>
      <Typography>
        {isLoading ? (
          <Skeleton />
        ) : (
          `Air Quality Forecast for ${
            forecastDate ? format(forecastDate, "EEE, MMM dd, yyyy") : ""
          }`
        )}
      </Typography>

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
          data.filter(filterData).map((d) => {
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
