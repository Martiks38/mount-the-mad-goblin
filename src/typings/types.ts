import { PET_TYPES } from '@/consts'

export type PetTypes = (typeof PET_TYPES)[number]

export type HTTPStatusCodeList = 200 | 400 | 401 | 404 | 500
