import { useEffect, useState } from 'react'
import { useShoppingCart } from '@/store/cart'

import type { PurchasedPet } from '@/typings/interfaces'

export function useCart() {
	const {
		addToCart,
		isConnected,
		purchasedPets,
		removeAllFromCart,
		removeAllOfPet,
		removeOneFromCart,
		setConnection,
		setPurchasedPets
	} = useShoppingCart((state) => ({
		isConnected: state.isConnected,
		purchasedPets: state.purchasedPets,
		addToCart: state.addToCart,
		removeOneFromCart: state.removeOneFromCart,
		removeAllOfPet: state.removeAllOfPet,
		removeAllFromCart: state.removeAllFromCart,
		setConnection: state.setConnection,
		setPurchasedPets: state.setPurchasedPets
	}))

	const [shopping, setShopping] = useState<PurchasedPet[]>([])
	const [total, setTotal] = useState(0)
	const [connected, setConnected] = useState(false)

	useEffect(() => {
		const total = purchasedPets.reduce((cur, item) => cur + item.quantity, 0)

		setTotal(total)
		setShopping(purchasedPets)
	}, [purchasedPets])

	useEffect(() => {
		setConnected(isConnected)
	}, [isConnected])

	return {
		addToCart,
		connected,
		removeAllFromCart,
		removeAllOfPet,
		removeOneFromCart,
		setConnection,
		setPurchasedPets,
		shopping,
		total
	}
}
