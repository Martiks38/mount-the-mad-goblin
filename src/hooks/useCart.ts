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
		setConnection
	} = useShoppingCart((state) => ({
		isConnected: state.isConnected,
		purchasedPets: state.purchasedPets,
		setConnection: state.setConnection,
		addToCart: state.addToCart,
		removeOneFromCart: state.removeOneFromCart,
		removeAllOfPet: state.removeAllOfPet,
		removeAllFromCart: state.removeAllFromCart
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
		shopping,
		total
	}
}
