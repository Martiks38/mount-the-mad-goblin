import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '@/store/cart'

import bag from '@/assets/imgs/bag.webp'

import shoppingBagStyles from '@/styles/components/ShoppingBag.module.css'

const LIMIT_NUMBER = 9999

export function ShoppingBag() {
	const purchasedPets = useCart((state) => state.purchasedPets)
	const [quantity, setQuantity] = useState(0)

	const sideImg = 42

	useEffect(() => {
		setQuantity(purchasedPets.reduce((cur, pet) => cur + pet.quantity, 0))
	}, [purchasedPets])

	return (
		<Link href="/cart" className={shoppingBagStyles.shoppingBag} aria-label="See purchases">
			<span className={shoppingBagStyles.shoppingBag__quantity}>{`(${
				quantity > LIMIT_NUMBER ? '...' : quantity
			})`}</span>
			<Image src={bag} alt="Shopping bag" width={sideImg} height={sideImg} title="See purchases" />
		</Link>
	)
}
