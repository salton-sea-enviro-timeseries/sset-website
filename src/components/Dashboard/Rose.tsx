import dynamic from "next/dynamic";
import { Layout } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

/** One row of your input data (column names can be mapped in props) */
export type Row = Record<string, number | string | null | undefined>;
type LegendMode = "pollutant" | "windspeed";
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

type Props = {
  data: Row[];
  pollutant?: string;
  columns?: {
    windDir?: string; // default: "WD"
    windSpeed?: string; // default: "WS"
    pollutant?: string; // e.g., "H2S" / "NO2" / "PM25"
  };
  binWidthDeg?: number; // default 45
  wscut?: number; // exclude ws <= wscut (default 0)
  fromNorth?: boolean; // default false
  /** If legendMode="pollutant": pollutant concentration bounds */
  bounds?: number[]; // default below
  /** If legendMode="windspeed": wind-speed class bounds (m/s) */
  windSpeedBands?: number[]; // default below
  maxPct?: number; // radial cap, default 50
  title?: string;
  site?: string;
  pollutantLabel?: string;
  normalize?: "global" | "sector"; // default "global"
  /** Toggle the legend type */
  legendMode?: LegendMode; // default "pollutant"
  /** Optional pollutant units to show in legend labels (e.g., " µg/m³") */
  pollutantUnits?: string;
  legendUnits?: string; // e.g., "µg/m³" or "m/s"
  includeUnitsInLegendItems?: boolean; // default false
  /** Optional fixed palette: one color per band (low→high) */
  colors?: string[];
  /** Draw highest band on top (matches Python) */
  stackHighOnTop?: boolean;
  /** Flip legend order (high→low) if desired */
  reverseLegend?: boolean;
};
const DEFAULT_POLL_BOUNDS = [
  10,
  20,
  30,
  50,
  100,
  120,
  140,
  Number.POSITIVE_INFINITY
];
const DEFAULT_WS_BANDS = [0, 1, 2, 3, 4, 5, 6, Number.POSITIVE_INFINITY]; // m/s
function toLowerKeys(row: Row): Record<string, any> {
  const out: Record<string, any> = {};
  for (const k of Object.keys(row)) out[k.toLowerCase()] = (row as any)[k];
  return out;
}

/** Discretize direction into sector center, matching your Python logic */
function discretizeTheta(
  wdDeg: number,
  width: number,
  fromNorth: boolean
): number {
  const half = width / 2;
  let center: number;
  if (fromNorth) {
    // (wd + half)//width * width
    center = Math.floor((wdDeg + half) / width) * width;
  } else {
    // (int(wd) + half)//width * width - half
    center = Math.floor((Math.trunc(wdDeg) + half) / width) * width - half;
  }
  // normalize to [0, 360)
  center = ((center % 360) + 360) % 360;
  return center;
}

function bandLabel(lb: number, ub: number, withUnits = false, unit = "") {
  const u = withUnits && unit ? ` ${unit}` : "";
  if (!isFinite(ub)) return `≥ ${lb}${u}`;
  if (!isFinite(lb)) return `< ${ub}${u}`;
  return `${lb}${u}–${ub}${u}`;
}

export default function Rose({
  data,
  pollutant,
  columns = { windDir: "WD", windSpeed: "WS", pollutant: pollutant },
  binWidthDeg = 45,
  wscut = 0,
  fromNorth = false,
  bounds = DEFAULT_POLL_BOUNDS,
  windSpeedBands = DEFAULT_WS_BANDS,
  maxPct = 50,
  title,
  site,
  pollutantLabel,
  normalize = "global",
  legendMode = "pollutant",
  legendUnits = "",
  includeUnitsInLegendItems = false,

  colors = DEFAULT_COLORS,
  stackHighOnTop = true,
  reverseLegend = false
}: Props) {
  // Normalize col names to lowercase for robust access
  const wdCol = (columns.windDir || "WD").toLowerCase();
  const wsCol = (columns.windSpeed || "WS").toLowerCase();
  const polCol = (pollutant ?? columns.pollutant ?? "H2S").toLowerCase();

  // Lowercase row keys, filter, and validate
  const rows = data
    .map(toLowerKeys)
    .filter(
      (r) =>
        r[wdCol] != null &&
        isFinite(Number(r[wdCol])) &&
        r[wsCol] != null &&
        isFinite(Number(r[wsCol])) &&
        (legendMode === "pollutant"
          ? r[polCol] != null && isFinite(Number(r[polCol]))
          : true)
    );

  // Exclude calm winds (ws <= wscut)
  const filtered = rows.filter((r) => Number(r[wsCol]) > wscut);

  // Choose band set based on legend mode
  const bands = legendMode === "pollutant" ? bounds : windSpeedBands;
  const lbs = bands.slice(0, bands.length - 1);
  const ubs = bands.slice(1);

  // Keep values inside [lb0, ub_last] for the active variable (matches Python masking)
  const valid = filtered.filter((r) => {
    if (legendMode === "pollutant") {
      const v = Number((r as any)[polCol]);
      return v >= lbs[0] && v <= ubs[ubs.length - 1];
    } else {
      const ws = Number((r as any)[wsCol]);
      return ws >= lbs[0] && ws <= ubs[ubs.length - 1];
    }
  });

  // Early out (no data)
  if (valid.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No valid samples for the given filters.
      </div>
    );
  }

  // Build sector centers (theta) and sector arrays
  const sectorWidth = binWidthDeg;
  const sectorVals: Map<number, { pollutant: number[]; windspeed: number[] }> =
    new Map();
  for (const r of valid) {
    const wd = Number(r[wdCol]);
    const theta = discretizeTheta(wd, sectorWidth, fromNorth);
    if (!sectorVals.has(theta))
      sectorVals.set(theta, { pollutant: [], windspeed: [] });
    sectorVals.get(theta)!.pollutant.push(Number((r as any)[polCol]));
    sectorVals.get(theta)!.windspeed.push(Number((r as any)[wsCol]));
  }

  // Sort unique sector centers ascending
  const thetas = Array.from(sectorVals.keys()).sort((a, b) => a - b);

  // Denominators
  const globalDen = valid.length;
  const sectorDen: Record<number, number> = {};
  if (normalize === "sector") {
    for (const t of thetas) sectorDen[t] = sectorVals.get(t)!.pollutant.length; // either array length works
  }

  // Build traces (stacked bars) for each band
  const traces = lbs.map((lb, i) => {
    const ub = ubs[i];
    const rVals: number[] = [];

    for (const t of thetas) {
      const bucket = sectorVals.get(t)!;
      const arr =
        legendMode === "pollutant" ? bucket.pollutant : bucket.windspeed;

      const count =
        i === lbs.length - 1 && !isFinite(ub)
          ? arr.filter((v) => v >= lb).length
          : arr.filter((v) => v >= lb && v < ub).length;

      const den =
        normalize === "sector"
          ? Math.max(sectorDen[t] ?? 0, 1)
          : Math.max(globalDen, 1);
      rVals.push((count / den) * 100);
    }

    const name =
      legendMode === "pollutant"
        ? bandLabel(lb, ub, includeUnitsInLegendItems, legendUnits) // ← no units by default
        : bandLabel(lb, ub, includeUnitsInLegendItems, legendUnits || "m/s");

    return {
      type: "barpolar" as const,
      theta: thetas,
      r: rVals,
      width: thetas.map(() => sectorWidth),
      name,
      marker: { color: colors[i % colors.length] },
      hovertemplate:
        `Dir: %{theta:.0f}°<br>` +
        (legendMode === "pollutant"
          ? `Pollutant band: ${name}`
          : `Wind speed: ${name}`) +
        `<br>%{r:.2f}%<extra></extra>`
    };
  });

  // Highest band on top (to mirror matplotlib output)
  // if (stackHighOnTop) traces.reverse();

  // Cardinal labels
  const tickvals = [0, 45, 90, 135, 180, 225, 270, 315];
  const ticktext = [
    "North",
    "N-E",
    "East",
    "S-E",
    "South",
    "S-W",
    "West",
    "N-W"
  ];

  const defaultTitle =
    legendMode === "pollutant"
      ? `Pollution Rose${site ? ` - ${site}` : ""}${
          pollutantLabel ? ` (${pollutantLabel})` : ""
        }`
      : `Wind Rose${site ? ` - ${site}` : ""}`;

  const legendTitle =
    legendMode === "pollutant"
      ? legendUnits
        ? `Pollutant (${legendUnits})`
        : "Pollutant"
      : legendUnits
      ? `Wind speed (${legendUnits})`
      : "Wind speed";

  const layout: Partial<Layout> = {
    title: { text: title || defaultTitle, pad: { b: 12 } },
    margin: { l: 40, r: 40, b: 60, t: 50 },
    barmode: "stack",
    polar: {
      domain: { x: [0, 1], y: [0, 0.92] }, // small gap under title
      angularaxis: {
        direction: "clockwise",
        rotation: 90,
        tickmode: "array",
        tickvals,
        ticktext
      },
      radialaxis: {
        range: [0, maxPct] as [number, number],
        tickmode: "array",
        tickvals: Array.from({ length: 5 }, (_, i) => ((i + 1) * maxPct) / 5),
        ticktext: Array.from(
          { length: 5 },
          (_, i) => `${(((i + 1) * maxPct) / 5).toFixed(0)}%`
        ),
        angle: 45,
        gridcolor: "#e5e7eb"
      }
    },
    legend: {
      orientation: "h",
      x: 0.5,
      xanchor: "center",
      y: -0.28,
      itemwidth: 60,
      yanchor: "top",
      title: { text: legendTitle, side: "top" },
      traceorder: reverseLegend ? "reversed" : "normal"
    },
    showlegend: true
  };

  return (
    <Plot
      data={traces}
      layout={layout}
      config={{
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: [
          "pan2d",
          "select2d",
          "lasso2d",
          "zoomIn2d",
          "zoomOut2d",
          "autoScale2d",
          "resetScale2d",
          "hoverClosestCartesian",
          "hoverCompareCartesian"
        ]
      }}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler
    />
  );
}
