import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePets } from '@/hooks/usePets'

import { Loader } from '@/common/Loader'
import Pagination from '@/components/Pagination'

import { instanceOf } from '@/utils/intanceOf'
import { formatPrice } from '@/utils/formatPrice'

import petPageStyles from '@/styles/pages/PetPage.module.css'
import categoryPageStyles from '@/styles/pages/CategoryPage.module.css'

import { LIMIT } from '@/consts'

import type { ResultPagination } from '@/typings/interfaces'

const requestURL = 'http://localhost:3000/api/v1/pets/search'

export default function SearchResultPage() {
	const [url, setUrl] = useState('')
	const [error, setError] = useState({
		message: '',
		state: false
	})
	const { data, isLoading } = usePets(url)

	useEffect(() => {
		const fetchURL = new URL(requestURL)
		const { searchParams } = new URL(window.location.href)
		const word = searchParams.get('word')
		const offset = Number(searchParams.get('offset')) ? searchParams.get('offset') : '0'

		if (word === null || offset === null) {
			setError({ message: '', state: true })
			return
		}

		fetchURL.searchParams.set('word', word)
		fetchURL.searchParams.set('offset', offset)

		setUrl(fetchURL.href)
		setError({ message: '', state: false })
	}, [])

	return (
		<section className="content content_whiteLetter">
			{isLoading && (
				<>
					<div className={petPageStyles.loading}>
						<Loader styles={petPageStyles.loading__loader} />
						<p className={petPageStyles.loading__errorText}>
							Wait a minute, our &ldquo;skilled&rdquo; goblin workers are gathering the information.
						</p>
					</div>
				</>
			)}
			{!isLoading && (data.error || error.state) && data.data && (
				<p className="error">
					{(instanceOf<Record<'message', string>>(data.data, 'message') && data.data.message) ||
						error.message}
				</p>
			)}
			{!isLoading &&
				!data.error &&
				data.data &&
				instanceOf<ResultPagination>(data.data, 'offset') && (
					<>
						<div className={categoryPageStyles.pets}>
							{data.data.results.map(({ name, media, price }) => {
								return (
									<Link
										key={name}
										href={`/pets/${name}`}
										className={`${categoryPageStyles.pets__pet} ${categoryPageStyles.pet}`}
									>
										<h2 className={categoryPageStyles.pet__name}>{name}</h2>
										<img
											src={media}
											alt={name}
											width="280"
											height="220"
											className={categoryPageStyles.pet__img}
										/>
										<p className={categoryPageStyles.pet__price}>{`${formatPrice(price)} g`}</p>
									</Link>
								)
							})}
						</div>
						<Pagination
							links={data.data.links}
							lastPageNumber={Math.ceil(data.data.total / data.data.size)}
							offset={data.data.offset}
							limit={LIMIT}
						/>
					</>
				)}
		</section>
	)
}
