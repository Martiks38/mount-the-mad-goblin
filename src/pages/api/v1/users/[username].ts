import { deleteUser, getUser } from '@/lib/controllers/userController'
import { TOKEN_HEADER } from '@/consts'

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handlerUser(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req

	if (method === 'GET') {
		const username = req.query.username
		const token = req.headers[TOKEN_HEADER]

		if (typeof username !== 'string') return res.status(400).json({ message: 'Username invalid' })

		if (!token) return res.status(403).json({ message: 'No token provided' })
		if (typeof token !== 'string') return res.status(401).json({ message: 'Token invalid' })

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
		const username = req.query.username as string
		const token = req.headers[TOKEN_HEADER] as string

		if (!token) return res.status(403).json({ message: 'No token provided' })

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
