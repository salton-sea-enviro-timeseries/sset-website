import Rose, { Row } from "./Rose";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography
} from "@mui/material";
import { CommonDeviceType, pollutantKey } from "@/types";
import { getDateRangeFromSensor } from "@/util/getDateRangeFromSensor";
import { useMemo, useState } from "react";
import { InfoOutlined } from "@mui/icons-material";
import { buildRows } from "@/util/roseBuildRows";

type PollroseGeneratorProps = {
  pollroseData: CommonDeviceType[];
  sensorName: string;
  selectedPollutant: pollutantKey;
};
const ALLOWED_POLLUTANTS = ["H2S", "NO2"] as const;
type AllowedPollutant = (typeof ALLOWED_POLLUTANTS)[number];
//typescript safe gaurd
function isAllowedPollutant(p: string): p is AllowedPollutant {
  return ALLOWED_POLLUTANTS.includes(p as AllowedPollutant);
}
const DEFAULT_POLL_BOUNDS = [
  0,
  10,
  20,
  30,
  40,
  50,
  60,
  Number.POSITIVE_INFINITY
];
const DEFAULT_WS_BANDS = [0, 1, 2, 3, 4, 5, 6, Number.POSITIVE_INFINITY]; // m/s
const WIND_COLORS = [
  "#000080",
  "#0000FF",
  "#00FFFF",
  "#00FF00",
  "#FFFF00",
  "#FF8000",
  "#FF0000"
];
const POLL_COLORS = undefined; // or provide an AQI palette

const HEATWAVE_COLORS = [
  "#000080", // dark blue
  "#0000ff", // blue
  "#00ffff", // cyan
  "#00ff00", // green
  "#ffff00", // yellow
  "#ff8000", // orange
  "#ff0000" // red
];

const DEFAULT_COLORS = HEATWAVE_COLORS;
const PollroseGenerator = ({
  pollroseData,
  sensorName,
  selectedPollutant
}: PollroseGeneratorProps) => {
  const [legendMode, setLegendMode] = useState<"pollutant" | "windspeed">(
    "pollutant"
  );
  const [infoOpen, setInfoOpen] = useState(false);

  const legendUnits = legendMode === "pollutant" ? "µg/m³" : "m/s";
  const { bdate, edate } = useMemo(
    () => getDateRangeFromSensor(pollroseData),
    [pollroseData]
  );
  const modeProps = useMemo(() => {
    if (legendMode === "windspeed") {
      return {
        legendUnits: "m/s",
        windSpeedBands: DEFAULT_WS_BANDS,
        colors: WIND_COLORS
      } as const;
    }
    return {
      legendUnits: "µg/m³",
      bounds: DEFAULT_POLL_BOUNDS,
      colors: DEFAULT_COLORS // if undefined, Rose uses its default
    } as const;
  }, [legendMode]);

  const rows = useMemo(
    () =>
      isAllowedPollutant(selectedPollutant)
        ? buildRows(pollroseData as any[], selectedPollutant, bdate, edate)
        : [],
    [pollroseData, selectedPollutant, bdate, edate]
  );
  return (
    <div>
      <Box
        position="relative"
        width={350}
        height={350}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          "& .js-plotly-plot .plot-container": {
            position: "relative"
          },
          "& .js-plotly-plot .modebar-container": {
            top: "auto !important",
            bottom: 8,
            left: "50% !important",
            right: "auto !important",
            transform: "translateX(-50%)"
          }
        }}
      >
        {/* Testing different poll rose  */}
        {/* toggle legend with windspeed */}
        <Rose
          data={rows}
          columns={{
            windDir: "WD",
            windSpeed: "WS",
            pollutant: selectedPollutant
          }}
          pollutant={selectedPollutant}
          legendMode={legendMode} // ← toggle drives this
          includeUnitsInLegendItems={false} // ← keep items compact (e.g., 0–5, 5–10…)
          binWidthDeg={22.5}
          wscut={0}
          fromNorth={true}
          // pollutant mode bins:
          bounds={[0, 10, 20, 30, 40, 50, 60, Number.POSITIVE_INFINITY]}
          // wind mode bins:
          windSpeedBands={[5, 8, 11, 14, Number.POSITIVE_INFINITY]}
          maxPct={60}
          site={sensorName}
          pollutantLabel={selectedPollutant}
          normalize="global" // set to "sector" if you want per-sector %
          {...modeProps}
        />
        {/* Info button (top-right) */}
        <Tooltip title="More information">
          <IconButton
            aria-label="More information about this chart"
            size="small"
            onClick={() => setInfoOpen(true)}
            sx={{
              position: "absolute",
              top: -25,
              right: 0,
              zIndex: 2,
              bgcolor: "white",
              boxShadow: 1,
              "&:hover": { bgcolor: "#f0f0f0" }
            }}
          >
            <InfoOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>About this Rose</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" paragraph>
            This pollution rose visualizes the relationship between wind
            direction and the Hydrogen Sulfide concentration level. It helps
            identify likely source directions, understand prevailing wind
            patterns during periods of high concentration, and assess the impact
            of the Salton Sea. Each spoke represents a direction (North, South,
            East, West). The colors indicate Hydrogen Sulfide concentration
            bands from that direction. The plot is created from measurements
            recorded at a monitoring station (e.g., above the Salton Sea) and
            can guide emission-reduction strategies or help limit community
            exposure.
          </Typography>
          <Typography variant="body2">
            <strong>Español:</strong> Esta rosa de contaminación visualiza la
            relación entre la dirección del viento y el nivel de concentración
            de sulfuro de hidrógeno. La rosa ayuda a identificar la fuente de
            contaminación, comprender los patrones de viento predominantes
            durante períodos de alta concentración y evaluar el impacto del
            Salton Sea. Cada radio representa una dirección; los colores indican
            bandas de concentración desde esa dirección. El gráfico se crea con
            datos de una estación de monitoreo y puede orientar medidas de
            reducción de emisiones o limitar la exposición de las comunidades
            locales.
          </Typography>
        </DialogContent>
      </Dialog>
      {/* Toggle between Pollution Rose and Wind Rose */}
      <Box sx={{ mb: 1, display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          value={legendMode}
          exclusive
          size="small"
          onChange={(_, v) => v && setLegendMode(v)}
          aria-label="rose type"
          sx={{ "& .MuiToggleButton-root": { textTransform: "none", px: 1.5 } }}
        >
          <ToggleButton value="pollutant" aria-label="pollution-rose">
            Pollution
          </ToggleButton>
          <ToggleButton value="windspeed" aria-label="wind-rose">
            Wind
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </div>
  );
};

export default PollroseGenerator;
