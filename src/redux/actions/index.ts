import { ActionTypeComplaint, ActionTypeLogin, ActionTypeOfficer,ActionTypeDashBoard } from "../action-types/index"

interface GetComplaintSuccessAction {
    type: ActionTypeComplaint.GET_COMPLAINT_SUCCESS,
    payload: Object
}

interface GetComplaintFailAction {
    type: ActionTypeComplaint.GET_COMPLAINT_FAIL,
    payload: String
}


interface ComplaintSuccessAction {
    type: ActionTypeComplaint.GET_ALL_COMPLAINT_SUCCESS,
    payload: Object
}

interface ComplaintFailAction {
    type: ActionTypeComplaint.GET_ALL_COMPLAINT_FAIL,
    payload: String
}

interface RegisterComplaintSuccessAction {
    type: ActionTypeComplaint.REGISTER_COMPLAINT_SUCCESS,
    payload: any
}

interface RegisterComplaintFailAction {
    type: ActionTypeComplaint.REGISTER_COMPLAINT_FAIL,
    payload: any
}

interface RegisterComplaintLoadingAction {
    type: ActionTypeComplaint.REGISTER_COMPLAINT_LOADING
}

interface GetAddressSuccessAction {
    type: ActionTypeComplaint.GET_ADDRESS_SUCCESS,
    payload:any
}

interface GetAddressFailAction {
    type: ActionTypeComplaint.GET_ADDRESS_FAIL,
    payload:any
}


interface LogginSuccessAction {
    type: ActionTypeLogin.LOGGIN_SUCCESS,
    payload:any
}



interface LogginFailAction {
    type: ActionTypeLogin.LOGGIN_FAIL,
    payload:any
}

interface LogginLoadingAction {
    type: ActionTypeLogin.LOGGIN_LOADING,
}

interface LogoutSuccessAction {
    type: ActionTypeLogin.LOGOUT_SUCCESS,
}

interface LogoutFailAction {
    type: ActionTypeLogin.LOGOUT_FAIL,
}

interface LoggonSuccessAction {
    type: ActionTypeLogin.LOGGON_SUCCESS,
    payload:any
}



interface LoggonFailAction {
    type: ActionTypeLogin.LOGGON_FAIL,
    payload:any
}

interface LoggonLoadingAction {
    type: ActionTypeLogin.LOGGON_LOADING,
}

interface PiraguerosSuccessAction {
    type: ActionTypeOfficer.GET_PIRAGUEROS_SUCCESS,
    payload: Object
}

interface PiraguerosFailAction {
    type: ActionTypeOfficer.GET_PIRAGUEROS_FAIL,
    payload: String
}

interface PiraguerosLoadingAction {
    type: ActionTypeOfficer.GET_PIRAGUEROS_LOADING,
}

interface UpdatePiraguerosSuccessAction {
    type: ActionTypeOfficer.UPDATE_PIRAGUERO_SUCCESS,
    payload: Object
}

interface UpdatePiraguerosFailAction {
    type: ActionTypeOfficer.UPDATE_PIRAGUERO_FAIL,
    payload: String
}

interface UpdateComplaintSuccessAction {
    type: ActionTypeComplaint.UPDATE_COMPLAINT_STATUS_SUCCESS,
    payload: Object
}

interface UpdateComplaintFailAction {
    type: ActionTypeComplaint.UPDATE_COMPLAINT_STATUS_FAIL,
    payload: String
}

interface RegisterTrackingSuccessAction {
    type: ActionTypeOfficer.REGISTER_TRACKING_SUCCESS,
    payload: Object
}

interface RegisterTrackingFailAction {
    type: ActionTypeOfficer.REGISTER_TRACKING_FAIL,
    payload: String
}


interface DashBoardSuccessAction {
    type: ActionTypeDashBoard.DASHBOARD_SUCCESS,
    payload:Array<any>
}



interface DashBoardFailAction {
    type: ActionTypeDashBoard.DASHBOARD_FAIL,
    payload:any
}

interface DashBoardLoadingAction {
    type: ActionTypeDashBoard.DASHBOARD_LOADING,
}

export type Action = ComplaintSuccessAction | ComplaintFailAction  | RegisterComplaintSuccessAction| RegisterComplaintFailAction | RegisterComplaintLoadingAction | LogginSuccessAction | LogginFailAction | LogginLoadingAction | LogoutSuccessAction | LogoutFailAction | GetAddressSuccessAction | GetAddressFailAction 
    |LoggonSuccessAction | LoggonFailAction | LoggonLoadingAction | PiraguerosSuccessAction | PiraguerosFailAction | PiraguerosLoadingAction | UpdatePiraguerosSuccessAction | UpdatePiraguerosFailAction | UpdateComplaintSuccessAction | UpdateComplaintFailAction  | RegisterTrackingSuccessAction | RegisterTrackingFailAction
    | GetComplaintSuccessAction | GetComplaintFailAction | DashBoardSuccessAction | DashBoardFailAction | DashBoardLoadingAction;