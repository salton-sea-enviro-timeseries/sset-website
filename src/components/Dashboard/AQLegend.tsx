import { Box, Link, Typography } from "@mui/material";
import { AirQualityIndex, AirQualityMapping } from "lib/airnow";
import HoverTooltip from "./HoverToolTip";
import React from "react";
const AQLegend = () => {
  return (
    <Box pb={2}>
      <Typography
        sx={{ fontWeight: "bold" }}
        variant="caption"
        color="textSecondary"
      >
        US Air Quality Index{" "}
        <HoverTooltip
          title={
            <>
              <Typography color="inherit">
                <b>Air Quality Index:</b>
              </Typography>
              <Typography color="inherit" variant="body2" component="p">
                The U.S. AQI is EPA’s index for reporting air quality for all
                parameters except H2S. This link will take you to{" "}
                <em>
                  <u>airnow.gov</u>
                </em>{" "}
                for more information.
              </Typography>
            </>
          }
        >
          <Link
            href="https://www.airnow.gov/aqi/aqi-basics/"
            target="_blank"
            rel="noopener"
          >
            (AQI)
          </Link>
        </HoverTooltip>
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

export default React.memo(AQLegend);
