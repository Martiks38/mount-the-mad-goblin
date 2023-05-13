import { getPetsByPrices } from '@/lib/controllers/petController'
import { outRange } from '@/utils/outRange'
import { PRICE_RANGE } from '@/consts'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorResult, Result } from '@/typings/interfaces'

export default function getPetsByPricesAPI(req: NextApiRequest, res: NextApiResponse) {
	const resource = req.url as string
	const min = Math.floor(Number(req.query?.min as string))
	const max = Math.floor(Number(req.query?.max as string))

	const invalidPrices = Number.isNaN(min) || Number.isNaN(max) || max < min
	const isOutRange = outRange(PRICE_RANGE, min, max)

	if (invalidPrices || isOutRange) {
		let message = 'The price values are not valid'
		return res.status(400).json({ message })
	}

	return getPetsByPrices(resource, min, max)
		.then((result: Result) => {
			return res.status(200).json(result)
		})
		.catch((err: ErrorResult) => {
			const { status, message } = err
			return res.status(status).json({ message })
		})
}
