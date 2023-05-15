import Image from 'next/image'
import Link from 'next/link'

import bag from '@/assets/imgs/bag.webp'

import shoppingBagStyles from '@/styles/components/ShoppingBag.module.css'
import { useCart } from '@/hooks/useCart'

const LIMIT_NUMBER = 9999

export function ShoppingBag() {
	const { total } = useCart()

	const sideImg = 42

	return (
		<Link href="/cart" className={shoppingBagStyles.shoppingBag} aria-label="See purchases">
			<span className={shoppingBagStyles.shoppingBag__quantity}>{`(${
				total > LIMIT_NUMBER ? '...' : total
			})`}</span>
			<Image src={bag} alt="Shopping bag" width={sideImg} height={sideImg} title="See purchases" />
		</Link>
	)
}
