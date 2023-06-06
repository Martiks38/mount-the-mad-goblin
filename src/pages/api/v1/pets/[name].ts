import { dbConnection } from '@/lib/connection'
import { getPetByName } from '@/lib/controllers/petController'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorResult, Result } from '@/typings/interfaces'

dbConnection()

export default function getPetByNameAPI(req: NextApiRequest, res: NextApiResponse) {
	const resource = req.url as string
	const namePet = decodeURI(req.query.name as string)

	// Search for any character that is not a letter or number.
	const invalidWord = namePet.match(/[^0-9a-z\s\-']/i)
	if (invalidWord) throw { status: 400, message: 'Invalid word' }

	return getPetByName(resource, namePet)
		.then((result: Result) => {
			return res.status(200).json(result)
		})
		.catch((err: ErrorResult) => {
			const { status, message } = err
			return res.status(status).json({ message })
		})
}
