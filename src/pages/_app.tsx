import { useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import { useUser } from '@/hooks/useUser'
import { LayoutPage } from '@/layout/LayoutPage'

import '@/styles/globals.css'
import '@/styles/reset.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	const { setConnection } = useCart()
	const { token, username, setToken } = useUser()

	useEffect(() => {
		const checkKeepSession = async (token: string, username: string) => {
			try {
				const body = new URLSearchParams({ token, username })

				const response = await fetch('http://localhost:3000/api/v1/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'x-www-form-urlencoded'
					},
					body
				})

				const data: { ok: boolean; token: null | string } = await response.json()

				if (!data.ok) return
				if (data.token) setToken(data.token)

				setConnection(true)
			} catch (error) {
				console.log(error)
			}
		}

		if (token !== '') checkKeepSession(token, username)
	}, [token, username, setConnection, setToken])

	return (
		<LayoutPage>
			<Component {...pageProps} />
		</LayoutPage>
	)
}
