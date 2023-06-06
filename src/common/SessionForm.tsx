import Image from 'next/image'

import img from '@/assets/imgs/heroImgHome.webp'
import loginStyles from '@/styles/pages/LogIn_SignUp.module.css'

interface SessionFormProps {
	children: React.ReactNode
	submit: (ev: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export function SessionForm({ children, submit }: SessionFormProps) {
	return (
		<div className={loginStyles.containerForm}>
			<Image src={img} alt="" className={loginStyles.containerForm__img} />
			<form onSubmit={submit} className={loginStyles.containerForm__form}>
				{children}
			</form>
		</div>
	)
}
