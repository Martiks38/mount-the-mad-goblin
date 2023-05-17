import { useRouter } from 'next/router'
import { useEffect, useId, useState } from 'react'
import { useCart } from '@/hooks/useCart'

import { SessionForm } from '@/common/SessionForm'

import loginStyles from '@/styles/pages/LogIn_SignUp.module.css'
import { useUser } from '@/hooks/useUser'
import { Loader } from '@/common/Loader'
export default function SignUp() {
	const router = useRouter()
	const [isCreated, setIsCreated] = useState(false)
	const [isError, setIsError] = useState(false)
	const emailInputId = useId()
	const passwordInputId = useId()
	const usernameInputId = useId()
	const { connected, setConnection } = useCart()
	const { setToken, setUsername } = useUser()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (connected) {
			setTimeout(() => router.push('/'), 2000)
		}
	}, [connected, router])

	const handleSignUpSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault()

		if (isLoading) return

		setIsLoading(true)
		setIsError(false)

		const formData = new FormData(ev.currentTarget)
		let urlSearchParams: Record<string, string> = {}

		for (const pair of Array.from(formData.entries())) {
			urlSearchParams[pair[0]] = pair[1] as string
		}

		const body = new URLSearchParams(urlSearchParams).toString()

		try {
			const response = await fetch('http://localhost:3000/api/v1/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'x-www-form-urlencoded'
				},
				body
			})

			const data = await response.json()

			setUsername(formData.get('username') as string)
			setToken(data.token)
			setConnection(true)
			setIsCreated(true)
		} catch (error) {
			setIsError(true)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className={`content ${loginStyles.centerContent}`}>
			{isCreated ? (
				<p className={loginStyles.successMessage}>Account created</p>
			) : (
				<SessionForm submit={handleSignUpSubmit}>
					<h1>Sign Up</h1>
					{isError && (
						<p className={loginStyles.containerForm__error}>
							The credentials you are using are not valid.
						</p>
					)}
					<label htmlFor={usernameInputId}>Username *</label>
					<input type="text" id={usernameInputId} name="username" autoFocus required />
					<label htmlFor={emailInputId}>Email *</label>
					<input type="email" id={emailInputId} name="email" required />
					<label htmlFor={passwordInputId}>Password *</label>
					<input type="password" id={passwordInputId} name="password" required />
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
	)
}
