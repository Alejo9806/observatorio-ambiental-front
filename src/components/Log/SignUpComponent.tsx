import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { CircularProgress } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import { Dispatch,AnyAction } from 'redux';
import { signUp } from '../../redux/actions-creators/Login_action';
import {useHistory} from 'react-router-dom';

const theme = createTheme();

type Props = {
  auth:any,
  signUp: (logOn:any,history:any) => any,
}


interface IRegister {
  nombre:string,
  fechaNacimiento:Date,
  tipo:string,
  tipoDocumento:string,
  numeroDocumento:string,
  ubicacion:string,
  email:string,
  password:string
}

const SignUpComponent:React.FC<Props>  = (props) => {
    const {signUp,auth} = props;
    const[register,setRegister] = React.useState<IRegister>({nombre:'',fechaNacimiento:new Date(),tipo:'',tipoDocumento:'',numeroDocumento:'',ubicacion:'',email:'',password:''});
    const history = useHistory();

    const handleRegister = (e: React.ChangeEvent<HTMLInputElement>) =>{
        
      const nameInput = e.target.name;
      let value;
      value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setRegister({
          ...register,
          [nameInput]: value
      })
  }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (register.nombre !== '' && register.fechaNacimiento !== null  && register.tipo !== '' && register.tipoDocumento !== '' && register.numeroDocumento !== '' && register.ubicacion !== '' && register.email !== '' && register.password !== '') {
          signUp(register,history);
        }
      };
    
      return (
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://oab.ambientebogota.gov.co/wp-content/uploads/2021/06/Icono-3C.png)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Registrarse
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nombre"
                        label="Nombre Completo"
                        name="nombre"
                        autoComplete="nombre"
                        autoFocus
                        value={register.nombre}
                        onChange={handleRegister}
                    />
                    <TextField
                        margin="normal"
                        id="fechaNacimiento"
                        label="Fecha de nacimiento"
                        type="date"
                        name="fechaNacimiento"
                        value={register.fechaNacimiento}
                        fullWidth
                        autoFocus
                        autoComplete="fechaNacimiento"
                        onChange={handleRegister}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <FormControl fullWidth margin="normal">
                      <InputLabel id="tipo">Tipo</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="tipo"
                        type='select'
                        name='tipo'
                        label="Tipo"
                        value={register.tipo}
                        onChange={(event) => setRegister({...register , 'tipo':event.target.value as string})}
                      >
                        <MenuItem value="persona">Persona</MenuItem>
                      </Select>
                    </FormControl>
                     <FormControl fullWidth margin="normal">
                      <InputLabel id="tipoDocumento">Documento</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="tipoDocumento"
                        type='select'
                        name='tipoDocumento'
                        label="identificación"
                        value={register.tipoDocumento}
                        onChange={(event) => setRegister({...register , 'tipoDocumento':event.target.value as string})}
                      >
                        <MenuItem value="CC">CC</MenuItem>
                        <MenuItem value="NIT">NIT</MenuItem>
                        <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="numeroDocumento"
                        label="Numero de Documento"
                        name="numeroDocumento"
                        autoComplete="identification"
                        onChange={handleRegister}
                        autoFocus
                        value={register.numeroDocumento}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="email"
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleRegister}
                        autoFocus
                        value={register.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="ubicacion"
                        label="Ciudad"
                        name="ubicacion"
                        autoComplete="Ciudad"
                        onChange={handleRegister}
                        autoFocus
                        value={register.ubicacion}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        onChange={handleRegister}
                        id="password"
                        autoComplete="current-password"
                        value={register.password}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {auth.isLoading ?<CircularProgress color="secondary"/> : "Registrarse"}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/ingresar">
                                ¿Ya tienes una cuenta? Ingresar
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      );
};

const mapStatetoProps = (state:any) =>{
  return{
    auth:state.loggin
  }
}


const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) =>{
  return {
      signUp:(logOn:any,history:any) => {
          dispatch<any>(signUp(logOn,history));
      },
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(SignUpComponent);
