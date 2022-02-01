import L from 'leaflet';
import icon from '../../assets/img/warning.svg'

const IconWarning = L.icon({
    iconUrl:icon,
    iconRetinaUrl:icon,
    iconAnchor:undefined,
    shadowUrl:undefined,
    shadowSize:undefined,
    shadowAnchor:undefined,
    iconSize:[30,30],
    className: 'Leaflet-venue-icon'
});
export default IconWarning;
