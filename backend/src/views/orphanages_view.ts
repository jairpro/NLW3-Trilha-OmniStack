import Orphanage from '../models/Orphanage'
import imagesView from './images_view'

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      website: orphanage.website,
      email: orphanage.email,
      phone1: orphanage.phone1,
      phone2: orphanage.phone2,
      street: orphanage.street,
      number: orphanage.number,
      district: orphanage.district,
      city: orphanage.city,
      state: orphanage.state,
      zip_code: orphanage.zip_code,
      bank: orphanage.bank,
      agency: orphanage.agency,
      account: orphanage.account,
      entity_register: orphanage.entity_register,
      images: imagesView.renderMany(orphanage.images),
    }
  },

  renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage))
  }
}