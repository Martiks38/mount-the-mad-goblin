import PetModel from '../models/petModel'

import { errorMessage } from '@/utils/handlerError'
import { API_URL } from '@/config'
import { projection } from '@/consts'

import type { Pet, Result } from '@/typings/interfaces'

const base = API_URL

/**
 * Search all pets in the database.
 * @param resource -  API resource path.
 * @returns { Promise<Result> } Returns a promise that contains all pets in the database.
 * @throws { status: number, message: string } Error response.
 */
export async function getPets(resource: string): Promise<Result> {
	try {
		const results: Pet[] = await PetModel.find({}, projection)
		const total = results.length

		return {
			links: {
				base,
				self: base + resource
			},
			results,
			total
		}
	} catch (error) {
		throw errorMessage(500)
	}
}

/**
 * Search the types of pets in the database.
 * @param resource -  API resource path.
 * @returns { Promise<Result> } Returns a promise that contains the pet types in the database.
 */
export async function getPetTypes(resource: string): Promise<Result> {
	try {
		const results: string[] = await PetModel.distinct('type')
		const total = results.length

		return {
			links: {
				base,
				self: base + resource
			},
			results,
			total
		}
	} catch (error) {
		throw errorMessage(500)
	}
}

/**
 * Searches for pets in the database that meet the specified type.
 * @param { string } resource  API resource path.
 * @param { string } type Pet type.
 * @returns { Promise<Result> } Returns a result promise containing a list of pets of the specified type.
 * @throws { status: number, message: string } Error response.
 */
export async function getPetType(resource: string, type: string): Promise<Result> {
	try {
		const results: Pet[] = await PetModel.find({ type }, projection)
		const total = results.length

		return {
			links: {
				base,
				self: base + resource
			},
			results,
			total
		}
	} catch (error: any) {
		throw errorMessage(500)
	}
}

/**
 * Searches for pets in the database that meet the specified type and price range.
 * @param { string } resource  API resource path.
 * @param { string } type Pet type.
 * @param { number | undefined } min Minimum price to search.
 * @param { number | undefined } max Maximum price to search.
 * @returns { Promise<Result> } Returns a result promise containing a list of pets of the specified type and price range.
 * @throws { status: number, message: string } Error response.
 */
export async function getPetsByTypeAndPrice(
	resource: string,
	type: string,
	min: number,
	max: number
): Promise<Result> {
	try {
		let filter = {
			type,
			price: {
				$gte: min,
				$lte: max
			}
		}

		const results: Pet[] = await PetModel.find(filter, projection)
		const total = results.length

		return {
			links: {
				base,
				self: base + resource
			},
			results,
			total
		}
	} catch (error) {
		throw errorMessage(500)
	}
}

/**
 * Search for the pet by name.
 * @param { string } resource  API resource path.
 * @param { string } namePet Pet's name.
 * @returns { Promise<Result> } Returns a promise with the pet's data.
 */
export async function getPetByName(resource: string, namePet: string): Promise<Result> {
	try {
		const result: Pet | null = await PetModel.findOne({ name: namePet }, projection)

		if (result === null) {
			const message = `The mascot ${namePet} does not exist`
			throw errorMessage(404, message)
		}

		return {
			links: {
				base,
				self: base + resource
			},
			results: result,
			total: 1
		}
	} catch (error: any) {
		if (error?.status) throw error

		throw errorMessage(500)
	}
}

export async function getPetsByPrices(resource: string, min: number, max: number): Promise<Result> {
	try {
		let filter = {
			price: {
				$gte: min,
				$lte: max
			}
		}

		const results: Pet[] = await PetModel.find(filter, projection)
		const total = results.length

		return {
			links: {
				base,
				self: base + resource
			},
			results,
			total
		}
	} catch (error) {
		throw errorMessage(500)
	}
}
