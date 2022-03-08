import {ActionTypeDashBoard} from '../action-types/index'
import {Action} from '../actions/index'

interface DashBoardState  {
    error:Boolean,
    errMess:String,
    isLoading:Boolean,
    dashboard:Array<any>
}



const dashboardState = {
    error:false,
    errMess:"",
    isLoading:false,
    dashboard:[],
}


export const dashboard_reducer = (state:DashBoardState = dashboardState, action:Action) => {
    switch (action.type) {
        case ActionTypeDashBoard.DASHBOARD_SUCCESS:
            return{...state,error:false,errMess:"",isLoading:false,dashboard: action.payload,};
     
        case ActionTypeDashBoard.DASHBOARD_FAIL: 

            return{...state,error:true ,isLoading:false,errMess: action.payload, dashboard:[]};

        case ActionTypeDashBoard.DASHBOARD_LOADING: 

            return{...state,error:false ,isLoading:true,errMess:"", dashboard:[]};

        default:
            break;
    }
    return state;
}