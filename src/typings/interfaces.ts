import type { PetType } from './types'

export interface Pet {
	name: string
	description: string
	price: number
	media: string
	type: PetType
}
