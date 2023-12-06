import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
  makeStyles,
  Tooltip,
  Button
} from "@material-ui/core";
import { groupBy } from "lodash";
import { Marker } from "react-map-gl";
import { Parameter, Data, SiteData, DashboardPage } from "types";
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

const PIN_SIZE = 20;

const getMapData = (data: SiteData[]) => {
  const dataBySite = groupBy(data, "site");
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
  const classes = useStyles();
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
      parameterList?.filter(({ paramKey, unit }) => {
        if (paramKey["en-US"] === parameter) {
          return unit["en-US"];
        }
      }),
    [parameterList, parameter]
  );
  const parameterDescription =
    parameterFilter &&
    parameterFilter[0].description[locale].content[0].content[0].value;
  // console.log("mapCaptionMain: ", mapMainCaption);
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
        <Grid container spacing={1}>
          <Grid container item xs={12} md={6} alignItems="center">
            <Grid item xs md={6}>
              <Box pr={0.5}>
                <WithLoading
                  variant="rect"
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
              </Box>
            </Grid>
            <Grid item xs md={6}>
              <WithLoading variant="rect" height={40} isLoading={isDataLoading}>
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
                        midColor={colorScale[Math.floor(colorScale.length / 2)]}
                        midTitle={activeRange.mid}
                        endColor={colorScale[colorScale.length - 1]}
                        endTitle={activeRange.max}
                      />
                    )}
                </Box>
              </WithLoading>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={6} alignItems="center">
            <Grid item xs>
              <Box
                display="flex"
                justifyContent={{
                  xs: "space-between",
                  md: "flex-end"
                }}
                alignItems="center"
              >
                <DownloadDataButtonsSection
                  isLoading={isDataLoading}
                  nutrientButtonText={downloadNutrientsButtonTxt}
                  sensorButtonText={downloadSenorButtonTxt}
                  readMeSrc={downloadReadMERef ?? ""}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <WithLoading isLoading={isDataLoading} variant="rect" height="500px">
            {mapData && (
              <Map
                caption={mapMainCaption}
                LATITUDE={33.47634}
                LONGITUDE={-116.03884}
                ZOOM={12}
              >
                {sites.map(({ latitude, longitude, color, site, value }, i) => {
                  return (
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
                        PopperProps={{
                          disablePortal: true
                        }}
                        classes={{
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
                  );
                })}
              </Map>
            )}
          </WithLoading>
        </Grid>
        <Grid item xs={12}>
          <WithLoading isLoading={isDataLoading} variant="rect" height="500px">
            <Table data={tableData} />
          </WithLoading>
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.downloadButton}
            variant="text"
            color="inherit"
            href="/sset-protocols.pdf"
            disableFocusRipple
            disableRipple
            download
          >
            <Typography
              className={classes.downloadText}
              variant="h5"
              display="inline"
            >
              Protocol PDF
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  popper: {
    top: "10px !important",
    cursor: "pointer",
    pointerEvents: "unset"
  },
  downloadText: {
    boxShadow: `inset 0 -4px 0 ${theme.palette.primary.light}`,
    transition: "color 0.2s ease",
    "&:hover": {
      color: theme.palette.secondary.light
    }
  },
  downloadButton: {
    ...theme.typography.h5,
    textTransform: "none",
    justifyContent: "flex-start",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  tooltip: {
    fontSize: 11,
    width: 70,
    display: "flex",
    justifyContent: "center"
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
