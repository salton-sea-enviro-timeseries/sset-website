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
  Plugin
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
import { Box, Typography, Link, Button, Grid2 } from "@mui/material";
import DownloadIcon from "@mui/icons-material/CloudDownload";
import { calcParamAQI } from "util/calcParamAQI";
import useSelect from "hooks/useSelect";
import SelectMenuList from "./SelectMenuList";
import { filterParameters } from "util/filterParameterFromCms";
import AirQualityDateRangeInput from "./AirQualityDateRangeInput";
import { FormErrorRange } from "hooks/useSensorData";
import { downloadExcel } from "util/exelUtils";

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

type AirQualityPlotsProps = {
  normalizedData: Record<string, DeviceRawData>;
  chartMainCaption?: string;
  parameterListDetailsText?: MenuItemFields[];
  locale: string;
  paramSelectionHelperText?: string;
  handleFormSubmit: (evt: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isValidating: boolean;
  formError: FormErrorRange;
  startDateRef: React.RefObject<HTMLInputElement>;
  endDateRef: React.RefObject<HTMLInputElement>;
  buttonText?: string;
  startDateText?: string;
  endDateText?: string;
  modSensorGeneratePlotHelperText?: string;
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
  "#4935ab",
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
        text: "",
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
        // min: selectedParam === "H2S" ? INSTRUMENTATION_THRESHOLD_H2S : 0,
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
  paramSelectionHelperText,
  handleFormSubmit,
  isValidating,
  formError,
  startDateRef,
  endDateRef,
  buttonText,
  startDateText,
  endDateText,
  modSensorGeneratePlotHelperText
}: AirQualityPlotsProps) => {
  const {
    selectedValue: selectedParam,
    handleSelectChange: handleSelectChangeBase,
    options
  } = useSelect<string>({
    initialValues: Object.keys(paramAQIStandardMap),
    defaultValue: "H2S"
  });
  const plugin: Plugin<"line">[] = [canvasBackgroundColor];
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
      const transformedData = calcParamAQI(data);
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
  const handleDownload = async () => {
    if (normalizedData) {
      try {
        await downloadExcel(normalizedData);
      } catch (error) {
        console.error("Failed to fetch data or download excel: ", error);
      }
    } else {
      console.warn("No data available for download");
    }
  };
  return (
    <>
      <Grid2 container spacing={3}>
        {/* Parameter Selector and Download */}
        <Grid2
          size={{ xs: 12, md: 6 }}
          display="flex"
          // justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ display: "flex" }}>
            <SelectMenuList
              options={options}
              helperText={paramSelectionHelperText || "Select Param to Chart"}
              selectedValue={selectedParam}
              handleSelectChange={handleSelectChangeBase}
            />

            <Button
              sx={{
                backgroundColor: "#e0e0e0",
                color: "black",
                height: "40px"
              }}
              startIcon={<DownloadIcon />}
              size="small"
              variant="contained"
              onClick={handleDownload}
            >
              Air Quality Data
            </Button>
          </Box>
        </Grid2>

        {/* Date Selector  */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              width: "100%"
            }}
          >
            <AirQualityDateRangeInput
              handleFormSubmit={handleFormSubmit}
              isValidating={isValidating}
              formError={formError}
              startDateRef={startDateRef}
              endDateRef={endDateRef}
              buttonText={buttonText}
              startDateText={startDateText}
              endDateText={startDateText}
              modSensorGeneratePlotHelperText={modSensorGeneratePlotHelperText}
            />
          </Box>
        </Grid2>
      </Grid2>

      {shouldRenderChart ? (
        <Box minHeight={350} m="2 2 0 2" marginTop={-4} sx={{ paddingTop: 0 }}>
          <Line
            key={selectedParam}
            plugins={plugin}
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
      <Box
        marginBottom={1}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Typography variant="caption">
          Filter Sensors by Clicking on Legend Items Above
        </Typography>
      </Box>
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
            sx={{ color: "#3a7ca5", cursor: "pointer" }}
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
