import { Pet, Result } from '@/typings/interfaces'
import { useEffect, useState } from 'react'

interface SearchStatus {
	data: null | Pet | string
	error: boolean
}

export function usePet(url: string) {
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<SearchStatus>({ data: null, error: false })

	useEffect(() => {
		const searchFetch = async () => {
			setIsLoading(true)

			try {
				const response = await fetch(url)
				const data: Result = await response.json()

				if (!response.ok) throw data

				setData((prevState) => ({ ...prevState, data: data.results as Pet }))
			} catch (error: any) {
				setData((prevState) => ({ ...prevState, data: error?.message as string, error: true }))
			} finally {
				setIsLoading(false)
			}
		}

		if (url.includes('undefined')) return

		searchFetch()
	}, [url])

	return { data: data.data, error: data.error, isLoading }
}
