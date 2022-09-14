import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography
} from "@material-ui/core";
import { groupBy } from "lodash";

import { Parameter, ParameterMapping, Data, SiteData } from "types";
import { colorScale, getAverage, getColorFromScale, getRange } from "utils";
import DashboardLayout from "components/DashboardLayout";
import Map from "components/Dashboard/Map";
import Table from "components/Dashboard/Table";
import DownloadDataButtonsSection from "components/DownloadDataButtonsSection";
import WithLoading from "components/WithLoading";
import Translation from "components/Translation";
import Meta from "components/Meta";
import ContinuousColorLegend from "components/ContinuousColorLegend";

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

const WaterQuality = () => {
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
    fetch("../api/data")
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
        const mapData = getMapData(data);
        setMapData(mapData);
      })
      .finally(() => setIsDataLoading(false));
  }, []);

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
                    {Object.keys(Parameter).map((key) => (
                      <MenuItem
                        key={Parameter[key as keyof typeof Parameter]}
                        value={Parameter[key as keyof typeof Parameter]}
                      >
                        <Translation
                          component="span"
                          path={`parameters.language.parameters.${
                            Parameter[key as keyof typeof Parameter]
                          }.name`}
                        />
                      </MenuItem>
                    ))}
                  </TextField>
                </WithLoading>
              </Box>
            </Grid>
            <Grid item xs md={6}>
              <WithLoading variant="rect" height={40} isLoading={isDataLoading}>
                <Box pl={0.5}>
                  <Translation
                    variant="caption"
                    path={`parameters.language.parameters.${parameter}.unit`}
                  />
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
                <DownloadDataButtonsSection isLoading={isDataLoading} />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <WithLoading isLoading={isDataLoading} width="100%">
              <Translation
                variant="caption"
                component="div"
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "10px"
                }}
                path={`parameters.language.parameters.${parameter}.description`}
              />
            </WithLoading>
          </Grid>
          <Grid item xs={12}>
            <WithLoading isLoading={isDataLoading} width="100%">
              <Translation
                variant="caption"
                component="p"
                path="pages.dashboard.language.content.map_caption_secondary"
                style={{
                  fontWeight: "bold"
                }}
              />
            </WithLoading>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <WithLoading isLoading={isDataLoading} variant="rect" height="500px">
            {mapData && (
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
            )}
          </WithLoading>
        </Grid>
        <Grid item xs={12}>
          <WithLoading isLoading={isDataLoading} variant="rect" height="500px">
            <Table data={tableData} />
          </WithLoading>
        </Grid>
      </Grid>
    </>
  );
};

WaterQuality.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default WaterQuality;
