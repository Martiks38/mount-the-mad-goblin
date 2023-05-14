import { useEffect, useState } from 'react'

import type { Pet, Result } from '@/typings/interfaces'

interface SearchStatus {
	data: null | Pet | string
	error: boolean
}

type ResponseApi = {
	message?: string
	results?: Result
}

export function usePet(url: string) {
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<SearchStatus>({ data: null, error: false })

	useEffect(() => {
		const searchFetch = async () => {
			setIsLoading(true)

			try {
				const response = await fetch(url)
				const data: ResponseApi = await response.json()

				if (!response.ok) throw data?.message

				setData((prevState) => ({ ...prevState, data: data?.results as Pet }))
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
