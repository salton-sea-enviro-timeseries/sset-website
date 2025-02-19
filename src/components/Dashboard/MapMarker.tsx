import { Marker } from "react-map-gl/mapbox";
import { Tooltip } from "@mui/material";
import { MapPinIcon } from "../../constants";
const PIN_SIZE = 20;

type MapMarker = {
  site: string;
  latitude: number;
  longitude: number;
  color: string;
  i: number;
};

const MapMarker = ({ latitude, longitude, color, site, i }: MapMarker) => {
  return (
    <Marker
      key={`${i}-${latitude}-${longitude}`}
      latitude={latitude}
      longitude={longitude}
    >
      <Tooltip
        title={site}
        open={true}
        arrow
        placement="right-start"
        slotProps={{
          popper: {
            disablePortal: true
          },
          tooltip: {
            sx: {
              fontSize: "11px",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
              whiteSpace: "nowrap",
              display: "flex",
              justifyContent: "center"
            }
          },
          arrow: {
            sx: {
              "&::before": {
                backgroundColor: "rgba(0, 0, 0, 0.8)"
              }
            }
          }
        }}
      >
        <svg
          height={PIN_SIZE}
          viewBox="0 0 24 24"
          style={{
            cursor: "pointer",
            fill: color,
            stroke: "none",
            transform: `translate(${-PIN_SIZE / 2}px,${-PIN_SIZE}px)`
          }}
        >
          <path d={MapPinIcon} />
        </svg>
      </Tooltip>
    </Marker>
  );
};

export default MapMarker;
