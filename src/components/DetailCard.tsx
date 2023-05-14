import Link from 'next/link'
import { useCart } from '@/store/cart'

import { formatPrice } from '@/utils/formatPrice'

import detailCardStyles from '@/styles/components/DetailCard.module.css'

import type { PurchasedPet } from '@/typings/interfaces'

interface DetailCardProps extends PurchasedPet {}

export function DetailCard({ media, name, price, quantity }: DetailCardProps) {
	const { removeOneFromCart, removeAllOfPet } = useCart((state) => ({
		removeAllOfPet: state.removeAllOfPet,
		removeOneFromCart: state.removeOneFromCart
	}))

	return (
		<section className={detailCardStyles.product}>
			<img src={media} alt={name} loading="lazy" className={detailCardStyles.product__img} />
			<Link href={`/pets/${name}`} className={detailCardStyles.product__link}>
				<h2 className={detailCardStyles.product__name}>{name}</h2>
			</Link>
			<p className={detailCardStyles.product__detail}>
				{quantity}&nbsp;x&nbsp;{formatPrice(price)}g
			</p>
			<div className={detailCardStyles.product__removeContainer}>
				<button
					onClick={() => {
						removeOneFromCart(name)
					}}
					className={detailCardStyles.product__removeContainer__button}
				>
					Remove one
				</button>
				<button
					onClick={() => {
						removeAllOfPet(name)
					}}
					className={detailCardStyles.product__removeContainer__button}
				>
					Remove all
				</button>
			</div>
		</section>
	)
}
