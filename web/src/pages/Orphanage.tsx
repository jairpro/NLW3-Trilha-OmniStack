  import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiExternalLink, FiMail } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom'

import mapIcon from "../utils/mapIcon";
import Sidebar from "../components/Sidebar";

import '../styles/pages/orphanage.css';
import api from "../services/api";
import whatsappfy from '../utils/utils'

interface Orphanage {
  latitude: number
  longitude: number
  name: string
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: string
  phone1: string
  phone2: string
  website: string
  email: string
  images: Array<{
    id: number
    url: string
  }>
}

interface OrphanageParams {
  id: string
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>()
  const [orphanage, setOrphanage] = useState<Orphanage>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  //console.log(orphanages)
  
  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data)
    })
  }, [params.id])

  if (!orphanage) {
    return <p>Carregando...</p>
  }
  
  return (
    <div id="page-orphanage">
      <Sidebar/>

      <main>
        <div className="orphanage-details">
          { orphanage.images.length>0 && (
            <>
              <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

              { orphanage.images.length>1 && (
                <div className="images">

                {orphanage.images.map((image, index) => {
                  return (
                    <button 
                      key={image.id}  
                      className={activeImageIndex===index ? "active" : ""}
                      type="button"
                      onClick={() => {
                        setActiveImageIndex(index)
                      }}
                    >

                      <img src={image.url} alt={orphanage.name} />

                    </button>
                  )
                })}

              </div>
            ) }
            </>
          ) }
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              { orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              ) }
            </div>

            { orphanage.phone1.trim() && (
              <a 
                className="contact-button"
                href={whatsappfy(orphanage.phone1)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={20} color="#FFF" />
                Entrar em contato
              </a>
            ) }

            <footer className="website">
              { orphanage.email.trim() && (
                <a 
                  href={`mailto:${orphanage.email}`}
                  title={orphanage.email}
                >
                  <FiMail size={32} color="#5C8599" />
                  Email
                </a>
              ) }

              { orphanage.website.trim() && (
                <a 
                  href={orphanage.website}
                  title={orphanage.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiExternalLink size={32} color="#5C8599" />
                  Website
                </a>
              ) }
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}