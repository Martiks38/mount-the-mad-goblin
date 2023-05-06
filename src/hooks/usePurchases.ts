import { useState } from 'react'

// Quantities allowed to buy
const MIN_AMOUNT = 1
const MAX_AMOUNT = 999

export function usePurchases() {
	const [amount, setAmount] = useState(MIN_AMOUNT)

	// Decrease the amount of purchases through a button
	const decreaseAmount = (ev: React.MouseEvent<HTMLButtonElement>) => {
		ev.preventDefault()
		if (amount >= MIN_AMOUNT) setAmount(amount - 1)
	}

	// Increase the amount of purchases through a button
	const increaseAmount = (ev: React.MouseEvent<HTMLButtonElement>) => {
		ev.preventDefault()
		if (amount <= MAX_AMOUNT) setAmount(amount + 1)
	}

	// Change the amount of purchases through an input
	const changeAmount = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = ev.currentTarget
		const number = Number(value)

		if (Number.isNaN(number)) return

		if (value === '') {
			setAmount(0)
			return
		}

		if (number > MAX_AMOUNT) {
			setAmount(MAX_AMOUNT)
			return
		}

		setAmount(number)
	}

	// If the value of the input is zero, when losing focus,
	// it sets the amount of purchases to the minimum value.
	const checkValue = (ev: React.FocusEvent<HTMLInputElement>) => {
		const { value } = ev.currentTarget
		if (Number(value) === 0) setAmount(MIN_AMOUNT)
	}

	return { amount, changeAmount, checkValue, decreaseAmount, increaseAmount }
}
