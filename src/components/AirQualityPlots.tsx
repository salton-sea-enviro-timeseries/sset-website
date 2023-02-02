import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  SubTitle
} from "chart.js";
import { Line, Chart } from "react-chartjs-2";
import { Device } from "lib/aqmd";
import { fetcher } from "utils";
import { promises } from "stream";
import determineSourceOfData from "lib/determineSourceOfData";
import useSWR from "swr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  SubTitle
);

// TODO export common types
type airQualityDevices = {
  site: string;
  value: string;
  latitude: number;
  longitude: number;
  sensorId: string;
  location: string;
  color: string;
};
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
    // console.log(chart);
    const {
      ctx,
      chartArea: { top, bottom, left, right, width },
      scales: { x, y }
    } = chart;

    // ctx.fillRect(left,top,width,height)
    function bgColors(bracketLow: number, bracketHigh: number, color: string) {
      ctx.fillStyle = color;
      ctx.fillRect(
        left,
        y.getPixelForValue(bracketHigh),
        width,
        y.getPixelForValue(bracketLow) - y.getPixelForValue(bracketHigh)
      );
      ctx.restore();
    }

    bgColors(60, 90, "rgba(255,26,104,0.2)");
    bgColors(30, 60, "rgba(255,206,86,0.2)");
    bgColors(0, 30, "rgba(75,192,192,0.2)");
  }
};

export const plugins: any = [canvasBackgroundColor];

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Param Goes Here" as const,
      font: {
        size: 16
      }
    },
    legend: {
      position: "bottom" as const
    },
    subtitle: {
      display: true,
      text: "One Hour Average",
      padding: {
        bottom: 8
      }
    }
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
      beginAtZero: false,
      grid: {
        drawOnChartArea: false
      }
    }
  }
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];
const sensorData = [
  {
    id: "sensorid1",
    param1: 23,
    param2: 56,
    param3: 66,
    timestamp: "date",
    date: "June 12 2020"
  },
  {
    id: "sensorid1",
    param1: 26,
    param2: 28,
    param3: 11,
    timestamp: "date",
    date: "June 12 2020"
  },
  {
    id: "sensorid2",
    param1: 12,
    param2: 78,
    param3: 78,
    timestamp: "date",
    date: "July 3 2020"
  },
  {
    id: "sensorid2",
    param1: 10,
    param2: 7,
    param3: 79,
    timestamp: "date",
    date: "July 3 2020"
  },
  {
    id: "sensorid3",
    param1: 45,
    param2: 23,
    param3: 98,
    timestamp: "date",
    date: "August 10 2020"
  },
  {
    id: "sensorid3",
    param1: 48,
    param2: 52,
    param3: 78,
    timestamp: "date",
    date: "August 10 2020"
  },
  {
    id: "sensorid4",
    param1: 67,
    param2: 90,
    param3: 54,
    timestamp: "date",
    date: "September 27 2020"
  },
  {
    id: "sensorid4",
    param1: 32,
    param2: 67,
    param3: 66,
    timestamp: "date",
    date: "September 27 2020"
  }
];
const groupedData = sensorData.reduce((acc, curr) => {
  const { id } = curr;
  console.log("acc", acc);
  if (!acc[id]) {
    acc[id] = {
      id,
      data: [curr]
    };
  } else {
    acc[id].data.push(curr);
  }
  return acc;
}, {});
const generateRandomColor = (index) =>
  `rgb(${(index + 1) * 25}, ${(index + 1) * 50}, ${(index + 1) * 100})`;
//@ts-ignore
const datasets = Object.values(groupedData).map(({ id, data }, index) => ({
  label: id,
  data: data.map((d: { param1: any }) => d.param1),
  borderColor: generateRandomColor(index),
  fill: false,
  lineTension: 0.1,
  backgroundColor: `rgb(${(index + 1) * 25}, ${(index + 1) * 50}, ${
    (index + 1) * 100
  })`,
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter" as const,
  pointBorderColor: generateRandomColor(index),
  pointBackgroundColor: "#fff" as const,
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: generateRandomColor(index),
  pointHoverBorderColor: generateRandomColor(index),
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  yAxisID: "y" as const
}));
console.log("datasets from chatgpt", datasets);
const dataTest = {
  labels: labels,
  datasets
};

// const dataTest = {
//   labels: labels,
//   datasets: [
//     {
//       label: "Sensor1" as const,
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: "rgba(75,192,192,0.4)" as const,
//       borderColor: "rgba(75,192,192,1)" as const,
//       borderCapStyle: "butt" as const,
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: "miter" as const,
//       pointBorderColor: "rgba(75,192,192,1)" as const,
//       pointBackgroundColor: "#fff" as const,
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: "rgba(75,192,192,1)" as const,
//       pointHoverBorderColor: "rgba(220,220,220,1)" as const,
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [65, 59, 80, 81, 56, 55, 40],
//       yAxisID: "y" as const
//     },
//     {
//       label: "Sensor2" as const,
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: "rgba(53, 162, 235, 0.5)" as const,
//       borderColor: "rgb(53, 162, 235)" as const,
//       borderCapStyle: "butt" as const,
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: "miter" as const,
//       pointBorderColor: "rgba(75,192,192,1)" as const,
//       pointBackgroundColor: "#fff" as const,
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: "rgb(53, 162, 235)" as const,
//       pointHoverBorderColor: "rgba(220,220,220,1)" as const,
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [35, 47, 76, 81, 90, 23, 40],
//       yAxisID: "y" as const
//     }
//   ]
// };
// TODO move function to utils
async function multiFetcher(...urls: string[]) {
  const promises: string | Device[] = [];
  const deviceArrays = await Promise.all(urls.map((url) => fetcher(url)));
  return promises.concat(...deviceArrays);
}

const AirQualityPlots = ({ devices }: { devices: airQualityDevices[] }) => {
  const chartRef = useRef<{ chartInstance: Chart }>(null);

  //   console.log("devices in plots", devices);
  // need an array of sensor id's
  const sensorUrls = devices.map(({ sensorId, value }) => {
    const sensorInfoArray = sensorId.split(":");
    const sensorIdList = determineSourceOfData(sensorInfoArray[0]);
    return sensorIdList;
  });
  //send sensor ID's to determine source then fetch using multi-fetch
  //   console.log("list of sensor Ids: ", sensorUrls);
  //   TODO fix quant device data, its only returning 1 entry.
  // const { data = [], error } = useSWR(
  //   ["../api/aq/devices/aqmd/AQY%BD-1092"],
  //   multiFetcher
  // );
  // useEffect(() => {
  //   if (chartRef.current && data) {
  //     chartRef.current.chartInstance.update();
  //   }
  // }, [data]);
  // console.log("data for all sensors", data);
  // =====================using dummy data =========================
  // @ts-ignore

  console.count("renders: ");
  return <Line plugins={plugins} options={options} data={dataTest} />;
};

export default AirQualityPlots;
