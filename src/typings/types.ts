import { PET_TYPES } from '@/consts'

export type HTTPStatusCodeList = 200 | 400 | 401 | 404 | 500

export type Range = { min: number; max: number }

export type PetTypes = (typeof PET_TYPES)[number]
