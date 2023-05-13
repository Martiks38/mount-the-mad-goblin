import { dbConnection } from '@/lib/connection'
import { getPets } from '@/lib/controllers/petController'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorResult } from '@/typings/interfaces'

dbConnection()

export default async function getPetsAPI(req: NextApiRequest, res: NextApiResponse) {
	const resource = req.url as string

	return getPets(resource)
		.then((result) => {
			return res.status(200).json(result)
		})
		.catch((err: ErrorResult) => {
			const { message, status } = err
			return res.status(status).json({ message })
		})
}
