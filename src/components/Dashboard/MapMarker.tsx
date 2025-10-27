import { Marker } from "react-map-gl/mapbox";
import { Tooltip } from "@mui/material";
import { MapPinIcon } from "../../constants";
import { useMemo, useState } from "react";
const PIN_SIZE = 20;

type MapMarker = {
  id: string | number;
  site: string;
  latitude: number;
  longitude: number;
  color: string;
  i: number;
  activeId: string | number | null;
  setActiveId: (id: string | number | null) => void;
};

const MapMarker = ({
  id,
  latitude,
  longitude,
  color,
  site,
  i,
  activeId,
  setActiveId
}: MapMarker) => {
  // TODO: Update mapmarker so that on click it navigates to correct legend sensor id
  // const markerId = id ?? site;
  const isActive = activeId === id;
  // const [open, setOpen] = useState(false);
  const floatStyle = useMemo<React.CSSProperties>(
    () => ({
      cursor: "pointer",
      fill: color,
      stroke: "none",
      transform: `translate(${-PIN_SIZE / 2}px,${
        -PIN_SIZE + (isActive ? -6 : 0)
      }px)`,
      transition: "transform 160ms ease-out"
    }),
    [color, isActive]
  );
  return (
    <Marker
      key={`${i}-${latitude}-${longitude}`}
      latitude={latitude}
      longitude={longitude}
    >
      <Tooltip
        title={site}
        open={isActive}
        arrow
        placement="right-start"
        slotProps={{
          popper: {
            // disablePortal: true,
            sx: { zIndex: 2000 },
            modifiers: [
              { name: "offset", options: { offset: [8, 0] } },
              {
                name: "preventOverflow",
                options: { boundary: "viewport", padding: 8 }
              },
              {
                name: "flip",
                options: { fallbackPlacements: ["left", "top", "bottom"] }
              }
            ]
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
          onMouseEnter={() => setActiveId(id)}
          onMouseLeave={() => setActiveId(null)}
          onClick={() => setActiveId(isActive ? null : id)} // nice for touch
          // style={floatStyle}
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
