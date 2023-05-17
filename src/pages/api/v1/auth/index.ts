import { dbConnection } from '@/lib/connection'
import { validateToken } from '@/lib/controllers/userController'
import { parseBodyRequest } from '@/utils/parseRequest'

import type { NextApiRequest, NextApiResponse } from 'next'

dbConnection()

export default async function authApi(req: NextApiRequest, res: NextApiResponse) {
	const { body, method } = req
	const parseData = parseBodyRequest(body)

	if (method === 'POST') {
		const { token, username } = parseData

		return validateToken(token, username)
			.then((response) => {
				return res.status(200).json(response)
			})
			.catch((err) => {
				const { status, message, ok } = err
				return res.status(status).json({ message, ok })
			})
	}
}
