import { Marker } from "react-map-gl/mapbox";
import { Tooltip } from "@mui/material";
import { MapPinIcon } from "../../constants";

interface MapMArkersProps {
  sites: {
    latitude: number;
    longitude: number;
    color: string;
    site: string;
    value: string | number;
  }[];
}
const PIN_SIZE = 20;
const MapMarkers = ({ sites }: MapMArkersProps) => (
  <>
    {sites.map(({ latitude = 0, longitude = 0, color, site, value }, i) => {
      return (
        latitude &&
        longitude && (
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
              slotProps={{
                popper: {
                  sx: {
                    top: "10px !important",
                    cursor: "pointer",
                    pointerEvents: "unset"
                  },
                  disablePortal: true
                },
                tooltip: {
                  sx: {
                    fontSize: 11,
                    padding: 0,
                    width: 60,
                    display: "flex",
                    justifyContent: "center",

                    backgroundColor: "rgba(66, 66, 66, 0.9)",
                    color: "#fff"
                  }
                },
                arrow: {
                  sx: {
                    color: "rgba(66, 66, 66, 0.9)"
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
        )
      );
    })}
  </>
);

export default MapMarkers;
