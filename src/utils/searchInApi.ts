import type { Result } from '@/typings/interfaces'

export async function searchInApi(url: string): Promise<Result | string> {
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
