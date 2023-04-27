import { errorMessage } from '@/utils/handlerError'
import PetModel from '../models/petModel'
import type { Result } from '@/typings/interfaces'

export async function getPets(base: string, selfLink: string): Promise<Result> {
	try {
		const results = await PetModel.find({}, { _id: false })
		const total = results.length

		return {
			links: {
				base,
				self: selfLink
			},
			results,
			total
		}
	} catch (error) {
		throw errorMessage(500)
	}
}

export async function getPetTypes(base: string, selfLink: string): Promise<Result> {
	try {
		const results: string[] = await PetModel.distinct('type')
		const total = results.length

		return {
			links: {
				base,
				self: selfLink
			},
			results,
			total
		}
	} catch (error) {
		throw errorMessage(500)
	}
}
