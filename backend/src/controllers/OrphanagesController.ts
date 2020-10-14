import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import orphanageView from '../views/orphanages_view'
import * as Yup from 'yup'

import Orphanage from '../models/Orphanage'

export default {
  async show(request: Request, response: Response) {
    const { id } = request.params

    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    })
    return response.json(orphanageView.render(orphanage))
  },

  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    })

    return response.json(orphanageView.renderMany(orphanages))
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      website,
      email,
      phone1,
      phone2,
      street,
      number,
      district,
      city,
      state,
      zip_code,
      bank,
      agency,
      account,
      entity_register
    } = request.body
  
    const orphanagesRepository = getRepository(Orphanage)

    const requestImages = request.files as Express.Multer.File[];
    
    const images = requestImages.map(image => {
      return { path: image.filename }
    })
  
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
      website,
      email,
      phone1,
      phone2,
      street,
      number,
      district,
      city,
      state,
      zip_code,
      bank,
      agency,
      account,
      entity_register
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      ),
      website: Yup.string().required(),
      email: Yup.string().required(),
      phone1: Yup.string().required(),
      phone2: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      district: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().length(2).required(),
      zip_code: Yup.string().required(),
      bank: Yup.string().required(),
      agency: Yup.string().required(),
      account: Yup.string().required(),
      entity_register: Yup.string().required(),
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const orphanage = orphanagesRepository.create(data)
  
    await orphanagesRepository.save(orphanage)
  
    response.status(201).json(orphanage)
  }
}
