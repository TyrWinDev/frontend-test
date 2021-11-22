import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';
import { tableCellStyle, root } from './SingleTableStyles';

const SingleTable = ({ data }) => {
  const useStyles = makeStyles({
    root,
    label: {
      textTransform: 'capitalize',
    },
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label='simple-table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Descripcion</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.titles.map((title, index) => (
            <TableRow key={index}>
              <TableCell style={tableCellStyle}>
                <strong>{title.name}</strong>
              </TableCell>
              <TableCell style={tableCellStyle}>
                {data.bills[0][title.key] ? data.bills[0][title.key] : '-'}
                {console.log(data.titles)}
                {console.log(data.bills)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SingleTable;
