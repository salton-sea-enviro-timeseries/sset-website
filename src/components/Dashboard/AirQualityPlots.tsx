import React, { useMemo } from "react";
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
  Plugin,
  ChartArea
} from "chart.js";
import {
  BodyValues,
  CommonDeviceType,
  LocaleDefault,
  LocaleOption,
  MenuItemFields
} from "types";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { makeStyles, Box, Typography, Link } from "@material-ui/core";
import { calcParamAQI } from "util/calcParamAQI";
import { filterHourlyData } from "../../util/filterHourlyData";
import useSelect from "hooks/useSelect";
import SelectMenuList from "./SelectMenuList";
import { filterParameters } from "util/filterParameterFromCms";

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

type DeviceRawData = {
  id: string;
  name: string;
  data: CommonDeviceType[];
};
type ParamAQIStandardMap = {
  O3: number;
  PM2_5: number;
  PM10: number;
  NO2: number;
  PM1: null;
  CO?: number;
  H2S: null;
};
const paramAQIStandardMap: ParamAQIStandardMap = {
  O3: 70,
  PM2_5: 35,
  PM10: 150,
  NO2: 100,
  PM1: null,
  CO: 35000,
  H2S: null
};
type DataItem = {
  x: string | number;
  PM2_5?: number;
  PM10?: number;
  NO2?: number;
  O3?: number;
  CO?: number;
  H2S?: number;
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
const canvasBackgroundColor: Plugin<"line"> = {
  id: "canvasBackgroundColor",
  beforeDraw(chart, args, options) {
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
const INSTRUMENTATION_THRESHOLD_H2S = 0.04;

function isBelowThreshold(
  dataPoint: DataItem | null
): dataPoint is DataItem & { H2S: number } {
  if (dataPoint !== null && typeof dataPoint.H2S === "number") {
    return dataPoint.H2S >= 0 && dataPoint.H2S < INSTRUMENTATION_THRESHOLD_H2S;
  }
  return false;
}
const thresholdLinePlugin = (selectedParam: string) => ({
  id: "thresholdLine",
  afterDraw: (chart: ChartJS) => {
    if (selectedParam !== "H2S") {
      return; // Only draw the line for H2S parameter
    }

    const ctx = chart.ctx;
    const chartArea: ChartArea = chart.chartArea;
    const yScale = chart.scales.y;
    const yPos = yScale.getPixelForValue(INSTRUMENTATION_THRESHOLD_H2S);
    // Draw the dashed line
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.setLineDash([5, 5]); // Dashed line pattern
    ctx.moveTo(chartArea.left, yPos);
    ctx.lineTo(chartArea.right, yPos);
    ctx.stroke();
    // Draw the custom legend
    drawCustomLegend(ctx, chartArea);
    ctx.restore();
  }
});

function drawCustomLegend(ctx: CanvasRenderingContext2D, chartArea: ChartArea) {
  // Padding from the right edge and top of the chart
  const paddingRight = 4;
  //TODO change padding based on axis max width
  const paddingTop = 60;

  // Legend size
  const legendWidth = 140;
  const legendHeight = 50;

  // Legend position
  const legendX = chartArea.right - legendWidth - paddingRight;
  const legendY = chartArea.top - paddingTop;

  // Background
  ctx.fillStyle = "whitesmoke";
  ctx.fillRect(legendX, legendY, legendWidth, legendHeight);

  // Border
  ctx.strokeStyle = "black";
  ctx.strokeRect(legendX, legendY, legendWidth, legendHeight);

  // Dashed line sample
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(legendX + 10, legendY + 20); // Adjust as needed
  ctx.lineTo(legendX + 90, legendY + 20); // Adjust as needed
  ctx.strokeStyle = "red";
  ctx.stroke();

  // Text
  ctx.fillStyle = "black";
  ctx.fillText("Instrument\nThreshold", legendX + 10, legendY + 35); // Adjust as needed
}

// all chart options and selected param as y axis
const chartOptions = (selectedParam: string): ChartOptions<"line"> => {
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
          // filter out sensors whose data is undefined or null
          filter: (legendItem: LegendItem, chartData: ChartData<"line">) => {
            const datasetIndex = legendItem.datasetIndex;
            const datasetData =
              typeof datasetIndex !== "undefined"
                ? chartData.datasets[datasetIndex].data
                : [];
            const isDefined = datasetData.some((data) => {
              const item = data as DataItem;
              return (
                item[selectedParam as keyof DataItem] !== undefined &&
                item[selectedParam as keyof DataItem] !== null
              );
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
          text: selectedParam === "H2S" ? "ppb" : "AQI Value",
          font: {
            size: 16
          }
        },
        type: "linear" as const,
        display: true,
        position: "left" as const,
        beginAtZero: false,
        min: selectedParam === "H2S" ? INSTRUMENTATION_THRESHOLD_H2S : 0,
        grid: {
          drawOnChartArea: true
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

function hasNonNullValueForParam<T extends { [key: string]: any }>(
  data: { datasets: { data: T[] }[] },
  param: string
): boolean {
  return data.datasets.some((dataset) => {
    return dataset.data.some(
      (item) => item[param] !== null && item[param] !== undefined
    );
  });
}
const AirQualityPlots = ({
  normalizedData,
  chartMainCaption,
  parameterListDetailsText,
  locale,
  paramSelectionHelperText
}: {
  normalizedData: Record<string, DeviceRawData>;
  chartMainCaption?: string;
  parameterListDetailsText?: MenuItemFields[];
  locale: string;
  paramSelectionHelperText?: string;
}) => {
  const classes = useStyles();

  const {
    selectedValue: selectedParam,
    handleSelectChange,
    options
  } = useSelect<string>({
    initialValues: Object.keys(paramAQIStandardMap),
    defaultValue: "PM10"
  });
  // Combine the canvasBackgroundColor plugin with the threshold plugin
  const combinedPlugins: Plugin<"line">[] = useMemo(
    () => [canvasBackgroundColor, thresholdLinePlugin(selectedParam)],
    [selectedParam]
  );
  //Filter selected param to retrieve its details
  const parameterFilter = useMemo(
    () =>
      filterParameters<MenuItemFields>(
        parameterListDetailsText,
        "paramKey",
        selectedParam
      ),
    [parameterListDetailsText, selectedParam]
  );
  const parameterDescription =
    parameterFilter &&
    parameterFilter[0].description[
      locale as keyof LocaleOption<{ content: [BodyValues] }>
    ].content[0].content[0].value;
  const parameterInfoLink =
    parameterFilter &&
    parameterFilter[0].href[locale as keyof LocaleDefault<string>];

  const datasets = useMemo(() => {
    return Object.values(normalizedData).map(({ data, name, id }, index) => {
      const transformedData = id.startsWith("MOD")
        ? calcParamAQI(filterHourlyData(data))
        : calcParamAQI(data);
      return {
        label: name,
        data: transformedData,
        borderColor: colors[index],
        segment: {
          borderColor: (ctx: { p0DataIndex: any; p1DataIndex: any }) => {
            if (selectedParam !== "H2S") {
              return colors[index];
            }
            const dataIndex = ctx.p0DataIndex as number; // Index of the starting point of the segment
            const nextDataIndex = ctx.p1DataIndex as number; // Index of the ending point of the segment

            const currentPoint = transformedData[dataIndex];
            const nextPoint = transformedData[nextDataIndex];
            if (isBelowThreshold(nextPoint)) {
              return "red";
            }
            return colors[index]; // Default color
          }
        },
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
      };
    });
  }, [normalizedData, selectedParam]);
  // dataset as an object for chart prop
  const chartData = {
    datasets
  };
  const shouldRenderChart = hasNonNullValueForParam(chartData, selectedParam);
  return (
    <>
      <SelectMenuList
        options={options}
        helperText={paramSelectionHelperText || "Select Param to Chart"}
        selectedValue={selectedParam}
        handleSelectChange={handleSelectChange}
      />
      {shouldRenderChart ? (
        <Box minHeight={350} m="2 2 0 2">
          <Line
            key={selectedParam}
            plugins={combinedPlugins}
            options={chartOptions(selectedParam)}
            data={chartData}
          />
        </Box>
      ) : (
        <Typography align="center" gutterBottom={true}>
          No data available for <b>{selectedParam}</b> for the date range
          selected.
        </Typography>
      )}
      <Box marginBottom={1}>
        <Typography
          variant="body2"
          align="center"
          style={{
            fontSize: "14px",
            fontWeight: "lighter"
          }}
        >
          {chartMainCaption}{" "}
          <Link
            className={classes.airPollutant}
            href={parameterInfoLink}
            target="_blank"
            rel="noopener"
          >
            <b>{selectedParam}:</b>
          </Link>{" "}
          {parameterDescription}
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
