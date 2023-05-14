import { searchInApi } from './searchInApi'

import type { Categories } from '@/typings/types'

export async function getCategoryPaths(resource: string) {
	const results = await searchInApi(resource)

	if (typeof results === 'string') return []

	return (results.results as Categories[]).map(({ type }) => ({
		params: { category: type }
	}))
}
