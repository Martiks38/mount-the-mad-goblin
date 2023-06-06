import { useEffect, useState } from 'react'
import { useDetectSearchChanges } from '@/hooks/useDetectSearchChanges'

import { LayoutGridResults } from '@/layout/LayoutGridResults'

import { apiURLs } from '@/consts'

export default function SearchResultPage() {
	const [url, setUrl] = useState('')
	const { currentSearch } = useDetectSearchChanges()
	const [errorSearch, setErrorSearch] = useState({
		message: '',
		state: false
	})

	useEffect(() => {
		const fetchURL = new URL(apiURLs.pets.search)
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
