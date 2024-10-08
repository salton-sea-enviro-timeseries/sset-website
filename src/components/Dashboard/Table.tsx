import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SiteData } from "types";
import { DataGrid } from "@material-ui/data-grid";
import Paper from "@material-ui/core/Paper";
import { Units } from "types";
import { isArray } from "lodash";
import { format } from "date-fns";

const useStyles = makeStyles({
  table: {
    width: "100%",
    minHeight: 500
  }
});

interface TableProps {
  data: SiteData[];
}

const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 110,
    editable: false,
    type: "date",
    // @ts-ignore
    valueFormatter: ({ value }) => format(value, "MM/dd/yyyy")
  },
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
    editable: false,
    filterable: false
  },
  {
    field: "longitude",
    headerName: "Lon.",
    sortable: false,
    disableColumnMenu: true,
    disableColumnFilter: true,
    filterable: false,
    width: 110,
    editable: false
  },
  {
    field: "salinity",
    headerName: `Salinity (${Units.salinity})`,
    type: "number",
    width: 180,
    editable: false,
    filterable: false
  },
  {
    field: "water_temperature",
    headerName: `Temperature (${Units.water_temperature})`,
    type: "number",
    width: 190,
    editable: false,
    filterable: false
  },
  {
    field: "ph",
    headerName: "pH",
    type: "number",
    width: 100,
    editable: false,
    filterable: false
  },
  {
    field: "turbidity",
    headerName: `Turbidity (${Units.turbidity})`,
    type: "number",
    width: 180,
    editable: false,
    filterable: false
  },
  {
    field: "dissolved_oxygen",
    headerName: `Dissolved Oxygen (${Units["dissolved_oxygen"]})`,
    type: "number",
    width: 240,
    editable: false,
    filterable: false
  },
  {
    field: "chlorophyll",
    headerName: `Chlorophyll (${Units.chlorophyll})`,
    type: "number",
    width: 200,
    editable: false,
    filterable: false
  },
  {
    field: "phycoerythrin",
    headerName: `Phycoerythrin (${Units.phycoerythrin})`,
    type: "number",
    width: 220,
    editable: false,
    filterable: false
  },
  {
    field: "nitrate",
    headerName: `Nitrate (${Units.nitrate})`,
    type: "number",
    width: 170,
    editable: false,
    filterable: false
  },
  {
    field: "ammonia",
    headerName: `Ammonia (${Units.ammonia})`,
    type: "number",
    width: 190,
    editable: false,
    filterable: false
  },
  {
    field: "phosphate",
    headerName: `Phosphate (${Units.phosphate})`,
    type: "number",
    width: 200,
    editable: false,
    filterable: false
  },
  {
    field: "sulphate",
    headerName: `Sulphate (${Units.sulphate})`,
    type: "number",
    width: 180,
    editable: false,
    filterable: false
  },
  {
    field: "sulphide",
    headerName: `Sulphide (${Units.sulphide})`,
    type: "number",
    width: 180,
    editable: false,
    filterable: false
  }
];

export default function Table(props: TableProps) {
  const classes = useStyles();
  // HACK: need to handle error when google api key isnt set
  const rows = (isArray(props.data) ? props.data : []).map((row, index) => ({
    ...row,
    id: index,
    date: new Date(row.date)
  }));
  return (
    <Paper>
      <DataGrid
        className={classes.table}
        density="compact"
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        pageSize={100}
        sortModel={[{ field: "date", sort: "desc" }]}
      />
    </Paper>
  );
}
