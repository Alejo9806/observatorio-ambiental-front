import React,{useEffect,Fragment} from 'react';
import { Marker,Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { getApprovedComplaint } from '../../redux/actions-creators/Complaint_action';
import IconWarning from './IconWarning';

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
  setRefreshMap:React.Dispatch<React.SetStateAction<number>>
}

const Markers: React.FC<Props> = (props) => {
  const {getApprovedComplaint,getAllComplaintState,refreshMap,setRefreshMap} = props;

  useEffect(() => {
    if(refreshMap === 0) {
      getApprovedComplaint();
    }  
    setRefreshMap(1)
  });

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
            /> */}
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
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          </Popup>
        </Marker>)) : null}
   </Fragment>
  );
};


const mapStateProps = (state:any) =>{
  return{
      getAllComplaintState:state.allComplaint,
  }
}

const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) =>{
  return {
      getApprovedComplaint:() => {
          dispatch<any>(getApprovedComplaint()) 
      },
  }
}

export default connect(mapStateProps,mapDispatchToProps)(Markers);
