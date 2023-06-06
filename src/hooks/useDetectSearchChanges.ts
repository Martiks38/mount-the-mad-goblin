import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export function useDetectSearchChanges() {
	const router = useRouter()
	const [currentSearch, setCurrentSearch] = useState('')

	useEffect(() => {
		const checkSearch = () => {
			const { search } = window.location

			if (search !== currentSearch) setCurrentSearch(search)
		}

		router.events.on('routeChangeComplete', checkSearch)

		return () => router.events.off('routeChangeComplete', checkSearch)
	}, [currentSearch, router])

	return { currentSearch }
}
