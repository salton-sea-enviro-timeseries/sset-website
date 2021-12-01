import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Data } from "types";
import { DataGrid } from "@material-ui/data-grid";
import Paper from "@material-ui/core/Paper";
import { Units } from "types";

const useStyles = makeStyles({
  table: {
    width: "100%",
    minHeight: 500
  }
});

interface TableProps {
  data: Data;
}

const formatValue = (value: number) => {
  if (!value) return "";
  return value.toFixed(2);
};
const columns = [
  {
    field: "site",
    headerName: "Station",
    width: 150,
    editable: false
  },
  {
    field: "latitude",
    headerName: "Lat.",
    sortable: false,
    disableColumnMenu: true,
    disableColumnFilter: true,
    width: 110,
    editable: false
  },
  {
    field: "longitude",
    headerName: "Lon.",
    sortable: false,
    disableColumnMenu: true,
    disableColumnFilter: true,

    width: 110,
    editable: false
  },
  {
    field: "salinity",
    headerName: `Salinity (${Units.salinity})`,
    type: "number",
    width: 180,
    editable: false
  },
  {
    field: "water_temperature",
    headerName: `Temperature (${Units.water_temperature})`,
    type: "number",
    width: 190,
    editable: false
  },
  {
    field: "ph",
    headerName: "pH",
    type: "number",
    width: 100,
    editable: false
  },
  {
    field: "turbidity",
    headerName: `Turbidity (${Units.turbidity})`,
    type: "number",
    width: 180,
    editable: false
  },
  {
    field: "dissolved_oxygen",
    headerName: `Dissolved Oxygen (${Units["dissolved_oxygen"]})`,
    type: "number",
    width: 240,
    editable: false
  },
  {
    field: "chlorophyll",
    headerName: `Chlorophyll (${Units.chlorophyll})`,
    type: "number",
    width: 200,
    editable: false
  },
  {
    field: "phycoerythrin",
    headerName: `Phycoerythrin (${Units.phycoerythrin})`,
    type: "number",
    width: 220,
    editable: false
  },
  {
    field: "nitrate",
    headerName: `Nitrate (${Units.nitrate})`,
    type: "number",
    width: 170,
    editable: false
  },
  {
    field: "ammonia",
    headerName: `Ammonia (${Units.ammonia})`,
    type: "number",
    width: 190,
    editable: false
  },
  {
    field: "phosphate_hr",
    headerName: `Phosphate (${Units.phosphate})`,
    type: "number",
    width: 200,
    editable: false
  },
  {
    field: "sulphate",
    headerName: `Sulphate (${Units.sulphate})`,
    type: "number",
    width: 180,
    editable: false
  },
  {
    field: "sulphide",
    headerName: `Sulphide (${Units.sulphide})`,
    type: "number",
    width: 180,
    editable: false
  }
];

export default function Table(props: TableProps) {
  const classes = useStyles();
  const data = Object.values(props.data).map((d) => {
    return {
      site: d.site,
      longitude: d.longitude,
      latitude: d.latitude,
      salinity: formatValue(d.salinity),
      water_temperature: formatValue(d.water_temperature),
      ph: formatValue(d.ph),
      turbidity: formatValue(d.turbidity),
      dissolved_oxygen: formatValue(d.dissolved_oxygen),
      chlorophyll: formatValue(d.chlorophyll),
      phycoerythrin: formatValue(d.phycoerythrin),
      nitrate: formatValue(d.nitrate),
      nitrite: formatValue(d.nitrite),
      ammonia: formatValue(d.ammonia),
      phosphate_hr: formatValue(d.phosphate_hr),
      phosphate_lr: formatValue(d.phosphate_lr),
      sulphate: formatValue(d.sulphate),
      sulphide: formatValue(d.sulphide)
    };
  });
  const rows = data.map((row, index) => ({ ...row, id: index }));

  return (
    <Paper>
      <DataGrid
        className={classes.table}
        density="compact"
        rows={rows}
        autoPageSize
        columns={columns}
        disableSelectionOnClick
      />
    </Paper>
  );
}
