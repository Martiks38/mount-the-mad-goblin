import PetModel from '../models/petModel'
import type { ErrorResult, Result } from '@/typings/interfaces'

export async function getPets(selfLink: string): Promise<Result> {
	try {
		const results = await PetModel.find({}, { _id: false })
		const total = results.length

		return { links: { self: selfLink }, results, total }
	} catch (error) {
		throw { status: 500, message: 'Internal Server Error' }
	}
}
