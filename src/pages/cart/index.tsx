import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '@/store/cart'

import { DetailCard } from '@/components/DetailCard'

import clsx from 'clsx'
import { formatPrice } from '@/utils/formatPrice'
import cartPageStyles from '@/styles/pages/CartPage.module.css'

import type { PurchasedPet } from '@/typings/interfaces'

export default function Cart() {
	const { purchasedPets, removeAllFromCart } = useCart((state) => ({
		purchasedPets: state.purchasedPets,
		removeAllFromCart: state.removeAllFromCart
	}))
	const [purchasedPetsState, setPurchasedPetsState] = useState<PurchasedPet[]>([])
	const [total, setTotal] = useState(0)
	const isEmpty = purchasedPetsState.length === 0

	useEffect(() => {
		setPurchasedPetsState(purchasedPets)
		setTotal(purchasedPets.reduce((cur, pet) => cur + pet.price, 0))
	}, [purchasedPets])

	return (
		<article className="content content_letterWhite">
			<h1 className={cartPageStyles.title}>Your shopping bag</h1>
			<div className={cartPageStyles.products}>
				{!isEmpty &&
					purchasedPetsState.map(({ img, name, price, quantity }) => {
						return <DetailCard key={name} img={img} name={name} price={price} quantity={quantity} />
					})}
			</div>
			<section className={cartPageStyles.detailTotal}>
				<h3 className={cartPageStyles.detailTotal__detail}>
					<span>Estimated total</span>
					<span>{formatPrice(total)}g</span>
				</h3>
				<Link
					href="/cart/purchase"
					className={clsx([
						cartPageStyles.detailTotal__purchase,
						isEmpty && cartPageStyles.detailTotal__purchase_disabled
					])}
					aria-disabled={isEmpty}
				>
					<span>Purchase</span>
				</Link>
			</section>
			<section className={cartPageStyles.shoppingContainer}>
				<Link href="/" className={cartPageStyles.shoppingContainer__continueShopping}>
					Continue shopping
				</Link>
				{!isEmpty && (
					<button
						onClick={() => removeAllFromCart()}
						className={cartPageStyles.shoppingContainer__removeAll}
					>
						Remove all pets
					</button>
				)}
			</section>
		</article>
	)
}
