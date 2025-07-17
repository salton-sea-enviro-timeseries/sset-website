import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import {
  Parameter,
  Data,
  SiteData,
  DashboardPage,
  MenuItemFields
} from "types";
import { getColorFromScale, getRange, waterQualityDataFetcher } from "utils";
import DashboardLayout from "components/Dashboard/DashboardLayout";
import Map from "components/Dashboard/Map";
import Table from "components/Dashboard/Table";
import WithLoading from "components/WithLoading";
import Meta from "components/Meta";
import { getCmsContent } from "util/getCmsContent";
import { InferGetStaticPropsType } from "next";
import { useAppContext } from "components/AppContext";
import { filterParameters } from "util/filterParameterFromCms";
import { getMapData } from "util/getMapData";
import MapMarkers from "components/Dashboard/MapMarkers";
import {
  DownloadButton,
  DownloadText
} from "components/Shared/StyledDownloadButton";
import ParameterControls from "components/Dashboard/ParameterControls";
import useSWR from "swr";

const WaterQuality = ({
  waterPageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // @ts-ignore
  const { language } = useAppContext();
  const [parameter, setParameter] = useState<Parameter>(Parameter.Chlorophyll);
  const [activeRange, setActiveRange] = useState<ReturnType<typeof getRange>>({
    min: 0,
    max: 0,
    mid: 0
  });

  const [tableData, setTableData] = useState<SiteData[]>([]);
  const [mapData, setMapData] = useState<Data | undefined>();

  // ============================ CMS const start ==========================
  const locale = language === "en" ? "en-US" : "es";
  const cmsField = waterPageContent?.fields;
  const mapMainCaption = cmsField?.map_caption_main[locale];
  const mapSecondaryCaption = cmsField?.map_caption_secondary[locale];
  const parameterList = cmsField?.menuList["en-US"]?.map(({ fields }) => {
    return fields;
  });
  const downloadNutrientsButtonTxt =
    cmsField?.download_nutrients_data_button[locale];
  const downloadSenorButtonTxt = cmsField?.download_sensor_data_button[locale];
  const downloadReadMERef = cmsField?.readMe["en-US"].fields.file["en-US"].url;
  const parameterFilter = useMemo(
    () =>
      filterParameters<MenuItemFields>(parameterList, "paramKey", parameter),
    [parameterList, parameter]
  );
  const parameterDescription =
    parameterFilter &&
    parameterFilter[0].description[locale].content[0].content[0].value;
  //============================= CMS const end ============================
  useEffect(() => {
    if (mapData) {
      setActiveRange(getRange(parameter as keyof SiteData, mapData));
    }
  }, [parameter, mapData]);

  const { data, isLoading, error } = useSWR<SiteData[]>(
    "/api/data",
    waterQualityDataFetcher
  );
  if (error) {
    console.error("Failed to load water data", error);
  }
  useEffect(() => {
    if (data) {
      setTableData(data);
      const transformedMapData = getMapData(data);
      setMapData(transformedMapData);
    }
  }, [data]);

  const sites = useMemo(() => {
    if (!mapData) return [];
    return Object.values(mapData)
      .filter((value) => value[parameter] > 0)
      .map((value) => {
        return {
          site: value.site.toUpperCase(),
          value: value[parameter] as number,
          latitude: value.latitude as number,
          longitude: value.longitude as number,
          color: getColorFromScale(
            value[parameter],
            activeRange.min as number,
            activeRange.max as number
          )
        };
      });
  }, [mapData, parameter, activeRange]);

  return (
    <>
      <Meta title="Water Quality - Dashboard | Salton Sea Environmental Timeseries" />
      <Typography gutterBottom component="h1" variant="h4">
        Water Quality
      </Typography>
      {/* TODO: Refactor: Move to separate component */}
      <Box pb={1}>
        {/* outside wrapper  */}
        <Grid2 container spacing={1}>
          {/* Parameter and download section container*/}

          <ParameterControls
            parameter={parameter}
            setParameter={setParameter}
            activeRange={activeRange}
            isDataLoading={isLoading}
            parameterList={parameterList}
            downloadTexts={{
              nutrients: downloadNutrientsButtonTxt,
              sensor: downloadSenorButtonTxt,
              readMeUrl: downloadReadMERef
            }}
          />
          {/* Captions 1 & 2 */}
          <Grid2 size={{ xs: 12 }}>
            <WithLoading isLoading={isLoading} width="100%">
              <Typography
                variant="caption"
                component="div"
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "10px"
                }}
              >
                {parameterDescription}
              </Typography>
            </WithLoading>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <WithLoading isLoading={isLoading} width="100%">
              <Typography
                variant="caption"
                component="p"
                style={{
                  fontWeight: "bold"
                }}
              >
                {mapSecondaryCaption}
              </Typography>
            </WithLoading>
          </Grid2>
          {/* Caption 1 & 2 end */}
        </Grid2>
      </Box>
      <Grid2 container>
        <Grid2
          size={{ xs: 12 }}
          sx={{
            height: "auto"
          }}
        >
          <WithLoading
            isLoading={isLoading}
            variant="rectangular"
            height="500px"
          >
            {mapData && (
              <Map
                caption={mapMainCaption}
                LATITUDE={33.47634}
                LONGITUDE={-116.03884}
                ZOOM={12}
              >
                <MapMarkers sites={sites} />
              </Map>
            )}
          </WithLoading>
        </Grid2>
        <Grid2 size={{ xs: 12 }} sx={{ minHeight: "500px", height: "auto" }}>
          <WithLoading
            isLoading={isLoading}
            variant="rectangular"
            height="500px"
          >
            <Table data={tableData} />
          </WithLoading>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <a download href="/sset-protocols.pdf">
            <DownloadButton
              variant="text"
              color="inherit"
              disableFocusRipple
              disableRipple
            >
              <DownloadText variant="h5" display="inline">
                Protocol PDF
              </DownloadText>
            </DownloadButton>
          </a>
        </Grid2>
      </Grid2>
    </>
  );
};

export const getStaticProps = async () => {
  let waterPageContent;
  try {
    waterPageContent = await getCmsContent<DashboardPage>("dashboard");
  } catch (error) {
    console.error(
      "Error while fetching water quality dashboard content: ",
      error
    );
  }
  return {
    props: {
      waterPageContent
    }
  };
};
WaterQuality.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default WaterQuality;
