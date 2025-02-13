import { Box, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import ReactMapGL, { NavigationControl, ViewportProps } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  caption?: string | ReactNode;
  link?: string;
  purpleAirLink?: React.ElementType;
  LATITUDE: number;
  LONGITUDE: number;
  ZOOM: number;
}

const Map: FC<MapProps> = ({
  caption,
  children,
  LATITUDE,
  LONGITUDE,
  ZOOM
}) => {
  const [viewport, setViewport] = React.useState<Partial<ViewportProps>>({
    zoom: ZOOM,
    latitude: LATITUDE,
    longitude: LONGITUDE
  });
  function onViewportChange(viewport: ViewportProps) {
    const { height, width, ...rest } = viewport;
    setViewport({ ...rest });
  }
  const mapCaption = (
    <Box pb={3}>
      <Typography gutterBottom component="div" variant="caption">
        {caption}
      </Typography>
    </Box>
  );
  return (
    <>
      <ReactMapGL
        {...viewport}
        width="100%"
        style={{
          minHeight: "470px"
        }}
        height="500px"
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MB_TOKEN}
        onViewportChange={onViewportChange}
        scrollZoom={false}
        reuseMaps
      >
        {children}
        <NavigationControl
          showCompass={false}
          style={{
            right: 10,
            top: 10
          }}
        />
      </ReactMapGL>
      {/* TODO: Move this separate component */}
      {caption && mapCaption}
    </>
  );
};

export default Map;
