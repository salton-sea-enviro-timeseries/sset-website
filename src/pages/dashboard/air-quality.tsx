import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography
} from "@material-ui/core";
import useSWR from "swr";

import AirQualitySection from "components/AirQualitySection";
import WithLoading from "components/WithLoading";
import Translation from "components/Translation";
import Meta from "components/Meta";
import DashboardLayout from "components/DashboardLayout";
import { fetcher } from "utils";
import { COMMUNITY_ID } from "../../constants";
import { Device } from "lib/aqmd";
import Map from "components/Dashboard/Map";

const AirQuality = () => {
  const { data = [], error } = useSWR<Device[]>(`../api/aq/devices`, fetcher);
  const isLoading = !data.length && !error;
  if (error) return <Typography>Error Loading data</Typography>;

  const airQualityDevices = data.map((device) => {
    let status: string = "";
    switch (device.WorkingStatus) {
      case "Not Working":
        status = "red";
        break;
      case "Offline":
        status = "yellow";
        break;
      case "Working":
        status = "blue";
        break;
    }
    return {
      site: device.DeviceId,
      value: device.WorkingStatus,
      latitude: device.Latitude,
      longitude: device.Longitude,
      color: status
    };
  });

  return (
    <>
      <Meta title="Dashboard | Salton Sea Environmental Timeseries" />
      <Typography gutterBottom component="h1" variant="h4">
        Air Quality
      </Typography>
      <AirQualitySection />
      <WithLoading isLoading={isLoading} variant="rect" height="500px">
        {data && (
          <Map
            pins={airQualityDevices}
            caption={false}
            LATITUDE={33.638421}
            LONGITUDE={-116.075339}
            SIZE={20}
            ZOOM={10}
          />
        )}
      </WithLoading>
    </>
  );
};

AirQuality.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default AirQuality;
