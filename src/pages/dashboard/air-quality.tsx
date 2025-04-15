import { useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import { styled } from "@mui/material/styles";
import { Grid2 } from "@mui/material";
import AeroqualSensor from "aeroqual-sensor.json";
import { Typography } from "@mui/material";
import { getCmsContent } from "util/getCmsContent";
import { multiFetcher } from "utils";
import WithLoading from "components/WithLoading";
import { InferGetStaticPropsType } from "next";
import Meta from "components/Meta";
import DashboardLayout from "components/Dashboard/DashboardLayout";
import Map from "components/Dashboard/Map";
import Legend from "components/Dashboard/Legend";
import { AirQualityPage, pollutantKey } from "types";
import MapMarker from "components/Dashboard/MapMarker";
import {
  filteredSensors,
  groupSensorData,
  transformSensorData
} from "util/sensorDataFormatting";
import useSensorData from "hooks/useSensorData";
import AQLegend from "components/Dashboard/AQLegend";
import AirQualityParameterSection from "components/Dashboard/AirQualityParameterSection";
import AirQualityPlots from "components/Dashboard/AirQualityPlots";
import AirQualityLoadingSkeleton from "components/Dashboard/AirQualityLoadingSkeleton";
import { useAppContext } from "components/AppContext";
import { renderDocument } from "util/contentfulUtils";
import { Document } from "@contentful/rich-text-types";
import { Device } from "lib/aqmd";
import PollroseGenerator from "components/Dashboard/PollroseGenerator";

const NORTH_AEROQUAL_SENSOR_ID = "AQS1 04072024-2724";

const AirQuality = ({
  airQualityPageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // @ts-ignore
  const { language } = useAppContext();
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  //Sensor list with location data for map
  const { data: sensorList = [], error } = useSWR<Device[]>(
    [`../api/aq/devices/aqmd`, `../api/aq/devices/quant`],
    multiFetcher
  );

  const [selectedPollutant, setSelectedPollutant] =
    useState<pollutantKey>("H2S");
  // ====================================================== cms content ===================================================
  const locale = language === "en" ? "en-US" : "es";
  const cmsField = airQualityPageContent?.fields;
  const chartMainCaption = cmsField?.chart_main_caption[locale];
  const buttonText = cmsField?.button_text[locale];
  const endDate = cmsField?.end_date[locale];
  const startDate = cmsField?.start_date[locale];
  const mapCaptionV2 = cmsField?.map_captionV2[locale] as Document | undefined;
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
    //Add aeroqual sensor details to list
    return [...transformedSensorData, ...aeroqualSensor];
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
    //Prepare data for menu list
    return groupSensorData(sensorData);
  }, [sensorData]);

  const northSensor = groupedData?.[NORTH_AEROQUAL_SENSOR_ID];
  const PollroseDataNorthSensor = northSensor?.data ?? null;
  const PollroseNorthSensorName = northSensor?.name ?? "Unknown Sensor";

  const isLoadingMap = !sensorList.length && !error;
  const isLoadingParamAndChart = isValidating || !isFirstRequestComplete;
  const isLoading = isLoadingMap || isLoadingParamAndChart;

  if (error || fetchError) return <Typography>Error Loading data</Typography>;

  return (
    <>
      <Meta title="Dashboard | Salton Sea Environmental Timeseries" />
      <Typography gutterBottom component="h1" variant="h4">
        Air Quality
      </Typography>
      <AQLegend />
      {isLoading ? (
        <AirQualityLoadingSkeleton />
      ) : (
        Object.keys(groupedData).length > 0 && (
          <>
            <AirQualityParameterSection
              normalizedData={groupedData}
              paramAQITitle={paramAQITitle}
              sensorSelectionHelperText={sensorSelectionHelperText}
            />

            <Grid2 container spacing={1} sx={{ mb: 4 }}>
              {/* Chart Grid*/}
              <Grid2 size={{ xs: 12, md: 8 }}>
                <AirQualityPlots
                  normalizedData={groupedData}
                  chartMainCaption={chartMainCaption}
                  parameterListDetailsText={parameterListDetails}
                  locale={locale}
                  paramSelectionHelperText={paramSelectionHelperText}
                  handleFormSubmit={handleFormSubmit}
                  isValidating={isValidating}
                  formError={formError}
                  startDateRef={startDateRef}
                  endDateRef={endDateRef}
                  buttonText={buttonText}
                  startDateText={startDate}
                  endDateText={endDate}
                  modSensorGeneratePlotHelperText={
                    modSensorGeneratePlotHelperText
                  }
                  selectedPollutant={selectedPollutant}
                  onPollutantChange={setSelectedPollutant}
                />
                {/* Pollrose Grid */}
              </Grid2>
              <Grid2
                size={{ xs: 12, md: 4 }}
                display={"flex"}
                justifyContent="center"
              >
                <PollroseGenerator
                  pollroseData={PollroseDataNorthSensor}
                  sensorName={PollroseNorthSensorName}
                  selectedPollutant={selectedPollutant}
                />
              </Grid2>
            </Grid2>
          </>
        )
      )}
      <WithLoading
        isLoading={isLoading}
        variant="rectangular"
        height="500px"
        sx={{ borderRadius: 4 }}
      >
        {sensorList && (
          <Map
            caption={mapCaptionV2 ? renderDocument(mapCaptionV2) : ""}
            purpleAirLink={PurpleAirLink}
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
const PurpleAirLink = styled("span")({
  color: "#3a7ca5",
  cursor: "pointer"
});
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
