import { PET_TYPES } from '@/consts'
import { Pet } from './interfaces'

export type HTTPStatusCodeList = 200 | 400 | 401 | 404 | 500

export type Range = { min: number; max: number }

export type PetTypes = (typeof PET_TYPES)[number]

export type ContentAnswerPetTypes = Pick<Pet, 'media' | 'type'>
