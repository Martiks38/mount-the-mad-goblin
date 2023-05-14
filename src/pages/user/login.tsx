import Image from 'next/image'
import Link from 'next/link'
import { useId, useState } from 'react'
import { useInputfocus } from '@/hooks/useInputfocus'

import img from '@/assets/imgs/heroImgHome.webp'
import loginStyles from '@/styles/pages/LogIn_SignUp.module.css'

export default function LogIn() {
	const [isError, setIsError] = useState(false)
	const userInputId = useId()
	const passwordInputId = useId()
	const keepLoggedInputId = useId()
	const focusInput = useInputfocus(null)

	return (
		<section className={`content ${loginStyles.centerContent}`}>
			<div className={loginStyles.containerForm}>
				<Image src={img} alt="" className={loginStyles.containerForm__img} />
				<form onSubmit={() => {}} className={loginStyles.containerForm__form}>
					<h1 className={loginStyles.title}>Log In</h1>
					{isError && (
						<p className={loginStyles.containerForm__error} aria-live="polite">
							The credentials you are using are not valid.
						</p>
					)}
					<label htmlFor={userInputId}>Username *</label>
					<input type="text" id={userInputId} name="username" required ref={focusInput} />
					<label htmlFor={passwordInputId}>Password *</label>
					<input type="password" id={passwordInputId} name="password" required />
					<div className={loginStyles.containerForm__options}>
						<label
							htmlFor={keepLoggedInputId}
							className={loginStyles.containerForm__options__wrapperCheckbox}
						>
							<div className={loginStyles.containerForm__options__wrapperCheckbox__input}>
								<input type="checkbox" name="keepLogged" id={keepLoggedInputId} />
								<div></div>
							</div>
							<span>Keep me logged in</span>
						</label>
						<Link href="#">Forgot username or password?</Link>
					</div>
					<button type="submit" className={loginStyles.containerForm__submit}>
						Log in
					</button>
				</form>
			</div>
		</section>
	)
}
