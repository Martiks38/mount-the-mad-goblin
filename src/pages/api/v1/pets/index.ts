import { API_URL } from '@/config'
import { dbConnection } from '@/lib/connection'
import { getPets } from '@/lib/controllers/petController'

import type { NextApiRequest, NextApiResponse } from 'next'

dbConnection()

export default async function handlerPets(req: NextApiRequest, res: NextApiResponse) {
	const selfLink = (API_URL as string) + req.url
	const result = await getPets(selfLink)

	return res.status(200).json(result)
}
