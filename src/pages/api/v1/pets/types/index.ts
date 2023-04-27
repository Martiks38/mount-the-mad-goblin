import { API_URL } from '@/config'
import { dbConnection } from '@/lib/connection'
import { getPetTypes } from '@/lib/controllers/petController'
import { ErrorResult } from '@/typings/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'

dbConnection()

export default function handlerTypesPets(req: NextApiRequest, res: NextApiResponse) {
	const selfLink = (API_URL as string) + req.url

	getPetTypes(API_URL as string, selfLink)
		.then((result) => {
			return res.status(200).json(result)
		})
		.catch((err: ErrorResult) => {
			const { message, status } = err
			return res.status(status).json({ message })
		})
}
