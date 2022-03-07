import { useEffect, useState } from "react";
// import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Grid,
  Grow,
  IconButton,
  makeStyles,
  MenuItem,
  TextField,
  Typography
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import { ContinuousColorLegend } from "react-vis";
import { groupBy } from "lodash";

import { Parameter, ParameterMapping, Data, SiteData } from "types";
import { colorScale, getAverage, getColorFromScale, getRange } from "utils";
import Layout from "components/Layout";
import Map from "components/Dashboard/Map";
import Table from "components/Dashboard/Table";
import AirQualitySection from "components/AirQualitySection";

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

const Dashboard = () => {
  const classes = useStyles();
  const [parameter, setParameter] = useState<Parameter>(Parameter.Chlorophyll);
  const [activeRange, setActiveRange] = useState<ReturnType<typeof getRange>>({
    min: 0,
    max: 0,
    mid: 0
  });

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [tableData, setTableData] = useState<SiteData[]>([]);
  const [mapData, setMapData] = useState<Data | undefined>();

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
    fetch("api/data")
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
        const mapData = getMapData(data);
        setMapData(mapData);
      })
      .finally(() => setIsDataLoading(false));
  }, []);

  return (
    <Layout>
      <Box px={1} py={5}>
        <Container maxWidth="md">
          <AirQualitySection />
          {/* TODO: Refactor: Move to separate component */}
          <Box pb={1}>
            <Grid container spacing={1}>
              <Grid container item xs={12} md={6} alignItems="center">
                <Grid item xs md={6}>
                  <Box pr={0.5}>
                    {!isDataLoading ? (
                      <TextField
                        fullWidth
                        label="Parameter"
                        select
                        size="small"
                        variant="outlined"
                        value={parameter}
                        onChange={handleChangeParameter}
                      >
                        {Object.keys(Parameter).map((key) => (
                          <MenuItem
                            key={Parameter[key as keyof typeof Parameter]}
                            value={Parameter[key as keyof typeof Parameter]}
                          >
                            {key}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      <Skeleton variant="rect" height={40} />
                    )}
                  </Box>
                </Grid>
                <Grid item xs md={6}>
                  {!isDataLoading ? (
                    <Box pl={0.5} className={classes.legend}>
                      <Typography variant="caption">
                        {ParameterMapping[parameter].unit}
                      </Typography>
                      {activeRange.min !== undefined &&
                        activeRange.mid !== undefined &&
                        activeRange.max !== undefined && (
                          <ContinuousColorLegend
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
                  ) : (
                    <Skeleton variant="rect" height={40} />
                  )}
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
                    <Box pr={0.5}>
                      {!isDataLoading ? (
                        <Button
                          startIcon={<DownloadIcon />}
                          size="small"
                          variant="contained"
                          href="/api/download?range=nutrients&filename=nutrients-data.csv"
                          download
                        >
                          Nutrients Data
                        </Button>
                      ) : (
                        <Skeleton variant="rect" height={30} width="130px" />
                      )}
                    </Box>
                    <Box pl={0.5}>
                      {!isDataLoading ? (
                        <Button
                          startIcon={<DownloadIcon />}
                          size="small"
                          variant="contained"
                          href="/api/download?range=probe_surface&filename=probe-data.csv"
                          download
                        >
                          Sensor Data
                        </Button>
                      ) : (
                        <Skeleton variant="rect" height={30} width="130px" />
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  component="div"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {!isDataLoading ? (
                    ParameterMapping[parameter].description
                  ) : (
                    <Skeleton width="100%" />
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {!isDataLoading ? (
                mapData && (
                  <Map
                    pins={Object.values(mapData)
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
                      })}
                  />
                )
              ) : (
                <Skeleton variant="rect" height="500px" />
              )}
            </Grid>
            <Grid item xs={12}>
              {!isDataLoading ? (
                <Table data={tableData} />
              ) : (
                <Skeleton variant="rect" height="500px" />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

const useStyles = makeStyles(() => ({
  legend: {
    "& .rv-gradient": {
      height: 15,
      width: "100%"
    }
  }
}));

export default Dashboard;
