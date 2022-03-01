import React,{useState} from 'react'
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

const theme = createTheme();

type Props = {
  auth:any,
  registerTracking:(tracking:any,token:string,history:any) => any,
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
  const {registerTracking,auth} = props;
  const[tracking,setTracking] = useState<ITracking>({typeTracking:'',tipo:'',fechaActuacion:new Date(),hallazgos:''});
  const {id} = useParams<QuizParams>();
  const history = useHistory();

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
      <Grid
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
        Departamento:
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Ciudad: 
        </Typography>
        <br />
        <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft:3}}>
        Denuncia  
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Titulo: 
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Fecha de generacion de la denuncia: 
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Fecha ultima actualizacion de denuncia:
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Descripcion: 
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Estado: 
        </Typography>
        <br />
        <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft:3}}>
        Piraguero
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Praguero denunciante: 
        </Typography>
      </Grid>
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
    auth:state.loggin
  }
}


const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) =>{
  return {
      registerTracking:(tracking:any,token:string,history:any) => {
          dispatch<any>(registerTracking(tracking,token,history));
      },
  }
}


export default connect(mapStatetoProps,mapDispatchToProps)(FollowUpComplaints)