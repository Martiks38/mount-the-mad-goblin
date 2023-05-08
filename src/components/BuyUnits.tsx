import { usePurchases } from '@/hooks/usePurchases'
import { useCart } from '@/store/cart'
import buyUnitsStyles from '@/styles/components/BuyUnits.module.css'
import { useRouter } from 'next/router'
import { FormEvent, useId } from 'react'

interface BuyUnitsProps {
	img: string
	name: string
	price: number
	styles?: string
}

export function BuyUnits({ img, name, price, styles }: BuyUnitsProps) {
	const router = useRouter()
	const addToCart = useCart((state) => state.addToCart)
	const { quantity, changeQuantity, checkValue, decreaseQuantity, increaseQuantity } =
		usePurchases()
	const amountInputId = useId()

	const handlerBuy = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault()
		const formData = new FormData(ev.currentTarget)

		const quantity = Number(formData.get('quantity'))

		if (Number.isNaN(quantity) || quantity < 1) {
			formData.set('quantity', '1')
			return
		}

		const pet = {
			img,
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
