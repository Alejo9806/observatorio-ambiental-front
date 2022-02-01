import L from 'leaflet';
import icon from '../../assets/img/geo-fill.svg'

const IconLocation = L.icon({
    iconUrl:icon,
    iconRetinaUrl:icon,
    iconAnchor:undefined,
    shadowUrl:undefined,
    shadowSize:undefined,
    shadowAnchor:undefined,
    iconSize:[35,35],
    className: 'Leaflet-venue-icon'
});

export default IconLocation;
