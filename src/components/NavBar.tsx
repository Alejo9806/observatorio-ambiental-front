import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import {useHistory} from 'react-router-dom';
import { LogOutAuthAction } from '../redux/actions-creators/Login_action';

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
import { getAllComplaint, getApprovedComplaint, getEarringsComplaint } from '../redux/actions-creators/Complaint_action';

const pages = [{name:'Mapa',link:'/'},{name:'Ingresar',link:'/ingresar'}, {name:'Registrarse',link:'/registrarse'}];
const pagesIsLoggin = [{name:'Mapa',link:'/'}];
const pagesIslogginRoot = [{name:'Mapa',link:'/'},{name:'Usuarios',link:'/usuarios'}]
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
  getEarringsComplaint:(token:string) => any
}

const NavBar:React.FC<Props> = (props) => {
  const {auth,logOut,getAllComplaint,getApprovedComplaint,getEarringsComplaint} = props;
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
              {auth.isLoggedIn && auth.user.user.rol === 'PENDIENTE' ?  pagesIsLoggin.map((page,index) => (
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
            { auth.isLoggedIn && auth.user.user.rol === 'PENDIENTE' ?  pagesIsLoggin.map((page,index) => (
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
                <Typography className='navLink'  variant='body2' component='div' onClick={handleOpenSelectMenu}>denuncias</Typography>             
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
      // <div>
      //   {auth.isLoggedIn ?
      //     <ul>
      //       <li>
      //           <Link to='/' >Mapa  .</Link> 
      //           <button onClick={logOutClick}>Salir &nbsp;
      //               <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
      //               <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
      //               <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
      //               </svg>
      //           </button>
      //       </li>
      //     </ul>
      //   :
      //   <ul>
      //     <li>
      //         <Link to='/' >Mapa  .</Link> 
      //         <Link to='/ingresar' >Ingresar       .</Link>
      //         <Link to='/registrarse' >Registrarse    .</Link>
      //     </li>
      //   </ul>
      //   }
      // </div>
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
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(NavBar);
 