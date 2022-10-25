import { Tooltip, makeStyles, Box, Collapse, Link } from "@material-ui/core";
import React from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  ViewportProps,
  Popup
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import Translation from "components/Translation";
import WaterQuality from "pages/dashboard/water-quality";
import { Theme } from "@material-ui/core";
type Pin = {
  latitude: number;
  longitude: number;
  color: string;
  site: string;
  value: number | string;
};

interface MapProps {
  pins: Pin[];
  caption: Boolean;
  LATITUDE: number;
  LONGITUDE: number;
  SIZE: number;
  ZOOM: number;
  airQualityTooltip?: Boolean;
}
interface ToolTipStyleProps {
  width: number;
}
export default function Map({
  pins,
  caption,
  LATITUDE,
  LONGITUDE,
  SIZE,
  ZOOM,
  airQualityTooltip
}: MapProps) {
  const toolTipWidth = {
    width: airQualityTooltip ? 140 : 70
  };
  const classes = useStyles(toolTipWidth);
  const [viewport, setViewport] = React.useState<Partial<ViewportProps>>({
    zoom: ZOOM,
    latitude: LATITUDE,
    longitude: LONGITUDE
  });
  const [showMoreInfo, setShowMoreInfo] = React.useState(false);
  const [transitionExited, setTransitionExited] = React.useState(false);

  function onViewportChange(viewport: ViewportProps) {
    const { height, width, ...rest } = viewport;
    setViewport({ ...rest });
  }
  const mapCaption = (
    <Box pb={3}>
      <Collapse
        in={showMoreInfo}
        collapsedSize={40}
        onExited={() => setTransitionExited(false)}
        onEnter={() => setTransitionExited(true)}
      >
        <Box display="flex" flexDirection="column">
          <Translation
            gutterBottom
            component="div"
            variant="caption"
            noWrap={transitionExited || showMoreInfo ? false : true}
            path="pages.dashboard.language.content.map_caption_main"
          />

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
        {pins.map(({ latitude, longitude, color, site, value }, i) => (
          <Marker
            key={`${i}-${latitude}-${longitude}`}
            latitude={latitude}
            longitude={longitude}
          >
            <Tooltip
              title={
                <>
                  <b>{site}</b>
                  &nbsp;
                  {typeof value === "string"
                    ? `: ${value}`
                    : value.toPrecision(3)}
                </>
              }
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

      {/* TODO: Move this separate component */}
      {caption && mapCaption}
    </>
  );
}

const useStyles = makeStyles<Theme, ToolTipStyleProps>(() => ({
  popper: {
    top: "10px !important",
    cursor: "pointer",
    pointerEvents: "unset"
  },
  tooltip: {
    fontSize: 11,
    minWidth: 70,
    maxWidth: 150,
    width: ({ width }) => width
  }
}));

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
