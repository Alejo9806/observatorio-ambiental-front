import React,{useEffect} from 'react'
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
import { connect } from 'react-redux';
import { getPiraguerosStatus, updatePiragueroStatus } from '../../redux/actions-creators/officer_action';
import { AnyAction, Dispatch } from 'redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'

type Props = {
  getPiraguerosStatus: (status:string,token:string) => any,
  updatePiragueroStatus:(status:any,token:string) => any,
  piraguerosState:any,
  auth:any,
}

interface Column {
    id: 'name' | 'actions' | 'city' | 'id' | 'rol' ;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    {id: 'id',label: 'Numero de identificacion', minWidth: 170,},
    { id: 'name', label: 'Nombre', minWidth: 170 },
    {id: 'city',label: 'Ciudad',minWidth: 170,},
    {id: 'rol', label: 'Rol', minWidth: 100 },
    { id: 'actions', label: 'Acciones', minWidth: 100 },

  ];
  
  interface Data {
    id:number;
    name: string;
    city: string;
    rol:string;
    actions: string;
  }
  
  function createData(
    id:number,
    name: string,
    city: string,
    rol: string,
    actions: string,
  ): Data {
    return { id, name, city, rol ,actions };
  }
  
  
  

const UserList: React.FC<Props>  = (props) => {
    let rows: any[] = [];
    const {getPiraguerosStatus,updatePiragueroStatus,piraguerosState,auth} = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [effect,setEffect] = React.useState(true)
    const [filter, setFilter] = React.useState('PENDIENTE');

    useEffect(() =>{
        getPiraguerosStatus(filter,auth.user.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[effect,filter]);

    if (Object.keys(piraguerosState.piragueros).length !== 0 ) {
      piraguerosState.piragueros.piragueros.forEach((piraguero:any) =>{
        rows.push(createData(piraguero.numeroDocumento,piraguero.nombre,piraguero.ubicacion,piraguero.rol,piraguero._id))
      })
    }
  

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const acceptPiraguero = (id:string) =>{
      console.log(id);
      let state ={
        id,
        status:"PIRAGUERO"
      }
      updatePiragueroStatus(state,auth.user.token);
      setEffect(!effect)
    }

    const rejectPiraguero = (id:string) =>{
      console.log(id)
      let state ={
        id,
        status:"RECHAZADA"
      }
      updatePiragueroStatus(state,auth.user.token);
      setEffect(!effect)
    }

    const handleChange = (event: SelectChangeEvent) => {
      setFilter(event.target.value as string);
      console.log(filter);
    };

    return (
      <Paper sx={{ width: '90%', marginTop:4,height:'100%',alignSelf:'center',alignItems:'center', marginLeft:7}}>
        <Box sx={{ minWidth: 300 }}>
          <FormControl sx={{minWidth: 300 }}>
            <InputLabel id="demo-simple-select-label">Filtrar</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filtrar"
              onChange={handleChange}
            >
              <MenuItem value={'PENDIENTE'}>Pendientes</MenuItem>
              <MenuItem value={'PIRAGUERO'}>Piragueros</MenuItem>
              <MenuItem value={'RECHAZADA'}>Rechazados</MenuItem>
              <MenuItem value={'FUNCIONARIO'}>Funcionarios</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TableContainer sx={{ maxHeight: 440,marginTop:5}}>
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.actions}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                              {column.id === 'actions' && row.rol === 'PENDIENTE' ? 
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" color='success' onClick={() => acceptPiraguero(value)}>Aceptar <CheckCircleIcon/></Button>
                                    <Button variant="contained" color='error' onClick={() => rejectPiraguero(value)}>Rechazar  <CancelIcon/></Button> 
                                </Stack> : 
                                column.id === 'actions' && row.rol === 'RECHAZADA' ? 
                                <Stack spacing={2} direction="row">
                                  <Button variant="contained" color='success' onClick={() => acceptPiraguero(value)}>Aceptar <CheckCircleIcon/></Button>
                                </Stack> : 
                                column.id === 'actions' && row.rol === 'FUNCIONARIO' ?
                                  <div>
                                    Es funcionario
                                  </div>
                                : column.id === 'actions' && row.rol === 'PIRAGUERO' ? 
                                <Stack spacing={2} direction="row">
                                  <Button variant="contained" color='error' onClick={() => rejectPiraguero(value)}>Rechazar  <CancelIcon/></Button> 
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

const mapStateProps = (state:any) =>{
  return{
      piraguerosState:state.piragueros,
      auth:state.loggin,
  }
}

const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) =>{
  return {
      getPiraguerosStatus:(status:string,token:string) => {
          dispatch<any>(getPiraguerosStatus(status,token)) 
      },
      updatePiragueroStatus:(status:any,token:string) =>{
        dispatch<any>(updatePiragueroStatus(status,token)) 
      }
  }
}

export default connect(mapStateProps,mapDispatchToProps)(UserList)