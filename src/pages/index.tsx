import { useEffect, useState } from "react";
import type { InferGetStaticPropsType } from "next";
// import Head from "next/head";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  MenuItem,
  TextField
} from "@material-ui/core";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import { ContinuousColorLegend } from "react-vis";
import { groupBy } from "lodash";
import Layout from "components/Layout";
import Map from "components/Dashboard/Map";
import Table from "components/Dashboard/Table";
import {
  RawNutrientsData,
  RawPhotometerData,
  Parameter,
  Data,
  SiteData
} from "types";
import { colorScale, getAverage, getColorFromScale, getRange } from "utils";

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const classes = useStyles();
  const [parameter, setParameter] = useState<Parameter>(Parameter.Chlorophyll);
  const [activeRange, setActiveRange] = useState<ReturnType<typeof getRange>>(
    getRange(Parameter.Chlorophyll as keyof SiteData, data)
  );

  useEffect(() => {
    setActiveRange(getRange(parameter as keyof SiteData, data));
  }, [parameter]);

  const handleChangeParameter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParameter(event.target.value as Parameter);
  };

  return (
    <Layout>
      <Box px={1}>
        <Box pb={1}>
          <Grid container spacing={1}>
            <Grid container item xs={12} md={6} spacing={1}>
              <Grid item xs md={6}>
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
              </Grid>
              <Grid item xs md={6}>
                <Box className={classes.legend}>
                  {activeRange.min !== undefined &&
                    activeRange.mid !== undefined &&
                    activeRange.max !== undefined && (
                      <ContinuousColorLegend
                        startColor={colorScale[0]}
                        startTitle={activeRange.min}
                        midColor={colorScale[1]}
                        midTitle={activeRange.mid}
                        endColor={colorScale[2]}
                        endTitle={activeRange.max}
                      />
                    )}
                </Box>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={6}>
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
                    <Button
                      startIcon={<DownloadIcon />}
                      size="small"
                      variant="contained"
                      href="/data/photometer.csv"
                      download
                    >
                      Sensor Data
                    </Button>
                  </Box>
                  <Box pl={0.5}>
                    <Button
                      startIcon={<DownloadIcon />}
                      size="small"
                      variant="contained"
                      href="/data/nutrients.csv"
                      download
                    >
                      Nutrients Data
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs md={6}>
            <Map
              pins={Object.values(data).map((value) => {
                return {
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
          </Grid>
          <Grid item xs md={6}>
            <Table data={data} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const csv = require("csvtojson/v2");
  const path = require("path");

  /**
   * convert csv data from file to json
   */
  const photometerData: RawPhotometerData[] = await csv().fromFile(
    path.join(path.resolve(process.cwd()), "public/data/photometer.csv")
  );
  const nutrientsData: RawNutrientsData[] = await csv().fromFile(
    path.join(path.resolve(process.cwd()), "public/data/nutrients.csv")
  );

  /**
   * rename "Sample ID" property from photometer data to "site"
   * to match on nutrients data "site".
   */
  const mappedPhotometerData = photometerData.map((o) => {
    const item = {
      ...o,
      site: o["Sample ID"]
    };
    delete item["Sample ID"];
    return item;
  });

  /**
   * Merge both data sets and group by "site"
   */
  const mergedData: {
    [key: string]: (RawNutrientsData | RawPhotometerData)[];
  } = groupBy([...mappedPhotometerData, ...nutrientsData], "site");

  /**
   * Sanitize data by converting numeric values to float
   * Calculate mean values for each parameter
   */
  const data = Object.keys(mergedData).reduce((acc, key) => {
    acc[key] = {
      site: key,
      // From Photometer
      ammonia: getAverage("Ammonia", mergedData[key]),
      nitrate: getAverage("Nitrate", mergedData[key]),
      nitrite: getAverage("Nitrite", mergedData[key]),
      sulphate: getAverage("Sulphate", mergedData[key]),
      sulphide: getAverage("Sulphide", mergedData[key]),
      phosphate_hr: getAverage("Phosphate HR", mergedData[key]),
      phosphate_lr: getAverage("Phosphate LR", mergedData[key]),
      // From Nutrients
      latitude: parseFloat(
        (
          mergedData[key].find(
            (d) => (d as RawNutrientsData).Latitude
          ) as RawNutrientsData
        )?.Latitude
      ),
      longitude: parseFloat(
        (
          mergedData[key].find(
            (d) => (d as RawNutrientsData).Longitude
          ) as RawNutrientsData
        )?.Longitude
      ),
      salinity: getAverage("sal", mergedData[key]),
      water_temperature: getAverage("temp", mergedData[key]),
      ph: getAverage("pH", mergedData[key]),
      turbidity: getAverage("turbidity", mergedData[key]),
      dissolved_oxygen: getAverage("ODO_mgl", mergedData[key]),
      chlorophyll: getAverage("Chl", mergedData[key]),
      phycoerythrin: getAverage("pe", mergedData[key])
    };
    return acc;
  }, {} as Data);

  return {
    props: {
      data
    }
  };
};

const useStyles = makeStyles(() => ({
  legend: {
    "& .rv-gradient": {
      height: 15,
      width: "100%"
    }
  }
}));

export default Home;
