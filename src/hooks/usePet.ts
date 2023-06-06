import { useEffect, useState } from 'react'
import { instanceOf } from '@/utils/intanceOf'

import type { Pet, Result } from '@/typings/interfaces'

interface SearchStatus {
	data: null | Pet | string
	error: boolean
}

type ResponseApi = { message: string } | Result

export function usePet(url: string) {
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<SearchStatus>({ data: null, error: false })

	useEffect(() => {
		const searchFetch = async () => {
			setIsLoading(true)

			try {
				const response = await fetch(url)
				const data: ResponseApi = await response.json()

				if (!response.ok && instanceOf<{ message: string }>(data, 'message')) throw data.message

				if (instanceOf<Result>(data, 'results') && data.results === undefined) {
					const error = new Error('Pet without information')
					error.name = 'SearchPetError'

					throw error
				}
				console.log(instanceOf<Result>(data, 'results') && data.results)
				setData((prevState) => ({
					...prevState,
					data: (data as Result).results as Pet
				}))
			} catch (error: any) {
				if (error instanceof Error) {
					setData(() => ({ data: error.message, error: true }))
				} else {
					setData(() => ({ data: error, error: true }))
				}
			} finally {
				setIsLoading(false)
			}
		}

		if (url.includes('undefined')) return

		searchFetch()
	}, [url])

	return { data: data.data, error: data.error, isLoading }
}
