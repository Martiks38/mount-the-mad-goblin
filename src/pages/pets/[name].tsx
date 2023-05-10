import { useRouter } from 'next/router'

import { Loader } from '@/common/Loader'
import { BuyUnits } from '@/components/BuyUnits'

import { usePet } from '@/hooks/usePet'

import petPageStyles from '@/styles/pages/PetPage.module.css'

export default function MascotPage() {
	const router = useRouter()
	const petName: string = router.query.name as string

	const { data, error, isLoading } = usePet(`http://localhost:3000/api/v1/pets/${petName}`)

	return (
		<article className="content">
			{isLoading && (
				<div className={petPageStyles.loading}>
					<Loader styles={petPageStyles.loading__loader} />
					<p className={petPageStyles.loading__errorText}>
						Wait a minute, our &ldquo;skilled&rdquo; goblin workers are gathering the information.
					</p>
				</div>
			)}
			{!isLoading && error && <p className="error">{data as string}</p>}
			{typeof data === 'object' && !isLoading && !error && (
				<article style={{ color: 'white' }} className={petPageStyles.petData}>
					<h1 className={petPageStyles.petData__name}>{decodeURI(petName)}</h1>
					<img
						src={data?.media}
						alt={data?.name}
						width={200}
						height={200}
						className={petPageStyles.petData__img}
					/>
					<p className={petPageStyles.petData__description}>{data?.description}</p>

					<BuyUnits
						img={data?.media as string}
						name={petName}
						price={data?.price as number}
						styles={petPageStyles.petData__btns}
					/>
				</article>
			)}
		</article>
	)
}
