import { dbConnection } from '@/lib/connection'
import { getPets } from '@/lib/controllers/petController'
import { API_URL } from '@/config'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorResult } from '@/typings/interfaces'

dbConnection()

export default async function getPetsAPI(req: NextApiRequest, res: NextApiResponse) {
	const selfLink = (API_URL as string) + req.url

	getPets(API_URL as string, selfLink)
		.then((result) => {
			return res.status(200).json(result)
		})
		.catch((err: ErrorResult) => {
			const { message, status } = err
			return res.status(status).json({ message })
		})
}
