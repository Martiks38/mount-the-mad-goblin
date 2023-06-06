import { useState } from 'react'

// Quantities allowed to buy
const MIN_QUANTITY = 1
const MAX_QUANTITY = 999

export function usePurchases() {
	const [quantity, setQuantity] = useState(MIN_QUANTITY)

	// Decrease the amount of purchases through a button
	const decreaseQuantity = (ev: React.MouseEvent<HTMLButtonElement>) => {
		ev.preventDefault()
		if (quantity >= MIN_QUANTITY) setQuantity(quantity - 1)
	}

	// Increase the amount of purchases through a button
	const increaseQuantity = (ev: React.MouseEvent<HTMLButtonElement>) => {
		ev.preventDefault()
		if (quantity <= MAX_QUANTITY) setQuantity(quantity + 1)
	}

	// Change the amount of purchases through an input
	const changeQuantity = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = ev.currentTarget
		const number = Number(value)

		if (Number.isNaN(number)) return

		if (value === '') {
			setQuantity(0)
			return
		}

		if (number > MAX_QUANTITY) {
			setQuantity(MAX_QUANTITY)
			return
		}

		setQuantity(number)
	}

	// If the value of the input is zero, when losing focus,
	// it sets the quantity of purchases to the minimum value.
	const checkValue = (ev: React.FocusEvent<HTMLInputElement>) => {
		const { value } = ev.currentTarget
		if (Number(value) === 0) setQuantity(MIN_QUANTITY)
	}

	return { quantity, changeQuantity, checkValue, decreaseQuantity, increaseQuantity }
}
