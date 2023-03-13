import { useMemo } from "react";
import { Typography, Tooltip, makeStyles } from "@material-ui/core";
import useSWR from "swr";
import { Marker } from "react-map-gl";
import AirQualitySection from "components/AirQualitySection";
import WithLoading from "components/WithLoading";
import Meta from "components/Meta";
import DashboardLayout from "components/DashboardLayout";
import { fetcher } from "utils";
import { MapPinIcon } from "../../constants";
import Map from "components/Dashboard/Map";
import { Device } from "lib/aqmd";
import AirQualityPlots from "components/AirQualityPlots";

const PIN_SIZE = 20;
async function multiFetcher(...urls: string[]) {
  const promises: string | Device[] = [];
  const deviceArrays = await Promise.all(urls.map((url) => fetcher(url)));
  return promises.concat(...deviceArrays);
}
const AirQuality = () => {
  const classes = useStyles();
  const { data = [], error } = useSWR(
    [`../api/aq/devices/aqmd`, `../api/aq/devices/quant`],
    multiFetcher
  );

  const airQualityDevices = useMemo(() => {
    return data.map((device) => {
      let status: string = "";
      const DeviceNames: { [key: string]: string | null | undefined } = {
        "AQY BD-1071": "Indio",
        "AQY BD-1080": "Mecca",
        "AQY BD-1072": "Indio",
        "AQY BD-1065": null,
        "AQY BD-1092": "Mission San Jose",
        "AQY BD-1074": null,
        "AQY BD-1094": null,
        "AQY BD-1063": null,
        "AQY BD-1152": null,
        "MOD-PM-00404": "Palm Desert"
      };
      const name = DeviceNames[device.DeviceId] ?? device.DeviceTitle;
      switch (device.WorkingStatus) {
        case "Not Working":
          status = "🔴";
          break;
        case "Offline":
          status = "⭕";
          break;
        case "Working":
          status = "🟢";
          break;
        case "Working-Quant":
          status = "🟩";
          break;
        case "Not Working-Quant":
          status = "🟥";
      }
      return {
        site: `${status} ${name}`,
        value: device.WorkingStatus,
        latitude: device.Latitude,
        longitude: device.Longitude,
        sensorId: `${device.DeviceId}: ${name}`,
        location: name,
        color: "#040273"
      };
    });
  }, [data]);

  const isLoading = !data.length && !error;
  if (error) return <Typography>Error Loading data</Typography>;
  return (
    <>
      <Meta title="Dashboard | Salton Sea Environmental Timeseries" />
      <Typography gutterBottom component="h1" variant="h4">
        Air Quality
      </Typography>
      <AirQualitySection devices={airQualityDevices} />
      <AirQualityPlots devices={airQualityDevices} />
      <WithLoading isLoading={isLoading} variant="rect" height="500px">
        {data && (
          <Map
            caption={false}
            LATITUDE={33.638421}
            LONGITUDE={-116.075339}
            ZOOM={10}
          >
            {airQualityDevices.map(
              ({ latitude, longitude, color, site }, i) => (
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
                        transform: `translate(${
                          -PIN_SIZE / 2
                        }px,${-PIN_SIZE}px)`
                      }}
                      // onClick={() => {
                      //   setSelectedPin(pins[i]);
                      // }}
                    >
                      <path d={MapPinIcon} />
                    </svg>
                  </Tooltip>
                </Marker>
              )
            )}
          </Map>
        )}
      </WithLoading>
    </>
  );
};

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
    width: 200,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center"
  }
}));

AirQuality.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default AirQuality;
