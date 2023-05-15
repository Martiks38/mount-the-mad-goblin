import { useEffect, useState } from 'react'
import { useShoppingCart } from '@/store/cart'

import type { PurchasedPet } from '@/typings/interfaces'

export function useCart() {
	const { addToCart, purchasedPets, removeAllFromCart, removeAllOfPet, removeOneFromCart } =
		useShoppingCart((state) => ({
			purchasedPets: state.purchasedPets,
			addToCart: state.addToCart,
			removeOneFromCart: state.removeOneFromCart,
			removeAllOfPet: state.removeAllOfPet,
			removeAllFromCart: state.removeAllFromCart
		}))

	const [shopping, setShopping] = useState<PurchasedPet[]>([])
	const [total, setTotal] = useState(0)

	useEffect(() => {
		const total = purchasedPets.reduce((cur, item) => cur + item.quantity, 0)

		setTotal(total)
		setShopping(purchasedPets)
	}, [purchasedPets])

	return {
		addToCart,
		removeAllFromCart,
		removeAllOfPet,
		removeOneFromCart,
		shopping,
		total
	}
}
