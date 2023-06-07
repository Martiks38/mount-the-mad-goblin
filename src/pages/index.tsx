import Head from 'next/head'
import Image from 'next/image'

import { ShowCategory } from '@/components/ShowCategory'

import { searchInApi } from '@/utils/searchInApi'

import heroImage from '@/assets/imgs/heroImgHome.webp'
import homeStyles from '@/styles/pages/home.module.css'

import type { GetStaticProps } from 'next'
import type { Result } from '@/typings/interfaces'
import type { Categories } from '@/typings/types'
import { apiURLs } from '@/consts'

interface HomeProps {
	pets: Result | string
}

export default function Home({ pets }: HomeProps) {
	return (
		<>
			<Head>
				<meta
					name="description"
					content="Come to The Crazy Goblin. Here you can find the pet of your dreams. From flying pets or dragons to mechanical or magical pets. The Crazy Goblin your pet store."
				/>
				<meta
					property="og:description"
					content="Come to The Crazy Goblin. Here you can find the pet of your dreams. From flying pets or dragons to mechanical or magical pets. The Crazy Goblin your pet store."
				/>
			</Head>
			<div className={homeStyles.containerHeroImage}>
				<Image
					src={heroImage}
					alt=""
					className={homeStyles.containerHeroImage__heroImage}
					priority={true}
				/>
				<h1 className={homeStyles.containerHeroImage__title}>Pets - The Crazy Goblin</h1>
			</div>

			<article className="content">
				<section className={homeStyles.section}>
					{typeof pets === 'string' ? (
						<p className="error">{pets}</p>
					) : (
						<>
							<h2 className={homeStyles.section__title}>Pets</h2>
							<div className={homeStyles.section__gridCategory}>
								{(pets.results as Categories[]).map(({ media, type }) => {
									return (
										<ShowCategory
											key={type}
											alt={`${type} pet`}
											href={`/pets/categories/${type}`}
											media={media}
											title={`See ${type} pets`}
										/>
									)
								})}
							</div>
						</>
					)}
				</section>
			</article>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const response = await searchInApi(apiURLs.pets.types)

	return {
		props: { pets: response }
	}
}
