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

const AirQuality = () => {
  const { data = [], error } = useSWR<Device[]>(`../api/aq/devices`, fetcher);

  return (
    <>
      <Meta title="Dashboard | Salton Sea Environmental Timeseries" />
      <Typography gutterBottom component="h1" variant="h4">
        Air Quality
      </Typography>
      <AirQualitySection />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

AirQuality.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default AirQuality;
