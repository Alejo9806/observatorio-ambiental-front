import React,{useEffect,Fragment} from 'react';
import { Marker,Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { getApprovedComplaint, updateComplaintStatus } from '../../redux/actions-creators/Complaint_action';
import IconWarning from './IconWarning';
import { Link } from 'react-router-dom';
//Mui

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


type Props = {
  getApprovedComplaint: () => any,
  getAllComplaintState:any,
  refreshMap:number,
  auth:any,
  setRefreshMap:React.Dispatch<React.SetStateAction<number>>,
  updateComplaintStatus: (complaintStatus:any,token:string) => any,
}

const Markers: React.FC<Props> = (props) => {
  const {getApprovedComplaint,getAllComplaintState,refreshMap,setRefreshMap,auth,updateComplaintStatus} = props;

  useEffect(() => {
    if(refreshMap === 0) {
      getApprovedComplaint();
    }  
    setRefreshMap(1)
  });

  const acceptComplaint= (id:string) =>{
    console.log(id);
    let state ={
      id,
      status:"APROBADA"
    }
    updateComplaintStatus(state,auth.user.token);
    setRefreshMap(0)
  }

  const rejectComplaint = (id:string) =>{
    console.log(id)
    let state ={
      id,
      status:"RECHAZADA"
    }
    updateComplaintStatus(state,auth.user.token);
    setRefreshMap(0)
  }
 
  return (
   <Fragment>
      {getAllComplaintState.complaint.denuncias ? getAllComplaintState.complaint.denuncias.map((denuncia:any,index:number)=>(
        <Marker position={[denuncia.ubicacion.coordenadas.longitud, denuncia.ubicacion.coordenadas.latitud]} icon={IconWarning} key={index}>
          <Popup>
          <Card sx={{ maxWidth: 345 }}>
            {/* <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />` */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Ubicacion
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Departamento:{denuncia.ubicacion.departamento}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ciudad: {denuncia.ubicacion.ciudad}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Denuncia  
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Titulo: {denuncia.denuncia.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha de generacion de la denuncia: {denuncia.denuncia.fechaCreacion.slice(0,10)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha ultima actualizacion de denuncia: {denuncia.denuncia.fechaUltimaActualizacion.slice(0,10)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descripcion: {denuncia.denuncia.descripcion}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estado: {denuncia.denuncia.estado}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Piraguero
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Praguero denunciante: {denuncia.piraguero.nombre}
              </Typography>
              {denuncia.denuncia.warning && 
              <Typography variant="body2" color="text.secondary">
                Cuidado: {denuncia.denuncia.warning.message}
              </Typography>}
              {denuncia.seguimiento.length !== 0 ? 
                <div>
                  <Typography gutterBottom variant="h5" component="div">
                    Última actualizacion de seguimiento
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Clase de seguimiento: {denuncia.seguimiento[denuncia.seguimiento.length - 1].clase}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tipo de seguimiento: {denuncia.seguimiento[denuncia.seguimiento.length - 1].tipo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Fecha de actuación: {denuncia.seguimiento[denuncia.seguimiento.length - 1].fechaActuacion.slice(0,10)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Retroalimentación: {denuncia.seguimiento[denuncia.seguimiento.length - 1].hallazgos}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Encargado: {denuncia.seguimiento[denuncia.seguimiento.length - 1].encargado}
                    </Typography>
                  </div>:null
                }
            </CardContent>
            {auth.isLoggedIn && auth.user.user.rol === 'ROOT' ?
            <CardActions>
              {denuncia.denuncia.estado === 'APROBADA' ? <Button size="small"><Link className='navLinkR' to={'/seguimiento/'+denuncia._id} >SEGUIMIENTO</Link></Button> :null}
              {denuncia.denuncia.estado !== 'APROBADA' ? <Button size="small" onClick={() => acceptComplaint(denuncia._id)}>APROBAR</Button> :null}
              {denuncia.denuncia.estado !== 'RECHAZADA' ? <Button size="small" onClick={() => rejectComplaint(denuncia._id)}>RECHAZAR</Button> :null}
            </CardActions>:null}
          </Card>
          </Popup>
        </Marker>)) : null}
   </Fragment>
  );
};


const mapStateProps = (state:any) =>{
  return{
      getAllComplaintState:state.allComplaint,
      auth:state.loggin
  }
}

const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) =>{
  return {
      getApprovedComplaint:() => {
          dispatch<any>(getApprovedComplaint()) 
      },
      updateComplaintStatus:(complaintStatus:any,token:string) =>{
        dispatch<any>(updateComplaintStatus(complaintStatus,token)) 
      }
  }
}

export default connect(mapStateProps,mapDispatchToProps)(Markers);
