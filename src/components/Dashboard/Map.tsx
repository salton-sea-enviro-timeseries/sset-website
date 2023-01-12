import { Box, Collapse, Link } from "@material-ui/core";
import React, { FC } from "react";
import ReactMapGL, {
  NavigationControl,
  ViewportProps,
  Popup
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import Translation from "components/Translation";

interface MapProps {
  caption: Boolean;
  LATITUDE: number;
  LONGITUDE: number;
  ZOOM: number;
}
interface ToolTipStyleProps {
  width: number;
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
