import { getPetType } from '@/lib/controllers/petController'
import { dbConnection } from '@/lib/connection'
import { checkType } from '@/utils/checkType'

import { PET_TYPES } from '@/consts'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorResult, Result } from '@/typings/interfaces'

dbConnection()

export default function getPetTypeAPI(req: NextApiRequest, res: NextApiResponse) {
	const petType = req.query.type as string
	const resource = req.url as string

	let isCorrectPetType = checkType(petType, PET_TYPES)

	if (!isCorrectPetType) {
		const message = 'The type of pet requested does not exist'

		return res.status(400).json({ message })
	}

	return getPetType(resource, petType)
		.then((result: Result) => res.status(200).json(result))
		.catch((err: ErrorResult) => {
			const { message, status } = err
			return res.status(status).json({ message })
		})
}
