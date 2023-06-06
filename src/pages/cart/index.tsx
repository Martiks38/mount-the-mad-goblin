import Link from 'next/link'
import { useCart } from '@/hooks/useCart'

import { DetailCard } from '@/components/DetailCard'

import clsx from 'clsx'
import { formatPrice } from '@/utils/formatPrice'

import cartPageStyles from '@/styles/pages/CartPage.module.css'

export default function Cart() {
	useCart
	const { shopping, total, removeAllFromCart } = useCart()

	const isEmpty = total === 0
	const estimatedPrice = shopping.reduce((cur, pet) => {
		const { price, quantity } = pet
		return cur + price * quantity
	}, 0)

	return (
		<article className="content content_letterWhite">
			<h1 className={cartPageStyles.title}>Your shopping bag</h1>
			<div className={cartPageStyles.products}>
				{!isEmpty &&
					shopping.map(({ media, name, price, quantity }) => {
						return (
							<DetailCard key={name} media={media} name={name} price={price} quantity={quantity} />
						)
					})}
			</div>
			<section className={cartPageStyles.detailTotal}>
				<h3 className={cartPageStyles.detailTotal__detail}>
					<span>Estimated total</span>
					<span>{formatPrice(estimatedPrice)}g</span>
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
