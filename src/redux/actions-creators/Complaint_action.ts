// import axios from 'axios';
// import Swal from 'sweetalert2';
import { ActionTypeComplaint } from "../action-types";
import { Dispatch } from "redux";
import axios from "axios";

const getAllComplaint = () =>{
    return async (dispatch: Dispatch) => {
        try {
            await axios.get('http://localhost:4000/api/v1/denuncias')
                .then(resp =>{
                    const {data} = resp;
                    dispatch({type:ActionTypeComplaint.GET_ALL_COMPLAINT_SUCCESS,payload:data});
                })
           
        } catch (error:any) {
            dispatch({type:ActionTypeComplaint.GET_ALL_COMPLAINT_FAIL,payload:{}});
        }
    }
}

const registerComplaint = (complaintState:any,token:string) => {
    return async (dispatch:Dispatch) => {
        try {
            console.log(complaintState,token)
            await axios.post('http://localhost:4000/api/v1/denuncia',complaintState,{headers:{'x-auth-token':token}})
                .then(resp => {
                    const {data} = resp;
                    dispatch({type:ActionTypeComplaint.REGISTER_COMPLAINT_SUCCESS,payload:data});
                })
                .catch(error =>{
                    dispatch({type:ActionTypeComplaint.REGISTER_COMPLAINT_FAIL,payload:error});
                })
            
        } catch (error:any) {
            dispatch({type:ActionTypeComplaint.REGISTER_COMPLAINT_FAIL,payload:error});
        }
    }
}


const getAddress = (lat:number,lon:number) => {
    return async (dispatch:Dispatch) => {
        try {
            await axios.post('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+lon+'&lon='+lat)
                .then(resp => {
                    const {data} = resp;
                    dispatch({type:ActionTypeComplaint.GET_ADDRESS_SUCCESS,payload:data});
                })
            
        } catch (error:any) {
            dispatch({type:ActionTypeComplaint.GET_ADDRESS_FAIL,payload:error});
        }
    }
}

export {getAllComplaint,registerComplaint,getAddress}
