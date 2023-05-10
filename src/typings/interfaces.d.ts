import type { ContentAnswerPetTypes, PetTypes } from './types'

export interface Pet {
	name: string
	description: string
	price: number /* Integer number of gold coins */
	media: string /* Image of the pet */
	type: PetTypes /* "Humanoid" | "Dragonkin" | "Flying" | "Undead" | "Critter" | "Magic" | "Elemental" | "Beast" | "Aquatic" | "Mechanical" */
}

export interface PurchasedPet {
	img: string
	name: string
	price: number
	quantity: number
}

export interface Result {
	results?: Pet | Pet[] | ContentAnswerPetTypes[] /* Result of the request to the database */
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
