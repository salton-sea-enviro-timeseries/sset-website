import { useMemo } from "react";
import useSWR from "swr";
import PurpleAirSensorData from "purple-air-data.json";
import AeroqualSensor from "aeroqual-sensor.json";
import { Typography, makeStyles } from "@material-ui/core";
import { getCmsContent } from "util/getCmsContent";
import { multiFetcher } from "utils";
import WithLoading from "components/WithLoading";
import { InferGetStaticPropsType } from "next";
import Meta from "components/Meta";
import DashboardLayout from "components/Dashboard/DashboardLayout";
import Map from "components/Dashboard/Map";
import AirQualityGroupDeviceDataLogic from "components/Dashboard/AirQualityGroupDeviceDataLogic";
import Legend from "components/Dashboard/Legend";
import { AirQualityPage } from "types";
import MapMarker from "components/Dashboard/MapMarker";
import {
  filteredSensors,
  transformPurpleAirSensorData,
  transformSensorData
} from "util/sensorDataFormating";

const AirQuality = ({
  airQualityPageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const classes = useStyles();
  const { data = [], error } = useSWR(
    [`../api/aq/devices/aqmd`, `../api/aq/devices/quant`],
    multiFetcher
  );
  // ====================================================== cms content ===================================================

  // === cms content end ======================================================================================
  const airQualityDevices = useMemo(() => {
    const transformedSensorData = transformSensorData(data);
    const purpleAirData = transformPurpleAirSensorData(PurpleAirSensorData);
    const aeroqualSensor = AeroqualSensor;
    return [...transformedSensorData, ...purpleAirData, aeroqualSensor];
  }, [data]);

  const isLoading = !data.length && !error;
  if (error) return <Typography>Error Loading data</Typography>;
  return (
    <>
      <Meta title="Dashboard | Salton Sea Environmental Timeseries" />
      <Typography gutterBottom component="h1" variant="h4">
        Air Quality
      </Typography>
      <AirQualityGroupDeviceDataLogic
        devices={filteredSensors(airQualityDevices)}
      />
      <WithLoading isLoading={isLoading} variant="rect" height="500px">
        {data && (
          //TODO move map caption to its own component
          //Modify caption input for air or water quality
          //TODO import caption text from contentful
          <Map
            caption={undefined}
            purpleAirClass={classes.purpleAirLink}
            LATITUDE={33.638421}
            LONGITUDE={-116.075339}
            ZOOM={10}
          >
            {airQualityDevices.map((marker, i) => (
              <MapMarker {...marker} i={i} key={i} />
            ))}
            <Legend />
          </Map>
        )}
        {/* TODO:Remove below once caption from cms is loaded */}
        {/* <Typography variant="caption">
          This map shows various air quality sensors placed in the communities
          surrounding the Salton Sea. Sensors placed include those from AQMD,
          QUANT-AQ, and Purple Air. Sensor data from Purple Air can be retrieved
          from their site{" "}
          <a
            className={classes.purpleAirLink}
            href="https://map.purpleair.com/1/mAQI/a10/p604800/cC0#12/33.52245/-115.91447"
            target="_blank"
            rel="noreferrer"
          >
            <b>here</b>
          </a>{" "}
        </Typography> */}
      </WithLoading>
    </>
  );
};

const useStyles = makeStyles(() => ({
  purpleAirLink: { color: "#3a7ca5", cursor: "pointer" }
}));

export const getStaticProps = async () => {
  let airQualityPageContent;
  try {
    airQualityPageContent = await getCmsContent<AirQualityPage>("airQuality");
  } catch (error) {
    console.error(
      "Error while fetching water quality dashboard content: ",
      error
    );
  }
  return {
    props: {
      airQualityPageContent
    }
  };
};
AirQuality.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default AirQuality;
