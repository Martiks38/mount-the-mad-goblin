import { useEffect, useState } from 'react'
import { useDetectSearchChanges } from './useDetectSearchChanges'

import { LIMIT } from '@/consts'

import type { ResultPagination } from '@/typings/interfaces'

interface ResponseData {
	data: null | ResultPagination | { message: string }
	error: boolean
}

export function usePets(url: string) {
	const [data, setData] = useState<ResponseData>({ data: null, error: false })
	const [isLoading, setIsLoading] = useState(false)
	const { currentSearch } = useDetectSearchChanges()

	useEffect(() => {
		const searchPets = async () => {
			try {
				const fetchURL = new URL(url)
				const { searchParams } = new URL(window.location.href)
				const offsetPage = searchParams.get('offset')

				let offset = Number(searchParams.get('offset')) || 0
				// Ensures that the offset is a multiple of the LIMIT constant. Ensuring correct pagination.
				if (offsetPage !== null && offset % LIMIT !== 0) {
					fetchURL.searchParams.set('offset', '0')
				}
				if (offsetPage !== null && offset % LIMIT === 0) {
					fetchURL.searchParams.set('offset', offsetPage)
				}

				const response = await fetch(fetchURL.href)
				const data = await response.json()

				const hasMessage = Object.hasOwn(data, 'message')
				if (!response.ok || hasMessage) throw hasMessage ? data.message : data

				const links = Object.fromEntries(
					Object.entries(data.links).map(([linkName, link]) => {
						if (linkName === 'base') return [linkName, link]

						const resource = (link as string).replace(data.links.base, '')
						return [linkName, resource]
					})
				)

				setData((prevData) => ({ ...prevData, data: { ...data, links } }))
			} catch (error: any) {
				let message = ''
				if (typeof error === 'string') message = error
				if (typeof error === 'object') message = error.message

				setData(() => ({ data: { message }, error: true }))
			} finally {
				setIsLoading(false)
			}
		}

		if (!url) return

		searchPets()
	}, [currentSearch, url])

	return { data, isLoading }
}
