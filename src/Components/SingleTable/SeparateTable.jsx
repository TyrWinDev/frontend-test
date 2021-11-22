import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const SeparateTable = ({ data }) => {
  console.log(data);
  return (
    <TableBody>
      {data.bills.map((bill) => (
        <TableRow>
          {data.titles.map((title) => (
            <TableCell>{bill[title.key] ? bill[title.key] : '-'}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default SeparateTable;
