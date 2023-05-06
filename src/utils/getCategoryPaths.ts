import { ContentAnswerPetTypes } from '@/typings/types'
import { searchInApi } from './searchInApi'

export async function getCategoryPaths(resource: string) {
	const results = await searchInApi(resource)

	if (typeof results === 'string') return []

	return (results.results as ContentAnswerPetTypes[]).map(({ type }) => ({
		params: {
			category: type
		}
	}))
}
