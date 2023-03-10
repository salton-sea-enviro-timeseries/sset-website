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
  ChartData
} from "chart.js";
import { AirQualityDevices, CommonDeviceType } from "types";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { fetcher } from "utils";
import determineSourceOfData from "lib/determineSourceOfData";
import useSWR from "swr";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Box, FormHelperText, makeStyles } from "@material-ui/core";
import { RawDeviceAverageDataResponse } from "lib/aqmd";
import { MODRawDeviceDataResponse } from "lib/quant";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  LineController,
  Title,
  Tooltip,
  Legend,
  SubTitle
);

// TODO export common types
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
const colors = [
  "#2d647d",
  "#000000",
  "#FF69B4",
  "#00FFFF",
  "#FFFF00",
  "#1a1245",
  "#9400D3",
  "#FFD700",
  "#99225f",
  "#800080"
];
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
      // TODO : will need to adjust range based on AQI standard;
      gradient.addColorStop(0, "rgba(203,70,18,100)"); // red
      gradient.addColorStop(0.5, "rgba(233,228,22,.5)"); // yellow
      gradient.addColorStop(1, "rgba(38,195,11,.3)"); //green
      ctx.fillStyle = gradient;
      ctx.fillRect(
        left,
        y.getPixelForValue(bracketHigh),
        width,
        y.getPixelForValue(bracketLow) - y.getPixelForValue(bracketHigh)
      );
      ctx.restore();
    }
    bgColors(0, 300);
  }
};

export const plugins: any = [canvasBackgroundColor];
function paramAQICalc(data: CommonDeviceType[]) {
  return data.map(
    ({ EndDate, timestamp, O3, NO2, PM10, "PM2.5": PM2_5, PM1 }) => {
      return {
        O3: Math.round((O3 / 70) * 100),
        // leaving NO2 as is
        NO2: Math.round(NO2),
        PM10: Math.round((PM10 / 150) * 100),
        PM2_5: Math.round((PM2_5 / 35) * 100),
        PM1,
        x: timestamp ? timestamp : EndDate
      };
    }
  );
}
export const options = (selectedParam: string): ChartOptions<"line"> => {
  return {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false
    },
    layout: {
      padding: {
        bottom: 10
      }
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
        },
        suggestedMin: 0,
        suggestedMax: 300
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

// TODO move functions to utils
async function multiFetcher(...urls: string[]): Promise<DataType> {
  const deviceArrays = await Promise.all(urls.map((url) => fetcher(url)));
  return deviceArrays.flat();
}

function mapNames(id: string) {
  const DeviceNames: { [key: string]: string } = {
    "AQY BD-1071": "AQY1 Indio",
    "AQY BD-1080": "Mecca",
    "AQY BD-1072": "AQY2 Indio",
    "AQY BD-1065": "Fillmore St. and 52nd Ave",
    "AQY BD-1092": "Mission San Jose",
    "AQY BD-1074": "Salton Sea State Park",
    "AQY BD-1094": "Thermal Airport",
    "AQY BD-1063": "Torres Martinez - Headquarters",
    "AQY BD-1152": "Torres Martinez - Near Shore",
    "MOD-PM-00404": "Palm Desert"
  };
  return DeviceNames[id];
}
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
    multiFetcher
  );

  const groupedData = useMemo(() => {
    return sensorData.reduce(
      (sensors: Record<string, DeviceRawData>, curr: CommonDeviceType) => {
        const id = curr.DeviceID || curr.sn || curr.DeviceId;
        if (!sensors[id]) {
          sensors[id] = {
            id,
            name: mapNames(id),
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
  console.log("data", groupedData);
  const handleTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedParam(event.target.value as string);
  };
  const datasets = useMemo(() => {
    return Object.values(groupedData).map(({ data, name }, index) => ({
      label: name,
      data: paramAQICalc(data),
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
          // inputProps={{ "aria-label": "Without label" }}
        >
          {Object.keys(paramAQIStandardMap).map((param, index) => (
            <MenuItem key={`${index}${param}`} value={param}>
              {param}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select Param to Chart</FormHelperText>
      </FormControl>
      <Line
        redraw={true}
        plugins={plugins}
        options={options(selectedParam)}
        data={chartData}
      />
    </>
  );
};

export default AirQualityPlots;

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120
  },
  selectEmpty: {}
}));
