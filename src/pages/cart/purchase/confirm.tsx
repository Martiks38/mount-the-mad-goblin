import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { useUser } from '@/hooks/useUser'

import { Loader } from '@/common/Loader'

import clsx from 'clsx'
import { formatPrice } from '@/utils/formatPrice'

import confirmPurchaseStyles from '@/styles/pages/ConfirmPurchase.module.css'

import { INVALID_BILLING_INFORMATION, TOKEN_HEADER, apiURLs } from '@/consts'

export default function ConfirmPurchase() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [confirmedPurchase, setConfirmedPurchase] = useState(false)
	const [error, setError] = useState<{ message: string; state: boolean }>({
		message: '',
		state: false
	})
	const { token } = useUser()
	const { removeAllFromCart, shopping, total } = useCart()

	useEffect(() => {
		const validInformation = window.sessionStorage.getItem(INVALID_BILLING_INFORMATION)

		if (validInformation === null) {
			router.push('/')
		}

		const parseValidInformation: { invalid: true } = JSON.parse(validInformation as string)

		if (parseValidInformation.invalid && !confirmedPurchase) router.push('/')
	}, [confirmedPurchase, router, total])

	const estimatedPrice = useMemo(
		() =>
			shopping.reduce((cur, pet) => {
				const { price, quantity } = pet
				return cur + price * quantity
			}, 0),
		[shopping]
	)

	const confirmPurchase = () => {
		setIsLoading(true)
		setError(() => ({ message: '', state: false }))

		const headers: { [index: string]: string } = {
			'Content-Type': 'application/json;charset=utf-8'
		}
		headers[TOKEN_HEADER] = token

		const purchases = shopping.map((purchase) => {
			const { name, price, quantity } = purchase
			const date = new Date()

			return { date, name, price, quantity }
		})
		const body = JSON.stringify({ purchases })

		fetch(apiURLs.users, {
			method: 'PUT',
			headers,
			body
		})
			.then((res) => {
				const data = res.json()

				if (!res.ok) throw data
				return data
			})
			.then((data) => {
				removeAllFromCart()
				setConfirmedPurchase(true)
				window.sessionStorage.setItem(INVALID_BILLING_INFORMATION, JSON.stringify({ valid: false }))
			})
			.catch((error: any) => {
				setError(() => ({ message: error?.message, state: true }))
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<article
			className={clsx(['content content_letterWhite', confirmedPurchase && 'content_center'])}
		>
			{error.state && (
				<div className="error">
					<p>{error.message}</p>
				</div>
			)}
			{confirmedPurchase && (
				<section className={confirmPurchaseStyles.detailTotal}>
					<p className={confirmPurchaseStyles.detailTotal__gratitude}>
						Thank you for your purchase&nbsp;❤️
					</p>
					<Link href="/" className={confirmPurchaseStyles.continueShopping}>
						Continue
					</Link>
				</section>
			)}
			{isLoading && (
				<div className={confirmPurchaseStyles.loading}>
					<Loader styles={confirmPurchaseStyles.loading__loader} />
					<p className={confirmPurchaseStyles.loading__errorText}>
						Wait a minute, our goblin administrators are managing your purchase.
					</p>
				</div>
			)}
			{!confirmedPurchase && !isLoading && (
				<>
					<h1 className="">Your shopping</h1>
					<h2 className={confirmPurchaseStyles.subtitle}>Confirm purchase</h2>
					<div>
						{shopping.map((pet) => {
							const { media, name, price, quantity } = pet

							return (
								<section key={name} className={confirmPurchaseStyles.product}>
									<img
										src={media}
										alt={name}
										loading="lazy"
										className={confirmPurchaseStyles.product__img}
									/>
									<h2 className={confirmPurchaseStyles.product__name}>{name}</h2>
									<p className={confirmPurchaseStyles.product__detail}>
										{quantity}&nbsp;x&nbsp;{formatPrice(price)}g
									</p>
								</section>
							)
						})}
					</div>
					<section className={confirmPurchaseStyles.detailTotal}>
						<h3 className={confirmPurchaseStyles.detailTotal__detail}>
							<span>Total</span>
							<span>{formatPrice(estimatedPrice)}g</span>
						</h3>
						<button
							onClick={confirmPurchase}
							className={confirmPurchaseStyles.detailTotal__purchase}
						>
							<span>Purchase</span>
						</button>
					</section>
				</>
			)}
		</article>
	)
}
