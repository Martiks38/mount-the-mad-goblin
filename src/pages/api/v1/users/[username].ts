import { deleteUser } from '@/lib/controllers/userController'
import { TOKEN_HEADER } from '@/consts'

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handlerUser(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req

	if (method === 'DELETE') {
		const username = req.query.username as string
		const token = req.headers[TOKEN_HEADER] as string

		if (!token) return res.status(403).json({ message: 'No token provided' })

		return deleteUser(username, token)
			.then((response) => {
				return res.status(200).json(response)
			})
			.catch((err) => {
				const { status, message } = err
				return res.status(status).json({ message })
			})
	}
}
