import { PET_TYPES } from '@/consts'
import type { PetTypes } from './types'

export interface Pet {
	name: string
	description: string
	price: number
	media: string
	type: PetTypes
}

export interface Result {
	results?: Pet[] | typeof PET_TYPES /* Result of the request to the database */
	page_number?: string /* Page number indicating the offset to display the request results */
	total?: number /* Total possible elements for the request */
	size?: number /* Total element of the response */
	links?: {
		base?: string /* Base url */
		self?: string /* Request URL */
		prev_page?: string /* URL of the previous page */
		next_page?: string /* URL of the next page */
		first?: string /* First page URL */
		last?: string /* URL of the last page */
	}
}

export interface ErrorResult {
	status: number /* HTTP Status Code */
	message: string /* Error message */
}
