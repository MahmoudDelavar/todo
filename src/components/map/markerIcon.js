import { icon } from 'leaflet';
import mark from '../../images/leaflet/images/marker-icon.png';
const markerIcon = icon({
  // iconUrl: '../images/leaflet/images/marker-icon-2x.png',
  iconUrl: mark,
  iconSize: [32, 52],
  shadowUrl: '../images/leaflet/images/marker-shadow.png',
});

export { markerIcon };
