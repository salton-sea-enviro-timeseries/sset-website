import { Tooltip, makeStyles } from "@material-ui/core";
import React from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  ViewportProps
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const LATITUDE = 33.47634;
const LONGITUDE = -116.03884;
const SIZE = 20;
const ZOOM = 12;

interface MapProps {
  pins: { latitude: number; longitude: number; color: string; site: string }[];
}

export default function Map({ pins }: MapProps) {
  const classes = useStyles();
  const [viewport, setViewport] = React.useState<Partial<ViewportProps>>({
    zoom: ZOOM,
    latitude: LATITUDE,
    longitude: LONGITUDE
  });

  function onViewportChange(viewport: ViewportProps) {
    const { height, width, ...rest } = viewport;
    setViewport({ ...rest });
  }

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      style={{
        minHeight: "470px"
      }}
      height="100%"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MB_TOKEN}
      onViewportChange={onViewportChange}
      scrollZoom={false}
    >
      {pins.map(({ latitude, longitude, color, site }, i) => (
        <Marker
          key={`${i}-${latitude}-${longitude}`}
          latitude={latitude}
          longitude={longitude}
        >
          <Tooltip
            title={site}
            open={true}
            arrow
            placement="top-end"
            PopperProps={{
              disablePortal: true
            }}
            classes={{
              popper: classes.popper
            }}
          >
            <svg
              height={SIZE}
              viewBox="0 0 24 24"
              style={{
                cursor: "pointer",
                fill: color,
                stroke: "none",
                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
              }}
            >
              <path d={ICON} />
            </svg>
          </Tooltip>
        </Marker>
      ))}
      <NavigationControl
        showCompass={false}
        style={{
          right: 10,
          top: 10
        }}
      />
    </ReactMapGL>
  );
}

const useStyles = makeStyles(() => ({
  popper: {
    top: "10px !important",
    cursor: "pointer",
    pointerEvents: "unset"
  }
}));

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
