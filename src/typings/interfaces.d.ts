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
	results: Pet | Categories[] /* Result of the request to the database */
	limit: number /* Total possible elements for the request */
	size: number /* Total element of the response */
	links: {
		base: string
		self: string
	}
}

export interface ResultPagination {
	results: Pet[] /* Result of the request to the database */
	limit: number /* Maximum response size */
	total: number /* Total possible elements for the request */
	size: number /* Total element of the response */
	offset: number /* Page number indicating the offset to display the request results */
	lastPageNumber: number /* Last page number */
	links: {
		base: string
		self: string
		first_page: string
		last_page: string
		prev_page: string
		next_page: string
	}
}

export interface ErrorResult {
	message: string /* Error message */
	status: number /* HTTP Status Code */
}

export interface ShoppingHistory {
	date: Date
	name: string
	price: number
	quantity: number
}

export interface User {
	email: string
	password: string
	username: string
	purchases?: ShoppingHistory[]
}
