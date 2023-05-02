import { API_URL } from '@/config'

import type { Result } from '@/typings/interfaces'

export async function searchInApi(resource: string): Promise<Result | string> {
	const url = API_URL?.concat('/api/v1', resource) as string

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
