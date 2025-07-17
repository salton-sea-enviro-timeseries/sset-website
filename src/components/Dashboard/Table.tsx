import React from "react";
import { SiteData } from "types";
import Paper from "@mui/material/Paper";
import { Units } from "types";
import { isArray } from "lodash";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import { TableSortLabel } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Table as CustomTable } from "@mui/material";

interface TableProps {
  data: SiteData[];
}
type Order = "asc" | "desc";
const columns = [
  {
    field: "date",
    headerName: "Date",
    minWidth: 110,
    editable: false,
    type: "date"
  },
  {
    field: "site",
    headerName: "Station",
    minWidth: 120,
    editable: false
  },
  {
    field: "latitude",
    headerName: "Lat.",
    sortable: false,
    disableColumnMenu: true,
    minWidth: 110,
    editable: false,
    filterable: false
  },
  {
    field: "longitude",
    headerName: "Lon.",
    sortable: false,
    disableColumnMenu: true,
    filterable: false,
    minWidth: 110,
    editable: false
  },
  {
    field: "salinity",
    headerName: `Salinity (${Units.salinity})`,
    type: "number",
    minWidth: 170,
    editable: false,
    filterable: false
  },
  {
    field: "water_temperature",
    headerName: `Temperature (${Units.water_temperature})`,
    type: "number",
    minWidth: 190,
    editable: false,
    filterable: false
  },
  {
    field: "ph",
    headerName: "pH",
    type: "number",
    minWidth: 100,
    editable: false,
    filterable: false
  },
  {
    field: "turbidity",
    headerName: `Turbidity (${Units.turbidity})`,
    type: "number",
    minWidth: 180,
    editable: false,
    filterable: false
  },
  {
    field: "dissolved_oxygen",
    headerName: `Dissolved Oxygen (${Units["dissolved_oxygen"]})`,
    type: "number",
    minWidth: 240,
    editable: false,
    filterable: false
  },
  {
    field: "chlorophyll",
    headerName: `Chlorophyll (${Units.chlorophyll})`,
    type: "number",
    minWidth: 200,
    editable: false,
    filterable: false
  },
  {
    field: "phycoerythrin",
    headerName: `Phycoerythrin (${Units.phycoerythrin})`,
    type: "number",
    minWidth: 220,
    editable: false,
    filterable: false
  },
  {
    field: "nitrate",
    headerName: `Nitrate (${Units.nitrate})`,
    type: "number",
    minWidth: 170,
    editable: false,
    filterable: false
  },
  {
    field: "ammonia",
    headerName: `Ammonia (${Units.ammonia})`,
    type: "number",
    minWidth: 190,
    editable: false,
    filterable: false
  },
  {
    field: "phosphate",
    headerName: `Phosphate (${Units.phosphate})`,
    type: "number",
    minWidth: 200,
    editable: false,
    filterable: false
  },
  {
    field: "sulphate",
    headerName: `Sulphate (${Units.sulphate})`,
    type: "number",
    minWidth: 180,
    editable: false,
    filterable: false
  },
  {
    field: "sulphide",
    headerName: `Sulphide (${Units.sulphide})`,
    type: "number",
    minWidth: 180,
    editable: false,
    filterable: false
  }
];
type ColumnField = (typeof columns)[number]["field"];
const useClient = () => {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};
const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};
const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((a: { [key in Key]: any }, b: { [key in Key]: any }) => number) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};
const Table = ({ data }: TableProps) => {
  const isClient = useClient();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<ColumnField>("date");
  // HACK: need to handle error when google api key isnt set
  const rows: Record<string, any>[] = (Array.isArray(data) ? data : []).map(
    (row, index) => ({
      ...row,
      id: index,
      date: new Date(row.date).toISOString().split("T")[0]
    })
  );

  const sortedRows: Record<string, any>[] = rows.slice().sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (orderBy === "date") {
      const dateA = new Date(aValue);
      const dateB = new Date(bValue);
      return order === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }

    return order === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (!isClient) return null;
  return (
    <StyledPaper>
      <TableContainer sx={{ maxHeight: 550, overflow: "auto" }}>
        <CustomTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  sx={{
                    minWidth: column.minWidth,
                    fontWeight: orderBy === column.field ? "bold" : "normal",
                    backgroundColor:
                      orderBy === column.field ? "#f5f5f5" : "#fff"
                  }}
                  sortDirection={orderBy === column.field ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.field}
                    direction={orderBy === column.field ? order : "asc"}
                    onClick={() => {
                      const isAsc = orderBy === column.field && order === "asc";
                      setOrder(isAsc ? "desc" : "asc");
                      setOrderBy(column.field);
                    }}
                  >
                    {column.headerName}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.field];
                    return (
                      <TableCell key={column.field}>
                        {column.field === "date"
                          ? new Date(value).toLocaleDateString("en-US", {
                              year: "2-digit",
                              month: "2-digit",
                              day: "2-digit"
                            })
                          : typeof value === "number"
                          ? value.toFixed(2)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </CustomTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100, 200, 260]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledPaper>
  );
};
const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: 600,
  overflow: "hidden",
  marginBottom: theme.spacing(4)
}));

export default Table;
