import { dbConnection } from '@/lib/connection'
import { getPetByName } from '@/lib/controllers/petController'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorResult, Result } from '@/typings/interfaces'

dbConnection()

export default function getPetByNameAPI(req: NextApiRequest, res: NextApiResponse) {
	const resource = req.url as string
	const namePet = decodeURI(req.query.name as string)

	return getPetByName(resource, namePet)
		.then((result: Result) => {
			return res.status(200).json(result)
		})
		.catch((err: ErrorResult) => {
			const { status, message } = err
			return res.status(status).json({ message })
		})
}
