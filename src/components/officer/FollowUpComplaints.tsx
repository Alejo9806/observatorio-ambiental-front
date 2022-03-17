import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch,AnyAction } from 'redux';
import { useParams } from "react-router-dom";
import { registerTracking } from '../../redux/actions-creators/officer_action';
import { getComplaint } from '../../redux/actions-creators/Complaint_action';

const theme = createTheme();

type Props = {
  auth:any,
  registerTracking:(tracking:any,token:string,history:any) => any,
  getComplaintId:(id:string) => any,
  complaint:any
}

interface ITracking {
  typeTracking:string,
  tipo:string,
  fechaActuacion:Date,
  hallazgos:string,
}
type QuizParams = {
  id: string;
};

const FollowUpComplaints:React.FC<Props> = (props)=> {
  const {registerTracking,auth,complaint,getComplaintId} = props;
  const[tracking,setTracking] = useState<ITracking>({typeTracking:'',tipo:'',fechaActuacion:new Date(),hallazgos:''});
  const {id} = useParams<QuizParams>();
  const history = useHistory();

  useEffect(()=>{
    getComplaintId(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id])

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        
    const nameInput = e.target.name;
    let value;
    value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setTracking({
        ...tracking,
        [nameInput]: value
    })
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (tracking.typeTracking !== '' || tracking.tipo !== '' || tracking.fechaActuacion !== null || tracking.hallazgos !== '' ) {
        const token = auth.user.token;
        let newTracking = {
          idDenuncia: id,
          seguimiento:{
            tipo:tracking.tipo,
            fechaActuacion:tracking.fechaActuacion,
            hallazgos:tracking.hallazgos,
            adjuntos:[],
            clase:tracking.typeTracking,
            encargado:auth.user.user.nombre,
          }
        };
        console.log(newTracking);
        registerTracking(newTracking,token,history)    
      }
    };
  return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      {Object.keys(complaint.complaint).length !== 0 ? <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{padding:3}}
      >
        <Typography component="h1" variant="h4" align='center' sx={{paddingLeft:3}}>
        Información denuncia
        </Typography>
        <br />
        <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft:3}}>
        Ubicacion
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Departamento: {complaint.complaint.denuncia.ubicacion.departamento}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Ciudad: {complaint.complaint.denuncia.ubicacion.ciudad}
        </Typography>
        <br />
        <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft:3}}>
        Denuncia  
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Titulo: {complaint.complaint.denuncia.denuncia.titulo}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Fecha de generacion de la denuncia: {complaint.complaint.denuncia.denuncia.fechaCreacion.slice(0,10)}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Fecha ultima actualizacion de denuncia: {complaint.complaint.denuncia.denuncia.fechaUltimaActualizacion.slice(0,10)}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Descripcion: {complaint.complaint.denuncia.denuncia.descripcion}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Estado: {complaint.complaint.denuncia.denuncia.estado}
        </Typography>
        <br />
        <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft:3}}>
        Piraguero
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Praguero denunciante: {complaint.complaint.denuncia.piraguero.nombre}
        </Typography>
        {complaint.complaint.denuncia.warning && 
        <Typography variant="body2" color="text.secondary">
          Cuidado: {complaint.complaint.denuncia.denuncia.warning.message}
        </Typography>}
        <br />
        <Typography gutterBottom variant="h5" color="text.secondary"sx={{paddingLeft:3}}>
                Seguimiento
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={{paddingLeft:3}}>
                Total de seguimientos: {complaint.complaint.denuncia.seguimiento.length}
        </Typography>
        {complaint.complaint.denuncia.seguimiento.length !== 0 ? complaint.complaint.denuncia.seguimiento.map((seguimiento:any,index:number)=>(
            <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{padding:3}}
            key={index}
            >
              <hr />
              <Typography variant="body2" color="text.secondary">
                Clase de seguimiento: {seguimiento.clase}
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                Tipo de seguimiento: {seguimiento.tipo}
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                Fecha de actuación: {seguimiento.fechaActuacion.slice(0,10)}
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                Retroalimentación: {seguimiento.hallazgos}
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                Encargado: {seguimiento.encargado}
              </Typography>
            </Grid>
        ))     
        : null}
      </Grid>:null}
      <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Typography component="h1" variant="h5">
            Seguimiento
            </Typography>
            <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} > 
              <FormControl fullWidth margin="normal">
                  <InputLabel id="typeTracking">Clase</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="typeTracking"
                    type='select'
                    name='typeTracking'
                    label="Clase"
                    onChange={(event) => setTracking({...tracking , 'typeTracking':event.target.value as string})}
                    value={tracking.typeTracking}
                  >
                    <MenuItem value="SEGUIMIENTO">SEGUIMIENTO</MenuItem>
                    <MenuItem value="CIERRE">CIERRE</MenuItem>
                    <MenuItem value="SOLUCION">SOLUCIÓN</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="tipo">Tipo de seguimiento</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="tipo"
                    type='select'
                    name='tipo'
                    label="Tipo de seguimiento"
                    onChange={(event) => setTracking({...tracking , 'tipo':event.target.value as string})}
                    value={tracking.tipo}
                  >
                    <MenuItem value="AMBIENTAL">AMBIENTAL</MenuItem>
                    <MenuItem value="SOCIAL">SOCIAL</MenuItem>
                    <MenuItem value="LEGAL">LEGAL</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  id="fechaActuacion"
                  label="Fecha de actuación"
                  type="date"
                  name="fechaActuacion"
                  fullWidth
                  autoFocus
                  autoComplete="fechaActuacion"
                  onChange={handlechange}
                  value={tracking.fechaActuacion}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                 <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="hallazgos"
                    label="Hallazgos"
                    name="hallazgos"
                    autoComplete="tracking"
                    autoFocus
                    multiline
                    rows={4}
                    maxRows={4}
                    onChange={handlechange}
                    value={tracking.hallazgos}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Enviar seguimiento
                </Button>
            </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
  );
}

const mapStatetoProps = (state:any) =>{
  return{
    auth:state.loggin,
    complaint:state.complaintId
  }
}


const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) =>{
  return {
      registerTracking:(tracking:any,token:string,history:any) => {
          dispatch<any>(registerTracking(tracking,token,history));
      },
      getComplaintId:(id:string) =>{
        dispatch<any>(getComplaint(id));
      }
  }
}


export default connect(mapStatetoProps,mapDispatchToProps)(FollowUpComplaints)