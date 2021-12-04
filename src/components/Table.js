import * as React from 'react';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow} from '@material-ui/core';

const columns = [
  { id: 'country', label: 'Country', minWidth: 170, backgroundColor:'red',
    color:'#fff',
    fontSize:'18px',},
  { id: 'cases', label: 'Cases', minWidth: 100,backgroundColor:'red',
    color:'#fff',
    fontSize:'18px',format: (value) => value.toLocaleString('en-US'), },
  {
    id: 'active',
    label: 'Active',
    minWidth: 170,
    align: 'right',
    backgroundColor:'red',
    color:'#fff',
    fontSize:'18px',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'deaths',
    label: 'Deaths',
    minWidth: 170,
    align: 'right',
    backgroundColor:'red',
    color:'#fff',
    fontSize:'18px',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'recovered',
    label: 'Recovered',
    minWidth: 170,
    align: 'right',
    backgroundColor:'red',
    color:'#fff',
    fontSize:'18px',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function TableData({countries}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,backgroundColor:column.backgroundColor,color:column.color,fontSize:column.fontSize }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {countries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={countries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableData