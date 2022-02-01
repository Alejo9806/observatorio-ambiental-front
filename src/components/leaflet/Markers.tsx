import React,{useEffect,Fragment} from 'react';
import { Marker,Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { getAllComplaint } from '../../redux/actions-creators/Complaint_action';
import IconWarning from './IconWarning';


type Props = {
  getAllComplaint: () => any,
  getAllComplaintState:any
}

const Markers: React.FC<Props> = (props) => {
  const {getAllComplaint,getAllComplaintState} = props;

  useEffect(() => {
    if(Object.keys(getAllComplaintState.complaint).length === 0){
      getAllComplaint();
    }  
  });

  return (
   <Fragment>
      {getAllComplaintState.complaint.denuncias && getAllComplaintState.complaint.denuncias.map((denuncia:any,index:number)=>(
        <Marker position={[denuncia.ubicacion.coordenadas.longitud, denuncia.ubicacion.coordenadas.latitud]} icon={IconWarning} key={index}>
          <Popup>
              <ul>
                <li>
                  <h3>Ubicacion</h3>
                  <p>{denuncia.ubicacion.coordenadas.latitud}</p>
                  <p>{denuncia.ubicacion.coordenadas.longitud}</p>
                  <p>{denuncia.ubicacion.departamento}</p>
                  <p>{denuncia.ubicacion.ciudad}</p>
                  <h3>denuncia</h3>
                  <p>{denuncia.denuncia.titulo}</p>
                  <p>{denuncia.denuncia.descripcion}</p>
                  <p>{denuncia.denuncia.fechaCreacion}</p>
                  <p>{denuncia.denuncia.fechaUltimaActualizacion}</p>
                  <p>{denuncia.denuncia.estado}</p>
                  <h3>piraguero</h3>
                  <p>{denuncia.piraguero.nombre}</p>
                  <button>Hola</button>
                </li>
              </ul>
          </Popup>
        </Marker>))}
   </Fragment>
  );
};


const mapStateProps = (state:any) =>{
  return{
      getAllComplaintState:state.allComplaint
  }
}

const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) =>{
  return {
      getAllComplaint:() => {
          dispatch<any>(getAllComplaint()) 
      },
  }
}

export default connect(mapStateProps,mapDispatchToProps)(Markers);
