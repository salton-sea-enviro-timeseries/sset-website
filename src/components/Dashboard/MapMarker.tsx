import { Marker } from "react-map-gl";
import { Tooltip, makeStyles } from "@material-ui/core";
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
  const classes = useStyles();
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
        PopperProps={{
          disablePortal: true
        }}
        classes={{
          arrow: classes.arrow,
          popper: classes.popper,
          tooltip: classes.tooltip
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
          // onClick={() => {
          //   setSelectedPin(pins[i]);
          // }}
        >
          <path d={MapPinIcon} />
        </svg>
      </Tooltip>
    </Marker>
  );
};
export default MapMarker;

const useStyles = makeStyles(() => ({
  arrow: {
    "&::before": {
      backgroundColor: "rgba(0, 0, 0, 0.8)"
    }
  },
  popper: {
    left: "-10px !important",
    cursor: "pointer",
    pointerEvents: "unset"
  },
  tooltip: {
    fontSize: 11,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    whiteSpace: "nowrap",
    display: "flex",
    justifyContent: "center"
  }
}));
