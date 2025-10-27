import { Row } from "components/Dashboard/Rose";

// "9-21-2025" → Date (local)
function parseMDY(mdy: string) {
  const [m, d, y] = mdy.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function endOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}
function parseLocalTs(ts?: string) {
  if (!ts) return null;
  const d = new Date(ts.replace(" ", "T")); // helps Safari
  return Number.isNaN(+d) ? null : d;
}

type Raw = {
  WD?: number;
  WS?: number;
  H2S?: number;
  NO2?: number;
  timestamp_local?: string;
};

export function buildRows(
  data: Raw[],
  pollutant: "H2S" | "NO2",
  bStr: string,
  eStr: string
) {
  let b = parseMDY(bStr),
    e = endOfDay(parseMDY(eStr));
  if (b > e) [b, e] = [e, b];
  return data
    .map((s) => ({ s, t: parseLocalTs(s.timestamp_local) }))
    .filter((x) => x.t && x.t >= b && x.t <= e)
    .map((x) => x.s)
    .filter(
      (s) =>
        Number.isFinite(s.WD) &&
        Number.isFinite(s.WS) &&
        Number.isFinite(s[pollutant])
    )
    .map((s) => ({
      WD: +s.WD!,
      WS: +s.WS!,
      [pollutant]: +s[pollutant]!
    })) as Row[];
}
