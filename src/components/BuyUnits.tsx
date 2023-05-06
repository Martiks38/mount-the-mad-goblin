import { usePurchases } from '@/hooks/usePurchases'
import buyUnitsStyles from '@/styles/components/BuyUnits.module.css'
import { useId } from 'react'

interface BuyUnitsProps {
	name: string
	styles?: string
}

export function BuyUnits({ name, styles }: BuyUnitsProps) {
	const { amount, changeAmount, checkValue, decreaseAmount, increaseAmount } = usePurchases()
	const amountInputId = useId()

	return (
		<form className={`${buyUnitsStyles.panelBtns} ${styles}`}>
			<label className={buyUnitsStyles.panelBtns__handlerAmount} htmlFor={amountInputId}>
				<span className={buyUnitsStyles.panelBtns__handlerAmount__text}>Quantity:</span>
				<button
					className={`${buyUnitsStyles.panelBtns__handlerAmount__btn} ${buyUnitsStyles.panelBtns__handlerAmount__btn_less}`}
					onClick={decreaseAmount}
					aria-label="Decreases the quantity to buy"
				></button>
				<input
					type="text"
					className={buyUnitsStyles.panelBtns__handlerAmount__viewAmount}
					value={amount}
					aria-label={`Buy ${amount} ${name}`}
					id={amountInputId}
					name="amount"
					onChange={changeAmount}
					onBlur={checkValue}
				/>
				<button
					className={`${buyUnitsStyles.panelBtns__handlerAmount__btn} ${buyUnitsStyles.panelBtns__handlerAmount__btn_plus}`}
					onClick={increaseAmount}
					aria-label="Increase the amount to buy"
				></button>
			</label>
			<button type="submit" className={buyUnitsStyles.panelBtns__buyBtn}>
				Buy
			</button>
		</form>
	)
}
