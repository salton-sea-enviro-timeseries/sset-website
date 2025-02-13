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
  Filler
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";

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
const LoadingChart = () => {
  const loadingOption: ChartOptions<"line"> = {
    animations: {
      backgroundColor: {
        type: "color",
        duration: 1200,
        from: "rgba(0, 0, 0, 0.11)",
        to: "whitesmoke",
        loop: true
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false
    },
    layout: {
      padding: {
        bottom: 10,
        top: 10
      }
    },
    plugins: {
      // @ts-ignore
      customCanvasBackgroundColor: {
        color: "whitesmoke"
      },
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
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
        ticks: {
          callback: function (_value: any, index: any, ticks: any) {
            return "  ";
          }
        },
        beginAtZero: false,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };
  const loadingBackgroundColor = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (
      chart: {
        ctx: any;
        chartArea: { top: any; bottom: any; left: any; right: any; width: any };
        scales: { x: any; y: any };
      },
      args: any,
      options: { color: string }
    ) => {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width },
        scales: { x, y }
      } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#99ffff";
      ctx.fillRect(
        left,
        y.getPixelForValue(300),
        width,
        y.getPixelForValue(0) - y.getPixelForValue(300)
      );
      ctx.restore();
    }
  };
  const loadingPlugins: any = [loadingBackgroundColor];
  const loadingData = {
    labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 200, 250, 235, 180, 178, 98, 75, 60],
        backgroundColor: "whitesmoke",
        fill: true,
        borderColor: "white",
        tension: 0.4
      }
    ]
  };
  return (
    <Box minHeight={350} m={2}>
      <Line
        options={loadingOption}
        data={loadingData}
        plugins={loadingPlugins}
      />
    </Box>
  );
};
export default LoadingChart;
