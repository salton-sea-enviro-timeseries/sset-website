import {
  Tooltip,
  makeStyles,
  Box,
  Grow,
  IconButton,
  Typography,
  Slide,
  Collapse,
  Link
} from "@material-ui/core";
import React from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  ViewportProps,
  Popup
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const LATITUDE = 33.47634;
const LONGITUDE = -116.03884;
const SIZE = 20;
const ZOOM = 12;

type Pin = {
  latitude: number;
  longitude: number;
  color: string;
  site: string;
  value: number;
};
interface MapProps {
  pins: Pin[];
}

export default function Map({ pins }: MapProps) {
  const classes = useStyles();
  const [viewport, setViewport] = React.useState<Partial<ViewportProps>>({
    zoom: ZOOM,
    latitude: LATITUDE,
    longitude: LONGITUDE
  });
  const [showMoreInfo, setShowMoreInfo] = React.useState(false);
  const [transitionExited, setTransitionExited] = React.useState(false);
  const [selectedPin, setSelectedPin] = React.useState<Pin | null>(null);

  function onViewportChange(viewport: ViewportProps) {
    const { height, width, ...rest } = viewport;
    setViewport({ ...rest });
  }

  return (
    <>
      <ReactMapGL
        {...viewport}
        width="100%"
        style={{
          minHeight: "470px"
        }}
        height="500px"
        // mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MB_TOKEN}
        onViewportChange={onViewportChange}
        scrollZoom={false}
        reuseMaps
      >
        {pins.map(({ latitude, longitude, color, site, value }, i) => (
          <Marker
            key={`${i}-${latitude}-${longitude}`}
            latitude={latitude}
            longitude={longitude}
          >
            <Tooltip
              title={`${site} ${value.toFixed(2)}`}
              open={true}
              arrow
              placement="top-end"
              PopperProps={{
                disablePortal: true
              }}
              classes={{
                popper: classes.popper,
                tooltip: classes.tooltip
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
                // onClick={() => {
                //   setSelectedPin(pins[i]);
                // }}
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

      <Box pb={3}>
        <Collapse
          in={showMoreInfo}
          collapsedSize={40}
          onExited={() => setTransitionExited(false)}
          onEnter={() => setTransitionExited(true)}
        >
          <Box display="flex" flexDirection="column">
            <Typography
              gutterBottom
              component="p"
              variant="caption"
              noWrap={transitionExited || showMoreInfo ? false : true}
            >
              This map shows how water quality parameters vary spatially in the
              north of the Salton Sea. The location of each of the sites is
              indicated by the position of the colored dots while the color of
              each dot indicates the concentration of each parameter in the
              surface water. Salton Sea 1 (SS1) is the deepest site we measure
              at 6 meters depth and can be generally used as an indicator for
              what&apos;s happening in the interior of the Salton Sea. SS8 and
              SS9 show the variability of each parameter as we approach the
              shore of the Salton Sea. While SS2 through SS7 shows how the
              parameters change as we approach the Whitewater River, a major
              source of agricultural runoff into the Salton Sea. Inflow 1 (IN1)
              and IN2 are two freshwater small agricultural runoff canals that
              run into the Salton Sea. Hundreds of small agricultural canals
              like IN1 and IN2 runoff into the Salton Sea.
            </Typography>
            <Box display="flex" justifyContent="center">
              <Link
                component="button"
                variant="caption"
                onClick={() => setShowMoreInfo(!showMoreInfo)}
              >
                {showMoreInfo ? "Show Less" : "See More"}
              </Link>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}

const useStyles = makeStyles(() => ({
  popper: {
    top: "10px !important",
    cursor: "pointer",
    pointerEvents: "unset"
  },
  tooltip: {
    fontSize: 10,
    maxWidth: "none",
    width: 70
  }
}));

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
