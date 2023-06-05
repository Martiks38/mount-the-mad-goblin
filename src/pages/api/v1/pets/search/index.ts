import { dbConnection } from '@/lib/connection'
import { getSearchPet } from '@/lib/controllers/petController'

import type { NextApiRequest, NextApiResponse } from 'next'

dbConnection()

export default async function searchAPI(req: NextApiRequest, res: NextApiResponse) {
	try {
		const resource = req.url as string
		const { word, offset } = req.query

		if (typeof word !== 'string') throw { status: 400, message: 'Invalid word' }

		const cond = decodeURI(word)

		// Search for any character that is not a letter or number.
		const invalidWord = cond.match(/[^0-9a-zñ\s\-']/i)
		const offsetPage = Number(offset) || 0

		if (invalidWord) throw { status: 400, message: 'Invalid word' }

		const response = await getSearchPet(resource, cond, offsetPage)

		return res.status(200).send(response)
	} catch (error: any) {
		const { message, status } = error

		return res.status(status).json({ message })
	}
}
