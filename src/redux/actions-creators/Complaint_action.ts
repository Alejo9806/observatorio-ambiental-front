import Swal from 'sweetalert2';
import { ActionTypeComplaint } from "../action-types";
import { Dispatch } from "redux";
import axios from "axios";


const getComplaint = (id:string) =>{
    return async (dispatch: Dispatch) => {
        try {
            await axios.get('https://radiant-earth-57283.herokuapp.com/api/v1/denuncia/id/'+id)
                .then(resp =>{
                    const {data} = resp;
                    dispatch({type:ActionTypeComplaint.GET_COMPLAINT_SUCCESS,payload:data});
                })
           
        } catch (error:any) {
            Swal.fire({
                text:error.response.data.message,
                icon:"error",
            })
            dispatch({type:ActionTypeComplaint.GET_COMPLAINT_FAIL,payload:error});
        }
    }
}


const getAllComplaint = (token:string) =>{
    return async (dispatch: Dispatch) => {
        try {
            await axios.get('https://radiant-earth-57283.herokuapp.com/api/v1/denuncias',{headers:{'x-auth-token':token}})
                .then(resp =>{
                    const {data} = resp;
                    dispatch({type:ActionTypeComplaint.GET_ALL_COMPLAINT_SUCCESS,payload:data});
                })
           
        } catch (error:any) {
            dispatch({type:ActionTypeComplaint.GET_ALL_COMPLAINT_FAIL,payload:{}});
        }
    }
}

const getApprovedComplaint = () =>{
    return async (dispatch: Dispatch) => {
        try {
            await axios.get('https://radiant-earth-57283.herokuapp.com/api/v1/denuncias/aprobadas')
                .then(resp =>{
                    const {data} = resp;
                    console.log(data);
                    dispatch({type:ActionTypeComplaint.GET_ALL_COMPLAINT_SUCCESS,payload:data});
                })
           
        } catch (error:any) {
            dispatch({type:ActionTypeComplaint.GET_ALL_COMPLAINT_FAIL,payload:{}});
        }
    }
}

const getEarringsComplaint = (token:string) =>{
    return async (dispatch: Dispatch) => {
        try {
            await axios.get('https://radiant-earth-57283.herokuapp.com/api/v1/denuncias/pendientes',{headers:{'x-auth-token':token}})
                .then(resp =>{
                    const {data} = resp;
                    dispatch({type:ActionTypeComplaint.GET_ALL_COMPLAINT_SUCCESS,payload:data});
                })
           
        } catch (error:any) {
            dispatch({type:ActionTypeComplaint.GET_ALL_COMPLAINT_FAIL,payload:{}});
        }
    }
}

const getRejectsComplaint = (token:string) =>{
    return async (dispatch: Dispatch) => {
        try {
            await axios.get('https://radiant-earth-57283.herokuapp.com/api/v1/denuncias/rechazadas',{headers:{'x-auth-token':token}})
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
        dispatch(registerComplaintActionLoading());
        try {
            console.log(complaintState,token)
            await axios.post('https://radiant-earth-57283.herokuapp.com/api/v1/denuncia',complaintState,{headers:{'x-auth-token':token}})
                .then(resp => {
                    const {data} = resp;
                    dispatch({type:ActionTypeComplaint.REGISTER_COMPLAINT_SUCCESS,payload:data});
                })          
        } catch (error:any) {
            Swal.fire({
                text:error.response.data.message,
                icon:"error",
            })
            dispatch({type:ActionTypeComplaint.REGISTER_COMPLAINT_FAIL,payload:error});
        }
    }
}


const registerComplaintActionLoading = () =>({
    type: ActionTypeComplaint.REGISTER_COMPLAINT_LOADING
});


const getAddress = (lat:number,lon:number) => {
    return async (dispatch:Dispatch) => {
        try {
            await axios.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+lon+'&lon='+lat)
                .then(resp => {
                    const {data} = resp;
                    dispatch({type:ActionTypeComplaint.GET_ADDRESS_SUCCESS,payload:data});
                })
            
        } catch (error:any) {
            dispatch({type:ActionTypeComplaint.GET_ADDRESS_FAIL,payload:error});
        }
    }
}


const updateComplaintStatus = (complaintStatus:any,token:string) => {
    return async (dispatch:Dispatch) => {
        try {
            await axios.put('https://radiant-earth-57283.herokuapp.com/api/v1/denuncia/updatestatus',complaintStatus,{headers:{'x-auth-token':token}})
                .then(resp => {
                    const {data} = resp;
                    dispatch({type:ActionTypeComplaint.REGISTER_COMPLAINT_SUCCESS,payload:data});
                })          
        } catch (error:any) {
            Swal.fire({
                text:error.response.data.message,
                icon:"error",
            })
            dispatch({type:ActionTypeComplaint.REGISTER_COMPLAINT_FAIL,payload:error});
        }
    }
}


export {getComplaint,getAllComplaint,registerComplaint,getAddress,getApprovedComplaint,getEarringsComplaint,updateComplaintStatus,getRejectsComplaint}
