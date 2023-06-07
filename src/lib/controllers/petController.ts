import PetModel from '../models/petModel'

import { errorMessage } from '@/utils/handlerError'
import { generateResourceURL } from '../utils/generateResourceURL'

import { API_URL_DEV, API_URL_V1_DEV, API_URL_V1_PROD } from '@/config'
import { LIMIT, projection } from '@/consts'

import type { Pet, Result, ResultPagination } from '@/typings/interfaces'
import type { Categories } from '@/typings/types'

type AnswerPetTypesDB = Categories & { _id: string }

const base = (process.env.NODE_ENV === 'production' ? '' : API_URL_DEV) as string
const baseV1 = (process.env.NODE_ENV === 'production' ? API_URL_V1_PROD : API_URL_V1_DEV) as string

/**
 * Search all pets in the database.
 * @param resource -  API resource path.
 * @returns { Promise<Result> } Returns a promise that contains all pets in the database.
 * @throws { status: number, message: string } Error response.
 */
export async function getPets(resource: string, offset: number): Promise<ResultPagination> {
	try {
		const self = base + resource
		const pets: Pet[] = await PetModel.find({}, projection)
		const results = pets.slice(offset, offset + LIMIT)
		const size = results.length
		const total = pets.length

		const { first_page, last_page, lastPageNumber, next_page, prev_page } = generateResourceURL({
			pathname: baseV1 + '/pets',
			limit: LIMIT,
			offset,
			total
		})

		return {
			links: {
				base: baseV1,
				self,
				first_page,
				last_page,
				next_page,
				prev_page
			},
			lastPageNumber,
			limit: LIMIT,
			offset,
			results,
			size,
			total
		}
	} catch (error) {
		throw errorMessage(500)
	}
}

/**
 * Search the types of pets and an image of these in the database.
 * @param resource -  API resource path.
 * @returns { Promise<Result> } Returns a promise containing the pet types and an image of the pets in the database.
 */
export async function getPetTypes(resource: string): Promise<Result> {
	try {
		const response: AnswerPetTypesDB[] = await PetModel.aggregate([
			{
				$group: {
					_id: '$type',
					type: { $first: '$type' },
					media: { $first: '$media' }
				}
			},
			{
				$sort: { type: 1 }
			}
		])
		const results = response.map(({ media, type }) => ({ media, type }))

		const self = base + resource
		const size = results.length

		return {
			links: {
				base,
				self
			},
			results,
			size,
			limit: size
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
		const self = base + resource
		const results: Pet[] = await PetModel.find({ type }, projection)
		const size = results.length

		return {
			links: {
				base,
				self
			},
			size,
			results,
			limit: LIMIT
		}
	} catch (error: any) {
		throw errorMessage(500)
	}
}

interface GetPetsByTypeAndPriceProps {
	resource: string
	offset: number
	min: number
	max: number
	type: string
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
export async function getPetsByTypeAndPrice({
	resource,
	offset,
	min,
	max,
	type
}: GetPetsByTypeAndPriceProps): Promise<ResultPagination> {
	try {
		const self = base + resource
		let filter = {
			type,
			price: {
				$gte: min,
				$lte: max
			}
		}

		const pets: Pet[] = await PetModel.find(filter, projection)
		const results = pets.slice(offset, offset + LIMIT)
		const size = results.length
		const total = pets.length

		const { first_page, last_page, lastPageNumber, next_page, prev_page } = generateResourceURL({
			pathname: base + `/pets/${type}/prices`,
			limit: LIMIT,
			offset,
			total
		})

		return {
			links: {
				base,
				self,
				first_page,
				last_page,
				next_page,
				prev_page
			},
			lastPageNumber,
			limit: LIMIT,
			offset,
			results,
			size,
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
		const self = base + resource

		if (result === null) {
			const message = `The mascot ${namePet} does not exist`
			throw errorMessage(404, message)
		}

		return {
			links: {
				base,
				self
			},
			results: result,
			size: 1,
			limit: 1
		}
	} catch (error: any) {
		if (error?.status) throw error

		throw errorMessage(500)
	}
}

interface GetPetsByPricesProps {
	max: number
	min: number
	offset: number
	resource: string
}

export async function getPetsByPrices({
	offset,
	max,
	min,
	resource
}: GetPetsByPricesProps): Promise<ResultPagination> {
	try {
		let filter = {
			price: {
				$gte: min,
				$lte: max
			}
		}

		const self = base + resource
		const pets: Pet[] = await PetModel.find(filter, projection)
		const total = pets.length
		const results = pets.slice(offset, offset + LIMIT)
		const size = results.length

		const { first_page, last_page, lastPageNumber, next_page, prev_page } = generateResourceURL({
			pathname: base + '',
			offset,
			total,
			limit: LIMIT
		})

		return {
			links: {
				base,
				self,
				first_page,
				last_page,
				next_page,
				prev_page
			},
			lastPageNumber,
			limit: LIMIT,
			offset,
			results,
			size,
			total
		}
	} catch (error) {
		throw errorMessage(500)
	}
}

export async function getSearchPet(
	resource: string,
	word: string,
	offset: number
): Promise<ResultPagination | { message: string }> {
	const regex = new RegExp(word, 'i')

	try {
		const response: Pet[] | null | undefined = await PetModel.find({ name: regex }, projection)

		if (!response || response.length === 0) return { message: 'Without results. No pets found.' }

		const self = base + resource
		const results = response.slice(offset, offset + LIMIT)
		const size = results.length
		const total = response.length

		const { first_page, last_page, lastPageNumber, next_page, prev_page } = generateResourceURL({
			pathname: base + '/pets/search',
			limit: LIMIT,
			offset,
			total,
			word
		})

		return {
			links: {
				base,
				self,
				first_page,
				last_page,
				next_page,
				prev_page
			},
			lastPageNumber,
			limit: LIMIT,
			offset,
			results,
			size,
			total
		}
	} catch (error: any) {
		return errorMessage(500)
	}
}
