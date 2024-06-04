import { useEffect, useMemo, useRef, useState } from "react";
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
import Legend from "components/Dashboard/Legend";
import { AirQualityPage } from "types";
import MapMarker from "components/Dashboard/MapMarker";
import {
  filteredSensors,
  groupSensorData,
  transformPurpleAirSensorData,
  transformSensorData
} from "util/sensorDataFormating";
import useSensorData from "hooks/useSensorData";
import AirQualityDateRangeInput from "components/Dashboard/AirQualityDateRangeInput";
import AQLegend from "components/Dashboard/AQLegend";
import AirQualityParameterSection from "components/Dashboard/AirQualityParameterSection";
import AirQualityPlots from "components/Dashboard/AirQualityPlots";
import AirQualityLoadingSkeleton from "components/Dashboard/AirQualityLoadingSkeleton";
import { useAppContext } from "components/AppContext";

const AirQuality = ({
  airQualityPageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const classes = useStyles();
  // @ts-ignore
  const { language } = useAppContext();
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  //Sensor list with location data for map
  const { data: sensorList = [], error } = useSWR(
    [`../api/aq/devices/aqmd`, `../api/aq/devices/quant`],
    multiFetcher
  );
  // ====================================================== cms content ===================================================
  const locale = language === "en" ? "en-US" : "es";
  const cmsField = airQualityPageContent?.fields;
  const chartMainCaption = cmsField?.chart_main_caption[locale];
  const buttonText = cmsField?.button_text[locale];
  const endDate = cmsField?.end_date[locale];
  const startDate = cmsField?.start_date[locale];
  const mapCaption = cmsField?.map_caption[locale];
  const paramAQITitle = cmsField?.param_aqi_title[locale];
  const parameterListDetails = cmsField?.param_descriptions_list["en-US"].map(
    ({ fields }) => {
      return fields;
    }
  );
  const paramSelectionHelperText = cmsField?.param_selection_text[locale];
  const sensorSelectionHelperText =
    cmsField?.sensor_selection_helper_text[locale];
  const modSensorGeneratePlotHelperText =
    cmsField?.mod_sensor_warning_text[locale];
  // === cms content end ======================================================================================
  const airQualityDevices = useMemo(() => {
    const transformedSensorData = transformSensorData(sensorList);
    // const purpleAirData = transformPurpleAirSensorData(PurpleAirSensorData);
    const aeroqualSensor = AeroqualSensor;
    //Removed purple air sensors for now
    return [...transformedSensorData, aeroqualSensor];
  }, [sensorList]);
  const filterOutPurpleAirSensor = filteredSensors(airQualityDevices);
  //State to track if the first request is complete
  const [isFirstRequestComplete, setIsFirstRequestComplete] = useState(false);
  useEffect(() => {
    setIsFirstRequestComplete(sensorList.length > 0 || error != null);
  }, [sensorList, error]);
  //Individual sensor data including parameter measurements
  const { sensorData, fetchError, isValidating, formError, handleFormSubmit } =
    useSensorData({ filterOutPurpleAirSensor, startDateRef, endDateRef });
  // local storage for grouped data
  useEffect(() => {
    if (sensorData && sensorData.length > 0) {
      sessionStorage.setItem("sensorData", JSON.stringify(sensorData));
    }
  }, [sensorData]);
  //Group sensor data by id
  const groupedData = useMemo(() => {
    return groupSensorData(sensorData);
  }, [sensorData]);
  const isLoadingMap = !sensorList.length && !error;
  const isLoadingParamAndChart = isValidating || !isFirstRequestComplete;
  if (error || fetchError) return <Typography>Error Loading data</Typography>;
  return (
    <>
      <Meta title="Dashboard | Salton Sea Environmental Timeseries" />
      <Typography gutterBottom component="h1" variant="h4">
        Air Quality
      </Typography>
      <AirQualityDateRangeInput
        handleFormSubmit={handleFormSubmit}
        isValidating={isValidating}
        formError={formError}
        startDateRef={startDateRef}
        endDateRef={endDateRef}
        buttonText={buttonText}
        startDateText={startDate}
        endDateText={endDate}
        modSensorGeneratePlotHelperText={modSensorGeneratePlotHelperText}
      />
      <AQLegend />
      {isLoadingParamAndChart ? (
        <AirQualityLoadingSkeleton />
      ) : (
        Object.keys(groupedData).length > 0 && (
          <>
            <AirQualityParameterSection
              normalizedData={groupedData}
              paramAQITitle={paramAQITitle}
              sensorSelectionHelperText={sensorSelectionHelperText}
            />
            <AirQualityPlots
              normalizedData={groupedData}
              chartMainCaption={chartMainCaption}
              parameterListDetailsText={parameterListDetails}
              locale={locale}
              paramSelectionHelperText={paramSelectionHelperText}
            />
          </>
        )
      )}
      <WithLoading isLoading={isLoadingMap} variant="rect" height="500px">
        {sensorList && (
          <Map
            caption={mapCaption}
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
