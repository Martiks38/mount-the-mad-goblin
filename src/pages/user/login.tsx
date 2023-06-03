import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useId, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { useFocus } from '@/hooks/useFocus'
import { useUser } from '@/hooks/useUser'

import { SessionForm } from '@/common/SessionForm'

import loginStyles from '@/styles/pages/LogIn_SignUp.module.css'
import { Loader } from '@/common/Loader'

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
			const response = await fetch('http://localhost:3000/api/v1/users', {
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
		<section className="content content_center">
			<SessionForm submit={handleLoginSubmit}>
				<h1 className={loginStyles.title}>Log In</h1>
				{isError && (
					<p className={loginStyles.containerForm__error} aria-live="polite">
						The credentials you are using are not valid.
					</p>
				)}
				<label htmlFor={`${formId}-userInput`}>Username *</label>
				<input type="text" id={`${formId}-userInput`} name="username" ref={focusInput} required />
				<label htmlFor={`${formId}-passwordInput`}>Password *</label>
				<input type="password" id={`${formId}-passwordInput`} name="password" required />
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
					<Link href="#">Forgot username or password?</Link>
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
	)
}
