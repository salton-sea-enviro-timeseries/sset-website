import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table as MuiTable } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Data } from "types";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

interface TableProps {
  data: Data;
}

const formatValue = (value: number) => {
  if (!value) return "";
  return value.toFixed(2);
};

export default function Table(props: TableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <MuiTable
        className={classes.table}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Station</TableCell>
            <TableCell align="right">Lat.</TableCell>
            <TableCell align="right">Lon.</TableCell>
            <TableCell align="right">Salinity</TableCell>
            <TableCell align="right">Temperature</TableCell>
            <TableCell align="right">pH</TableCell>
            <TableCell align="right">Turbitdity</TableCell>
            <TableCell align="right">Dissolved Oxygen</TableCell>
            <TableCell align="right">Chlorophyll</TableCell>
            <TableCell align="right">Phycoerythrin</TableCell>
            <TableCell align="right">Nitrate</TableCell>
            <TableCell align="right">Ammonia</TableCell>
            <TableCell align="right">Phosphate</TableCell>
            <TableCell align="right">Sulphate</TableCell>
            <TableCell align="right">Sulphide</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(props.data).map((row) => (
            <TableRow key={row.site}>
              <TableCell component="th" scope="row">
                {row.site}
              </TableCell>
              <TableCell align="right">{row.latitude}</TableCell>
              <TableCell align="right">{row.longitude}</TableCell>
              <TableCell align="right">{formatValue(row.salinity)}</TableCell>
              <TableCell align="right">
                {formatValue(row.water_temperature)}
              </TableCell>
              <TableCell align="right">{formatValue(row.ph)}</TableCell>
              <TableCell align="right">{formatValue(row.turbidity)}</TableCell>
              <TableCell align="right">
                {formatValue(row.dissolved_oxygen)}
              </TableCell>
              <TableCell align="right">
                {formatValue(row.chlorophyll)}
              </TableCell>
              <TableCell align="right">
                {formatValue(row.phycoerythrin)}
              </TableCell>
              <TableCell align="right">{formatValue(row.nitrate)}</TableCell>
              <TableCell align="right">{formatValue(row.ammonia)}</TableCell>
              <TableCell align="right">
                {formatValue(row.phosphate_hr)}
              </TableCell>
              <TableCell align="right">{formatValue(row.sulphate)}</TableCell>
              <TableCell align="right">{formatValue(row.sulphide)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
