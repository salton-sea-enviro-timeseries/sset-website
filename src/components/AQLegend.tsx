import { Box, makeStyles, Typography } from "@material-ui/core";
import { AirQualityIndex, AirQualityMapping } from "lib/airnow";
const AQLegend = () => {
  const classes = useStyles();
  return (
    <Box py={2}>
      <Typography
        className={classes.header}
        variant="caption"
        color="textSecondary"
      >
        US Air Quality Index (AQI)
      </Typography>
      <Box display="flex" mb={1}>
        {Object.keys(AirQualityMapping).map((key, index) => {
          return (
            <Box
              key={`${key}-color`}
              width={`${
                // @ts-ignore
                ((AirQualityMapping[key].max -
                  // @ts-ignore
                  (AirQualityMapping[key].min > 0
                    ? // @ts-ignore
                      AirQualityMapping[key].min - 1
                    : 0)) /
                  AirQualityMapping[AirQualityIndex.Hazardous].max) *
                100
              }%`}
              height={5}
              // @ts-ignore
              bgcolor={AirQualityMapping[key].color}
            />
          );
        })}
      </Box>
      <Box display="flex">
        {Object.keys(AirQualityMapping).map((key, index) => {
          return (
            <Box
              key={`${key}-range`}
              width={`${
                // @ts-ignore
                ((AirQualityMapping[key].max -
                  // @ts-ignore
                  (AirQualityMapping[key].min > 0
                    ? // @ts-ignore
                      AirQualityMapping[key].min - 1
                    : 0)) /
                  AirQualityMapping[AirQualityIndex.Hazardous].max) *
                100
              }%`}
              display="flex"
              justifyContent={index === 0 ? "space-between" : "flex-end"}
            >
              {index === 0 && (
                <Typography variant="caption">
                  {/*  @ts-ignore */}
                  {AirQualityMapping[key].min}
                </Typography>
              )}
              <Typography variant="caption">
                {/*  @ts-ignore */}
                {AirQualityMapping[key].max}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  header: {
    fontWeight: "bold"
  }
}));

export default AQLegend;
