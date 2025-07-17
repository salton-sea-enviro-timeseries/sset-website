import React from "react";
import { SiteData } from "types";
import Paper from "@mui/material/Paper";
import { Units } from "types";
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
    filterable: false,
    hidden: true
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

const renderCellValue = (field: string, value: any) => {
  if (field === "date") {
    return new Date(value).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit"
    });
  }
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value;
};
const getSortedRows = (
  rows: Record<string, any>[],
  orderBy: string,
  order: "asc" | "desc"
) => {
  return rows.slice().sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (orderBy === "date") {
      return order === "asc"
        ? new Date(aValue).getTime() - new Date(bValue).getTime()
        : new Date(bValue).getTime() - new Date(aValue).getTime();
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }

    return order === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
};
const Table = ({ data }: TableProps) => {
  const isClient = useClient();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
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

  const sortedRows = getSortedRows(rows, orderBy, order);
  const visibleColumns = columns.filter((c) => !c.hidden);
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
              {visibleColumns.map((column) => (
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
                  {visibleColumns.map((column) => {
                    const value = row[column.field];
                    return (
                      <TableCell key={column.field}>
                        {renderCellValue(column.field, value)}
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
        slotProps={{
          select: {
            inputProps: {
              id: "rows-per-page",
              name: "rowsPerPage"
            }
          }
        }}
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
