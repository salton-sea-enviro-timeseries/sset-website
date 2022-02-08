import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { colors, Typography } from "@material-ui/core";
import useSWR from "swr";
import { fetcher } from "utils";
import { Skeleton } from "@material-ui/lab";
import { ForecastResponse } from "lib/airnow";
import { format } from "date-fns";

const SALTON_SEA_ZIPCODE = "92254";

const AirQualitySection = () => {
  const classes = useStyles();
  const { data = [], error } = useSWR<ForecastResponse[]>(
    `/api/aq/forecast?zipCode=${SALTON_SEA_ZIPCODE}`,
    fetcher
  );

  console.log(data);
  console.log(error);

  const isLoading = !data && !error;

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
          `Air Quality Forecast ${
            forecastDate ? format(forecastDate, "MM/dd/yyyy") : ""
          }`
        )}
      </Typography>
      {isLoading ? (
        <Skeleton variant="rect" width="100%" height={200} />
      ) : (
        <Box display="flex">
          {data.map((d) => {
            return (
              <Box
                key={d.ParameterName}
                flex={1}
                border={`1px solid ${colors.grey[300]}`}
                p={1}
                m={0.5}
              >
                <Typography>{d.ParameterName}</Typography>
                <Typography>{d.AQI}</Typography>
                <Typography>{d.Category.Name}</Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.secondary.light}`
  }
}));

export default AirQualitySection;
