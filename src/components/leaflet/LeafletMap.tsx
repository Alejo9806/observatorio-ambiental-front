import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
//componentes 
import ComplaintRegister from '../ComplaintRegister'
import Markers from './Markers';
import IconLocation from './IconLocation';
//Leaflet
import { MapContainer,Marker,Popup,TileLayer,useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import {LatLngTuple} from 'leaflet';
//Material UI
import Modal from '@mui/material/Modal';


type Props = {
    auth:any,

}
  


const LeafletMap:React.FC<Props>  = (props) => {
    const {auth} = props;
    // const position:LatLngTuple = [51.505, -0.09]
    const [position,setPosition] = useState<LatLngTuple>();
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const [open, setOpen] = useState(false);
    const [openstreetmap,setOpenstreetmap] = useState<number>(1);
    const [refreshMap,setRefreshMap] = useState<number>(0);


    useEffect(() =>{
        navigator.geolocation.getCurrentPosition(
            (location) => {
                setPosition([location.coords.latitude,location.coords.longitude]);
            }
        );
    },[]);

    useEffect(() =>{
        console.log(selectedPosition);
    },[selectedPosition])
    
    const handleClose = () => setOpen(false);
        
    const MarkersClick = () => {
        useMapEvents({
            dblclick(e) {                              
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);          
                setOpen(true);
                setOpenstreetmap(0);
            },            
        })
        return (
            selectedPosition ? 
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <ComplaintRegister longitud={selectedPosition[0]} latitud={selectedPosition[1]} openstreetmap={openstreetmap} setOpenstreetmap={setOpenstreetmap} setRefreshMap={setRefreshMap} setOpen={setOpen}/>
            </Modal>
            : null
        )   
        
    }

    return (
        <div className='leaflet-container'>
            {position  && <MapContainer center={position} zoom={14} scrollWheelZoom={false} doubleClickZoom={false}>
                {auth.isLoggedIn && <MarkersClick/>}
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={position} icon={IconLocation}>
                    <Popup>
                        Tu estas aqui.
                    </Popup>
                </Marker>
                <Markers refreshMap={refreshMap} setRefreshMap={setRefreshMap}/>
            </MapContainer>}
        </div>
    );
};

const mapStatetoProps = (state:any) =>{
    return{
      auth:state.loggin
    }
  }

const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) =>{
    return {};
}
  
  
export default connect(mapStatetoProps,mapDispatchToProps)(LeafletMap);
