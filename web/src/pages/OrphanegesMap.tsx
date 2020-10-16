import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import '../styles/pages/orphanages-map.css'

import { localidade, regiao, latitude, longitude, zoom } from '../config/local.json'

import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

const maps = [
  'openstreetmap',
  'mapbox',
]

// https://docs.mapbox.com/mapbox-gl-js/api/map/
const mapboxStyles = [
  'streets-v11',
  'outdoors-v11',
  'light-v10',
  'dark-v10',
  'satellite-v9',
  'satellite-streets-v11',
  'navigation-preview-day-v4',
  'navigation-preview-night-v4',
  'navigation-guidance-day-v4',
  'navigation-guidance-night-v4',
]

let map = maps[1]
let mapboxStyle = mapboxStyles[4]

interface Orphanage {
  id: number
  latitude: number
  longitude: number
  name: string
}

function OrphanegesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  console.log(orphanages)
  
  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>{`${localidade}`}</strong>
          <span>{`${regiao}`}</span>
        </footer>
      </aside>

      <Map 
        center={[latitude, longitude]}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url={map==='openstreetmap' 
            ? 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
            : `https://api.mapbox.com/styles/v1/mapbox/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
        } />

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id} 
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF"/>
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <Link to="orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanegesMap