import { errorMessage } from '@/utils/handlerError'
import PetModel from '../models/petModel'
import type { Pet, Result } from '@/typings/interfaces'
import { API_URL } from '@/config'

const base = API_URL

/**
 * Search all pets in the database.
 * @param resource -  API resource path.
 * @returns { Promise<Result> } Returns a promise that contains all pets in the database.
 */
export async function getPets(resource: string): Promise<Result> {
	try {
		const results: Pet[] = await PetModel.find({}, { _id: false })
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
 */
export async function getPetType(resource: string, type: string): Promise<Result> {
	try {
		const results: Pet[] = await PetModel.find({ type }, { _id: false })
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
