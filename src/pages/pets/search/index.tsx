import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDetectSearchChanges } from '@/hooks/useDetectSearchChanges'

import { LayoutGridResults } from '@/layout/LayoutGridResults'

const requestURL = 'http://localhost:3000/api/v1/pets/search'

export default function SearchResultPage() {
	const router = useRouter()
	const [url, setUrl] = useState('')
	const { currentSearch } = useDetectSearchChanges()
	const [errorSearch, setErrorSearch] = useState({
		message: '',
		state: false
	})

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
