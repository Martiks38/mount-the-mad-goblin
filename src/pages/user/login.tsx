import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useId, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { useFocus } from '@/hooks/useFocus'
import { useUser } from '@/hooks/useUser'

import { SessionForm } from '@/common/SessionForm'
import { Loader } from '@/common/Loader'

import { apiURLs } from '@/consts'
import loginStyles from '@/styles/pages/LogIn_SignUp.module.css'

interface IResponse {
	ok: boolean
	message?: string
	token?: string
}

export default function LogIn() {
	const formId = useId()
	const router = useRouter()
	const [isError, setIsError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const focusInput = useFocus<HTMLInputElement>(null)
	const { setToken, setUsername } = useUser()
	const { connected, setConnection } = useCart()

	useEffect(() => {
		if (connected) router.push('/')
	}, [connected, router])

	const handleLoginSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault()

		if (isLoading) return

		setIsError(false)
		setIsLoading(true)

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

			const data: IResponse = await response.json()

			if (!data.ok) throw data?.message

			if (formData.get('keepLogged') && data?.token) {
				setUsername(formData.get('username') as string)
				setToken(data.token)
			}

			setConnection(true)

			router.push('/')
		} catch (error) {
			setIsError(true)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<Head>
				<meta name="description" content="Log in to Pets - The Crazy Goblin" />
				<meta property="og:description" content="Log in to Pets - The Crazy Goblin" />
				<title>Log in | Pets - The Crazy Goblin</title>
			</Head>
			<section className="content content_center">
				<SessionForm submit={handleLoginSubmit}>
					<h1 className={loginStyles.title}>Log In</h1>
					{isError && (
						<p className={loginStyles.containerForm__error} aria-live="polite">
							The credentials you are using are not valid.
						</p>
					)}
					<label htmlFor={`${formId}-userInput`}>Username *</label>
					<input
						type="text"
						id={`${formId}-userInput`}
						name="username"
						ref={focusInput}
						pattern="[a-zA-Z0-9]{4,20}"
						title="The username can only be letters and number and a minimum of four and a maximum of twenty characters."
						required
					/>
					<label htmlFor={`${formId}-passwordInput`}>Password *</label>
					<input
						type="password"
						id={`${formId}-passwordInput`}
						pattern=".{8,16}"
						title="The password must have a minimum of eight and a maximum sixteen characters."
						name="password"
						autoComplete="current-password"
						required
					/>
					<div className={loginStyles.containerForm__options}>
						<label
							htmlFor={`${formId}-keepLoggedInput`}
							className={loginStyles.containerForm__options__wrapperCheckbox}
						>
							<div className={loginStyles.containerForm__options__wrapperCheckbox__input}>
								<input
									type="checkbox"
									name="keepLogged"
									id={`${formId}-keepLoggedInput`}
									defaultChecked
								/>
								<div></div>
							</div>
							<span>Keep me logged in</span>
						</label>
					</div>
					{isLoading ? (
						<Loader
							styles={loginStyles.loader}
							stylesCenterCircle={loginStyles.loader_centerCircle}
						/>
					) : (
						<button type="submit" className={loginStyles.containerForm__submit}>
							Log in
						</button>
					)}
				</SessionForm>
			</section>
		</>
	)
}
