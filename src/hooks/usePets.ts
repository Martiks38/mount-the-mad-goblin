import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { LIMIT } from '@/consts'

import type { ResultPagination } from '@/typings/interfaces'

interface ResponseData {
	data: null | ResultPagination | { message: string }
	error: boolean
}

export function usePets(url: string) {
	const router = useRouter()
	const [data, setData] = useState<ResponseData>({ data: null, error: false })
	const [isLoading, setIsLoading] = useState(false)
	const [currentSearch, setCurrentSearch] = useState('')

	useEffect(() => {
		const checkSearch = () => {
			const { search } = window.location

			if (search !== currentSearch) setCurrentSearch(search)
		}

		router.events.on('routeChangeComplete', checkSearch)

		return () => router.events.off('routeChangeComplete', checkSearch)
	}, [currentSearch, router])

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

				if (!response.ok) throw data

				const links = Object.fromEntries(
					Object.entries(data.links).map(([linkName, link]) => {
						if (linkName === 'base') return [linkName, link]

						const resource = (link as string).replace(data.links.base, '')
						return [linkName, resource]
					})
				)

				setData((prevData) => ({ ...prevData, data: { ...data, links } }))
			} catch (error: any) {
				setData(() => ({ data: error as ResultPagination, error: true }))
			} finally {
				setIsLoading(false)
			}
		}

		if (!url) return

		searchPets()
	}, [currentSearch, url])

	return { data, isLoading }
}
