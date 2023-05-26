import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import { useUser } from '@/hooks/useUser'

import { LayoutPage } from '@/layout/LayoutPage'

import { shoppingCartCookie } from '@/consts'

import '@/styles/globals.css'
import '@/styles/reset.css'

import type { PurchasedPet } from '@/typings/interfaces'

interface Response {
	ok: boolean
	expire?: boolean
	message?: string
	token?: string
}

type PurchasedPetsCookie = {
	purchasedPets: PurchasedPet[]
}

export default function App({ Component, pageProps }: AppProps) {
	const { setConnection } = useCart()
	const { token, username, setToken } = useUser()
	const { setPurchasedPets } = useCart()

	// In case there are previous unconfirmed purchases, update the shopping cart store.
	useEffect(() => {
		const cookies = document.cookie
		let purchases: PurchasedPet[] | null = null
		let purchaseCookie: string | string[] | undefined = undefined

		if (cookies === '') return

		if (cookies.includes(';')) {
			let cookieValues: string[][]

			cookieValues = cookies.split(';').map((cookie) => cookie.split('='))
			purchaseCookie = cookieValues.find((cookie) => cookie[0] === shoppingCartCookie)

			if (purchaseCookie) purchases = JSON.parse(purchaseCookie[1])
		} else {
			purchaseCookie = cookies.split('=')[1]
		}

		if (typeof purchaseCookie === 'string') {
			const { purchasedPets } = JSON.parse(purchaseCookie as string) as PurchasedPetsCookie
			purchases = purchasedPets
		}

		if (typeof purchaseCookie === 'object') {
			const { purchasedPets } = JSON.parse(purchaseCookie[1]) as PurchasedPetsCookie
			purchases = purchasedPets
		}

		if (purchases) setPurchasedPets(purchases)
	}, [setPurchasedPets])

	// Check if the user's session is kept open.
	useEffect(() => {
		const checkKeepSession = (token: string, username: string) => {
			const body = new URLSearchParams({ token, username })
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'x-www-form-urlencoded'
				},
				body
			}

			fetch('http://localhost:3000/api/v1/auth', options)
				.then((response) => response.json())
				.then((data: Response) => {
					if (data?.token) setToken(data.token)

					if (!data.ok) {
						const error = {
							message: data?.message,
							expire: data?.expire
						}

						throw error
					}

					if (data?.token) setToken(data.token)

					setConnection(true)
				})
				.catch((error) => {
					if (error.expire) setToken('')
				})
		}

		if (token !== '') checkKeepSession(token, username)
	}, [token, username, setConnection, setToken])

	return (
		<LayoutPage>
			<Component {...pageProps} />
		</LayoutPage>
	)
}
