import { dbConnection } from '@/lib/connection'
import { getPetTypes } from '@/lib/controllers/petController'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorResult } from '@/typings/interfaces'

dbConnection()

export default function getPetTypesAPI(req: NextApiRequest, res: NextApiResponse) {
	const resource = req.url as string

	getPetTypes(resource)
		.then((result) => {
			return res.status(200).json(result)
		})
		.catch((err: ErrorResult) => {
			const { message, status } = err
			return res.status(status).json({ message })
		})
}
