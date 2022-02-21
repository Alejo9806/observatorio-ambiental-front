import { ActionTypeOfficer } from "../action-types";
import {Action} from '../actions/index';


interface PiraguerosState  {
    error:Boolean,
    errMess:string,
    isLoading:Boolean,
    piragueros:{},
}

const getPiraguerosState = {
    error:false,
    errMess:"",
    isLoading:false,
    piragueros:{},
}

interface UpdatePiragueroState  {
    error:Boolean,
    errMess:string,
    piraguero:{},
}

const updatePiragueroState = {
    error:false,
    errMess:"",
    piraguero:{},
}



export const piragueros_reducer = (state:PiraguerosState = getPiraguerosState , action:Action) => {
    switch (action.type) {
        case ActionTypeOfficer.GET_PIRAGUEROS_SUCCESS:
            return{...state,error:false,errMess:"",isLoading: false,piragueros: action.payload};
     
        case ActionTypeOfficer.GET_PIRAGUEROS_FAIL: 

            return{...state,error:true,isLoading: false ,errMess: action.payload, piragueros:{}};
        
        case ActionTypeOfficer.GET_PIRAGUEROS_LOADING:
            return {...state, isLoading: true,error:false,errMess:"", piragueros:{}}


        default:
            break;
    }
    return state;
};

export const updatePiraguero_reducer = (state:UpdatePiragueroState = updatePiragueroState , action:Action) => {
    switch (action.type) {
        case ActionTypeOfficer.UPDATE_PIRAGUERO_SUCCESS:
            return{...state,error:false,errMess:"",piraguero: action.payload};
     
        case ActionTypeOfficer.UPDATE_PIRAGUERO_FAIL: 

            return{...state,error:true ,errMess: action.payload, piraguero:{}};


        default:
            break;
    }
    return state;
};
