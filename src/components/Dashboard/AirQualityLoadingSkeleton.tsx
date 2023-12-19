import { Box } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import LoadingChart from "./LoadingChart";

const AirQualityLoadingSkeleton = () => {
  return (
    <>
      {" "}
      <Box pb={5}>
        {/* selector start */}
        <Box pr={0.5} pb={1}>
          <Skeleton height={50} width="100%" />
        </Box>
        {/* selector end */}

        {/* Parameter and AQI data */}
        <Box display="flex" flexWrap="wrap">
          {Array.from({ length: 3 }).map((item, index) => (
            <Box flex={1} p={1} key={index} m={0.5}>
              <Skeleton variant="rect" height={85} width="100%" />
            </Box>
          ))}
        </Box>
      </Box>
      <LoadingChart />
    </>
  );
};
export default AirQualityLoadingSkeleton;
