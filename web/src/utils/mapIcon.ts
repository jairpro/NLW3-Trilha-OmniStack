import Leaflet from 'leaflet' 

import mapMarkerImg from '../images/map-marker.svg'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  /*popupAnchor: [0, -60]*/
  popupAnchor: [170, 2],
})
/*
const mapIcon =Leaftlet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
})
*/

export default mapIcon