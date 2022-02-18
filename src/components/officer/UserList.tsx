import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Column {
    id: 'name' | 'actions' | 'city' | 'id' ;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    {id: 'id',label: 'Numero de identificacion', minWidth: 170,},
    { id: 'name', label: 'Nombre', minWidth: 170 },
    {id: 'city',label: 'Ciudad',minWidth: 170,},
    { id: 'actions', label: 'Acciones', minWidth: 100 },

  ];
  
  interface Data {
    id:number;
    name: string;
    city: string;
    actions: string;
  }
  
  function createData(
    id:number,
    name: string,
    city: string,
    actions: string,
  ): Data {
    return { id, name, city, actions };
  }
  
 
  

const UserList = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const rows = [
        createData(1324171354, 'Victor Daniel Mora Jaramillo', 'Bello', 'dasfas434531245'),
        createData(1403500365, 'Juan Diego Quintero', 'Marinilla', 'dasfas434531245'),
        createData(60483973, 'Alejandro Muñoz Acevedo', 'Envigado', 'dasfas434531245'),
        createData(1324171354, 'Victor Daniel Mora Jaramillo', 'Bello', 'dasfas434531245'),
        createData(1403500365, 'Juan Diego Quintero', 'Marinilla', 'dasfas434531245'),
        createData(60483973, 'Alejandro Muñoz Acevedo', 'Envigado', 'dasfas434531245'),
        createData(1324171354, 'Victor Daniel Mora Jaramillo', 'Bello', 'dasfas434531245'),
        createData(1403500365, 'Juan Diego Quintero', 'Marinilla', 'dasfas434531245'),
        createData(60483973, 'Alejandro Muñoz Acevedo', 'Envigado', 'dasfas434531245'),
        createData(1324171354, 'Victor Daniel Mora Jaramillo', 'Bello', 'dasfas434531245'),
        createData(1403500365, 'Juan Diego Quintero', 'Marinilla', 'dasfas434531245'),
        createData(60483973, 'Alejandro Muñoz Acevedo', 'Envigado', 'dasfas434531245'),
    ];

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop:2,height:'100%'}}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                              {column.id === 'actions' ? 
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" color='success'>Aceptar <CheckCircleIcon/></Button>
                                    <Button variant="contained" color='error'>Rechazar  <CancelIcon/></Button>
                                </Stack> : value}
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
          rowsPerPageOptions={[5, 10, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
}

export default UserList