import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import { signIn } from '../../redux/actions-creators/Login_action';
import { Dispatch,AnyAction } from 'redux';
import {useHistory} from 'react-router-dom';

type Props = {
    auth:any,
    signIn: (login:any,history:any) => any,
}


interface ILogin {
    email:string,
    password:string,
}


const theme = createTheme();

const SignInComponent:React.FC<Props> = (props) => {

    const {signIn,auth} = props;
    const history = useHistory();
    const [login,setLogin] = useState<ILogin>({email:'',password:''});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(login.email !== '' && login.password !==''){
            console.log(login);
            signIn(login,history);
        }
        
    };
    
    const handleLogin = (e:React.ChangeEvent<HTMLInputElement>) => {
        const nameInput = e.target.name;
        let value;
        value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setLogin({
            ...login,
            [nameInput]: value
        })
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
            backgroundImage: 'url(https://oab.ambientebogota.gov.co/wp-content/uploads/2021/06/Icono-2B.png)',
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
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Ingresar
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electronico"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleLogin}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleLogin}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                {auth.isLoading ?<CircularProgress color="secondary"/> : "Ingresar"}
                </Button>
                <Grid container>
                <Grid item>
                    <Link to="/registrarse">¿No tienes una cuenta? Registrarse </Link>
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
        signIn:(login:any,history:any) => {
            dispatch<any>(signIn(login,history)) 
        },
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(SignInComponent);
