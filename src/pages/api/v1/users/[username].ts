import { deleteUser, getUser } from '@/lib/controllers/userController'
import { TOKEN_HEADER } from '@/consts'

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handlerUser(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req
	const username = req.query?.username

	const token = req.headers[TOKEN_HEADER]

	if (typeof username !== 'string' || !username)
		return res.status(400).json({ message: 'Username invalid' })

	if (!token) return res.status(401).json({ message: 'No token provided' })
	if (typeof token !== 'string') return res.status(401).json({ message: 'Token invalid' })

	if (method === 'GET') {
		return getUser(username, token)
			.then((response) => {
				return res.status(200).json(response)
			})
			.catch((error) => {
				const { message, status } = error

				return res.status(status).json({ message })
			})
	}

	if (method === 'DELETE') {
		return deleteUser(username, token)
			.then((response) => {
				return res.status(200).json(response)
			})
			.catch((err) => {
				const { message, status } = err
				return res.status(status).json({ message })
			})
	}
}
