import { ActionTypeLogin } from "../action-types";
import {Action} from '../actions/index';


interface LoginState  {
    error:Boolean,
    errMess:string,
    isLoading:Boolean,
    isLoggedIn:Boolean,
    user:{},
}

const getLogintState = {
    error:false,
    errMess:"",
    isLoading:false,
    isLoggedIn:false,
    user:{},
}

export const login_reducer = (state:LoginState = getLogintState , action:Action) => {
    switch (action.type) {
        case ActionTypeLogin.LOGGIN_SUCCESS:
            return{...state,error:false,errMess:"", isLoggedIn:true,isLoading: false,user: action.payload};
     
        case ActionTypeLogin.LOGGIN_FAIL: 

            return{...state,error:true,isLoading: false ,isLoggedIn:false,errMess: action.payload, user:{}};
        
        case ActionTypeLogin.LOGGIN_LOADING:
            return {...state, isLoading: true, isLoggedIn:false,error:false,errMess:"", user:{}}

        case ActionTypeLogin.LOGOUT_SUCCESS: 
            return{error:false,isLoading: false ,isLoggedIn:false,errMess: '', user:{}};
        
        case ActionTypeLogin.LOGOUT_FAIL:
            return {isLoading: false, error:false,isLoggedIn:false,errMess:"", user:{}}

        default:
            break;
    }
    return state;
};