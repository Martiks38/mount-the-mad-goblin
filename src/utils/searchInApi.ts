import { API_URL_V1_DEV, API_URL_V1_PROD } from '@/config'

import type { Result } from '@/typings/interfaces'

export async function searchInApi(resource: string): Promise<Result | string> {
	const base = (process.env.NODE_ENV === 'production' ? API_URL_V1_PROD : API_URL_V1_DEV) as string

	// const url = base + resource
	const url = 'https://pets-the-crazy-goblin.vercel.app/api/v1' + resource

	try {
		const response = await fetch(url)
		const data = await response.json()

		if (!response.ok) {
			const error = new Error(data?.message)
			error.name = 'SearchApiError'

			throw error
		}

		return data
	} catch (error: any) {
		console.error(`[${error.name}]: ${error.message}`)

		return error?.message
	}
}
