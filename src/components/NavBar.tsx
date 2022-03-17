import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import {useHistory} from 'react-router-dom';
import { LogOutAuthAction } from '../redux/actions-creators/Login_action';
import { getAllComplaint, getApprovedComplaint, getEarringsComplaint, getRejectsComplaint } from '../redux/actions-creators/Complaint_action';

//Mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';



const pages = [{name:'Indicadores',link:'/'},{name:'Mapa',link:'/mapa'},{name:'Ingresar',link:'/ingresar'}, {name:'Registrarse',link:'/registrarse'}];
const pagesIsLoggin = [{name:'Indicadores',link:'/'},{name:'Mapa',link:'/mapa'}];
const pagesIslogginRoot = [{name:'Indicadores',link:'/'},{name:'Mapa',link:'/mapa'},{name:'Usuarios',link:'/usuarios'},{name:'Administrar denuncias',link:'/denuncias'}]
const settings = ['Logout'];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

type Props = {
  auth:any,
  logOut:(history:any) => any,
  getAllComplaint:(token:string) => any,
  getApprovedComplaint:() => any,
  getEarringsComplaint:(token:string) => any,
  getRejectsComplaint:(token:string) => any
}

const NavBar:React.FC<Props> = (props) => {
  const {auth,logOut,getAllComplaint,getApprovedComplaint,getEarringsComplaint,getRejectsComplaint} = props;
  const history = useHistory();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorSelect, setAnchorSelect] = React.useState<null | HTMLElement>(null);

  const logOutClick = () =>{
    logOut(history);
    getApprovedComplaint()
  }
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenSelectMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorSelect(event.currentTarget);
  };

  const handleCloseSelectMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorSelect(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getAll = () =>{
    getAllComplaint(auth.user.token)
  }
  const getApproved = () =>{
    getApprovedComplaint()
  }
  const getEarrings = () =>{
    getEarringsComplaint(auth.user.token)
  }

  const getRejects = () =>{
    getRejectsComplaint(auth.user.token)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar 
           sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <img src="assets/img/Icono-3C.png" alt="" width='100%' height='100%'/>
          </Avatar>  
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {auth.isLoggedIn && (auth.user.user.rol === 'PENDIENTE' || auth.user.user.rol === 'PIRAGUERO' || auth.user.user.rol === 'RECHAZADA') ?  pagesIsLoggin.map((page,index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link className='navLinkR' to={page.link} >{page.name}</Link></Typography>
                </MenuItem>
              )) :auth.isLoggedIn && auth.user.user.rol === 'ROOT'  ? pagesIslogginRoot.map((page,index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link className='navLinkR' to={page.link} >{page.name}</Link></Typography>
                </MenuItem>
                ))
                : pages.map((page,index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link className='navLinkR' to={page.link} >{page.name}</Link></Typography>
                </MenuItem>
              ))}
              {auth.isLoggedIn && auth.user.user.rol === 'ROOT'  ?
              <Box>
              <MenuItem
                sx={{color: 'white', display: 'block' }}
               
              >
                <Typography className='navLink'  textAlign="center" onClick={handleOpenSelectMenu}>Denuncias  <ArrowDropDownIcon sx={{ fontSize: 10}} /> </Typography>      
              </MenuItem>
              <Menu
               sx={{ mt: '45px' }}
               id="menu-appbar"
               anchorEl={anchorSelect}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               open={Boolean(anchorSelect)}
               onClose={handleCloseSelectMenu}
              > 
                <MenuItem onClick={handleCloseSelectMenu}>
                  <Typography textAlign="center" onClick={getAll}>Todas las denuncias</Typography>
                </MenuItem> 
                <MenuItem onClick={handleCloseSelectMenu}>
                  <Typography textAlign="center" onClick={getEarrings}>Pendientes</Typography>
                </MenuItem> 
                <MenuItem onClick={handleCloseSelectMenu}>
                  <Typography textAlign="center" onClick={getApproved}>Aprobadas</Typography>
                </MenuItem> 
                <MenuItem onClick={handleCloseSelectMenu}>
                  <Typography textAlign="center" onClick={getRejects}>Rechazadas</Typography>
                </MenuItem> 
              </Menu> 
            </Box>
            : null}
            </Menu>

          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            OBSERVAOTRIO ALMAVI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            { auth.isLoggedIn && (auth.user.user.rol === 'PENDIENTE' || auth.user.user.rol === 'PIRAGUERO' || auth.user.user.rol === 'RECHAZADA') ?  pagesIsLoggin.map((page,index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link className='navLink' to={page.link} >{page.name}</Link>             
              </Button>
            )) : auth.isLoggedIn && auth.user.user.rol === 'ROOT'  ? pagesIslogginRoot.map((page,index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link className='navLink' to={page.link} >{page.name}</Link>             
              </Button>
              ))
              :pages.map((page,index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link className='navLink' to={page.link} >{page.name}</Link>             
              </Button>
            ))}
            {auth.isLoggedIn && auth.user.user.rol === 'ROOT'  ?
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
               
              >
                <Typography className='navLink'  variant='body2' component='div' onClick={handleOpenSelectMenu}>denuncias <ArrowDropDownIcon sx={{ fontSize: 10}} />  </Typography>      
              </Button>
              <Menu
               sx={{ mt: '45px' }}
               id="menu-appbar"
               anchorEl={anchorSelect}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               open={Boolean(anchorSelect)}
               onClose={handleCloseSelectMenu}
              > 
                <MenuItem onClick={handleCloseSelectMenu}>
                  <Typography textAlign="center" onClick={getAll}>Todas las denuncias</Typography>
                </MenuItem> 
                <MenuItem onClick={handleCloseSelectMenu}>
                  <Typography textAlign="center" onClick={getEarrings}>Pendientes</Typography>
                </MenuItem> 
                <MenuItem onClick={handleCloseSelectMenu}>
                  <Typography textAlign="center" onClick={getApproved}>Aprobadas</Typography>
                </MenuItem> 
                <MenuItem onClick={handleCloseSelectMenu}>
                  <Typography textAlign="center" onClick={getRejects}>Rechazadas</Typography>
                </MenuItem> 
                
              </Menu> 
            </Box>
            : null}
          </Box>
      
         {auth.isLoggedIn && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp"><AccountCircle/></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={logOutClick}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
      </AppBar>
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
      logOut: (history:any) =>{
          dispatch<any>(LogOutAuthAction(history))
      },
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
      }
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(NavBar);
 