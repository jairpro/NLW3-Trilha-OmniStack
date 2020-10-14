import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Image from './Image'

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  latitude: number

  @Column()
  longitude: number

  @Column()
  about: string

  @Column()
  instructions: string

  @Column()
  opening_hours: string 

  @Column()
  open_on_weekends: boolean

  @Column()
  website: string

  @Column()
  email: string

  @Column()
  phone1: string

  @Column()
  phone2: string

  @Column()
  street: string

  @Column()
  number: string

  @Column()
  district: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  zip_code: string

  @Column()
  bank: string

  @Column()
  agency: string

  @Column()
  account: string

  @Column()
  entity_register: string

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert','update']
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[]
}