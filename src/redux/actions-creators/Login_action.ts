import { ActionTypeLogin } from "../action-types";
import { Dispatch } from "redux";
import axios from "axios";
import Swal from 'sweetalert2';

const signIn = (login:any,history:any) =>{
    return async (dispatch:Dispatch) => {
        dispatch(signInActionLoading());
        try {
            console.log(login)
            await axios.post('http://localhost:4000/api/v1/piraguero/loggin',login)
                .then(resp => {
                    const {data} = resp;
                    console.log(data);
                    dispatch({type:ActionTypeLogin.LOGGIN_SUCCESS,payload:data});
                    history.push("/")
                })        
        } catch (error:any) {
            console.log(error.response.data.msg)
            Swal.fire({
                text:error.response.data.msg,
                icon:"error",
            })
            dispatch({type:ActionTypeLogin.LOGGIN_FAIL,payload:error});
        }
    }
}

const signUp = (logOn:any,history:any) => {
    return async (dispatch:Dispatch) =>{
        dispatch(signUpActionLoading());
        try {console.log(logOn)
            await axios.post('http://localhost:4000/api/v1/piraguero',logOn)
                .then(resp => {
                    const {data} = resp;
                    console.log(data);
                    dispatch({type:ActionTypeLogin.LOGGON_SUCCESS,payload:data});
                    history.push("/")
                }) 
        } catch (error:any) {
            console.log(error.response.data.msg)
            Swal.fire({
                text:error.response.data.msg,
                icon:"error",
            })
            dispatch({type:ActionTypeLogin.LOGGIN_FAIL,payload:error});
        }
    }
}

const signInActionLoading = () =>({
    type: ActionTypeLogin.LOGGIN_LOADING
});


const signUpActionLoading = () =>({
    type: ActionTypeLogin.LOGGON_LOADING
});

const LogOutAuthAction = (history:any) =>{
    return async (dispatch:Dispatch) => {
        try {
            dispatch({type:ActionTypeLogin.LOGOUT_SUCCESS,payload:{}});
            history.push("/")
        } catch (error:any) {
            console.log(error.response)
            dispatch({type:ActionTypeLogin.LOGOUT_FAIL,payload:{}});
        }
    }
}

export {signIn,LogOutAuthAction,signUp}