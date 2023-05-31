import Link from 'next/link'
import { useEffect, useState } from 'react'

import { LayoutGridResults } from '@/layout/LayoutGridResults'
import { useRouter } from 'next/router'

const requestURL = 'http://localhost:3000/api/v1/pets/search'

export default function SearchResultPage() {
	const router = useRouter()
	const [url, setUrl] = useState('')
	const [currentSearch, setCurrentSearch] = useState('')
	const [errorSearch, setErrorSearch] = useState({
		message: '',
		state: false
	})

	useEffect(() => {
		const checkSearch = () => {
			const { search } = window.location

			if (search !== currentSearch) setCurrentSearch(search)
		}

		router.events.on('routeChangeComplete', checkSearch)

		return () => router.events.off('routeChangeComplete', checkSearch)
	}, [currentSearch, router])

	useEffect(() => {
		const fetchURL = new URL(requestURL)
		const { searchParams } = new URL(window.location.href)
		const word = searchParams.get('word')
		const offset = Number(searchParams.get('offset')) ? searchParams.get('offset') : '0'

		if (word === null || offset === null) {
			setErrorSearch({ message: '', state: true })
			return
		}

		fetchURL.searchParams.set('word', word)
		fetchURL.searchParams.set('offset', offset)

		setUrl(fetchURL.href)
		setErrorSearch({ message: '', state: false })
	}, [currentSearch])

	return <LayoutGridResults errorSearch={errorSearch} url={url} />
}
