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
import { AnyAction, Dispatch } from 'redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { getAllComplaint, getApprovedComplaint, getEarringsComplaint, getRejectsComplaint, updateComplaintStatus } from '../../redux/actions-creators/Complaint_action';


type Props = {
    getAllComplaint:(token:string) => any,
    getApprovedComplaint:() => any,
    getEarringsComplaint:(token:string) => any,
    getRejectsComplaint:(token:string) => any,
    updateComplaintStatus: (complaintStatus:any,token:string) => any,
    getAllComplaintState:any,
    auth:any,
}

interface Column {
    id: 'title' | 'actions' | 'city' | 'findings' | 'state' | 'description' | 'type' | 'classe';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    {id: 'title',label: 'Titulo', minWidth: 170,},
    { id: 'description', label: 'Descripción', minWidth: 170 },
    {id: 'city',label: 'Ciudad',minWidth: 170,},
    {id: 'state', label: 'Estado', minWidth: 100 },
    {id: 'type',label: 'Tipo de seguimiento',minWidth: 170,},
    {id: 'findings', label: 'hallazgos', minWidth: 100 },
    {id: 'classe', label: 'Clase de seguimiento', minWidth: 100 },
    { id: 'actions', label: 'Acciones', minWidth: 100 },

  ];
  
  interface Data {
    title:string;
    description: string;
    city: string;
    state:string;
    type:string;
    findings:string;
    classe:string;
    actions: string;
  }
  
  function createData(
    title:string,
    description: string,
    city: string,
    state: string,
    type: string,
    findings: string,
    classe: string,
    actions: string,
  ): Data {
    return { title, description, city, state , type , findings , classe,actions };
  }
  
  


const ComplaintList: React.FC<Props>  = (props)=> {
    let rows: any[] = [];
    const {getAllComplaint,getApprovedComplaint,getEarringsComplaint,getRejectsComplaint,updateComplaintStatus,getAllComplaintState,auth} = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [effect,setEffect] = React.useState(true)
    const [filter, setFilter] = React.useState('TODAS');

    useEffect(() =>{
        if (filter === 'TODAS') {
            getAllComplaint(auth.user.token);
        } else if(filter === 'PENDIENTE') {
            getEarringsComplaint(auth.user.token);
        } else if(filter === 'APROBADA') {
            getApprovedComplaint();
        } else if(filter ===  'RECHAZADA'){
            getRejectsComplaint(auth.user.token);
        }
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[effect,filter]);

    if (Object.keys(getAllComplaintState.complaint).length !== 0 ) {
      if( getAllComplaintState.complaint.denuncias.length !== 0 ) { 
        getAllComplaintState.complaint.denuncias.forEach((complaint:any,index:any) =>{
            if(complaint.seguimiento.length !== 0){
                rows.push(createData(complaint.denuncia.titulo,complaint.denuncia.descripcion,complaint.ubicacion.ciudad,complaint.denuncia.estado,'','','',complaint._id))
            }else{
                rows.push(createData(complaint.denuncia.titulo,complaint.denuncia.descripcion,complaint.ubicacion.ciudad,complaint.denuncia.estado,'','','',complaint._id))
            }       
        })
      }
    }
  

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const acceptComplaint = (id:string) =>{
        console.log(id);
        let state ={
            id,
            status:"APROBADA"
        }
        updateComplaintStatus(state,auth.user.token);
        setEffect(!effect)
    }

    const rejectComplaint= (id:string) =>{
        console.log(id);
        let state ={
          id,
          status:"RECHAZADA"
        }
        updateComplaintStatus(state,auth.user.token);
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
                <MenuItem value={'TODAS'}>Todas las denuncias</MenuItem>
              <MenuItem value={'PENDIENTE'}>Pendientes</MenuItem>
              <MenuItem value={'APROBADA'}>Aprobadas</MenuItem>
              <MenuItem value={'RECHAZADA'}>Rechazadas</MenuItem>
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
                              {column.id === 'actions' && row.state === 'PENDIENTE' ? 
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" color='success' onClick={() => acceptComplaint(value)}>Aceptar <CheckCircleIcon/></Button>
                                    <Button variant="contained" color='error' onClick={() => rejectComplaint(value)}>Rechazar  <CancelIcon/></Button> 
                                </Stack> :
                                column.id === 'actions' && row.state === 'RECHAZADA' ? 
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" color='success' onClick={() => acceptComplaint(value)}>Aceptar <CheckCircleIcon/></Button>
                                </Stack> :
                                column.id === 'actions' && row.state === 'APROBADA' ? 
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" color='error' onClick={() => rejectComplaint(value)}>Rechazar  <CancelIcon/></Button> 
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
        getAllComplaintState:state.allComplaint,
        auth:state.loggin,
    }
  }
  
const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) =>{
    return {
        getAllComplaint:(token:string) => {
            dispatch<any>(getAllComplaint(token)) 
          },
          getApprovedComplaint:() => {
            dispatch<any>(getApprovedComplaint()) 
          },
          getEarringsComplaint:(token:string) => {
            dispatch<any>(getEarringsComplaint(token)) 
          },
          getRejectsComplaint:(token:string) =>{
            dispatch<any>(getRejectsComplaint(token))
          },
          updateComplaintStatus:(complaintStatus:any,token:string) =>{
            dispatch<any>(updateComplaintStatus(complaintStatus,token)) 
          }
    }
}

export default connect(mapStateProps,mapDispatchToProps)(ComplaintList)