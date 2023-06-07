import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getCategoryPaths } from '@/utils/getCategoryPaths'
import { searchInApi } from '@/utils/searchInApi'
import { formatPrice } from '@/utils/formatPrice'

import categoryPageStyles from '@/styles/pages/CategoryPage.module.css'

import type { GetStaticPaths, GetStaticProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import type { Pet, Result } from '@/typings/interfaces'
import type { PetTypes } from '@/typings/types'

interface CategoryProps {
	results: string | Result
}

interface CategoryParams extends ParsedUrlQuery {
	category: PetTypes
}

export default function Category({ results }: CategoryProps) {
	const router = useRouter()
	const { category } = router.query

	return (
		<>
			<Head>
				<meta
					name="description"
					content="Types of pets in Pets - The Crazy Goblin. Humanoid, draconic, flying, undead, critter, magical, elemental, beast, aquatic, and mechanical pets."
				/>
				<meta
					property="og:description"
					content="Types of pets in Pets - The Crazy Goblin. Humanoid, draconic, flying, undead, critter, magical, elemental, beast, aquatic, and mechanical pets."
				/>
				<title>{`${category} pets | Pets - The Crazy Goblin`}</title>
			</Head>
			<section className="content">
				<h1 className={categoryPageStyles.title}>{`${category} pets`}</h1>
				{typeof results === 'string' ? (
					<p className="error">{results}</p>
				) : (
					<div className={categoryPageStyles.pets}>
						{(results.results as Pet[]).map(({ name, media, price }) => {
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
				)}
			</section>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await getCategoryPaths('/pets/types')

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { category } = params as CategoryParams
	const resource = `/pets/types/${category}`

	const results = await searchInApi(resource)

	return {
		props: { results }
	}
}
