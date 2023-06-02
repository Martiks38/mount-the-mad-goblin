import { useRouter } from 'next/router'
import { useEffect, useId, useRef, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { useUser } from '@/hooks/useUser'

import { instanceOf } from '@/utils/intanceOf'
import { formatPrice } from '@/utils/formatPrice'

import { TOKEN_HEADER } from '@/consts'

import userDashboardStyles from '@/styles/pages/UserDashboard.module.css'

import type { User } from '@/typings/interfaces'

type ResponseData = {
	data: User | string | null
	error: boolean
}

const urlApi = 'http://localhost:3000/api/v1/users'

export default function UserDashboard() {
	const router = useRouter()
	const dashboardId = useId()
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<ResponseData>({
		data: null,
		error: false
	})
	const { connected, setConnection } = useCart()
	const { setToken, token, username } = useUser()
	const firstRender = useRef(true)

	useEffect(() => {
		const getUser = async () => {
			try {
				setIsLoading(true)
				const headers: { [index: string]: string } = {}

				headers[TOKEN_HEADER] = token

				const options = { method: 'GET', headers }

				const url = urlApi.concat('/', username)

				const response = await fetch(url, options)
				const data = await response.json()

				if (!response.ok) throw data.message

				setData({ data, error: false })
			} catch (error: any) {
				if (typeof error === 'string') setData({ data: error, error: true })
			} finally {
				setIsLoading(false)
			}
		}

		if (connected && firstRender.current) router.push('/')
		if (connected && !firstRender.current) getUser()

		firstRender.current = false
	}, [connected, router, token, username])

	return (
		<div className="content content_user content_letterWhite">
			{/* {isLoading} */}
			<nav className={userDashboardStyles.dashboardNav}>
				<a href="#settings" className={userDashboardStyles.dashboardNav__link}>
					Settings
				</a>
				<a href="#purchases" className={userDashboardStyles.dashboardNav__link}>
					Purchases
				</a>
			</nav>
			<article className={userDashboardStyles.dashboardContent}>
				<h1 className={userDashboardStyles.dashboardContent__title}>Account</h1>
				{data.data && typeof data.data === 'string' && data.error && (
					<p className="error">{data.data}</p>
				)}
				{data.data && instanceOf<User>(data.data, 'email') && (
					<>
						<section
							className={`${userDashboardStyles.dashboardContent__section} ${userDashboardStyles.dashboardContent__profile}`}
						>
							<h2 className={userDashboardStyles.dashboardContent__section__title}>Profile</h2>
							<h4>Username</h4>
							<p>{username}</p>
							<h3>Email</h3>
							<p>{data.data.email}</p>
							<button className={userDashboardStyles.dashboardContent__btn}>Sign out</button>
						</section>

						<section className={userDashboardStyles.dashboardContent__section}>
							<h2 id="settings" className={userDashboardStyles.dashboardContent__section__title}>
								Settings
							</h2>
							<form className={userDashboardStyles.dashboardContent__form}>
								<label
									htmlFor={`${dashboardId}-username`}
									className={userDashboardStyles.dashboardContent__form__label}
								>
									Name
								</label>
								<input
									type="text"
									name="username"
									id={`${dashboardId}-username`}
									className={userDashboardStyles.dashboardContent__form__input}
									autoComplete="off"
								/>
								<label
									htmlFor={`${dashboardId}-email`}
									className={userDashboardStyles.dashboardContent__form__label}
								>
									Email
								</label>
								<input
									type="text"
									name="email"
									id={`${dashboardId}-email`}
									className={userDashboardStyles.dashboardContent__form__input}
									autoComplete="off"
								/>
								<label htmlFor={`${dashboardId}-pass`}>Password</label>
								<input
									type="password"
									name="password"
									id={`${dashboardId}-pass`}
									className={userDashboardStyles.dashboardContent__form__input}
								/>
								<button type="submit" className={userDashboardStyles.dashboardContent__btn}>
									Update profile
								</button>
							</form>
						</section>

						<section className={userDashboardStyles.dashboardContent__section}>
							<h2 id="purchases" className={userDashboardStyles.dashboardContent__section__title}>
								Purchases
							</h2>
							<table className={userDashboardStyles.shoppingHistory}>
								<thead>
									<tr className={userDashboardStyles.shoppingHistory__headRow}>
										<th>Name</th>
										<th>Quantity</th>
										<th>Price</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
									{data.data.purchases?.map((purchase) => {
										const { date, name, price, quantity } = purchase

										const localeDate = new Date(date).toLocaleDateString('en-US')
										const productPrice = formatPrice(price)

										return (
											<tr
												key={name + date}
												className={userDashboardStyles.shoppingHistory__bodyRow}
											>
												<td>{name}</td>
												<td>{quantity}</td>
												<td>{productPrice}&nbsp;g</td>
												<td>{localeDate}</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</section>

						<section className={userDashboardStyles.dashboardContent__section}>
							<h2 className={userDashboardStyles.dashboardContent__deleteTitle}>Delete account</h2>

							<button
								className={`${userDashboardStyles.dashboardContent__btn} ${userDashboardStyles.dashboardContent__btn_delete}`}
							>
								Delete account
							</button>
						</section>
					</>
				)}
			</article>
		</div>
	)
}
