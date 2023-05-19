import { useRouter } from 'next/router'
import { useCallback, useId, useRef, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { useFocus } from '@/hooks/useFocus'

import purchaseStyles from '@/styles/pages/PurchasePage.module.css'
import { INVALID_BILLING_INFORMATION } from '@/consts'

interface PaymentData {
	billingAddress: string
	cardNumber: string
	country: string
	month: string
	name: string
	paymentMethod: string
	phone: string
	postal: string
	securityCode: string
	surname: string
	year: string
}

const currentYear = new Date().getFullYear()
const months = Array.from({ length: 12 }, (_, index) => index + 1)
const years = Array.from({ length: 30 }, (_, index) => currentYear + index)
const countries = ['Argentina', 'Brazil', 'France', 'Gernamy', 'Italy', 'Mexico', 'Spain']
const paymentMethods = ['Visa', 'Mastercard', 'PayPal']

export default function Purchase() {
	const formId = useId()
	const router = useRouter()
	const [isError, setIsError] = useState(false)
	const error = useRef(false)

	const focusSelect = useFocus<HTMLSelectElement>(null)
	const { total } = useCart()

	const showError = useCallback((name: string) => {
		const el = document.querySelector(`[name=${name}]`)
		el?.classList.add('formElementError')

		setIsError(true)
		setTimeout(() => {
			setIsError(false)
		}, 1500)

		error.current = true
	}, [])

	const handleSubmit = useCallback(
		(ev: React.FormEvent<HTMLFormElement>) => {
			ev.preventDefault()

			const formData = new FormData(ev.currentTarget)
			const data = Object.fromEntries(formData.entries()) as unknown as PaymentData

			error.current = false

			/* void field */
			const voidField = Object.values(data).some((field) => field === '')

			if (voidField) {
				Object.entries(data).forEach((pair) => {
					if (pair[1] === '') showError(pair[0])
				})
			}

			/* Card number */
			if (data.cardNumber.length !== 16) {
				showError('cardNumber')
			}

			/* Security code */
			const securityCodeError = Number(data.securityCode) > 1000

			if (securityCodeError) {
				showError('securityCode')
			}

			/* Month */
			const month = Number(data.month)
			const monthError = month < 1 || month > 12

			if (monthError) {
				showError('month')
			}

			/* Year */
			const year = Number(data.year)
			if (year < currentYear) {
				showError('year')
			}

			/* Name */
			if (/[^a-zA-ZñÑ\s]/g.test(data.name)) {
				showError('name')
			}

			/* Surname */
			if (/[^a-zA-ZñÑ\s]/g.test(data.surname)) {
				showError('surname')
			}

			/* Phone */
			const phone = Number(data.phone)
			if (Number.isNaN(phone) || data.phone.length !== 10) {
				showError('phone')
			}

			/* Postal */
			const postal = Number(data.postal)
			if (Number.isNaN(postal) || data.postal.length < 4 || data.postal.length > 9) {
				showError('postal')
			}

			if (error.current) return

			window.sessionStorage.setItem(INVALID_BILLING_INFORMATION, JSON.stringify({ invalid: false }))
			router.push('/cart/purchase/confirm')
		},
		[router, showError]
	)

	return (
		<article className={`content content_center content_letterWhite`}>
			<form className={purchaseStyles.form} onSubmit={handleSubmit}>
				<h1 className={purchaseStyles.form__title}>Payment method</h1>
				{isError && (
					<p className={`formError ${purchaseStyles.form__error}`}>
						One or more fields are incorrect.
					</p>
				)}
				<div className={purchaseStyles.form__main}>
					<div className={purchaseStyles.form__payment}>
						<div className={purchaseStyles.form__sectionContent}>
							<label htmlFor={`${formId}-paymentMethod`}>Select a payment method</label>
							<select
								name="paymentMethod"
								id={`${formId}-paymentMethod`}
								className={purchaseStyles.form__input}
								ref={focusSelect}
								required
							>
								{paymentMethods.map((paymentMethod) => (
									<option key={paymentMethod} value={paymentMethod}>
										{paymentMethod}
									</option>
								))}
							</select>
							<label htmlFor={`${formId}-cardNumber`}>Card number</label>
							<input
								type="text"
								name="cardNumber"
								id={`${formId}-cardNumber`}
								className={`${purchaseStyles.form__cardNumber} ${purchaseStyles.form__input}`}
								pattern="^\d{16}$"
								placeholder="1111111111111111"
								title="They must be twelve digits"
								required
							/>
						</div>
						<div className={purchaseStyles.form__sectionContent}>
							<span>Expiration date and security code</span>
							<div className={purchaseStyles.form__expiration}>
								<select
									name="month"
									id={`${formId}-month`}
									className={purchaseStyles.form__input}
									required
								>
									{months.map((month) => (
										<option key={month} value={month}>
											{month}
										</option>
									))}
								</select>
								<select
									name="year"
									id={`${formId}-year`}
									className={purchaseStyles.form__input}
									required
								>
									{years.map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</select>
								<input
									type="number"
									name="securityCode"
									id={`${formId}-securityCode`}
									min={0}
									max={999}
									placeholder="999"
									pattern="^\d{3}$"
									title="Must have three digits"
									className={`${purchaseStyles.form__input} ${purchaseStyles.form__securityInput}`}
									required
								/>
							</div>
						</div>
					</div>
					<h2 className={purchaseStyles.form__title}>Billing information</h2>
					<div className={purchaseStyles.form__information}>
						<div className={purchaseStyles.form__sectionContent}>
							<div className={purchaseStyles.form__sectionContent}>
								<label htmlFor={`${formId}-name`}>Name</label>
								<input
									type="text"
									name="name"
									id={`${formId}-name`}
									className={purchaseStyles.form__input}
									placeholder="Malfurion"
									pattern="^([a-zA-Z]{2,}\s?)*$"
									title="Only letters are allowed"
									required
								/>
								<label htmlFor={`${formId}-surname`}>Surname</label>
								<input
									type="text"
									name="surname"
									id={`${formId}-surname`}
									className={purchaseStyles.form__input}
									placeholder="Stormrage"
									pattern="^([a-zA-Z]{2,}\s?)*$"
									title="Only letters are allowed"
									required
								/>
							</div>
							<label htmlFor={`${formId}-billingAddress`}>Billing Address</label>
							<input
								type="text"
								name="billingAddress"
								id={`${formId}-billingAddress`}
								className={purchaseStyles.form__input}
								placeholder="Streets of Tazavesh"
								pattern="^([a-zA-ZñÑ0-9]\s?)+$"
								required
							/>
							<label htmlFor={`${formId}-country`}>Country</label>
							<select
								name="country"
								id={`${formId}-country`}
								className={purchaseStyles.form__input}
								required
							>
								{countries.map((country) => (
									<option key={country} value={country}>
										{country}
									</option>
								))}
							</select>
						</div>
						<div className={purchaseStyles.form__sectionContent}>
							<label htmlFor={`${formId}-location`}>Location</label>
							<input
								type="text"
								name="location"
								id={`${formId}-location`}
								className={purchaseStyles.form__input}
								placeholder="Tazavesh"
								pattern="^([a-zA-ZñÑ0-9]\s?)+$"
								required
							/>
							<label htmlFor={`${formId}-postal`}>Postal or zip code</label>
							<input
								type="text"
								name="postal"
								id={`${formId}-postal`}
								className={purchaseStyles.form__input}
								placeholder="1111"
								pattern="^\d{4,9}$"
								title="It must be between four and nine digits"
								required
							/>
							<label htmlFor={`${formId}-phone`}>Phone</label>
							<input
								type="text"
								name="phone"
								id={`${formId}-phone`}
								className={purchaseStyles.form__input}
								placeholder="1233697890"
								title="It must have ten digits"
								pattern="^\d{10}$"
								required
							/>
						</div>
					</div>
					<p className={purchaseStyles.form__message}>
						You will be able to review your order before it is processed.
					</p>
				</div>
				<button type="submit" className={purchaseStyles.form__submit} disabled={total === 0}>
					Continue
				</button>
			</form>
		</article>
	)
}
