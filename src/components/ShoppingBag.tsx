import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/store/cart'

import bag from '@/assets/imgs/bag.webp'
import shoppingBagStyles from '@/styles/components/ShoppingBag.module.css'

const LIMIT_NUMBER = 9999

export function ShoppingBag() {
	const purchasedPets = useCart((state) => state.purchasedPets)

	const sideImg = 42
	const quantityPurchases = purchasedPets.reduce((cur, pet) => cur + pet.quantity, 0)

	return (
		<Link href="/cart" className={shoppingBagStyles.shoppingBag} aria-label="See purchases">
			<span className={shoppingBagStyles.shoppingBag__quantity}>{`(${
				quantityPurchases > LIMIT_NUMBER ? '...' : quantityPurchases
			})`}</span>
			<Image src={bag} alt="Shopping bag" width={sideImg} height={sideImg} title="See purchases" />
		</Link>
	)
}
