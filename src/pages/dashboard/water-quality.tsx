import { useEffect, useMemo, useState } from "react";
import {
  Box,
  MenuItem,
  TextField,
  Typography,
  Tooltip,
  Button
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { groupBy } from "lodash";
import { Marker } from "react-map-gl/mapbox";
import {
  Parameter,
  Data,
  SiteData,
  DashboardPage,
  MenuItemFields
} from "types";
import { colorScale, getAverage, getColorFromScale, getRange } from "utils";
import DashboardLayout from "components/Dashboard/DashboardLayout";
import Map from "components/Dashboard/Map";
import Table from "components/Dashboard/Table";
import DownloadDataButtonsSection from "components/Dashboard/DownloadDataButtonsSection";
import WithLoading from "components/WithLoading";
import Meta from "components/Meta";
import ContinuousColorLegend from "components/ContinuousColorLegend";
import { MapPinIcon } from "../../constants";
import { getCmsContent } from "util/getCmsContent";
import { InferGetStaticPropsType } from "next";
import { useAppContext } from "components/AppContext";
import { filterParameters } from "util/filterParameterFromCms";

const PIN_SIZE = 20;
// TODO: Fix NAN values for [Nitrate, Phosphate, ...etc]
const getMapData = (data: SiteData[]) => {
  const dataBySite = groupBy(data, (item) => item.site.trim().toLowerCase());
  const mapData = Object.keys(dataBySite).reduce((acc, key) => {
    // @ts-ignore
    acc[key] = {
      site: key,
      // From Photometer
      ammonia: getAverage("ammonia", dataBySite[key]),
      nitrate: getAverage("nitrate", dataBySite[key]),
      nitrite: getAverage("nitrite", dataBySite[key]),
      sulphate: getAverage("sulphate", dataBySite[key]),
      sulphide: getAverage("sulphide", dataBySite[key]),
      phosphate: getAverage("phosphate", dataBySite[key]),
      latitude: parseFloat(
        (dataBySite[key].find((d) => (d as any).latitude) as any)?.latitude
      ),
      longitude: parseFloat(
        (dataBySite[key].find((d) => (d as any).longitude) as any)?.longitude
      ),
      salinity: getAverage("salinity", dataBySite[key]),
      water_temperature: getAverage("water_temperature", dataBySite[key]),
      ph: getAverage("ph", dataBySite[key]),
      turbidity: getAverage("turbidity", dataBySite[key]),
      dissolved_oxygen: getAverage("dissolved_oxygen", dataBySite[key]),
      chlorophyll: getAverage("chlorophyll", dataBySite[key]),
      phycoerythrin: getAverage("phycoerythrin", dataBySite[key])
    };
    return acc;
  }, {} as Data);
  return mapData;
};
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
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [tableData, setTableData] = useState<SiteData[]>([]);
  const [mapData, setMapData] = useState<Data | undefined>();

  // ============================ CMS const start ==========================
  const locale = language === "en" ? "en-US" : "es";
  const cmsField = waterPageContent?.fields;
  const mapMainCaption = cmsField?.map_caption_main[locale];
  const mapSecondaryCaption = cmsField?.map_caption_secondary[locale];
  const parameterList = cmsField?.menuList["en-US"].map(({ fields }) => {
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

  const handleChangeParameter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParameter(event.target.value as Parameter);
  };

  // TODO: Refactor: use useSWR
  useEffect(() => {
    setIsDataLoading(true);
    fetch("../api/data")
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
        const mapData = getMapData(data);
        setMapData(mapData);
      })
      .finally(() => setIsDataLoading(false));
  }, []);

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
          <Grid2 container alignItems="center" size={{ xs: 12 }}>
            {/* Param and legend section */}
            <Grid2
              container
              display={"flex"}
              alignItems="center"
              size={{ xs: 12, md: 6 }}
            >
              {/* Parameter dropdown */}
              <Grid2 size={6}>
                <WithLoading
                  variant="rectangular"
                  height={40}
                  isLoading={isDataLoading}
                >
                  <TextField
                    fullWidth
                    label="Parameter"
                    select
                    size="small"
                    variant="outlined"
                    value={parameter}
                    onChange={handleChangeParameter}
                  >
                    {parameterList?.map(({ name, paramKey }) => (
                      <MenuItem
                        key={paramKey["en-US"]}
                        value={paramKey["en-US"]}
                      >
                        {name[locale]}
                      </MenuItem>
                    ))}
                  </TextField>
                </WithLoading>
              </Grid2>
              {/* Parameter Legend */}
              <Grid2 size={6}>
                <WithLoading
                  variant="rectangular"
                  height={40}
                  isLoading={isDataLoading}
                >
                  <Box pl={0.5}>
                    <Typography variant="caption">
                      {parameterFilter && parameterFilter[0].unit["en-US"]}
                    </Typography>
                    {activeRange.min !== undefined &&
                      activeRange.mid !== undefined &&
                      activeRange.max !== undefined && (
                        <ContinuousColorLegend
                          height={15}
                          startColor={colorScale[0]}
                          startTitle={activeRange.min}
                          midColor={
                            colorScale[Math.floor(colorScale.length / 2)]
                          }
                          midTitle={activeRange.mid}
                          endColor={colorScale[colorScale.length - 1]}
                          endTitle={activeRange.max}
                        />
                      )}
                  </Box>
                </WithLoading>
              </Grid2>
            </Grid2>
            {/* Param and legend section end */}
            {/* Download section */}
            <Grid2
              container
              display={"flex"}
              alignItems="center"
              justifyContent={{ md: "flex-end", sm: "flex-start" }}
              size={{ xs: 12, md: 6 }}
            >
              <DownloadDataButtonsSection
                isLoading={isDataLoading}
                nutrientButtonText={downloadNutrientsButtonTxt}
                sensorButtonText={downloadSenorButtonTxt}
                readMeSrc={downloadReadMERef ?? ""}
              />
            </Grid2>
            {/* Download section end */}
          </Grid2>
          {/* Captions 1 & 2 */}
          <Grid2 size={{ xs: 12 }}>
            <WithLoading isLoading={isDataLoading} width="100%">
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
            <WithLoading isLoading={isDataLoading} width="100%">
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
            isLoading={isDataLoading}
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
                {sites.map(
                  ({ latitude = 0, longitude = 0, color, site, value }, i) => {
                    return (
                      latitude &&
                      longitude && (
                        //TODO Refactor
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
                                transform: `translate(${
                                  -PIN_SIZE / 2
                                }px,${-PIN_SIZE}px)`
                              }}
                            >
                              <path d={MapPinIcon} />
                            </svg>
                          </Tooltip>
                        </Marker>
                      )
                    );
                  }
                )}
              </Map>
            )}
          </WithLoading>
        </Grid2>
        <Grid2 size={{ xs: 12 }} sx={{ minHeight: "500px", height: "auto" }}>
          <WithLoading
            isLoading={isDataLoading}
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
const DownloadText = styled(Typography)(({ theme }) => ({
  textDecoration: "none",
  color: "black",
  boxShadow: `inset 0 -4px 0 ${theme.palette.primary.light}`,
  transition: "color 0.2s ease",
  "&:hover": {
    color: theme.palette.secondary.light
  }
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  ...theme.typography.h5,
  textTransform: "none",
  justifyContent: "flex-start",
  padding: 0,
  "&:hover": {
    backgroundColor: "transparent"
  }
}));

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
