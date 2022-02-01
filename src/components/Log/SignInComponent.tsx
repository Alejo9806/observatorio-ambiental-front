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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import { signIn } from '../../redux/actions-creators/Login_action';
import { Dispatch,AnyAction } from 'redux';
import {useHistory} from 'react-router-dom';

type Props = {
    signIn: (login:any,history:any) => any,
}


interface ILogin {
    email:string,
    password:string,
}


const theme = createTheme();

const SignInComponent:React.FC<Props> = (props) => {

    const {signIn} = props;
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1640975532489-a21f4e352ac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MzY2ODgwNQ&ixlib=rb-1.2.1&q=80&w=1080)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
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
                Sign in
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
                Sign In
                </Button>
                <Grid container>
                <Grid item>
                    <Link to="/registrarse">Don't have an account? Sign Up </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Grid>
        </Grid>
    </ThemeProvider>
    );
};

const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) =>{
    return {
        signIn:(login:any,history:any) => {
            dispatch<any>(signIn(login,history)) 
        },
    }
}

export default connect(null, mapDispatchToProps)(SignInComponent);
