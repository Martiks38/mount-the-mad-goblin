import { dbConnection } from '@/lib/connection'
import { getPetsByTypeAndPrice } from '@/lib/controllers/petController'
import { checkType } from '@/utils/checkType'
import { outRange } from '@/utils/outRange'
import { PET_TYPES, PRICE_RANGE } from '@/consts'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorResult, Result } from '@/typings/interfaces'

dbConnection()

export default function getPetByTypeAndPriceAPI(req: NextApiRequest, res: NextApiResponse) {
	const resource = req.url as string
	const petType = req.query.type as string
	const min = Math.floor(Number(req.query?.min as string))
	const max = Math.floor(Number(req.query?.max as string))

	const invalidPrices = Number.isNaN(min) || Number.isNaN(max) || max < min
	const isOutRange = outRange(PRICE_RANGE, min, max)

	let isCorrectPetType = checkType(petType, PET_TYPES)

	if (!isCorrectPetType) {
		const message = 'The type of pet requested does not exist'

		return res.status(400).json({ message })
	}

	if (invalidPrices || isOutRange) {
		let message = 'The price values are not valid'
		return res.status(400).json({ message })
	}

	getPetsByTypeAndPrice(resource, petType, min, max)
		.then((result: Result) => {
			return res.status(200).json(result)
		})
		.catch((err: ErrorResult) => {
			const { message, status } = err
			return res.status(status).json({ message })
		})
}