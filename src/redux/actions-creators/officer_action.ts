import Swal from 'sweetalert2';
import {ActionTypeOfficer } from "../action-types";
import { Dispatch } from "redux";
import axios from "axios";

const getPiraguerosStatus = (status:string,token:string) =>{
    return async (dispatch: Dispatch) => {
        dispatch(getPiraguerosStatusLoading());
        try {
            await axios.get('http://localhost:4000/api/v1/piragueros/'+status,{headers:{'x-auth-token':token}})
                .then(resp =>{
                    const {data} = resp;
                    dispatch({type:ActionTypeOfficer.GET_PIRAGUEROS_SUCCESS,payload:data});
                })
           
        } catch (error:any) {
            Swal.fire({
                text:error.response.data.message,
                icon:"error",
            })
            dispatch({type:ActionTypeOfficer.GET_PIRAGUEROS_FAIL,payload:error.response.data.msg});
        }
    }
}

const getPiraguerosStatusLoading = () =>({
    type: ActionTypeOfficer.GET_PIRAGUEROS_LOADING
});

const updatePiragueroStatus = (status:any,token:string) =>{
    return async (dispatch: Dispatch) => {
        try {
            await axios.put('http://localhost:4000/api/v1/piraguero/updatestatus',status,{headers:{'x-auth-token':token}})
                .then(resp =>{
                    const {data} = resp;
                    dispatch({type:ActionTypeOfficer.UPDATE_PIRAGUERO_SUCCESS,payload:data});
                })
           
        } catch (error:any) {
            Swal.fire({
                text:error.response.data.message,
                icon:"error",
            })
            dispatch({type:ActionTypeOfficer.UPDATE_PIRAGUERO_FAIL,payload:error.response.data.msg});
        }
    }
}

const registerTracking = (tracking:any,token:string,history:any) => {
    return async (dispatch:Dispatch) => {
        try {
            await axios.put('http://5010-2800-484-9498-1901-99b-736f-4373-1071.ngrok.io/api/v1/denuncia/seguimiento',tracking,{headers:{'x-auth-token':token}})
                .then(resp => {
                    const {data} = resp;
                    dispatch({type:ActionTypeOfficer.REGISTER_TRACKING_SUCCESS,payload:data});
                    history.push("/")
                })          
        } catch (error:any) {
            Swal.fire({
                text:error.response.data.message,
                icon:"error",
            })
            dispatch({type:ActionTypeOfficer.REGISTER_TRACKING_FAIL,payload:error});
        }
    }
}

export {getPiraguerosStatus,updatePiragueroStatus,registerTracking}
