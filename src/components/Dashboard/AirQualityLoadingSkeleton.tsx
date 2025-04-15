import { Box, Grid2 } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import LoadingChart from "./LoadingChart";
import Image from "next/image";
import placeholderImage from "../../../public/pollrose-placeholder.png";

const AirQualityLoadingSkeleton = () => {
  return (
    <>
      <Box pb={5}>
        {/* selector start */}
        <Box pr={0.5} pb={1} sx={{ borderRadius: 4 }}>
          <Skeleton height={50} width="100%" />
        </Box>

        {/* Parameter and AQI data */}
        <Box display="flex" flexWrap="wrap">
          {Array.from({ length: 3 }).map((_, index) => (
            <Box flex={1} p={1} key={index} m={0.5} sx={{ borderRadius: 4 }}>
              <Skeleton variant="rectangular" height={85} width="100%" />
            </Box>
          ))}
        </Box>
      </Box>
      {/* Chart and Pollrose Grids */}
      <Grid2 container spacing={1} sx={{ mb: 4 }}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <LoadingChart />
        </Grid2>

        <Grid2
          size={{ xs: 12, md: 4 }}
          display={"flex"}
          justifyContent="center"
        >
          <Box
            position="relative"
            width={350}
            height={350}
            sx={{ borderRadius: 4, overflow: "hidden" }}
          >
            {/* Placeholder Image (faint background) */}
            <Image
              src={placeholderImage}
              alt="Pollrose Placeholder"
              fill
              priority
              sizes="350px"
              style={{
                objectFit: "contain",
                opacity: 0.1,
                animation: "pulseOpacity 1.5s ease-in-out infinite",
                zIndex: 0
              }}
            />

            {/* Skeleton overlay */}
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                backgroundColor: "rgba(150, 150, 150, 0.3)"
              }}
            />
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
};
export default AirQualityLoadingSkeleton;
