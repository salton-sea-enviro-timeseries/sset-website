import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Data } from "types";
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    minHeight: 500
  }
});

interface TableProps {
  data: Data;
}

const formatValue = (value: any) => {
  if (!value) return "";
  return value.toFixed(2);
};
const columns = [
  { field: "id", headerName: "ID", width: 90, editable: false },
  {
    field: "site",
    headerName: "Station",
    width: 150,
    editable: false
  },
  {
    field: "latitude",
    headerName: "Lat",
    width: 110,
    editable: false
  },
  {
    field: "longitude",
    headerName: "Lon.",
    width: 110,
    editable: false
  },
  {
    field: "salinity",
    headerName: "Salinity",
    type: "number",
    width: 130,
    editable: false
  },
  {
    field: "water_temperature",
    headerName: "Temperature",
    type: "number",
    width: 160,
    editable: false
  },
  {
    field: "ph",
    headerName: "pH",
    type: "number",
    width: 110,
    editable: false
  },
  {
    field: "turbidity",
    headerName: "Turbidity",
    type: "number",
    width: 150,
    editable: false
  },
  {
    field: "dissolved_oxygen",
    headerName: "Dissolved Oxygen",
    type: "number",
    width: 190,
    editable: false
  },
  {
    field: "chlorophyll",
    headerName: "chlorophyll",
    type: "number",
    width: 150,
    editable: false
  },
  {
    field: "phycoerythrin",
    headerName: "Phycoerythrin",
    type: "number",
    width: 190,
    editable: false
  },
  {
    field: "nitrate",
    headerName: "Nitrate",
    type: "number",
    width: 130,
    editable: false
  },
  {
    field: "ammonia",
    headerName: "Ammonia",
    type: "number",
    width: 150,
    editable: false
  },
  {
    field: "phosphate_hr",
    headerName: "Phosphate",
    type: "number",
    width: 150,
    editable: false
  },
  {
    field: "sulphate",
    headerName: "Sulphate",
    type: "number",
    width: 150,
    editable: false
  },
  {
    field: "sulphide",
    headerName: "Sulphide",
    type: "number",
    width: 150,
    editable: false
  }
];

export default function Table(props: TableProps) {
  const classes = useStyles();
  let counter = 0;
  const rows = Object.values(props.data).map((row) => {
    return (row = {
      id: counter++,
      site: row.site,
      longitude: row.longitude,
      latitude: row.latitude,
      salinity: formatValue(row.salinity),
      water_temperature: formatValue(row.water_temperature),
      ph: formatValue(row.ph),
      turbidity: formatValue(row.turbidity),
      dissolved_oxygen: formatValue(row.dissolved_oxygen),
      chlorophyll: formatValue(row.chlorophyll),
      phycoerythrin: formatValue(row.phycoerythrin),
      nitrate: formatValue(row.nitrate),
      nitrite: formatValue(row.nitrite),
      ammonia: formatValue(row.ammonia),
      phosphate_hr: formatValue(row.phosphate_hr),
      phosphate_lr: formatValue(row.phosphate_lr),
      sulphate: formatValue(row.sulphate),
      sulphide: formatValue(row.sulphide)
    });
  });

  return (
    <DataGrid
      className={classes.table}
      density="compact"
      rows={rows}
      autoPageSize
      columns={columns}
      disableSelectionOnClick
    />
  );
}
