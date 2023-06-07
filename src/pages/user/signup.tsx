import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useId, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { useUser } from '@/hooks/useUser'
import { useFocus } from '@/hooks/useFocus'

import { Loader } from '@/common/Loader'
import { SessionForm } from '@/common/SessionForm'

import { apiURLs } from '@/consts'
import loginStyles from '@/styles/pages/LogIn_SignUp.module.css'

export default function SignUp() {
	const formId = useId()
	const router = useRouter()
	const [isCreated, setIsCreated] = useState(false)
	const [error, setError] = useState({ message: '', has: false })
	const [isLoading, setIsLoading] = useState(false)

	const { connected, setConnection } = useCart()
	const { setToken, setUsername } = useUser()
	const focusInput = useFocus<HTMLInputElement>(null)

	useEffect(() => {
		if (connected) {
			setTimeout(() => router.push('/'), 2000)
		}
	}, [connected, router])

	const handleSignUpSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault()

		if (isLoading) return

		setIsLoading(true)
		setError({ message: '', has: false })

		const formData = new FormData(ev.currentTarget)
		const formDataObj = Object.fromEntries(formData.entries())

		const body = JSON.stringify(formDataObj)

		try {
			const response = await fetch(apiURLs.users, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body
			})

			const data = await response.json()

			if (!response.ok) throw data.message

			setUsername(formData.get('username') as string)
			setToken(data.token)
			setConnection(true)
			setIsCreated(true)
		} catch (error: any) {
			const message = typeof error === 'string' ? error : error.message

			setError({ message, has: true })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<Head>
				<meta name="description" content="Create an account in Pets - The Crazy Goblin" />
				<meta property="og:description" content="Create an account in Pets - The Crazy Goblin" />
				<title>Sign up | Pets - The Crazy Goblin</title>
			</Head>
			<section className="content content_center">
				{isCreated ? (
					<p className={loginStyles.successMessage}>Account created</p>
				) : (
					<SessionForm submit={handleSignUpSubmit}>
						<h1>Sign Up</h1>
						{error.has && <p className={loginStyles.containerForm__error}>{error.message}</p>}
						<label htmlFor={`${formId}-usernameInput`}>Username *</label>
						<input
							type="text"
							id={`${formId}-usernameInput`}
							name="username"
							ref={focusInput}
							pattern="[a-zA-Z0-9]{4,20}"
							title="The username can only be letters and number and a minimum of four and a maximum of twenty characters."
							required
						/>
						<label htmlFor={`${formId}-emailInput`}>Email *</label>
						<input
							type="email"
							id={`${formId}-emailInput`}
							name="email"
							pattern="[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"
							title="Invalid email. Example: email@crazygoblin.com"
							required
						/>
						<label htmlFor={`${formId}-passwordInput`}>Password *</label>
						<input
							type="password"
							id={`${formId}-passwordInput`}
							name="password"
							pattern=".{8,16}"
							title="The password must have a minimum of eight and a maximum sixteen characters."
							autoComplete="new-password"
							required
						/>
						{isLoading ? (
							<Loader
								styles={loginStyles.loader}
								stylesCenterCircle={loginStyles.loader_centerCircle}
							/>
						) : (
							<button type="submit" className={loginStyles.containerForm__submit}>
								Sign Up
							</button>
						)}
					</SessionForm>
				)}
			</section>
		</>
	)
}
