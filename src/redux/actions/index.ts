import { ActionTypeComplaint, ActionTypeLogin } from "../action-types/index"

interface ComplaintSuccessAction {
    type: ActionTypeComplaint.GET_ALL_COMPLAINT_SUCCESS,
    payload: Object
}

interface ComplaintFailAction {
    type: ActionTypeComplaint.GET_ALL_COMPLAINT_FAIL,
    payload: String
}

interface ComplaintLoadingAction {
    type: ActionTypeComplaint.GET_ALL_COMPLAINT_LOADING
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

export type Action = ComplaintSuccessAction | ComplaintFailAction | ComplaintLoadingAction | RegisterComplaintSuccessAction| RegisterComplaintFailAction | RegisterComplaintLoadingAction | LogginSuccessAction | LogginFailAction | LogginLoadingAction | LogoutSuccessAction | LogoutFailAction | GetAddressSuccessAction | GetAddressFailAction;