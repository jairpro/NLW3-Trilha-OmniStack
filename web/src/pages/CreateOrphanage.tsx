import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import { useHistory } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import mapIcon from "../utils/mapIcon";
import Sidebar from "../components/Sidebar";
import api from '../services/api'
import { latitude as localLatitude, longitude as localLongitude, zoom as localZoom } from '../config/local.json'

import '../styles/pages/create-orphanage.css';

export default function CreateOrphanage() {
  const history = useHistory()

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)

  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const [website, setOpenWebsite] = useState(' ')
  const [email, setEmail] = useState(' ')
  const [phone1, setPhone1] = useState(' ')
  const [phone2, setPhone2] = useState(' ')
  const [street, setStreet] = useState(' ')
  const [number, setNumber] = useState(' ')
  const [district, setDistrict] = useState(' ')
  const [city, setCity] = useState(' ')
  const [state, setState] = useState('RS')
  const [zip_code, setZipCode] = useState(' ')
  const [bank, setBank] = useState(' ')
  const [agency, setAgency] = useState(' ')
  const [account, setAccount] = useState(' ')
  const [entity_register, setEntityRegister] = useState(' ')

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)

    const selectImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })
  
    setPreviewImages(selectImagesPreview)
  }
  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { latitude, longitude } = position;

    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    data.append('website', website)
    data.append('email', email)
    data.append('phone1', phone1)
    data.append('phone2', phone2)
    data.append('street', street)
    data.append('number', number)
    data.append('district', district)
    data.append('city', city)
    data.append('state', state)
    data.append('zip_code', zip_code)
    data.append('bank', bank)
    data.append('agency', agency)
    data.append('account', account)
    data.append('entity_register', entity_register)
    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data)
    
    alert('Cadastro realizado com sucesso!')

    history.push('/app')
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[localLatitude,localLongitude]} 
              style={{ width: '100%', height: 280 }}
              zoom={localZoom}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { (position.latitude !== 0) && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[
                    position.latitude, 
                    position.longitude
                  ]} 
                />
              ) }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

                {/*<div className="uploaded-image"></div>*/}

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <>
                      <img key={image} src={image} alt={name} />
                      
                      { /* 
                        TODO: implementar aqui botão para remover as imagens
                        (removendo os elementos dos arrays: images e previewImages).
                      */ }
                    </>
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours" 
                value={opening_hours} 
                onChange={event => setOpeningHours(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? "active" : ""} onClick={() => setOpenOnWeekends(true)} >Sim</button>
                <button type="button" className={!open_on_weekends ? "active" : ""} onClick={() => setOpenOnWeekends(false)} >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
