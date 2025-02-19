import React from "react";
import { SiteData } from "types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Units } from "types";
import { isArray } from "lodash";
import { styled } from "@mui/material/styles";

interface TableProps {
  data: SiteData[];
}

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
    width: 110,
    editable: false,
    type: "date"
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
    width: 110,
    editable: false,
    filterable: false
  },
  {
    field: "longitude",
    headerName: "Lon.",
    sortable: false,
    disableColumnMenu: true,
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
const Table = (props: TableProps) => {
  // HACK: need to handle error when google api key isnt set
  const rows = (isArray(props.data) ? props.data : []).map((row, index) => ({
    ...row,
    id: index,
    date: new Date(row.date)
  }));
  return (
    <Paper>
      <StyledDataGrid
        density="compact"
        rows={rows}
        pagination
        rowCount={rows.length}
        columns={columns}
        rowSelection={false}
        paginationModel={{ pageSize: 100, page: 0 }}
        sortModel={[{ field: "date", sort: "desc" }]}
        paginationMode="server"
      />
    </Paper>
  );
};
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  width: "100%",
  minHeight: 500,
  maxHeight: 600,
  height: "100%",
  overflow: "auto",
  marginBottom: 4
}));

export default Table;
