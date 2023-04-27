import { getPetType } from '@/lib/controllers/petController'
import { PET_TYPES } from '@/consts'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorResult, Result } from '@/typings/interfaces'

export default function getPetTypeAPI(req: NextApiRequest, res: NextApiResponse) {
	const petType = req.query.type as string
	const resource = req.url as string

	let isCorrectPetType = petType in PET_TYPES

	if (!isCorrectPetType) {
		const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })
		const validTypes = formatter.format(PET_TYPES)

		const message = `The type of pet requested does not exist. Valid pet types are: ${validTypes}`

		return res.status(400).json({ message })
	}

	getPetType(resource, petType)
		.then((result: Result) => res.status(200).json(result))
		.catch((err: ErrorResult) => {
			const { message, status } = err
			return res.status(status).json({ message })
		})
}
