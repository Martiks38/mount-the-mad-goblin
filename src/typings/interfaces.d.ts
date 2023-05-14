import type { Categories, PetTypes } from './types'

export interface PetBase {
	media: string /* Image of the pet */
	name: string
	price: number /* Integer number of gold coins */
}

export interface Pet extends PetBase {
	description: string
	type: PetTypes /* "Humanoid" | "Dragonkin" | "Flying" | "Undead" | "Critter" | "Magic" | "Elemental" | "Beast" | "Aquatic" | "Mechanical" */
}

export interface PurchasedPet extends PetBase {
	quantity: number
}

export interface Result {
	results?: Pet | Pet[] | Categories[] /* Result of the request to the database */
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
	message: string /* Error message */
	status: number /* HTTP Status Code */
}

export interface User {
	email: string
	password: string
	username: string
}
