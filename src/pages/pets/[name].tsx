import Head from 'next/head'
import { useRouter } from 'next/router'
import { usePet } from '@/hooks/usePet'

import { BuyUnits } from '@/components/BuyUnits'
import { Loader } from '@/common/Loader'

import { instanceOf } from '@/utils/intanceOf'

import { apiURLs } from '@/consts'
import petPageStyles from '@/styles/pages/PetPage.module.css'

import type { Pet } from '@/typings/interfaces'

export default function MascotPage() {
	const router = useRouter()
	const petName: string = router.query.name as string

	const { data, error, isLoading } = usePet(`${apiURLs.pets.base}/${petName}`)

	return (
		<>
			<Head>
				<meta
					name="description"
					content={data && typeof data === 'object' && data.description ? data.description : ''}
				/>
				<meta
					property="og:description"
					content={data && typeof data === 'object' && data.description ? data.description : ''}
				/>

				<title>{`${petName} | Pets - The Crazy Goblin`}</title>
			</Head>
			<article className="content">
				{isLoading && (
					<div className={petPageStyles.loading}>
						<Loader styles={petPageStyles.loading__loader} />
						<p className={petPageStyles.loading__errorText}>
							Wait a minute, our &ldquo;skilled&rdquo; goblin workers are gathering the information.
						</p>
					</div>
				)}
				{!isLoading && error && typeof data === 'string' && <p className="error">{data}</p>}
				{!isLoading && !error && data && instanceOf<Pet>(data, 'name') && (
					<article className={petPageStyles.petData}>
						<h1 className={petPageStyles.petData__name}>{decodeURI(petName)}</h1>
						<img
							src={data.media}
							alt={data.name}
							width={200}
							height={200}
							className={petPageStyles.petData__img}
						/>
						<p className={petPageStyles.petData__description}>{data?.description}</p>
						<BuyUnits
							media={data.media}
							name={petName}
							price={data.price}
							styles={petPageStyles.petData__btns}
						/>
					</article>
				)}
			</article>
		</>
	)
}
