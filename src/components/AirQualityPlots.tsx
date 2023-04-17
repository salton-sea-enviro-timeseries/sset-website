import React, { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  SubTitle,
  TimeScale,
  LineController,
  ChartOptions,
  LegendItem,
  ChartData,
  Filler
} from "chart.js";
import {
  AirQualityDevices,
  AirQualityParameter,
  CommonDeviceType
} from "types";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import determineSourceOfData from "lib/determineSourceOfData";
import useSWR from "swr";
import {
  FormControl,
  Select,
  MenuItem,
  makeStyles,
  FormHelperText,
  Box,
  Typography,
  Link
} from "@material-ui/core";
import LoadingChart from "./LoadingChart";
import { calcParamAQI } from "util/calcParamAQI";
import { fetchMultipleDeviceDetails } from "util/fetchMultipleDeviceDetails";
import { mapDeviceNames } from "util/mapDeviceNames";
import { filterHourlyData } from "../util/filterHourlyData";
import { AirQualityParameterMapping } from "types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  LineController,
  Filler,
  Title,
  Tooltip,
  Legend,
  SubTitle
);

type DeviceRawData = {
  id: string;
  name: string;
  data: CommonDeviceType[];
};
type DataType = CommonDeviceType[];
type ParamAQIStandardMap = {
  O3: number;
  PM2_5: number;
  PM10: number;
  NO2: number;
  PM1: null;
};
const paramAQIStandardMap: ParamAQIStandardMap = {
  O3: 70,
  PM2_5: 35,
  PM10: 150,
  NO2: 100,
  PM1: null
};
type DataItem = {
  x: number;
  PM2_5?: number;
  PM10?: number;
  NO2?: number;
  O3?: number;
};

// ==============================================================
//Todo refactor to export?
const colors = [
  "#2d647d",
  "#000000",
  "#FF69B4",
  "#00FFFF",
  "#00d5ff",
  "#1a1245",
  "#9400D3",
  "#00ff48",
  "#e62020",
  "#800080"
];
// gradient background color for chart
const canvasBackgroundColor = {
  id: "canvasBackgroundColor",
  beforeDraw(
    chart: {
      ctx: any;
      chartArea: {
        top: number;
        bottom: number;
        left: number;
        right: number;
        width: number;
      };
      scales: { x: any; y: any };
    },
    args: any,
    pluginOptions: any
  ) {
    const {
      ctx,
      chartArea: { top, bottom, left, right, width },
      scales: { x, y }
    } = chart;
    function bgColors(bracketLow: number, bracketHigh: number) {
      let gradient = ctx.createLinearGradient(0, top, 0, bottom);
      // Percentage of color from ending point (bottom)
      if (bracketHigh < 50) {
        gradient.addColorStop(1, "rgba(38,195,11,.3)"); //green
      } else if (bracketHigh < 105) {
        gradient.addColorStop(0.5, "rgba(233,228,22,0.5)"); // yellow
        gradient.addColorStop(1, "rgba(38,195,11,0.3)"); //green
      } else if (bracketHigh > 105 && bracketHigh < 155) {
        gradient.addColorStop(0, "rgba(245,	124,	0)"); // orange
        gradient.addColorStop(0.5, "rgba(233,228,22,0.5)"); // yellow
        gradient.addColorStop(1, "rgba(38,195,11,0.3)"); //green
      } else if (bracketHigh > 155 && bracketHigh < 255) {
        gradient.addColorStop(0, "rgba(136,14,79,.95)"); // Hazard
        gradient.addColorStop(0.25, "rgba(197,57,41,0.7)"); // red
        gradient.addColorStop(0.5, "rgba(245,	124,	0.3)"); // orange
        gradient.addColorStop(0.75, "rgba(233,228,22,0.3)"); // yellow
        gradient.addColorStop(1, "rgba(38,195,11,0.3)"); //green
      } else {
        gradient.addColorStop(0, "rgba(136,	14,	79, 0.95)"); //Hazard
        gradient.addColorStop(0.25, "rgba(136,14,79,0.7)"); // Very unhealthy
        gradient.addColorStop(0.5, "rgba(197,57,41,0.3)"); // red
        gradient.addColorStop(0.7, "rgba(245,	124,0.3)"); // orange
        gradient.addColorStop(0.8, "rgba(233,228,22,0.3)"); // yellow
        gradient.addColorStop(1, "rgba(38,195,11,0.3)"); //green
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(
        left,
        y.getPixelForValue(bracketHigh),
        width,
        y.getPixelForValue(bracketLow) - y.getPixelForValue(bracketHigh)
      );
      ctx.restore();
    }
    if (y.max < 3) {
      bgColors(0, y.max + 0.1);
    } else {
      bgColors(0, y.max + 1);
    }
  }
};
const plugins: any = [canvasBackgroundColor];
// all chart options and selected param as y axis
const options = (selectedParam: string): ChartOptions<"line"> => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false
    },
    plugins: {
      title: {
        display: true,
        text: selectedParam,
        font: {
          size: 16
        }
      },
      legend: {
        position: "bottom" as const,
        labels: {
          filter: (legendItem: LegendItem, chartData: ChartData<"line">) => {
            const datasetIndex = legendItem.datasetIndex;
            const datasetData =
              typeof datasetIndex !== "undefined"
                ? chartData.datasets[datasetIndex].data
                : [];
            const isDefined = datasetData.some((data) => {
              const item = data as DataItem;
              return item[selectedParam as keyof DataItem] !== undefined;
            });
            return isDefined;
          }
        }
      },
      subtitle: {
        display: true,
        text: "One Hour Average",
        padding: {
          bottom: 8
        }
      }
    },
    parsing: {
      xAxisKey: "x",
      yAxisKey: selectedParam
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "AQI Value",
          font: {
            size: 16
          }
        },
        type: "linear" as const,
        display: true,
        position: "left" as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false
        }
      },
      x: {
        type: "time" as any,
        time: {
          unit: "day"
        },

        ticks: {
          minRotation: 0,
          maxRotation: 0
        },
        beginAtZero: false,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };
};
const AirQualityPlots = ({ devices }: { devices: AirQualityDevices[] }) => {
  const classes = useStyles();
  const [selectedParam, setSelectedParam] = useState("O3");
  const sensorUrls = devices.map(({ sensorId }) => {
    const sensorInfoArray = sensorId.split(":");
    const sensorIdList = determineSourceOfData(sensorInfoArray[0]);
    return sensorIdList;
  });
  const { data: sensorData = [], error } = useSWR<DataType>(
    sensorUrls,
    fetchMultipleDeviceDetails
  );
  const handleTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedParam(event.target.value as string);
  };
  // group all data based on sensor ID
  const groupedData = useMemo(() => {
    return sensorData.reduce(
      (sensors: Record<string, DeviceRawData>, curr: CommonDeviceType) => {
        const id = curr.DeviceID || curr.sn || curr.DeviceId;
        if (!sensors[id]) {
          sensors[id] = {
            id,
            name: mapDeviceNames(id),
            data: [{ ...curr }]
          };
        } else {
          sensors[id].data.push({ ...curr });
        }
        return sensors;
      },
      {}
    );
  }, [sensorData]);
  // dataset used for line chart
  const datasets = useMemo(() => {
    return Object.values(groupedData).map(({ data, name, id }, index) => ({
      label: name,
      data:
        id === "MOD-PM-00404"
          ? calcParamAQI(filterHourlyData(data))
          : calcParamAQI(data),
      borderColor: colors[index],
      fill: false,
      lineTension: 0.1,
      backgroundColor: `${colors[index]}3F`,
      borderCapStyle: "butt" as const,
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter" as const,
      pointBorderColor: colors[index],
      pointBackgroundColor: "#fff" as const,
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "blue" as const,
      pointHoverBorderColor: "#fff" as const,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      yAxisID: "y" as const
    }));
  }, [groupedData]);

  const isLoading = !Object.keys(sensorData).length && !error;
  // dataset as an object for chart prop
  const chartData = {
    datasets
  };
  return (
    <>
      <FormControl className={classes.formControl}>
        <Select
          value={selectedParam}
          onChange={handleTitleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          {Object.keys(paramAQIStandardMap).map((param, index) => (
            <MenuItem key={`${index}${param}`} value={param}>
              {param}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select Param to Chart</FormHelperText>
      </FormControl>
      {isLoading ? (
        <LoadingChart />
      ) : (
        // Todo change min height depending on y-max
        <Box minHeight={350} m="2 2 0 2">
          <Line
            key={selectedParam}
            plugins={plugins}
            options={options(selectedParam)}
            data={chartData}
          />
        </Box>
      )}
      <Box marginBottom={1}>
        <Typography
          variant="body2"
          align="center"
          style={{
            fontSize: "14px",
            marginTop: "-10px",
            fontWeight: "lighter"
          }}
        >
          EPA establishes an AQI for five major air pollutants regulated by the
          Clean Air Act. Each of these pollutants has a national air quality
          standard set by EPA to protect public health.{" "}
          <Link
            className={classes.airPollutant}
            href={
              AirQualityParameterMapping[selectedParam as AirQualityParameter]
                .href
            }
            target="_blank"
            rel="noopener"
          >
            <b>{selectedParam}:</b>
          </Link>{" "}
          {
            AirQualityParameterMapping[selectedParam as AirQualityParameter]
              .description
          }
        </Typography>
      </Box>
    </>
  );
};
export default AirQualityPlots;
const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120
  },
  airPollutant: { color: "#3a7ca5", cursor: "pointer" },
  selectEmpty: {}
}));
