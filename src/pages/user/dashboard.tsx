import { useRouter } from 'next/router'
import { useEffect, useId, useRef, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { useUser } from '@/hooks/useUser'

import { DeleteUserModal } from '@/components/DeleteUserModal'

import { instanceOf } from '@/utils/intanceOf'
import { formatPrice } from '@/utils/formatPrice'

import { TOKEN_HEADER } from '@/consts'

import userDashboardStyles from '@/styles/pages/UserDashboard.module.css'

import type { User } from '@/typings/interfaces'
import { createPortal } from 'react-dom'

type ResponseData = {
	data: User | string | null
	error: boolean
}

const urlApi = 'http://localhost:3000/api/v1/users'
const startDeleteWith = 'delete/'

export default function UserDashboard() {
	const router = useRouter()
	const dashboardId = useId()

	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<ResponseData>({
		data: null,
		error: false
	})

	const [viewDeleteModal, setViewDeleteModal] = useState(false)
	const [deleteStatus, setDeleteStatus] = useState('')

	const deletePositionY = useRef(0)
	const firstRender = useRef(true)

	const { connected, setConnection } = useCart()
	const { token, username, setToken, setUsername } = useUser()

	useEffect(() => {
		let redirectTimeoutID: NodeJS.Timeout

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

		// If the user is not connected, they should not be able to enter the dashboard
		if (!connected && !firstRender.current)
			redirectTimeoutID = setTimeout(() => router.push('/'), 300)

		// Get the user data
		if (connected && !firstRender.current) getUser()

		firstRender.current = false

		return () => clearTimeout(redirectTimeoutID)
	}, [connected, router, token, username])

	const signOut = () => {
		setConnection(false)
		setToken('')
		setUsername('')

		router.push('/')
	}

	/* Delete modal */
	const openModal = () => {
		setViewDeleteModal(true)
		const body = document.body
		const offsetPage = `${-1 * window.scrollY}px`

		// Fixed the screen when the modal was opened
		const styles = `<style title="block-delete">
			body {
				overflow: hidden;
				position: fixed;
				top: ${offsetPage};
			}
		</style>`

		// Stores the offsetY of the page when the modal is opened
		deletePositionY.current = window.scrollY

		body.insertAdjacentHTML('afterbegin', styles)
	}

	const closeModal = () => {
		const html = document.documentElement

		setViewDeleteModal(false)

		html.style.scrollBehavior = 'auto'

		setTimeout(() => {
			html.style.scrollBehavior = ''
		}, 200)

		document.body.querySelector("style[title='block-delete']")?.remove()

		// When removing the styles the offsetY of the screen returns to zero.
		// To prevent this, scroll to the Y position stored in deletePositionY.
		window.scroll(0, deletePositionY.current)
	}

	const deleteAccount = async () => {
		try {
			setIsLoading(true)

			const headers: { [index: string]: string } = {}
			headers[TOKEN_HEADER] = token

			const options = { method: 'DELETE', headers }

			const response = await fetch(`http://localhost:3000/api/v1/users/${username}`, options)
			const data: { message: string } = await response.json()

			if (!response.ok) throw data

			setDeleteStatus(data.message)

			closeModal()

			setTimeout(() => {
				setToken('')
				setConnection(false)
			}, 2500)
		} catch (error: any) {
			setDeleteStatus(error?.message)
		} finally {
			setIsLoading(false)
			setViewDeleteModal(false)
			setTimeout(() => setDeleteStatus(''), 2500)
		}
	}

	return (
		<div className="content content_user content_letterWhite">
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
							<button onClick={signOut} className={userDashboardStyles.dashboardContent__btn}>
								Sign out
							</button>
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
							{data.data.purchases?.length === 0 ? (
								<p>No purchases have been made</p>
							) : (
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
							)}
						</section>

						<section className={userDashboardStyles.dashboardContent__section}>
							<h2 className={userDashboardStyles.dashboardContent__deleteTitle}>Delete account</h2>

							{viewDeleteModal && (
								<DeleteUserModal
									closeModal={closeModal}
									deleteAccount={deleteAccount}
									isLoading={isLoading}
									startDeleteWith={startDeleteWith}
									username={username}
								/>
							)}
							{deleteStatus &&
								createPortal(
									<div className={userDashboardStyles.dashboardContent__message}>
										{deleteStatus}
									</div>,
									document.body
								)}
							<button
								onClick={openModal}
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
