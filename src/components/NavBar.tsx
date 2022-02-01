import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import {useHistory} from 'react-router-dom';
import { LogOutAuthAction } from '../redux/actions-creators/Login_action';

type Props = {
  auth:any,
  logOut:(history:any) => any
}

const NavBar:React.FC<Props> = (props) => {
  const {auth,logOut} = props;
  const history = useHistory();

  const logOutClick = () =>{
    logOut(history);
}

  return (
      <div>
        {auth.isLoggedIn ?
          <ul>
            <li>
                <Link to='/' >Mapa  .</Link> 
                <button onClick={logOutClick}>Salir &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                </button>
            </li>
          </ul>
        :
        <ul>
          <li>
              <Link to='/' >Mapa  .</Link> 
              <Link to='/ingresar' >Ingresar       .</Link>
              <Link to='/registrarse' >Registrarse    .</Link>
          </li>
        </ul>
        }
      </div>
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
      }
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(NavBar);
 