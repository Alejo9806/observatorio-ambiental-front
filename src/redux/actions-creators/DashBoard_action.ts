import { ActionTypeDashBoard} from "../action-types";
import { Dispatch } from "redux";
import axios from "axios";
import Swal from 'sweetalert2';

const getStatistics = () =>{
    return async (dispatch:Dispatch) => {
        dispatch(getStatisticsActionLoading());
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        let statistics = <any>[]
        try {
            await axios.get('https://radiant-earth-57283.herokuapp.com/api/v1/dashboard/denunciasEstado')
                .then( async (resp)  => {
                    const {data} = resp;
                    statistics.push(data.denuncias);
                    await axios.get('https://radiant-earth-57283.herokuapp.com/api/v1/dashboard/usuariosEstado')
                        .then(async (resp) =>{
                            const {data} = resp;
                            statistics.push(data.usuarios);
                            await axios.get('https://radiant-earth-57283.herokuapp.com/api/v1/dashboard/tiposeguimiento')
                                .then(async (resp) =>{
                                    const {data} = resp;
                                    statistics.push(data.tipoSeguimiento);
                                    await axios.get('https://radiant-earth-57283.herokuapp.com/api/v1/dashboard/claseseguimiento')
                                        .then(async (resp) =>{
                                            const {data} = resp;
                                            statistics.push(data.claseSeguimiento);
                                            await axios.get('https://radiant-earth-57283.herokuapp.com/api/v1/dashboard/ciudadesEstado')
                                                .then(resp =>{
                                                    const {data} = resp;
                                                    statistics.push(data.ciudades);
                                                    dispatch({type:ActionTypeDashBoard.DASHBOARD_SUCCESS,payload:statistics});
                                                })
                                        })
                                })
                        })   
                })        
        } catch (error:any) {
            console.log(error.response.data.msg)
            Swal.fire({
                text:error.response.data.msg,
                icon:"error",
            })
            dispatch({type:ActionTypeDashBoard.DASHBOARD_FAIL,payload:error});
        }
    }
}

const getStatisticsActionLoading = () =>({
    type: ActionTypeDashBoard.DASHBOARD_LOADING
});

export {getStatistics,getStatisticsActionLoading}