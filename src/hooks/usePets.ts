import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import type { ResultPagination } from '@/typings/interfaces'
import { LIMIT } from '@/consts'

interface ResponseData {
	data: null | ResultPagination | { message: string }
	error: boolean
}

export function usePets(url: string) {
	const router = useRouter()
	const [data, setData] = useState<ResponseData>({ data: null, error: false })
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const searchPets = async () => {
			try {
				const { searchParams } = new URL(window.location.href)
				const offset = Number(searchParams.get('offset')) || 0

				// Ensures that the offset is a multiple of the LIMIT constant. Ensuring correct pagination.
				if (offset % LIMIT !== 0) {
					const newOffset = Math.round(offset / LIMIT) * LIMIT

					router.replace(`/pets?offset=${newOffset}`)
				}

				const response = await fetch(url + offset)
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

		searchPets()
	}, [router, url])

	return { data, isLoading }
}
