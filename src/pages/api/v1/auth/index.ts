import { dbConnection } from '@/lib/connection'
import { validateToken } from '@/lib/controllers/userController'

import type { NextApiRequest, NextApiResponse } from 'next'

dbConnection()

export default async function authApi(req: NextApiRequest, res: NextApiResponse) {
	const { body, method } = req
	const { token, username } = body

	if (typeof username !== 'string' || !username)
		return res.status(400).json({ message: 'Username invalid' })

	if (!token) return res.status(401).json({ message: 'No token provided' })

	if (method === 'POST') {
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
