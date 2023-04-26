import PetModel from '../models/petModel'

export async function getPets(selfLink: string) {
	try {
		const results = await PetModel.find({}, { _id: false })
		const total = results.length

		return { _links: { self: selfLink }, results, total }
	} catch (error) {
		return { message: 'Internal Server Error' }
	}
}
