import {combineReducers} from "redux";
//importar Reducers
import {complaint_reducer,registerComplaint_reducer,address_reducer} from './Complaint_reducer';
import { login_reducer} from "./Login_reducer";
import { piragueros_reducer,updatePiraguero_reducer,registerTracking_reducer} from "./Officer_reducer";


const rootReducers:any = combineReducers({
    allComplaint:complaint_reducer,
    registerComplaint:registerComplaint_reducer,
    loggin:login_reducer,
    address:address_reducer,
    piragueros:piragueros_reducer,
    updatePiraguero:updatePiraguero_reducer,
    registerTracking: registerTracking_reducer 
});


export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>

