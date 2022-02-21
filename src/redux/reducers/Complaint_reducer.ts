import {ActionTypeComplaint} from '../action-types/index'
import {Action} from '../actions/index'

interface ComplaintState  {
    error:Boolean,
    errMess:String,
    isLoading:Boolean,
    complaint:{}
}

interface IAddress {
    error:Boolean,
    errMess:String,
    address:{}
}

interface UpdateComplaintState  {
    error:Boolean,
    errMess:string,
    complaint:{},
}


const getComplaintState = {
    error:false,
    errMess:"",
    isLoading:false,
    complaint:{}
}

const registerComplaintState = {
    isLoading:false,
    error:false,
    errMess:"",
    complaint:{},
}

const addressState = {
    error:false,
    errMess:"",
    address:{}
}

const updateComplaintState = {
    error:false,
    errMess:"",
    complaint:{},
}


export const address_reducer = (state:IAddress = addressState, action:Action) => {
    switch (action.type) {
        case ActionTypeComplaint.GET_ADDRESS_SUCCESS:
            return{...state,error:false,errMess:"",address: action.payload,};
     
        case ActionTypeComplaint.GET_ADDRESS_FAIL: 

            return{...state,error:true ,errMess: action.payload, address:{}};

        default:
            break;
    }
    return state;
}

export const complaint_reducer = (state:ComplaintState = getComplaintState , action:Action) => {
    switch (action.type) {
        case ActionTypeComplaint.GET_ALL_COMPLAINT_SUCCESS:
            return{...state,error:false,errMess:"", isLoading: false,complaint: action.payload,};
     
        case ActionTypeComplaint.GET_ALL_COMPLAINT_FAIL: 
            return{...state,error:true,isLoading: false ,errMess: action.payload, complaint:{}};

        default:
            break;
    }
    return state;
};

export const registerComplaint_reducer= (state:ComplaintState = registerComplaintState , action:Action) => {
    switch (action.type) {
        case ActionTypeComplaint.REGISTER_COMPLAINT_SUCCESS:
             
            return{...state, error: false,errMess: "", isLoading: false, complaint: action.payload};

        case ActionTypeComplaint.REGISTER_COMPLAINT_FAIL:

            return{...state,error:true,isLoading: false, complaint:{}, errMess: action.payload.message};
        
        case ActionTypeComplaint.REGISTER_COMPLAINT_LOADING:

            return {...state, isLoading: true,  complaint:{}}

        default:
            break;
    }
    return state;
};

export const updateComplaint_reducer = (state:UpdateComplaintState = updateComplaintState , action:Action) => {
    switch (action.type) {
        case ActionTypeComplaint.UPDATE_COMPLAINT_STATUS_SUCCESS:
            return{...state,error:false,errMess:"",complaint: action.payload};
     
        case ActionTypeComplaint.UPDATE_COMPLAINT_STATUS_FAIL: 

            return{...state,error:true ,errMess: action.payload, complaint:{}};


        default:
            break;
    }
    return state;
};
