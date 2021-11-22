import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { tableCellStyle } from './MultiTableStyles';

const MultiTable = ({ data }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 1000 }} aria-label='simple-table'>
      <TableHead>
        <TableRow>
          {data.titles.map((title) => (
            <TableCell style={tableCellStyle}>
              <strong>{title.name}</strong>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.bills.map((bill) => (
          <TableRow>
            {data.titles.map((title) => (
              <TableCell style={tableCellStyle}>
                {bill[title.key] ? bill[title.key] : '-'}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default MultiTable;
