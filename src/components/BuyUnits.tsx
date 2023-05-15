import { useRouter } from 'next/router'
import { useId } from 'react'
import { usePurchases } from '@/hooks/usePurchases'
import { useCart } from '@/hooks/useCart'

import buyUnitsStyles from '@/styles/components/BuyUnits.module.css'

import type { PetBase } from '@/typings/interfaces'

interface BuyUnitsProps extends PetBase {
	styles?: string
}

export function BuyUnits({ media, name, price, styles }: BuyUnitsProps) {
	const amountInputId = useId()
	const router = useRouter()
	const { addToCart } = useCart()
	const { quantity, changeQuantity, checkValue, decreaseQuantity, increaseQuantity } =
		usePurchases()

	const handlerBuy = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault()
		const formData = new FormData(ev.currentTarget)

		const quantity = Number(formData.get('quantity'))

		if (Number.isNaN(quantity) || quantity < 1) {
			formData.set('quantity', '1')
			return
		}

		const pet = {
			media,
			name,
			price,
			quantity
		}

		addToCart(pet)

		router.push('/cart')
	}

	return (
		<form className={`${buyUnitsStyles.panelBtns} ${styles}`} onSubmit={handlerBuy}>
			<label className={buyUnitsStyles.panelBtns__handlerAmount} htmlFor={amountInputId}>
				<span className={buyUnitsStyles.panelBtns__handlerAmount__text}>Quantity:</span>
				<button
					className={`${buyUnitsStyles.panelBtns__handlerAmount__btn} ${buyUnitsStyles.panelBtns__handlerAmount__btn_less}`}
					onClick={decreaseQuantity}
					aria-label="Decreases the quantity to buy"
				></button>
				<input
					type="text"
					className={buyUnitsStyles.panelBtns__handlerAmount__viewAmount}
					value={quantity}
					aria-label={`Buy ${quantity} ${name}`}
					id={amountInputId}
					name="quantity"
					onChange={changeQuantity}
					onBlur={checkValue}
				/>
				<button
					className={`${buyUnitsStyles.panelBtns__handlerAmount__btn} ${buyUnitsStyles.panelBtns__handlerAmount__btn_plus}`}
					onClick={increaseQuantity}
					aria-label="Increase the quantity to buy"
				></button>
			</label>
			<button type="submit" className={buyUnitsStyles.panelBtns__buyBtn}>
				Buy
			</button>
		</form>
	)
}
