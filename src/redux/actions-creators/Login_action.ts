import { ActionTypeLogin } from "../action-types";
import { Dispatch } from "redux";
import axios from "axios";

const signIn = (login:any,history:any) =>{
    return async (dispatch:Dispatch) => {
        try {
            console.log(login)
            await axios.post('http://localhost:4000/api/v1/piraguero/loggin',login)
                .then(resp => {
                    const {data} = resp;
                    console.log(data);
                    dispatch({type:ActionTypeLogin.LOGGIN_SUCCESS,payload:data});
                    history.push("/")
                })
                .catch(error =>{
                    console.log(error)
                    dispatch({type:ActionTypeLogin.LOGGIN_FAIL,payload:error});
                })
            
        } catch (error:any) {
            console.log(error)
            dispatch({type:ActionTypeLogin.LOGGIN_FAIL,payload:error});
        }
    }
}

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

export {signIn,LogOutAuthAction}