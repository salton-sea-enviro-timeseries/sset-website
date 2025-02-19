import { Box, Typography } from "@mui/material";
import React, { FC, ReactNode, useEffect } from "react";
import ReactMapGL, { NavigationControl, ViewState } from "react-map-gl/mapbox";
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
  const [viewport, setViewport] = React.useState<Partial<ViewState>>({
    zoom: ZOOM,
    latitude: LATITUDE,
    longitude: LONGITUDE
  });
  useEffect(() => {
    setViewport((prevViewport) => {
      if (
        prevViewport.latitude !== LATITUDE ||
        prevViewport.longitude !== LONGITUDE ||
        prevViewport.zoom !== ZOOM
      ) {
        return {
          ...prevViewport,
          zoom: ZOOM,
          latitude: LATITUDE,
          longitude: LONGITUDE
        };
      }
      return prevViewport; // Avoid unnecessary updates
    });
  }, [ZOOM, LATITUDE, LONGITUDE]);
  function onViewportChange(viewState: ViewState) {
    setViewport((prevViewport) =>
      prevViewport.latitude !== viewState.latitude ||
      prevViewport.longitude !== viewState.longitude ||
      prevViewport.zoom !== viewState.zoom
        ? viewState
        : prevViewport
    );
  }

  const mapCaption = caption && (
    <Box pb={4}>
      <Typography gutterBottom component="div" variant="caption">
        {caption}
      </Typography>
    </Box>
  );
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "600px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1
      }}
    >
      <ReactMapGL
        initialViewState={viewport}
        style={{
          width: "100%",
          height: "100%",
          flexGrow: 1
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MB_TOKEN}
        onMove={(evt) => onViewportChange(evt.viewState)}
        scrollZoom={false}
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
      {mapCaption}
    </Box>
  );
};

export default Map;
