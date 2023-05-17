import { useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import { useUser } from '@/hooks/useUser'
import { LayoutPage } from '@/layout/LayoutPage'

import '@/styles/globals.css'
import '@/styles/reset.css'

import type { AppProps } from 'next/app'

interface Response {
	ok: boolean
	expire?: boolean
	message?: string
	token?: string
}

export default function App({ Component, pageProps }: AppProps) {
	const { setConnection } = useCart()
	const { token, username, setToken } = useUser()

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
